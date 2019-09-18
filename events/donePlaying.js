const ytdl = require('ytdl-core');
const streamOptions = { seek: 0, volume: 1 };

module.exports = (client, message) => {
  let queue = client.json[message.guild.id].options.queue;
  let connection = message.guild.voiceConnection;
  if(queue.length > 0) {
    if(!connection) {
      connection = message.member.voice.channel.join().then(connection => {
        client.emit("donePlaying", message);
      });
    } else {
      const stream = ytdl(queue[0].link, { filter: 'audioonly' });
      const dispatcher = connection.play(stream, streamOptions);
      //message.channel.send(`Now playing: ${queue[0].title}`);

      dispatcher.on('end', () => {
        queue.shift();
        client.emit("donePlaying", message);
      });
    }
  } else {
    message.channel.send("Queue over!");
    connection.disconnect();
  }
}
