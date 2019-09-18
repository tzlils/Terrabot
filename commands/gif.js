const Discord = require("discord.js");
const request = require('request');
const config = require('../config.json');

module.exports.config = {
    name: "gif",
    description: "Returns a gif from giphy",
    usage: "{search}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "misc"
}

module.exports.run = (client, message, args) => {
  let url = `http://api.giphy.com/v1/gifs/search?q=${args.join('+')}&api_key=${config.api.giphy}&limit=1`
  request(url, (err, res, body) => {
    body = JSON.parse(body);
    let result = body.data[Math.floor(Math.random()*body.data.length)];
    var embed = new Discord.MessageEmbed()
      .setColor(Math.floor(Math.random() * (16777216 + 1)))
      .setFooter(`Random gif from Giphy`)
      .setURL(result.url)
      .setTitle(result.title)
      .setImage(result.images.fixed_height.url);
    message.channel.send({embed});
  })
}
