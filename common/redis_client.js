var redis = require('redis');
client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});
module.exports = client;