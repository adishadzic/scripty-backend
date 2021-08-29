import express from 'express';
const router = express.Router();

const Auth = require('./auth');

router.post('/register', Auth.register);
router.post('/login', Auth.login);

module.exports = router;
