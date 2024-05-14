const express = require('express');
const cors = require('cors');
const { getAllKnownTradingPairs, getProductCandles } = require('./utils/apiClient');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get('/all-trading-pairs', async (req, res) => {
    try {
        const tradingPairsData = await getAllKnownTradingPairs();
        res.json(tradingPairsData);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.get('/product-candles', async (req, res) => {
    try {
        const { productId, granularity, start, end } = req.query;
        const productCandlesData = await getProductCandles(productId, granularity, start, end);
        res.json(productCandlesData);
    } catch (error) {
        res.status(400).json(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


