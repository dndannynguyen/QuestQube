# QuestQube

# Project Pitch
Our team, DTC-10, is developing QuestQube, a mobile web application to help gamers discover new games and connect with other gamers using an AI-powered interactive game recommender.


https://github.com/user-attachments/assets/f3d36487-5a6c-474d-9ce9-d13cf83856fa


# Technologies Used
IDE: Visual Studio Code

FrontEnd: HTML, CSS, Bootstrap, EJS

Backend: Node.JS, Express.JS

Node Modules USed: axios, backblaze-b2, bcrypt, cheerio, connect-mongo, connect-mongodb-session, dotenv, ejs, express, express-session, fs, joi, mongoose, multer, and stream

Database: MongoDB, BackBlazeB2

AI: OpenAI API

Other APIs: IGDB API, BackBlaze API


# How to Use


https://github.com/user-attachments/assets/235c7435-1f6b-4d79-9a84-2a7a59347f17


Signing up:

![Screenshot_8](https://github.com/user-attachments/assets/78e602c9-5aa2-4aeb-adaf-bbfbfd44aca7)


1. Click on the "Explore" button on the landing page.
2. Fill out ALL fields on the signup form. Ensure that email is a valid email and password matches requirements on screen.
3. Click on "Submit" button.

Logging in:
1. Click on "Login".
2. Enter registered email and password.
3. Click on "Submit" button.

Using the recommender:

![Screenshot_9](https://github.com/user-attachments/assets/5868ef08-5a49-40bb-b150-09542b1d04fc)

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


# How to Install
1. Clone/Download the project source code.

2. Set up .env file:
    
- Get keys from MongoDB, OpenAI, Backblaze
- Note: For MongoDB keys, you will get `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWOR}@${MONGODB_HOST}/?retryWrites=true`
- Content of .env file:
    ```bash
    MONGODB_HOST=your_MongoDB_host
    MONGODB_USER=your_MongoDB_username
    MONGODB_PASSWORD=your_MongoDB_password
    MONGODB_DATABASE=test
    
    MONGODB_SESSION_SECRET=your_MongoDB_session_secret
    NODE_SESSION_SECRET=your_node_session_secret
    
    TWITCH_CLIENT_ID=your_twitch_client_id
    TWITCH_CLIENT_SECRET=your_twitch_client_secret
    
    OPENAI_API_KEY=your_OPENAI_API_Key
    
    BACKBLAZE_ACCOUNT_ID=your_Backblaze_account_id
    BACKBLAZE_APPLICATION_KEY=your_Backblaze_app_key
    BACKBLAZE_BUCKET_ID=your_Backblaze_bucket_id
    BACKBLAZE_BUCKET_NAME=your_Backblaze_bucket_name

3. Install all the dependencies
    ```bash
    npm i
    
4. Run the server
    ```bash
    node server.js

5. Use the web app by searching on the browser:
   ```bash
   localhost:3000



# Folder Structure

- .env
- .gitignore
- app.js
- databaseConnection.js
- gpt.js
- package-lock.json
- package.json
- Procfile
- prompts.js
- README.md
- server.js
- Tree.txt
- utils.js
- verifyGame.js
- models/
    - user.js
- public/
    - datasets/
        - games_list.csv
    - mediaResources/
        - beast.jpg
        - cheer.jpg
        - city.jpg
        - favicon.ico
        - ghost.png
        - ghosts.gif
        - guild.jpg
        - initial.png
        - loading.svg
        - logo.png
        - logo4.png
        - pacman.gif
        - pacman_music.mp3
        - searchglass.png
        - user.png
        - video.mp4
    - scripts/
        - gameSearchbar.js
        - loader.js
        - pacman.js
        - profileSwapper.js
        - scrapeImages.js
    - styles/
        - 404.css
        - community.css
        - favourites.css
        - finalRecommend.css
        - foot.css
        - gameSearchbar.css
        - index.css
        - initialRecommend.css
        - login.css
        - loginSubmit.css
        - nav.css
        - profile.css
        - promptScreen.css
        - recommender.css
        - signup.css
        - signupSubmit.css
        - wishlist.css
- uploads/
    - text.txt
- views/
    - 404.ejs
    - changePassword.ejs
    - community.ejs
    - favourites.ejs
    - finalRecommend.ejs
    - forgotPassword.ejs
    - index.ejs
    - initialRecommend.ejs
    - login.ejs
    - loginSubmit.ejs
    - profile.ejs
    - promptScreen.ejs
    - recommender.ejs
    - securityQuestion.ejs
    - signup.ejs
    - signupSubmit.ejs
    - updatePassword.ejs
    - user.ejs
    - wishlist.ejs
    - templates/
        - foot.ejs
        - gameSearchbar.ejs
        - head.ejs
        - nav.ejs
        - profile_picture.ejs

            

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
