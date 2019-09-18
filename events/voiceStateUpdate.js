module.exports = (to, from) => {
  if (to.guild && to.guild.voiceConnection)
    to.guild.voiceConnection.disconnect();
}
