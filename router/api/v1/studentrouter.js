const express = require('express');

const routes = express.Router();

const studentcontroller = require('../../../controller/api/v1/studentcontroller');

routes.post('/studentregister', studentcontroller.studentregister);

module.exports = routes;