import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { store } from './app/store';

export const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <HomePage />
      <Footer />
    </BrowserRouter>
  </Provider>
);
