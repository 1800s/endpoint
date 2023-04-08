const express = require("express");
const mongodb = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI and database name
const uri = "mongodb+srv://est:yLvwzxRC1J3ozhJo@cluster0.rmvzzax.mongodb.net/";
const dbName = "mydb";

// Route to validate a key
app.get("/key/:key", async (req, res) => {
  try {
    // Retrieve the key parameter from the request URL
    const key = req.params.key;

    // Create a new MongoDB client
    const client = new mongodb.MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Connect to the MongoDB cluster
    await client.connect();

    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection("keys");

    // Search for the key in the collection
    const result = await collection.findOne({ key: key });

    // Close the MongoDB client
    await client.close();

    // If the key was found, send a success response
    if (result) {
      res.send(`${key} is a valid key!`);
    }
    // If the key was not found, send a failure response
    else {
      res.send(`${key} is not a valid key.`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred.");
  }
});

// Serve static files from the public directory
app.use(express.static("public"));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
