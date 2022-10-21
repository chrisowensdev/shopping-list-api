const { getAllPlanets } = require('../../models/sample.model');

async function httpGetAllPlanets(req, res) {
  return res.status(200);
}

module.exports = {
  httpGetAllPlanets,
};
