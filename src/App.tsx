import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import './App.scss';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import store from './store/store';
import { HomePage } from './components/HomePage/homePage';
// import { Route, Routes } from 'react-router-dom';
// import { Navigation } from './components/Navigation/Navigation';
// import { Phones } from './components/MobilePhones/MobilePhones';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <HomePage />
        <Footer />
      </div>
    </Provider>
  );
};
