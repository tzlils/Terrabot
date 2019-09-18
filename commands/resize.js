const jimp = require('jimp');
const Discord = require("discord.js");

module.exports.config = {
    name: "resize",
    description: "Resizes an image.",
    usage: "{width}, {height}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 2,
    requireImage: true,
    category: "image"
}

module.exports.run = (client, message, args) => {
  let image = message.attachments.array()[0];
  if(args[0] < 30 && args[1] < 30) {
    client.warn("Width or Height cannot be less than 30 pixels.", message);
    return;
  }
  jimp.read(image.url, (err, img) => {
  if (err) throw err;
    img.resize(+args[0], +args[1]).getBuffer( "image/jpeg",(err, buff) => {
      message.channel.send({
        files: [{ attachment: buff, name: 'image.jpeg' }]
      });
    })
  });
}
