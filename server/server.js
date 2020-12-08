
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Using cors for same origin requests
app.use(cors())

const routes = require('./routes/routes.js')(app);

const server = app.listen(3001, () => {
  console.log('listening on port %s...', server.address().port);
});