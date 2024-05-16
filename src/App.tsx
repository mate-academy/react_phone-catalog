import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import { Layout } from './modules/Layout';
import { Home } from './modules/Home/Home';
import { NotFound } from './modules/NotFound';
import { store } from './app/store';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
