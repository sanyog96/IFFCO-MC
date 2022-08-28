# IFFCO-MC
Codebase for Supply Chain Prototype

###################### Installation ####################
1. Node Js (to run javscript ourside browser) from official website | Verify by typing "**node**" in terminal >> Node REPL Terminal opens up
2. Any Code Editor (VS Code)
3. ngrok (for tunneling local application to twilio webhooks)

###################### Install Dependencies ############
1. Create ngrok account and get unique **auth_token**
2. Create twilio account & get unique **account_ssid** & **auth_token** and save them as path variable (in .env file)
3. Navigate to directory where ngrok is downloaded & unzip to get ngrok.exe
>> **./ngrok config add-unique-ngrok-authtoken**

>> **./ngrok http 8080**

4. Navigate into app directory 
>> **npm install**

>> **nodemon index.js**
