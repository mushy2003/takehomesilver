const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const apiClient = axios.create({
    baseURL: process.env.COINBASE_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

function createSignature(timestamp, method, requestPath, body) {
    const message = timestamp + method + requestPath + body;

    const key = Buffer.from(process.env.COINBASE_SECRET, 'base64');

    const hmac = crypto.createHmac("sha256", key);

    return hmac.update(message).digest('base64');
}

apiClient.interceptors.request.use(config => {
    const timestamp = Date.now() / 1000;
    const method = config.method;
    const reqPath = config.url;
    const body = JSON.stringify(config.data);

    const signature = createSignature(timestamp, method, reqPath, body);
    config.headers['CB-ACCESS-KEY'] = process.env.COINBASE_KEY;
    config.headers['CB-ACCESS-SIGN'] = signature;
    config.headers['CB-ACCESS-TIMESTAMP'] = timestamp;
    config.headers['CB-ACCESS-PASSPHRASE'] = process.env.COINBASE_PASSPHRASE;

    return config;
});

async function getAllKnownTradingPairs() {
    try {
        const response = await apiClient.get('/products');
        return response.data;
    } catch (err) {
        console.error('Error whilst getting trading pairs: ', err);
        throw err;
    }
}

async function getProductCandles(productId, granularity, startTime, endTime) {
    try {
        const response = await apiClient.get(`/products/${productId}/candles`, {
            params: {
                start: startTime,
                end: endTime,
                granularity
            }
        });
        return response.data;
    } catch (err) {
        console.error('Error whilst getting product candles: ', err);
        throw err;
    }
}

module.exports = {
    getAllKnownTradingPairs,
    getProductCandles
}


