import React from 'react';
import ReactDOM from 'react-dom';
import { BikeProvider } from "./context/bikes";
import App from './App';
import './index.css';
import { CartProvider } from './context/cart';

ReactDOM.render(
  <BikeProvider>
    <CartProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CartProvider>
  </BikeProvider>,
  document.getElementById('root')
);
