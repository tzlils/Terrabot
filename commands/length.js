const Discord = require('discord.js');
const moment = require('moment');
const ProgressBar = require('progress');

module.exports.config = {
    name: "length",
    description: "Length of current song",
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
    client.warn("I'm not playing anything.", message);
    return;
  }

  var time = queue[0].durationHuman;

  let timeSpent = moment.duration(connection.dispatcher.streamTime);
  var timeDone = `${timeSpent.minutes()}:${timeSpent.seconds()}`;
  if(timeSpent.hours() > 0) {
    timeDone = `${timeSpent.hours()}:${timeSpent.minutes()}:${timeSpent.seconds()}`;
  }

  var bar = new ProgressBar(`:bar ${timeDone}/${time}`, {
     complete: '▆',
     incomplete: '▁',
     width: 25,
     total: queue[0].duration._milliseconds,
     curr: connection.dispatcher.streamTime
    });
  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .addField(queue[0].title, bar.lastDraw)
      .setThumbnail(queue[0].thumbnail)
      .setURL(queue[0].link);
  message.channel.send(embed);
}
