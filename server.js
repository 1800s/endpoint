const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// Set up a MongoDB client and connect to the database
const client = new MongoClient('<mongo_uri>');
client.connect();

// Define the /key/:key endpoint
app.get('/key/:key', async (req, res) => {
  const key = req.params.key;
  const db = client.db('<database_name>');
  const keys = db.collection('<collection_name>');
  const keyExists = await keys.findOne({ key: key });

  if (keyExists) {
    res.send(`${key} exists in the database.`);
  } else {
    res.send(`${key} does not exist in the database.`);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
