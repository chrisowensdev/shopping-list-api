async function getAuthorization(req, res) {
  const authScope = 'product.compact';
  const token = Buffer.from(
    `${config.CLIENT_ID}:${config.CLIENT_SECRET}`,
    'utf8'
  ).toString('base64');

  async (req, res) => {
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const customerAuthentication = await axios.get(customerUrl, null, options);
    console.log(customerAuthentication);
    res.sendFile(customerAuthentication.data);

    // const data = `grant_type=client_credentials&scope=${authScope}`;
    // const options = {
    //   headers: {
    //     Authorization: `Basic ${token}`,
    //   },
    // };
    // console.log(data);
    // console.log(options);
    // const accessCodeResponse = await axios.post(
    //   'https://api.kroger.com/v1/connect/oauth2/token',
    //   data,
    //   options
    // );
    // console.log(accessCodeResponse.data);
  };
}

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

module.exports = {
  getAuthorization,
};
