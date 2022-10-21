const express = require('express');

const {
    httpDeleteListById,
    httpGetList,
    httpGetListsByUserId,
    httpAddNewList,
    httpUpdateList,
} = require('./list.controller');

const listRouter = express.Router();

listRouter.get('/:listId', httpGetList);
listRouter.get('/user/:userId', httpGetListsByUserId);
listRouter.put('/:listId', httpUpdateList);
listRouter.post('/', httpAddNewList);
listRouter.delete('/:listId', httpDeleteListById);

module.exports = listRouter;
