module.exports.config = {
    name: "skip",
    description: "Skips current song",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    djRequired: true,
    argsMinimum: 0,
    category: "music"
}

module.exports.run = (client, message, args) => {
  let queue = client.json[message.guild.id].options.queue;
  let connection = message.guild.voiceConnection;
  if (!message.member.voice.channel) {
    client.warn('You need to be in a voice channel for music commands.', message);
    return;
  }

  if(message.member.voice.channel != connection.channel) {
    client.warn("You're not in the same channel as me.", message)
    return;
  }

  if(!connection) {
    client.warn("I'm not playing anything.", message);
    return;
  }

  connection.dispatcher.end();
}
