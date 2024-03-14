import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonesPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
