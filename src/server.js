const express = require('express');
const cors = require('cors');
require('dotenv').config();
const routes = require('./routes');

const server = express();

server.use(express.json());

const PORT = 3001;

server.use(cors());
server.use(routes);

server.listen(process.env.PORT || PORT, () => {
  console.log('server is running...');
});
