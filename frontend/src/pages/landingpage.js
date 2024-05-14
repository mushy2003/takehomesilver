import React, { useEffect, useState } from 'react';

function LandingPage() {
    const [tradingPairs, setTradingPairs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/all-trading-pairs')
            .then(response => response.json())
            .then(data => setTradingPairs(data))
            .catch(error => console.error('Error fetching trading pairs:', error));
    }, []);

    return (
        <div>
            <h1>All Trading Pairs</h1>
            <ul>
                {tradingPairs.map(pair => (
                    <li key={pair.id}>{pair.display_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default LandingPage;
