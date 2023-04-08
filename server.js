const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// Set up a MongoDB client and connect to the database
const client = new MongoClient(process.env.MONGO_URI);
client.connect();

// Serve static files from the 'public' directory
app.use(express.static('public', { index: 'index.html' }));

// Define the /key/:key endpoint
app.get('/key/:key', async (req, res) => {
  const key = req.params.key;
  const db = client.db(process.env.MONGO_DB_NAME);
  const keys = db.collection('keys');
  const keyExists = await keys.findOne({ key: key });

  if (keyExists) {
    res.send(`${key} exists in the database.`);
  } else {
    res.send(`${key} does not exist in the database.`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
