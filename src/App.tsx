import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import './App.scss';
import { Header } from './components/Header/header';
import { Footer } from './components/Footer/footer';
import store, { persister } from './store/store';
import { HomePage } from './components/HomePage/homePage';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/loader/spiner';
// import { Route, Routes } from 'react-router-dom';
// import { Navigation } from './components/Navigation/Navigation';
// import { Phones } from './components/MobilePhones/MobilePhones';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persister}>
        <div className="App">
          <Header />
          <div className="wraper">
            <HomePage />
          </div>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
};
