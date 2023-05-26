# Project Title
QuestQube

# Project Pitch
Our team, DTC-10, is developing QuestQube, a mobile web application to help gamers discover new games and connect with other gamers using an AI-powered interactive game recommender.

# Technologies Used
IDE: Visual Studio Code
FrontEnd: HTML, CSS, Bootstrap, EJS
Backend: NodeJS
Node Modules USed: axios, backblaze-b2, bcrypt, cheerio, connect-mongo, connect-mongodb-session, dotenv, ejs, express, express-session, fs, joi, mongoose, multer, and stream
Database: MongoDB, BackBlazeB2
AI: OpenAI API
Other APIs: IGDB API, BackBlaze API

# File Contents
|   .env
|   .gitignore
|   app.js
|   databaseConnection.js
|   gpt.js
|   package-lock.json
|   package.json
|   Procfile
|   prompts.js
|   README.md
|   server.js
|   Tree.txt
|   utils.js
|   verifyGame.js
|   
+---models
|       user.js
|       
|           
+---public
|   +---datasets
|   |       games_list.csv
|   |       
|   +---mediaResources
|   |   |   1.jpg
|   |   |   beast.jpg
|   |   |   cheer.jpg
|   |   |   city.jpg
|   |   |   favicon.ico
|   |   |   ghost.png
|   |   |   ghosts.gif
|   |   |   guild.jpg
|   |   |   initial.png
|   |   |   loading.svg
|   |   |   logo.png
|   |   |   logo4.png
|   |   |   pacman.gif
|   |   |   pacman_music.mp3
|   |   |   searchglass.png
|   |   |   user.png
|   |   |   video.mp4
|   |   |   
|   |   \---Avatars
|   |           1.jpg
|   |           10.jpg
|   |           11.jpg
|   |           12.jpg
|   |           13.jpg
|   |           14.jpg
|   |           15.jpg
|   |           16.jpg
|   |           2.jpg
|   |           3.jpg
|   |           4.jpg
|   |           5.jpg
|   |           6.jpg
|   |           7.jpg
|   |           8.jpg
|   |           9.jpg
|   |           
|   +---scripts
|   |       gameSearchbar.js
|   |       loader.js
|   |       pacman.js
|   |       profileSwapper.js
|   |       scrapeImages.js
|   |       
|   \---styles
|           404.css
|           community.css
|           favourites.css
|           finalRecommend.css
|           foot.css
|           gameSearchbar.css
|           index.css
|           initialRecommend.css
|           login.css
|           loginSubmit.css
|           nav.css
|           profile.css
|           promptScreen.css
|           recommender.css
|           signup.css
|           signupSubmit.css
|           wishlist.css
|           
+---uploads
|       text.txt
|       
\---views
    |   404.ejs
    |   changePassword.ejs
    |   community.ejs
    |   favourites.ejs
    |   finalRecommend.ejs
    |   forgotPassword.ejs
    |   index.ejs
    |   initialRecommend.ejs
    |   login.ejs
    |   loginSubmit.ejs
    |   profile.ejs
    |   promptScreen.ejs
    |   recommender.ejs
    |   securityQuestion.ejs
    |   signup.ejs
    |   signupSubmit.ejs
    |   updatePassword.ejs
    |   user.ejs
    |   wishlist.ejs
    |   
    \---templates
            foot.ejs
            gameSearchbar.ejs
            head.ejs
            nav.ejs
            profile_picture.ejs
            
# How to Install
1. To work on our web app, the developer need to install an IDE such as vscode, MongoDB database, node modules and nodemon. 
2. The developer also need to download API frameworks for Backblazde and IGDB.
3. Yes they do. The developer will need openAI API key, BackBlaze API, and twitch API key.
4. The installing order should be language/IDE -> node modules and nodemon -> MongoDB databases -> API frameworks. They should all be downloaded and installed into the same folder. 
5. In order to configure the project on your local repository, you would need an env file that contains your mongodb host name, your mongodb user, your mongodb cluster password, your mongodb database name, your node session secret, your mongodb session secret, your backblaze account ID, your backblaze API key, your BackBlaze bucket ID, your BackBlaze bucket name, your OpenAI API key, your Twitch client ID, and your Twitch client secret.
6. https://docs.google.com/spreadsheets/d/1dqKkkIfp2BC0RXR_0_BQJEKG7jyMMEvfTxMCoOparP8/edit#gid=0

# How to Use
Signing up:
1. Click on the "Explore" button on the landing page.
2. Fill out ALL fields on the signup form. Ensure that email is a valid email and password matches requirements on screen.
3. Click on "Submit" button.

Logging in:
1. Click on "Login".
2. Enter registered email and password.
3. Click on "Submit" button.

Using the recommender:
1. Log in to the app.
2. Click on the controller icon on the bottom navbar.
3. Click on "Begin your Adventure Now" button.
4. Click on preferred options for each of the following prompts.
5. On the conclusion page, click on "Recommendations" button.
6. View recommendations.
7. Click on "New game" button for new recommendations.
8. Click on "Add to Wishlist" button to add game to wishlist.

Editing profile information:
1. Log in to the app.
2. The app will automatically take you to the profile page upon logging in. If not, click on the profile icon in the top left of top navbar.
3. Click on "Profile Settings" in the menu under the profile picture.
4. Edit the fields on the form with your information.
5. Click on "Update Profile" button.

Changing your profile picture:
1. Log in to the app.
2. The app will automatically take you to the profile page upon logging in. If not, click on the profile icon in the top left of top navbar.
3. Click on "Choose Image" button to select a file from your phone.
4. Picture should be less than 5MB and in .jpg, .png, or .gif format. 
5. After selecting the image, click on the "Upload Profile Picture" button.

Adding to Wishlist:
1. Log in to the app.
2. The app will automatically take you to the profile page upon logging in. If not, click on the profile icon in the top left of top navbar.
3. Click on "My Wishlist" in the menu under the profile picture.
4. Search for a game in the search bar.
5. Game will automatically be added to wishlist after selecting game in search bar.
6. Click on the "Remove" button to remove game from wishlist.

Adding to Favourites:
1. Log in to the app.
2. The app will automatically take you to the profile page upon logging in. If not, click on the profile icon in the top left of top navbar.
3. Click on "Favourite Games" in the menu under the profile picture.
4. Search for a game in the search bar.
5. Game will automatically be added to wishlist after selecting game in search bar.
6. Click on the "Remove" button to remove game from favourite games list.

User Searching:
1. Log in to the app.
2. In the top navbar, enter the name of the user in the search bar.
3. By searching the user, the app will automatically take the user to the searched user's page.

Connecting to Discord Channel:
1. Log in to the app.
2. In the bottom navbar, click on the discord icon to be taken to the discord community.

# Credits and References
ChatGPT was used to generate some of the code in this project.
video.mp4 was taken from https://stock.adobe.com/ca/
loading screen provided by loading.io
AI images generated by Lexica.art
Pacman gif provided by DeviantArt
Ghosts images provided by https://wifflegif.com/gifs/706393-pixel-art-pacman-gif

# AI Usage
Creating App: 
*We used chatGPT to create a base code for us to further modify for many of the pages in our web application
*We used Lexica.art in order to generate AI images for our recommender game.

Creating and Cleaning Data Sets:
*No AI usage here.

Usage of AI in the app:
*OpenAI API was used to generate the story prompts and options in the recommend game.
*OpenAI API was used to generate the recommendations at the end of our recommend game.

# Contact Information
Lulu Dong: luluberry8@gmail.com
Adam Goldsmith: agoldsmith@my.bcit.ca
Martin Siu: msiu28@my.bcit.ca
Danny Nguyen: dnguyen235@my.bcit.ca
