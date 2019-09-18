module.exports.config = {
    name: "options",
    description: "Changes server options \n To clear an option, use ?options {option} null \n `welcome`: sets welcome channel \n `admin` sets admin role for admin only commands",
    usage: "*{option}, *{value}",
    ownerOnly: true,
    adminOnly: false,
    argsMinimum: 0,
    category: "moderation"
}

module.exports.run = (client, message, args) => {
  let options = client.json[message.guild.id].options;
  if(args.length < 1) {
    message.channel.send(JSON.stringify(options, null, 4), { code: "json"});
    return
  }
  if(args[0] == "welcome") {
    options.welcomeChannel = args[1].replace('<', '').replace('>', '').replace('#', '');
    message.channel.send("Updated welcome channel");
    client.emit("updateDB", message.guild.id, client.json[message.guild.id])
  }

  if(args[0] == "admin") {
    options.adminRole = args[1].replace('<', '').replace('>', '').replace('@', '').replace('&', '');
    message.channel.send("Updated admin role");
    client.emit("updateDB", message.guild.id, client.json[message.guild.id])
  }
}
