import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import './App.scss';

import store, { persister } from './store/store';
import { HomePage } from './components/HomePage/HomePage';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader/Loader';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

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
