const moment = require('moment');
const youTube = new (require('youtube-node'))();
const Discord = require('discord.js');
const request = require('request');
const conf = require('../config.json');
youTube.setKey(conf.api.youtube);

module.exports.config = {
    name: "play",
    description: "Plays music",
    usage: "{youtubeLink}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "music"
}

module.exports.run = (client, message, args) => {
  let connection = message.guild.voiceConnection;
  if (!message.member.voice.channel) {
    client.warn('You need to be in a voice channel for music commands.', message);
    return;
  }

  if(!client.json[message.guild.id].options.queue) {
    client.json[message.guild.id].options.queue = [];
  }
  youTube.search(args.join(" "), 1, { type: 'video' }, function(error, result) {
    if(!result.items[0]) {
      client.warn("No video found.", message);
      return;
    }
    let id = result.items[0].id.videoId;
    let link = "https://www.youtube.com/watch?v=" + id;
    request(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${id}&key=${conf.api.youtube}`, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
      var x = moment.duration(body.items[0].contentDetails.duration, moment.ISO_8601);
      if(x.hours() > 3) {
        client.warn("Videos over 3 hours are forbidden.", message);
      }
      let item = {
        "title": require('html-entities').AllHtmlEntities.decode(result.items[0].snippet.title),
        "link": link,
        "requester": message.author,
        "thumbnail": result.items[0].snippet.thumbnails.default.url,
        "duration": x,
        "durationSplit": [x.hours(), x.minutes(), x.seconds()],
        "durationHuman": (x.hours() < 1) ? `${x.minutes()}:${x.seconds()}` : `${x.hours(), x.minutes(), x.seconds()}`
      };

      var embed = new Discord.MessageEmbed()
          .setColor(Math.floor(Math.random() * (16777216 + 1)))
          .setFooter(`Item added to queue`)
          .addField(item.title, `Requested by ${item.requester.username}, ${item.durationHuman}`)
          .setThumbnail(item.thumbnail)
          .setURL(item.link);

      message.channel.send(embed);
      if (client.json[message.guild.id].options.queue.length > 0) {
        client.json[message.guild.id].options.queue.push(item)
        return;
      }

      client.json[message.guild.id].options.queue.push(item)
      client.emit("donePlaying", message);
    });
  });
}
