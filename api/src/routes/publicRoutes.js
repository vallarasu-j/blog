const express = require('express');
const app = express();


const { home, about } = require('../controllers/public');

var publicRoutes = express.Router();

publicRoutes.get('/home', home);
publicRoutes.get('/about', about);


module.exports = publicRoutes;