const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const userModel = require('./models/user')
const bcrypt = require('bcrypt')
const joi = require('joi')
const app = express()
const crypto = require('crypto');
require('dotenv').config();
require("./utils.js");
const verifyGame = require('./verifyGame.js');
const gpt = require('./gpt.js');
const B2 = require('backblaze-b2');
const fs = require('fs');
const multer = require('multer');
const { PassThrough } = require('stream');

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'));
app.set('view engine', 'ejs')
const expireTime = 1000 * 60 * 60

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const node_session_secret = process.env.NODE_SESSION_SECRET;
backblaze_account = process.env.BACKBLAZE_ACCOUNT_ID;
backblaze_API = process.env.BACKBLAZE_APPLICATION_KEY;
backblaze_bucket = process.env.BACKBLAZE_BUCKET_ID;
backblaze_name = process.env.BACKBLAZE_BUCKET_NAME;

var {
    database
} = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the destination folder where the uploaded file will be saved
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
const upload = multer({ storage: multerStorage });

app.use(express.urlencoded({
    extended: false
}));

const b2 = new B2({
    applicationKeyId: backblaze_account,
    applicationKey: backblaze_API
  });

//   async function GetBucketAndUploadPhoto() {
//     try {
//       await b2.authorize();
//       let response = await b2.getBucket({ bucketName: backblaze_name });
//       console.log(response.data);
//       console.log("Success! Backblaze server is connected.");
  
//       // Define the folder name
//       const folderName = 'user';
  
//       // Upload a photo to the bucket in the specified folder
//       const photoPath = 'C:/Users/marti/Documents/2800-202310-DTC10/public/mediaResources/avatars/1.jpg';
//       const fileName = folderName + '/uploaded-photo.jpg';
  
//       fs.readFile(photoPath, async (err, fileData) => {
//         if (err) {
//           console.log('Error reading photo:', err);
//           return;
//         }
  
//         try {
//           const uploadUrlResponse = await b2.getUploadUrl({ bucketId: backblaze_bucket });
//           const uploadUrl = uploadUrlResponse.data.uploadUrl;
//           const uploadAuthToken = uploadUrlResponse.data.authorizationToken;
//           console.log('Got an upload URL:', uploadUrl);
//           console.log('Got an upload auth token:', uploadAuthToken);

//           // Calculate the SHA1 hash of the file content
//         const contentSha1 = crypto.createHash('sha1').update(fileData).digest('hex');
  
//           // Call the uploadFile method with the obtained upload URL and auth token
//           await b2.uploadFile({
//             uploadUrl: uploadUrl,
//             uploadAuthToken: uploadAuthToken,
//             fileName: fileName,
//             data: fileData,
//             bucketName: backblaze_name,
//             contentSha1: contentSha1
//           });
//           console.log('Photo uploaded successfully:', fileName);
  
//         } catch (error) {
//           console.error('Error uploading photo:', error);
//         }
//       });
//     } catch (err) {
//       console.log('Error getting bucket:', err);
//     }
//   }
  
//   // Call the function to get the bucket and upload the photo when the page loads
//   GetBucketAndUploadPhoto();


var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
    crypto: {
        secret: mongodb_session_secret
    }
})

app.use(session({
    secret: node_session_secret,
    store: mongoStore,
    saveUninitialized: false,
    resave: true
}));

// AUTHENTICATION MIDDLEWARE
const userAuthenticator = (req, res, next) => {
    if (!req.session.GLOBAL_AUTHENTICATION) {
        return res.redirect('/login')
    }
    next()
}

// SIGN UP PAGE
app.get('/signup', (req, res) => {
    res.render('signup', { stylesheetPath: ['./styles/login.css'] })
});

//INITIAL RECOMMENDER SCREEN
app.get("/initialRecommend", (req, res) => {
  res.render("initialRecommend", {
    stylesheetPath: ["./styles/initialRecommend.css"],
  });
});

//FINAL RECOMMENDER SCREEN
app.get("/finalRecommend", (req, res) => {
  res.render("finalRecommend", {
    stylesheetPath: ["./styles/finalRecommend.css"],
  });
});

//PROMPT SCREEN
app.get("/promptScreen", (req, res) => {
    res.render("promptScreen", { stylesheetPath: ["./styles/promptScreen.css"] });
});

// SIGN UP SUBMIT PAGE
app.post('/signupSubmit', async (req, res) => {
    const schema = joi.object({
        username: joi.string().required(),
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/),
        dob: joi.string().required(),
        security_question: joi.string().required(),
        security_answer: joi.string().required()
    })
    try {
        const validation = await schema.validateAsync({ name: req.body.name, email: req.body.email, password: req.body.password, username: req.body.username, dob: req.body.dob, security_question: req.body.security_question, security_answer: req.body.security_answer })
        console.log('b')
        const { username, name, email, password, dob, security_question, security_answer } = req.body;
        const result = await userModel.find({
            email: email
        })
        console.log("a")
        if (result.length > 0) {
            res.render('signupSubmit.ejs', { error: 'already exists' })
        } else if (password.length < 8) {
            res.render('signupSubmit.ejs', { error: 'min 8' })
        } else if (!password.match(/^(?=.*[a-z]).*$/)) {
            res.render('signupSubmit.ejs', { error: 'no lower' })
        } else if (!password.match(/^(?=.*[A-Z]).*$/)) {
            res.render('signupSubmit.ejs', { error: 'no upper' })
        } else if (!password.match(/^(?=.*\d).*$/)) {
            res.render('signupSubmit.ejs', { error: 'no digits' })
        } else if (!password.match(/^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/)) {
            res.render('signupSubmit.ejs', { error: 'no symbols' })
        } else {
            const user = new userModel({
                username: username,
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 12),
                type: 'user',
                security_question: security_question,
                security_answer: bcrypt.hashSync(security_answer, 12),

                wishlist: [],
                favourites: [],
                history: [],
                dob: dob,
                profilePic: null
            })
            console.log(user)
            await user.save()
            req.session.GLOBAL_AUTHENTICATION = true
            req.session.name = name
            req.session.email = email
            req.session.type = 'user'
            req.session.cookie.maxAge = expireTime
            res.redirect('/profile')
        }
    } catch (error) {
        res.render('signupSubmit.ejs', { error: 'invalid', name: req.body.name, email: req.body.email, password: req.body.password })
    }
})

// LOGIN PAGE
app.get('/login', (req, res) => {
    res.render('login', { stylesheetPath: ['/styles/login.css'] })
})

app.get("/", (req, res) => {
    const stylesheets = ["/styles/index.css", "/styles/foot.css"];
    res.render("index", { stylesheets });
});
// LOGIN SUBMIT PAGE
app.post('/loginSubmit', async (req, res) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    })
    try {
        const validation = await schema.validateAsync({ email: req.body.email, password: req.body.password })
        const result = await userModel.find({
            email: req.body.email
        })
        if (result.length == 0) {
            res.render('loginSubmit.ejs')
        } else if (bcrypt.compareSync(req.body.password, result[0].password)) {
            req.session.GLOBAL_AUTHENTICATION = true
            req.session.name = result[0].name
            req.session.email = result[0].email
            req.session.type = result[0].type
            req.session.cookie.maxAge = expireTime
            res.redirect('/profile')
        } else {
            res.render('loginSubmit.ejs')
        }
    } catch (error) {
        res.redirect('/login')
    }
})

app.get('/forgotPassword', async (req, res) => {
    res.render('forgotPassword', { stylesheetPath: ['./styles/login.css'] })
})

app.post('/securityQuestion', async (req, res) => {
    const email = req.body.email
    req.session.email = email
    const user = await userCollection.findOne({ email: email })
    if (user) {
        const security_question = user.security_question
        res.render('securityQuestion', { security_question: security_question, stylesheetPath: ['./styles/login.css'] })
    }
})

app.post('/changePassword', async (req, res) => {
    const security_answer = req.body.security_answer
    console.log(security_answer)
    const email = req.session.email
    console.log(email)
    const user = await userCollection.findOne({ email: email })
    console.log(user.security_answer)
    if (bcrypt.compareSync(security_answer, user.security_answer)) {
        res.render('changePassword', { stylesheetPath: ['./styles/login.css'] })
    }
})

app.post('/updatePassword', async (req, res) => {
    const password = req.body.new_password
    const confirm_password = req.body.confirm_new_password
    const email = req.session.email
    if (password != confirm_password) {
        res.render('updatePassword', { error: 'passwords do not match', stylesheetPath: ['./styles/login.css'] })
    } else {
        await userCollection.updateOne({ email: email }, { $set: { password: bcrypt.hashSync(password, 12) } })
        res.redirect('/profile')
    }
})

// USER SEARCH PAGE
app.get('/user/', userAuthenticator, async (req, res) => {
    const username = req.query.username;
    const result = await userModel.find({ username: username });
    if (result.length > 0) {
        const profilePic = result[0].profilePic;
        const favourites = result[0].favourites;
        const wishlist = result[0].wishlist;
        res.render('user', { username: username, profilePic: profilePic, favourites: favourites, wishlist: wishlist, stylesheetPath: './styles/profile.css' })
    } else {
        res.redirect('/profile')
    }
})

app.get('/profile', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const result = await userModel.find({ email: email });
    const username = result[0].username;
    const name = result[0].name;
    const dob = result[0].dob;
    const profilePic = result[0].profilePic;
  
    // Connect to Backblaze B2 storage
    const b2 = new B2({
      applicationKeyId: backblaze_account,
      applicationKey: backblaze_API
    });
  
    try {
      // Authorize with Backblaze B2
      await b2.authorize();
  
      // Get the bucket information
      let response = await b2.getBucket({ bucketName: backblaze_name });
      const bucketInfo = response.data;
  
      const profilePicFileName = `${email}/Profile_Picture.jpg`;
      const profilePicUrl = `https://s3.us-east-005.backblazeb2.com/comp2537/${profilePicFileName}?${Date.now()}`;
  
      res.render('profile', { username, name, email, dob, profilePic: profilePicUrl, stylesheetPath: './styles/profile.css' });
    } catch (error) {
      console.error('Error connecting to Backblaze:', error);
      res.render('profile', { username, name, email, dob, profilePic, stylesheetPath: './styles/profile.css' });
    }
  });
  

  app.post('/saveImage', userAuthenticator, upload.single('profilePic'), async (req, res) => {
    const email = req.session.email;
  
    // Configure your Backblaze B2 settings
    const b2 = new B2({
      applicationKeyId: backblaze_account,
      applicationKey: backblaze_API
    });
  
    try {
      // Authorize with Backblaze B2
      await b2.authorize();
  
      // Get the bucket information
      let response = await b2.getBucket({ bucketName: backblaze_name });
  
      // Read the uploaded image file from the saved path on the file system
      const fileData = fs.readFileSync(req.file.path);
  
      // Calculate the SHA1 hash of the file content
      const contentSha1 = crypto.createHash('sha1').update(fileData).digest('hex');
  
      // Define the folder name as the user's ID
      const folderName = `${email}`;
  
      // Define the file name as "Profile_Picture.jpg"
      const fileName = `${folderName}/Profile_Picture.jpg`;
  
      // Get the upload URL and authorization token
      const uploadUrlResponse = await b2.getUploadUrl({ bucketId: backblaze_bucket });
      const uploadUrl = uploadUrlResponse.data.uploadUrl;
      const uploadAuthToken = uploadUrlResponse.data.authorizationToken;
  
      // Upload the file to Backblaze B2
      await b2.uploadFile({
        uploadUrl: uploadUrl,
        uploadAuthToken: uploadAuthToken,
        fileName: fileName,
        data: fileData,
        bucketName: backblaze_name,
        contentSha1: contentSha1
      });
      console.log('Photo uploaded successfully:', fileName);
  
      // Delete the uploaded file from the local filesystem
      fs.unlinkSync(req.file.path);
  
      // Retrieve the current profile picture file path from the user document
      const user = await userModel.findOne({ email });
      const currentProfilePic = user.profilePic;
  
      // Check if the current profile picture file path exists and is different from the new file path
      if (currentProfilePic && currentProfilePic !== `/${fileName}`) {
        // Extract the file name from the current profile picture file path
        const currentFileName = currentProfilePic.substring(1);
  
        // Delete the old profile picture file from Backblaze B2
        await b2.deleteFileVersion({ bucketId: backblaze_bucket, fileName: currentFileName });
        console.log('Old profile picture file deleted:', currentFileName);
      }
  
      // Update the user's profilePic field in the database with the new file path
      await userCollection.updateOne({ email }, { $set: { profilePic: `/${fileName}` } });
  
      // Redirect to the profile page or display a success message
      res.redirect('/profile');
      } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error accordingly
      // res.redirect('/profile'); // Redirect to the profile page or display an error message
      }
      });  
  
  

app.get('/logout', userAuthenticator, (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.post('/updateInfo', userAuthenticator, async (req, res) => {
    // Retrieve the user's session name
    const email = req.session.email;

    // Retrieve the user's entered values from the form
    const updatedName = req.body.name;
    const updatedUsername = req.body.username;
    const updatedEmail = req.body.email;
    const updatedDob = req.body.dob;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    console.log(updatedName)

    // Fetch the user document from the database
    const user = await userModel.findOne({ email: email });

    // Check if the user exists
    if (user) {
        console.log(user.name)

        // Update the fields if they are changed
        if (updatedName !== user.name) {
            await userCollection.updateOne({
                email: email
            }, {
                $set: {
                    name: updatedName
                }
            });
        }

        if (updatedUsername !== user.username) {
            await userCollection.updateOne({
                email: email
            }, {
                $set: {
                    username: updatedUsername
                }
            });
        }

        if (updatedDob !== user.dob) {
            await userCollection.updateOne({
                email: email
            }, {
                $set: {
                    dob: updatedDob
                }
            });
        }

        const result = await userModel.find({
            email: email,
        })
        if (result.length == 0) {
            res.render('loginSubmit.ejs')
        } else if (bcrypt.compareSync(confirmPassword, result[0].password)) {
            console.log("passwords match")
            if (newPassword !== user.password) {
                await userCollection.updateOne({
                    email: email
                }, {
                    $set: {
                        password: bcrypt.hashSync(newPassword, 12)
                    }
                });
            }
        }

        // Redirect or respond with a success message
        return res.redirect('/profile');
    }

    // Handle the case if the user does not exist
    return res.status(404).send('User not found');
});

// FAVOURITES PAGE
app.get('/favourites', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const user = await userModel.findOne({ email: email });
    const profilePic = user.profilePic;
    const success = req.query.success;
    res.render('favourites', {
        stylesheetPath: ['/styles/favourites.css', '/styles/profile.css'],
        favourites: user.favourites,
        profilePic: profilePic,
        success: success
    })
})

// VERIFY FAVOURITE
app.post('/verifyFavourite', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const game = req.body.game;
    const result = await verifyGame(game);
    if (result) {
        await userCollection.updateOne({ email: email }, { $push: { favourites: result } });
        res.redirect('/favourites?success=true')
    } else {
        res.redirect('/favourites?success=false')
    }
})

// REMOVE FAVOURITE
app.post('/removeFavourite', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const favourite = req.body.game;
    await userCollection.updateOne({ email: email }, { $pull: { favourites: favourite } });
    res.redirect('/favourites')
})

//WISHLIST PAGE
app.get('/wishlist', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const user = await userModel.findOne({ email: email });
    const profilePic = user.profilePic;
    const success = req.query.success;
    res.render('wishlist', {
        stylesheetPath: ['/styles/wishlist.css', '/styles/profile.css'],
        wishlist: user.wishlist,
        profilePic: profilePic,
        success: success
    })
})

// VERIFY WISHLIST
app.post('/verifyWishlist', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const game = req.body.game;
    const result = await verifyGame(game);
    if (result) {
        await userCollection.updateOne({ email: email }, { $push: { wishlist: result } });
        res.redirect('/wishlist?success=true')
    } else {
        res.redirect('/wishlist?success=false')
    }
})

// REMOVE WISHLIST
app.post('/removeWishlist', userAuthenticator, async (req, res) => {
    const email = req.session.email;
    const wishlist = req.body.game;
    await userCollection.updateOne({ email: email }, { $pull: { wishlist: wishlist } });
    res.redirect('/wishlist')
})


// RECOMMENDER PAGE
app.get('/recommender', userAuthenticator, async (req, res) => {
    const content = await gpt()
    res.render('recommender', { content: content, stylesheetPath: ['./styles/recommender.css'] })
})

app.get("*", (req, res) => {
    res.status(404);
    res.render("404");
});

module.exports = app