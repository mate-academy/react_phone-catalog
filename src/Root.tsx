import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import React from 'react';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}></Route>
      </Routes>
    </Router>
  );
};
