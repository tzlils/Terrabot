module.exports = (client, member) => {
  let options = client.json[member.guild.id].options;
  if(options.welcomeChannel && options.welcomeChannel != "null") {
    member.guild.channels.get(options.welcomeChannel).send(`${member.user.username} has joined!`)
  }
}
