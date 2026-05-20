import styles from './App.module.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header';
import './styles/main.scss';
import { ThemeProvider } from './modules/shared/context/ThemeContext';
import { Footer } from './components/Footer/Footes';
import { CartAndFavProvider } from './modules/shared/context/CartAndFavContext';

export const App = () => (
  <ThemeProvider>
    <CartAndFavProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </CartAndFavProvider>
  </ThemeProvider>
);
