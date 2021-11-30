# Ursus-Bot-Public

A discord bot for supplying timing information for the Ursus event in MapleStory. This time is fixed and does not change with events as there is no MapleStory Dev API which can provide this information. 
The time will always be event time. 

This application is developed using Node.JS, Nodemon, Discord.Js, YTDL and deployed on Heroku 24/7.

This repo is a copy of the private repo but without private sensitive information, which is stored on a local .env and on heroku for deploymnent.

NOTE: 
-As this bot is developed using an older version of Discord.JS, without the use of Guilds, bot is reployed to a fixed channel based on channel ID.
-Heroku web cannot be opened as this is a bot and therefore, utilises workers instead

DEV NOTES:
-To run dev mode run npm run dev
-To run for deployment run npm start
