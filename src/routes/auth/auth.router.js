const express = require('express');

const { getAuthorization } = require('./auth.controller');

const authRouter = express.Router();

const apiBaseUrl = process.env.KROGER_API_BASE_URL;
const oauth2BaseUrl = process.env.KROGER_OAUTH2_BASE_URL;
const clientId = process.env.KROGER_CLIENT_ID;
const redirectUrl = process.env.KROGER_REDIRECT_URL;
const scope = encodeURIComponent(
  'product.compact cart.basic:write profile.compact'
);

const url =
  `${oauth2BaseUrl}/authorize?` +
  `client_id=${encodeURIComponent(clientId)}` +
  `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
  `&response_type=code` +
  `&scope=${scope}`;

authRouter.get('/kroger', (req, res) => {
  console.log('Authroization Call');
  res.status(200).json({
    msg: url,
  });
});

authRouter.get('/kroger/callback', (req, res) => {
  console.log('Successful callback');
  res.json({
    message: req.query,
  });
});

module.exports = authRouter;
