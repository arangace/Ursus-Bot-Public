const Discord = require("discord.js")
const client = new Discord.Client()
const { MusicBot } = require('discord-music-system');
const ytdl = require('ytdl-core-discord');
require('dotenv').config();

//globals
const channelIDs = ["740859647287885875", "544432533090205697"];
var currentTime;
var ursusTime = false;
const url = [
    "https://www.youtube.com/watch?v=i3pfsCS7fWI&ab_channel=TaKeRu9Z",
    "https://www.youtube.com/watch?v=vTIIMJ9tUc8&ab_channel=SonyMusicIndiaVEVO"
]

//Setting music bot information
client.musicBot = new MusicBot(client, {
    ytApiKey: process.env.YTKEY,
    prefix: '!', //Command for bot prefix
    language: 'en'
});
client.login(process.env.TOKEN)

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getDateTime() {
    //Gets the current time and seperates the hours and minutes
    let updatedTime = new Date();
    let hour = updatedTime.getHours();
    let minute = updatedTime.getMinutes();
    currentTime = `${hour}:${minute}`;
}

function checkUrsusTime(msg) {
    //Checks if the current time is within the event time period, if so it will reply it is ursus time
    getDateTime();
    let currentHour = parseInt(currentTime.split(':')[0]);
    console.log(`Current time is: ${currentHour}`);
    //UTC time for better readability
    if (((currentHour >= 1) && (currentHour < 3)) || ((currentHour >= 18) && (currentHour < 20))) {
        msg.channel.send("Its ursus time");
        ursusTime = true;
        console.log("Its ursus time")
    }
    else {
        msg.channel.send("Not ursus time");
        ursusTime = false;
        console.log("Not ursus time");
    }
}

function playSong(msg, force) {
    //Plays music based on whether or not it is the event time or if the user forces the bot to play music
    const channel = client.channels.cache.get(channelIDs[0])
    if (!channel) return console.error("The channel does not exist!");

    channel.join().then(connection => {
        console.log("Successfully connected to channel..");
        if ((ursusTime === true) && (!force)) {
            msg.reply("Ursus invites you to singalong");
            playSong();
        }
        else if (force) {
            msg.reply("Ursus FORCES you to singalong");
            playSong();
        }
        else {
            msg.reply("It is not Ursus-singing time");
        }

        async function playSong() {
            console.log("Playing music..");
            let randomNumber = Math.round(Math.random());
            const dispatcher = connection.play(await ytdl(url[randomNumber]), { type: 'opus' });
            dispatcher.on('finish', () => {
                // dispatcher.setVoiceChannel(null);
                setTimeout(() => {
                    console.log("Leaving channel..");
                    channel.leave();
                }, 5000);

                // console.log(`It is ${ursusTime ? "ursus time" : "not ursus time"}`)
                // if (ursusTime) {
                //     playSong();
                // }
                // else {
                //     dispatcher.setVoiceChannel(null);
                // }

            });
        }
    }).catch(e => {
        console.error(e);
    });
}

client.on("ready", () => {
    getDateTime()
    console.log(`Logged in as ${client.user.tag}..`)
    readline.close();
})

client.on("message", msg => {
    if (msg.author.bot) {
        return;
    };
    client.musicBot.onMessage(msg);
    //find the command within the defined commands
    if (msg.content === `!help`) {
        //send back all the commands
        msg.reply('Current commands are !ursus, !song, !ursusSing');
    }
    else {

        if (msg.content === "!ursus") {
            checkUrsusTime(msg);
            console.log(`current time ${currentTime}`);
        }
        else if ((msg.content === "!song")) {
            checkUrsusTime(msg);
            ursusTime ? playSong(msg, false) : msg.reply("Cannot play music when it is not Ursus Time")

        }
        else if (msg.content === "!ursusSing") {
            playSong(msg, true);
        }
    }
})
