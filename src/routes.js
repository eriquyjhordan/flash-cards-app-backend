const { Router } = require('express');

const routes = Router();

routes.get('/', (request, response) => response.send('ok'));

module.exports = routes;
