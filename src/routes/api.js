const express = require('express');
const app = require('../app');

const authRouter = require('./auth/auth.router');
const krogerRouter = require('./kroger/kroger.router');
const listRouter = require('./list/list.router');
const usersRouter = require('./user/user.router');

const api = express.Router();

api.use('/auth', authRouter);
api.use('/kroger', krogerRouter);
api.use('/users', usersRouter);
api.use('/lists', listRouter);

// api.get('/list', (req, res) => {
//   console.log('List route');
// });

api.use('/callback', (req, res) => {
  console.log('Callback function');
  // console.log(req);
  // console.log(req.query);
  // if (!params.code) {
  //   res.sendStatus(400);
  //   return;
  // }
  res.send(200).json({
    success: 'okay',
  });
});

module.exports = api;
