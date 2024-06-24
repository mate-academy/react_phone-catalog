import './App.scss';
import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { register } from 'swiper/element/bundle';
import { HashRouter } from 'react-router-dom';
import { GlobalStateProvider } from './store';

register();

export const App = () => {
  return (
    <div className="App">
      <GlobalStateProvider>
        <HashRouter>
          <Header />
          <Main />
          <Footer />
        </HashRouter>
      </GlobalStateProvider>
    </div>
  );
};
