// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a simple Mongoose model
const Item = mongoose.model('Item', { name: String });

app.get('/', async (req, res) => {
  try {
    // Query the database for a specific item
    const item = await Item.findOne({ name: 'Welcome Here' });

    // If the item is found, send its content as the response
    if (item) {
      res.send(item.name);
    } else {
      res.send('Item not found in the database!');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to insert data into the database
app.get('/insert', async (req, res) => {
  try {
    // Create a new item
    const newItem = new Item({ name: 'Welcome Here' });

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
