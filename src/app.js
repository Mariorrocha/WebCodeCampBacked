const express = require('express');
const cors = require('cors');
const users = require('./routes/users');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', users);
app.use(require('./routes/Talks'));
app.use(require('./routes/Speakers'));

module.exports = app;