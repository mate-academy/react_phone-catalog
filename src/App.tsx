import React from 'react';
import './App.scss';
import { Header } from './components/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { ProductsProvider } from './components/context/ProductsContext';

export const App = () => (
  <div className="App">
    <ProductsProvider>
      <Header />
      <main style={{ flexGrow: 1, background: '#fafbfc' }}>
        <Outlet />
      </main>
      <Footer />
    </ProductsProvider>
  </div>
);
