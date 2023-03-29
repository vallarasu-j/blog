

const express = require('express');

const { login, Register, getCurrentUser } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/register', Register);
authRouter.get('/currentUser', getCurrentUser);


module.exports = authRouter;