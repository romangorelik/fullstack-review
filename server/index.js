const express = require('express');
const mongo = require('../database/index.js')
const axios = require('axios')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js')

let app = express();

app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/:username', function (req, res) {
  let {username} = req.params
  db.retrieveByUserName(username)
    .then(response => {
      if (response.length) {
        res.send(response)
      } else {
        helpers.getReposByUsername(username)
          .then(response => {
            res.send(response)
          })
      }
    })
});

app.get('/repos', (req, res) => {
  	db.retrieve()
  	.then(response => {
  		res.send(response)
  	})
  	.catch(err => console.error(err))
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
