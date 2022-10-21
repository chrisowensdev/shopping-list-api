const express = require('express');

const { httpGetAllPlanets } = require('./sample.controller');

const planetsRouter = express.Router();

planetsRouter.get('/', httpGetAllPlanets);

module.exports = planetsRouter;
