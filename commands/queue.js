const Discord = require('discord.js');

module.exports.config = {
    name: "queue",
    description: "Shows current music queue",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    category: "music"
}

module.exports.run = (client, message, args) => {

  let queue = client.json[message.guild.id].options.queue;
  let connection = message.guild.voiceConnection;
  if(!connection) {
    message.channel.send("I'm not playing anything!");
    return;
  }


  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setTitle(`Queue for ${message.guild.name}`);

  if(queue.length < 1) {
    embed.addField("Empty", "This server's queue is empty");
    return;
  } else {
    embed.addField("Now playing:", `\`1.\` [${reverseRTL(queue[0].title)}](${queue[0].link}) | ${queue[0].durationHuman} Requested by ${queue[0].requester.username}`);
    let q = "";
    for (var i = 1; i < queue.length; i++) {
      q += `\`${i+1}.\` ${reverseRTL(queue[i].title)} | ${queue[i].durationHuman} Requested by ${queue[i].requester.username} \n`;
    } if(q != "") { embed.addField("Up next: ", q); }
  }

  message.channel.send(embed);

  function reverseRTL(text) {
  	let excluded = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz./:-0123456789"
  	let reverseArea = "";
  	let straightBuffer = "";
    let output = "";
  	for (i = 0 ; i < text.length ; i++) {
  		if ("\n\r".indexOf(text.charAt(i)) >= 0) {
  			if (straightBuffer != "") {
  				output = straightBuffer + output;
  				straightBuffer = "";
  			}
  			output = output + text.charAt(i);
  		} else {
  			if (excluded.indexOf(text.charAt(i)) >= 0) {
  				straightBuffer=straightBuffer + text.charAt(i);
  			} else {
  				if (straightBuffer != "") {
  					output=straightBuffer + output;
  					straightBuffer="";
  				}
  				output=text.charAt(i) + output;
  			}
  		}
  		if (text.charAt(i) == "\r") {
  			reverseArea = reverseArea + output;
  			output = "";
  		}
  	}
  	if (straightBuffer != "") {
  		output = straightBuffer + output;
  		straightBuffer="";
  	}
  	reverseArea=reverseArea + output;
  	return reverseArea;
  }
}
