const Discord = require('discord.js');
const dayjs = require('dayjs');
require('dotenv').config();

const client = new Discord.Client();

client.on('message', (receivedMessage) => {
	if (receivedMessage.content.startsWith("!")) {
		processCommand(receivedMessage)
	}
})

function processCommand(receivedMessage) {
	let message = receivedMessage.content;
	let today = new Date();
	let hour = today.getHours();
	let minute = today.getMinutes();
	
	let beginHour1 = 6;
	let beginHour2 = 13;
	let finHour1 = 10;
	let finHour2 = 17
	let mins = 60;
	
	
	if (message == "!help") {
		receivedMessage.channel.send("Type !isit to check current ursus status \nType !when to check the double times");
	}
	
	else if (message == "!isit"){
		if ((hour >= beginHour1 && hour < finHour1) || (hour >= beginHour2 && hour < finHour2)) {
			if (hour < finHour1) {
				remainHour = finHour1 - hour;
			}else{
				remainHour = finHour2 - hour;
			}
			remainMin = mins - minute;
			if (remainMin == 60){
				remainMin = 0;
			}else{
				remainHour = remainHour - 1;
			}
			
			receivedMessage.channel.send("Yes, ursus double time is ending in " + remainHour + " hours and " + remainMin + " minutes");
			
		}else{
			
			if (hour >= finHour1 && hour < beginHour2){
				nextHour = beginHour2 - hour;
			}else{
				nextHour = beginHour1 + 24 - hour;
			}
			nextMin = mins - minute;
			if (nextHour > 24) {
				nextHour = nextHour - 24;
			}
			if (nextMin == 60) {
				nextMin = 0;
			}else{	
				nextHour = nextHour - 1;
			}
			
			receivedMessage.channel.send("No, next ursus double time starts after " + nextHour + " hours and " + nextMin +" minutes");
		}
	}
	
	else if (message == "!when"){
		receivedMessage.channel.send("```Ursus double time(NZST): \n 06:00 - 10:00 \n 13:00 = 17:00```")				
	}
}

client.login(process.env.BOT_TOKEN);