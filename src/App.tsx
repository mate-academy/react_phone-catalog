import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './main.scss';
import { Header } from './components/Header';

export const App: React.FC = () => {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1>home</h1>} />
            <Route path="/home" element={<Navigate to={'/'} replace />} />

            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
