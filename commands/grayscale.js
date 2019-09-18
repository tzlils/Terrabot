const jimp = require('jimp');
const Discord = require("discord.js");

module.exports.config = {
    name: "grayscale",
    description: "Convers an image to grayscale",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    requireImage: true,
    category: "image"
}

module.exports.run = (client, message, args) => {
  let image = message.attachments.array()[0];
  jimp.read(image.url, (err, img) => {
  if (err) throw err;
  img.grayscale().getBuffer("image/jpeg",(err, buff) => {
    message.channel.send({
      files: [{ attachment: buff, name: 'image.jpeg' }]
    });
  })
});
}
