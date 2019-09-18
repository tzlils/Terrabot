const MongoClient  = require('mongodb').MongoClient;
const config = require('../config.json');

module.exports = async (client) => {
  console.log(`Bots is ready and working in ${client.guilds.size} servers with ${client.users.size} users!`);
  client.user.setActivity(`${config.prefix}help | Maintained by Terradice`);

  if(client.user.voiceChannel) {
    client.user.voiceChannel.disconnect();
  }

  const uri = `mongodb+srv://admin:${config.api.mongodb}@cluster0-lyrnq.mongodb.net/test?retryWrites=true`;
  const mongoclient = new MongoClient(uri, { useNewUrlParser: true });
  client.loadFile();

  
/*
  mongoclient.connect((err, db) => {
    var dbo = db.db("servers");
    dbo.collection("servers").find("{}").toArray(async function(err, result) {
      if(result.length < 1) {
        client.loadFile();
        return;
      }
      if(client.guilds.array().length < result.length) {
        console.log("New server detected");
        client.loadFile();
        return;
      }
      for (var i = 0; i < result.length; i++) {
        client.json[result[i].id] = {
          "id": result[i].id,
          "options": result[i].options
        }
      }
    });
  })
*/
}
