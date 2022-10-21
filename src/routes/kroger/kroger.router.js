const express = require('express');
const { getToken, getLocation, getItemList } = require('./kroger.controller');
const krogerRouter = express.Router();

krogerRouter.get('/getToken', getToken);

krogerRouter.get('/callback', (req, res) => {
    console.log('Successful callback');
    res.redirect('/');
});

krogerRouter.get('/location/:zipCode', getLocation);
krogerRouter.get('/items/:term', getItemList);

module.exports = krogerRouter;
