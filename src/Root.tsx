import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';

export const Root: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<p>NOT FOUND</p>} />
        </Route>
      </Routes>
    </Router>
  );
};
