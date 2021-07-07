const Discord = require("discord.js")
require('dotenv').config();
const client = new Discord.Client()
const eventPeriod = false;
const invalidInput = true;
var currentTime;
var ursusTime = false;

const { dispatcher } = require('discord.js');
const { MusicBot } = require('discord-music-system'); // Require the best package ever created on NPM (= require discord-music-system)
const ytdl = require('ytdl-core-discord');
const channelIDs = ["693008958033494020", "544432533090205697"];

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

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    readline.close();
})

client.on("message", msg => {
    if (msg.author.bot) {
        return;
    };
    client.musicBot.onMessage(msg);
    if (msg.content === "!ping") {
        msg.reply("Davids gay");
    }
    if (msg.content === "!tunak") {
        checkUrsusTime(msg);
        const channel = client.channels.cache.get(channelIDs[0])
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");

            // playTunak = new MusicBot();
            const url = "https://www.youtube.com/watch?v=vTIIMJ9tUc8&ab_channel=SonyMusicIndiaVEVO";
            if (ursusTime === true) {
                msg.reply("Ursus invites you to Tunak tunak");
                playSong();
            }
            else {
                msg.reply("It is not Ursus-Tunak time");
            }
            async function playSong() {
                const dispatcher = connection.play(await ytdl(url), { type: 'opus' });
                dispatcher.on('finish', () => {
                    if (ursusTime) {
                        console.log(`It is ${ursusTime ? "ursus time" : "not ursus time"}`)
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
    if (msg.content === "!ursus") {
        console.log(`current time ${currentTime}`);
        getDateTime();
        checkUrsusTime(msg);
        //checkRemainingUrsus();
    }
})

getDateTime()