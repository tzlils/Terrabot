const Discord = require('discord.js');
const request = require('request');

module.exports.config = {
    name: "reddit",
    description: "Shows top post from subreddit",
    usage: "{subreddit}",
    ownerOnly: false,
    adminOnly: false,
    argsMinimum: 1,
    category: "misc"
}

module.exports.run = (client, message, args) => {
  let subreddit = args[0];
  var opts = {
    uri : "http://reddit.com/r/" + subreddit + "/.json",
  };

  request(opts, (err, res, body) => {
    if (res.statusCode === 200) {
      var reddit  = JSON.parse(body),
        stories = reddit.data.children.map(function (s) { return s.data; });

      let story = stories[Math.floor(Math.random()*stories.length)];
      var embed = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * (16777216 + 1)))
        .setFooter(`Top post from ${subreddit}`)
        .setURL(story.url)
        .addField('Score', story.score, true)
        .setTitle(story.title.length > 100
              ? story.title.substr(0, 100) + "..."
              : story.title);
      if(story.thumbnail) {
        embed.setImage(story.url);
      }
      message.channel.send({embed});
  }})

}
