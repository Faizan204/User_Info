const mongoose = require('mongoose');

exports.connect = () => {
  mongoose.connect('mongodb://0.0.0.0:27017/userdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });
};
