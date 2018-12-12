import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/HomePage';
import BitcoinAPI from './BitcoinAPI';

const bitcoinAPI = new BitcoinAPI();

ReactDOM.render(<HomePage bitcoinAPI={bitcoinAPI} />, document.getElementById('app'));
