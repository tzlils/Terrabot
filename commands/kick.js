const Discord = require('discord.js');
const moment = require('moment');

module.exports.config = {
    name: "kick",
    description: "Kicks a user.",
    usage: "{user}, *{reason}",
    ownerOnly: false,
    adminOnly: true,
    argsMinimum: 1,
    category: "moderation"
}

module.exports.run = (client, message, args) => {
  let caller = message.member;
  let member = message.mentions.members.first();
  args.shift();
  let reason = args.join(' ');
  if (!member) {
    client.warn('Please mention a valid member of this server', message);
    return;
  }
  if (!member.kickable) {
    client.warn('I cannot kick this user', message);
  }

  if(reason == "") {
    reason = "No reason provided";
  }
  member.send(`You have been kicked from ${message.guild.name} by <@${message.author.id}> for reason: ${reason}`).then(kick => {
    member.kick(reason);
  });

  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setFooter(moment().format('MMMM Do YYYY, h:mm:ss a'))
      .addField('Kicked by:', `${message.author.tag}`, true)
      .addField('Kicked:', `${member.user.tag}`, true)
      .addField('Reason', `${reason}`);
  message.channel.send({embed});
}
