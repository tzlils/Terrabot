var text2png = require('text2png');

module.exports.config = {
    name: "galactic",
    description: "Translates text to Standard Galactic Alphabet.",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "text"
}

module.exports.run = (client, message, args) => {
  let txt = args.join(' ');
  let out = text2png(txt, {
    font: '30px SGA',
    lineSpacing: 10,
    localFontPath: 'assets/standard-galactic-alphabet.ttf',
    localFontName: 'SGA'
  });

  message.channel.send({
    files: [{ attachment: out, name: 'image.png' }]
  });
}
