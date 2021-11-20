//imports
const Discord = require("discord.js")
require('dotenv').config();
const client = new Discord.Client()
const { MusicBot } = require('discord-music-system');
const ytdl = require('ytdl-core-discord');
const channelIDs = ["740859647287885875", "544432533090205697"];
//globals
var currentTime;
var ursusTime = false;

//music bot information
client.musicBot = new MusicBot(client, {
    ytApiKey: "AIzaSyC999TNfjGm_PNaAylM6CUoXHdqus_xTRk",
    prefix: '!', // Your bot prefix
    language: 'en' // fr, en, es, pt
});

client.login(process.env.TOKEN)
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function getDateTime() {
    var updatedTime = new Date();
    var hour = updatedTime.getHours();
    var minute = updatedTime.getMinutes();
    currentTime = `${hour}:${minute}`;
}

function checkUrsusTime(msg) {
    getDateTime();
    var currentHour = currentTime.split(':')[0];
    currentHour = parseInt(currentHour);
    console.log(currentHour);
    if ((currentHour >= 6) && (currentHour < 10)) {
        msg.channel.send("Its ursus time");
        ursusTime = true;
        console.log("Its ursus time")
    }
    else if ((currentHour >= 13) && (currentHour < 17)) {
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

function playTunak(msg, force) {
    const channel = client.channels.cache.get(channelIDs[0])
    if (!channel) return console.error("The channel does not exist!");
    channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");

        const url = "https://www.youtube.com/watch?v=vTIIMJ9tUc8&ab_channel=SonyMusicIndiaVEVO";
        if ((ursusTime === true) && (!force)) {
            msg.reply("Ursus invites you to Tunak tunak");
            playSong();
        }
        else if (force) {
            playSong();
        }
        else {
            msg.reply("It is not Ursus-Tunak time");
        }
        async function playSong() {
            const dispatcher = connection.play(await ytdl(url), { type: 'opus' });
            dispatcher.on('finish', () => {
                console.log(`It is ${ursusTime ? "ursus time" : "not ursus time"}`)
                if (ursusTime) {
                    playSong();
                }
                else {
                    dispatcher.setVoiceChannel(null);
                }

            });
        }

    }).catch(e => {
        // Oh no, it errored!
        console.error(e);
    });
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
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
    }
    else if (msg.content === "!ursus") {
        checkUrsusTime(msg);
        console.log(`current time ${currentTime}`);
    }
    else if (msg.content === "!tunak") {
        checkUrsusTime(msg);
        if (ursusTime) playTunak(msg, false);
    }
    else if (msg.content === "!tunakAnyways") {
        msg.reply("Ursus FORCES you to Tunak tunak");
        playTunak(msg, true);
    }

})

getDateTime()