const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const config = require('./config.json');
client.json = {};

const prefix = config.prefix;

loadCommands();
loadEvents();

client.warn = function (warning, msg) {
  msg.channel.send(`:no_entry_sign: **${warning}**`);
}

function loadFile() {
  let servers = client.guilds.array();
  for (var i = 0; i < servers.length; i++) {
    let server = servers[i];

    client.json[server.id] = {
      "id": server.id,
      "options": {}
    }
    client.emit("updateDB", server.id, client.json[server.id]);

  }
}

client.loadFile = function () {
	loadFile();
}

client.loadCommands = function () {
	loadCommands();
}

client.loadEvents = function () {
	loadEvents();
}

function loadCommands() {
	client.commands = new Discord.Collection();
	fs.readdir("./commands", (error, files) => {
        if (error) return console.error(error); //If there was an error, log it.

        files.forEach((f, i) => {
			try {

				if (!f.toLowerCase().ends)
				var command = loadCommands0(f);

				client.commands.set(command.config.name, command);
				console.log(`Loaded command from ${f}!`);
			} catch (error) {
				console.log(error);
			}
        });
    });


	function loadCommands0(f) {
		return require(`./commands/${f}`);
	}
}

function loadEvents() {
    client.removeAllListeners();
    fs.readdir("./events", (error, files) => {
        if (error) return console.error(error); //If there was an error, log it.

        files.forEach(f => {
            if (!f.toLowerCase().endsWith(".js")) return;

            const event = require(`./events/${f}`); //Get the event.

            client.on(f.split(".")[0], event.bind(null, client)); //Register the event.
            delete require.cache[require.resolve(`./events/${f}`)]; //Delete the event from cache.

            console.log(`Loaded event from ${f}!`);
        })
    });
}

client.login(config.api.discord);
