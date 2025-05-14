import React from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { App } from './App';
import { MainPage } from './pages/MainPage';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
