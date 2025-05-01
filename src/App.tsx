import React from 'react';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Home as HomePage } from './pages/Home';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<h1>Product Catalog</h1>} />
          <Route path="home" element={<Navigate to=".." />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Route>
      </Routes>
    </div>
  );
};
