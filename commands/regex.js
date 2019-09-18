const Discord = require("discord.js");

module.exports.config = {
    name: "regex",
    description: "Matches a RegEx pattern.",
    usage: "{pattern}, | {custom string}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "misc"
}

module.exports.run = (client, message, args) => {
  let string = args.join(' ').split('|')[1] || "the quick brown fox jumped over the lazy dog";
  let res = match(args.join(' ').split('|')[0], string);
  var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setTitle("RegEx")
      .addField('Result', res, true);
  message.channel.send({embed});
}

function match(pattern, string) {
  try {
    return string.replace(RegExp(pattern, 'g'), "[$&]");
  } catch(e) {
    return "Invalid Regex";
  }
}
