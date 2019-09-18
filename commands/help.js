const Discord = require("discord.js");
const config = require('../config.json');

module.exports.config = {
    name: "help",
    description: "Shows a help menu.",
    usage: "",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 0,
    category: "utility"
}

module.exports.run = (client, message, args) => {
    var embed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * (16777216 + 1)));

    var description = "";
    let categories = {};
    let isSpecific = false;
    let specificCommand;
      client.commands.forEach(command => {
          if (command.config.debug || command.config.name === "" || !command.config.name) return;
          if(args[0]) {
            if(args[0] == command.config.name) {
              description = command.config.description;
              embed.setTitle(command.config.name.toUpperCase());
              isSpecific = true;
              specificCommand = command;
            }
          } else {
            if(!categories[command.config.category]) {
              categories[command.config.category] = [];
            }
            categories[command.config.category].push(command.config.name)
            embed.setTitle("Help");
          }
      });

      Object.keys(categories).forEach(function(element, key, _array) {
        embed.addField(element, categories[element].join(", "))
      })
      embed.setDescription(description);

      if(isSpecific) {
        embed.addField("usage", `${config.prefix}${specificCommand.config.name} ${specificCommand.config.usage}`, true);
      } else {
        embed.addField("Additional help", `Use ${config.prefix}help {COMMAND} for additional help`)
      }

    message.channel.send({embed});
}
