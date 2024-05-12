import React, { FC } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/index.scss';
import { Layout } from './modules/Layout';
import { Home } from './modules/Home/Home';
import { NotFound } from './modules/NotFound';

export const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};
