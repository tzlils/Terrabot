module.exports.config = {
    name: "resume",
    description: "Resumes music.",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    voiceRequired: true,
    category: "music"
}

module.exports.run = (client, message, args) => {
  message.guild.voiceConnection.dispatcher.resume();
  message.channel.send("Song resumed!");
}
