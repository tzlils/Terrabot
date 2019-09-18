module.exports.config = {
    name: "pause",
    description: "Pauses music.",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    voiceRequired: true,
    category: "music"
}

module.exports.run = (client, message, args) => {
  message.guild.voiceConnection.dispatcher.pause();
  message.channel.send("Song paused!");
}
