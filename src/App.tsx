import './App.scss';
import './styles/fonts.scss';
import { Header } from './components/Header';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { Footer } from './components/Footer';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './contexts/CartContext';

export const App = () => (
  <CartProvider>
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </CartProvider>
);
