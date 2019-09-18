module.exports.config = {
    name: "stop",
    description: "Stops music",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    voiceRequired: true,
    djRequired: true,
    argsMinimum: 0,
    category: "music"
}

module.exports.run = (client, message, args) => {
  let connection = message.guild.voiceConnection;

  if(!connection) {
    client.warn("I'm not playing anything.", message);
    return;
  }


  client.json[message.guild.id].options.queue = [];
  client.emit("donePlaying", message);
}
