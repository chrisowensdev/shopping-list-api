const axios = require('axios');

const locationId = '01100454';

// let accessToken = {
//   token: '',
//   expires: '',
// };

class AccessToken {
    constructor(token, expires) {
        this.token = token;
        this.expires = expires;
    }

    async getNewToken(scope) {
        try {
            const response = await axios.post(
                `https://api.kroger.com/v1/connect/oauth2/token?grant_type=client_credentials&scope=${scope}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization:
                            `Basic ` +
                            btoa(
                                `${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`
                            ),
                    },
                }
            );
            this.token = response.data.access_token;
            this.expires = Date.now() + 1800000;
            // console.log('Response Token: ' + response.data.token);
            // console.log('Expires: ' + this.expires);
        } catch (error) {
            console.log(error);
        }
    }

    getToken() {
        return this.token;
    }

    getExpires() {
        return this.expires;
    }

    setToken(token, expires) {
        this.token = token;
        this.expires = Date.now() + 1800000;
    }

    validToken() {
        if (this.token && this.expires && Date.now() <= Number(this.expires)) {
            console.log('Valid token');
            return true;
        }
    }
}

const accessToken = new AccessToken();

const scope = 'product.compact';

async function getToken(req, res) {
    // const response = await axios.post(
    //   `https://api.kroger.com/v1/connect/oauth2/token?grant_type=client_credentials&scope=${scope}`,
    //   {},
    //   {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //       Authorization: authHeader,
    //     },
    //   }
    // );
    // accessToken.setToken(response.data.access_token, response.data.expires_in);
    // console.log(accessToken.getToken());
    // console.log(accessToken.getExpires());
    //   await accessToken.getNewToken(scope);
    //   res.status(200).json({ accessToken: accessToken });
}

async function getLocation(req, res) {
    const zipCode = req.params.zipCode;
    if (!accessToken.validToken()) {
        await accessToken.getNewToken(scope);
    }
    try {
        const response = await axios.get(
            `https://api.kroger.com/v1/locations?filter.radiusInMiles=10&filter.limit=10&filter.chain=Kroger&filter.zipCode.near=${zipCode}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken.token}`,
                },
            }
        );
        const locationList = response.data.data;
        res.status(200).json({
            locations: locationList,
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

async function getItemList(req, res) {
    if (!accessToken.validToken()) {
        await accessToken.getNewToken(scope);
    }
    try {
        const response = await axios.get(
            `https://api.kroger.com/v1/products?filter.term=${req.params.term}&filter.locationId=${locationId}`,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${accessToken.getToken()}`,
                },
            }
        );
        console.log(response.data.data);
        res.status(200).json({
            data: response.data.data,
        });
    } catch (error) {
        console.log(error.response.data);
    }
}

module.exports = {
    getItemList,
    getToken,
    getLocation,
};
