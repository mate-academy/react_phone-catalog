import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './App.scss';
import App from './App';
import { CartProvider } from './components/pages/ShoppingCart/CartProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <CartProvider>
      <App />
    </CartProvider>
  </HashRouter>,
);
