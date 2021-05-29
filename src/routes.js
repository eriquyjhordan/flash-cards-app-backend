const { Router } = require('express');
const UserController = require('./Controllers/UserController');
const SessionController = require('./Controllers/SessionController');
const WordController = require('./Controllers/WordsController');

const routes = Router();

routes.post('/users', UserController.create);

routes.route('/users/:id')
  .put(UserController.update)
  .get(UserController.show);

routes.post('/session', SessionController.create);

routes.get('/words/:name', WordController.create);

module.exports = routes;
