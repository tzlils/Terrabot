const Discord = require("discord.js");

module.exports.config = {
    name: "uptime",
    description: "Shows the total uptime of the bot.",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    category: "utility"
}

module.exports.run = (client, message, args) => {
  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setTitle("Uptime");

  let totalSeconds = (client.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.round(totalSeconds % 60);
  embed.addField("Days", days, true).addField("Hours", hours, true)
  .addField("Minutes", minutes, true).addField("Seconds", seconds, true);
  message.channel.send({embed});
}
