const { Router } = require('express');
const UserController = require('./Controllers/UserController');
const SessionController = require('./Controllers/SessionController');

const routes = Router();

routes.post('/users', UserController.create);

routes.route('/users/:id')
  .put(UserController.update)
  .get(UserController.show);

routes.post('/session', SessionController.create);

module.exports = routes;
