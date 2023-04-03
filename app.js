const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const userRoutes = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to the database
db.connect();

// Use the user routes
app.use('/user', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
