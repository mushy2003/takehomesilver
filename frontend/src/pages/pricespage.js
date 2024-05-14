import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function PricesPage() {
    const [chartData, setChartData] = useState({});
    const [productId, setProductId] = useState('');
    const [granularity, setGranularity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchCandles = (e) => {
        e.preventDefault();
        if (!productId || !granularity || !startDate || !endDate) {
            console.error('All fields are required');
            return;
        }

        const url = `http://localhost:4000/product-candles?productId=${productId}&granularity=${granularity}&start=${startDate}&end=${endDate}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data.length) {
                    throw new Error('No data available');
                }

                data = data.sort((a, b) => a[0] - b[0]);
                setChartData({
                    labels: data.map(d => new Date(d[0] * 1000).toLocaleTimeString()),
                    datasets: [{
                        label: 'Closing Price',
                        data: data.map(d => d[4]),
                        fill: false,
                        tension: 0.1
                    }]
                });
            })
            .catch(error => {
                console.error('Error fetching product candles:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1>Historical Prices</h1>
            <form onSubmit={fetchCandles}>
                <div className="mb-3">
                    <label className="form-label">Product ID</label>
                    <input type="text" className="form-control" id="productID" value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Product ID" required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Select Granularity:</label>
                    {['60', '300', '900', '3600', '21600', '86400'].map((value) => (
                        <div className="form-check" key={value}>
                            <input className="form-check-input" type="radio" name="granularityOptions" id={`granularity${value}`} value={value} checked={granularity === value} onChange={(e) => setGranularity(e.target.value)} />
                            <label className="form-check-label">
                                {value === '60' ? '1 Minute' : value === '300' ? '5 Minutes' : value === '900' ? '15 Minutes' : value === '3600' ? '1 Hour' : value == '21600' ? '6 hours' : '1 Day'}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Load Data</button>
            </form>
            {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <p>No data to display</p>
            )}
        </div>
    );
}

export default PricesPage;


