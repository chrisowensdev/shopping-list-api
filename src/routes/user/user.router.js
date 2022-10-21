const express = require('express');

const {
    httpGetAllUsers,
    httpAddUser,
    httpGetUser,
    httpGetUserById,
    httpUpdateUser,
} = require('./user.controller');

const usersRouter = express.Router();

usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/:userId', httpGetUserById);
usersRouter.post('/signup', httpAddUser);
usersRouter.post('/user', httpGetUser);
usersRouter.put('/user', httpUpdateUser);
usersRouter.delete('/:id');

module.exports = usersRouter;
