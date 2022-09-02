# IFFCO-MC
Codebase for Supply Chain Prototype

###################### Demo ############################

Hosted app : [agrosupply.herokuapp.com](https://agrosupply.herokuapp.com/)

###################### Installation ####################
1. Node Js (to run javscript outside browser) from official website | Verify by typing "**node**" in terminal >> Node REPL Terminal opens up
2. Any Code Editor (VS Code)
3. ngrok (for tunneling local application to twilio webhooks)

###################### Install Dependencies ############
1. Create ngrok account and get unique *auth_token* to run ngrok server
2. Create twilio account & get unique **TWILIO_ACCOUNT_SID** & **TWILIO_AUTH_TOKEN** & set webhook server endpoint inside twilio console
3. Create Mongo Atlas Account, get **DB_URL**
4. Create Cloudinary Account, get **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_KEY**, **CLOUDINARY_SECRET**
5. Save all of the above bold variables as path variable in .env file inside app directory
6. Navigate to directory where ngrok is downloaded & unzip to get ngrok.exe


```
./ngrok config add-unique-ngrok-authtoken
./ngrok http 8080
```

Navigate into app directory 
```
npm install
nodemon index.js
```
