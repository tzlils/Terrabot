const Config = require("../config.json");
const Discord = require("discord.js");

module.exports = (client, message) => {
	let messageArray = message.content.split(" ");
    let command = messageArray[0];

    if (command.startsWith(Config.prefix)) {
			if (!message.guild) return;
      let args = messageArray.slice(1);
      let commandHandler = client.commands.get(command.toLowerCase().slice(Config.prefix.length));
			let options = client.json[message.guild.id].options;

      if (commandHandler) {
				let isOwner = message.author.id == message.guild.ownerID;
				let isAdmin = message.member.roles.some(role => role.id === options["adminRole"]) || message.member.hasPermission("ADMINISTRATOR") || isOwner;
				let isDebug = message.author.id == Config.ownerID;
				let isDJ;
				if(message.guild.voiceConnection) {
					let listeners = message.guild.voiceConnection.channel.members.array().length;
					isDJ = listeners <= 2 || isAdmin || hasRole(message.member, "DJ");
				} else {
					isDJ = hasRole(message.member, "DJ") || isAdmin;
				}

          if (commandHandler.config.ownerOnly && !isOwner) {
              client.warn("Only the server owner can do that.", message);
              return;
          }

					if (commandHandler.config.debug && !isDebug) {
							client.warn("This is a debug command, only the owner of this bot can use this.", message);
							return;
					}

					if (commandHandler.config.adminOnly && !isAdmin && !isOwner) {
							client.warn("Only an admin can do that.", message);
							return;
					}

          if (args.length < commandHandler.config.argsMinimum && commandHandler.config.argsMinimum > 0) {
              client.warn(`${commandHandler.config.name} requires a minimum of ${commandHandler.config.argsMinimum.toString()} arguments.`, message);
              return;
          }

					if(commandHandler.config.requireImage) {
						if(message.attachments.array()[0] == undefined) {
							client.warn("You need to include an image.", message)
							return;
						} else if(!Config.imageFormats.includes(message.attachments.array()[0].name.split('.')[1])) {
							client.warn("You need to include an image.", message)
							return;
						}
					}

					if(commandHandler.config.voiceRequired) {
						if (!message.member.voice.channel) {
							client.warn('You need to be in a voice channel for music commands.', message);
							return;
						}

						if(message.member.voice.channel != message.guild.voiceConnection.channel) {
							client.warn("You're not in the same channel as me.", message)
							return;
						}
					}

					if(commandHandler.config.djRequired && !isDJ) {
						client.warn("This command requires DJ.", message)
						return;
					}

					try {
          	commandHandler.run(client, message, args);
					} catch(e) {
						let stack = require('stack-trace').parse(e)[0];
						var embed = new Discord.MessageEmbed()
								.setColor(Math.floor(Math.random() * (16777216 + 1)))
								.setTitle("Oh no! The bot encountered an unhandled error!")
								.addField('Error message:', e , true)
								.addField('Stacktrace:', `${stack.getFileName().split('\\')[stack.getFileName().split('\\').length-1]}:${stack.getLineNumber()}`, true)
								.setFooter("Please report this to Terradice#7561");
						message.channel.send({embed});
					}
      }
  }
}


function hasRole(member, name) {
	return member.roles.some(role => role.name === name);
}
