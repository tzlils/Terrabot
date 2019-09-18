const MongoClient  = require('mongodb').MongoClient;
const config = require('../config.json');

module.exports = (client, serverid, server) => {
  const uri = `mongodb+srv://admin:${config.api.mongodb}@cluster0-lyrnq.mongodb.net/test?retryWrites=true`;
  const mongoclient = new MongoClient(uri, { useNewUrlParser: true });
  return;
  mongoclient.connect((err, db) => {
    var dbo = db.db("servers");
    let query = { id: serverid}
    let x = server;
    delete x.options.queue;
    dbo.collection("servers").find(query).toArray(async function(err, result) {
      let newvalues = { $set: {options: x.options}}
      if(result.length > 0 ) {
        await dbo.collection("servers").updateOne(query, newvalues);
      } else {
        await dbo.collection("servers").insertOne(server);
      }
      mongoclient.close();
    })
  });
}
