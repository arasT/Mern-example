const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const dbServer = require('./config');

// Serve static files (images, css, js, ...)
app.use(express.static('public'));

// Parse requests
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

// Enable CORS for all HTTP methods
app.use(cors());


// Add routes
require('./routes')(app);


mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://' + dbServer.ip + '/' + dbServer.dbName,
  { useNewUrlParser : true })
        .then(() => console.log("Connected to the database"))
        .catch(err => {
          console.log('Could not connect to the database, exiting now... ', err);
          process.exit(1);
        });


app.get('/', (req, res) => {
  res.json({ "message" : "Welcome to garage API!"});
});

app.listen(dbServer.port, () => {
  console.log("Server listen on port " + dbServer.port);
});
