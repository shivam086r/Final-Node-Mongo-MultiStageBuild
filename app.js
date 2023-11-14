// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple Mongoose model
const Item = mongoose.model('Item', { name: String });

// Set up a default item in the database
const defaultItem = new Item({ name: 'Welcome in node-mongodb' });
defaultItem.save();

// Root route to insert the default item into the database
app.get('/', async (req, res) => {
  try {
    // Create a new item with the default value
    const newItem = new Item({ name: 'Welcome in node-mongodb' });

    // Save the item to the database
    await newItem.save();

    res.send('Data inserted into the database!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to retrieve data from the database
app.get('/data', async (req, res) => {
  try {
    // Retrieve all items from the database
    const items = await Item.find();

    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
