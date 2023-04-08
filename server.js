const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const mongoURI = 'mongodb+srv://est:yLvwzxRC1J3ozhJo@cluster0.rmvzzax.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'mydb';
const collectionName = 'keys';

app.use(express.static('public'));

app.get('/key/:key', async (req, res) => {
  const key = req.params.key;

  try {
    const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const doc = await collection.findOne({ key: key });

    if (doc) {
      res.send('Key is valid');
    } else {
      res.send('Key is invalid');
    }

    client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to database');
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
