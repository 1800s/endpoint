const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

// Set up a MongoDB client and connect to the database
const client = new MongoClient('mongodb+srv://est:yLvwzxRC1J3ozhJo@cluster0.rmvzzax.mongodb.net/?retryWrites=true&w=majority');
client.connect();

// Define the /key/:key endpoint
app.get('/key/:key', async (req, res) => {
  const key = req.params.key;
  const db = client.db('mydb');
  const keys = db.collection('keys');
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
