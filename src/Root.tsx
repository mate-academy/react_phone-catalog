import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { App } from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
};
