import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

export const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="App">
      <Header setIsOpen={setIsOpen} isOpen={isOpen} />

      {isOpen && (
        <>
          <Outlet />

          <Footer />
        </>
      )}
    </div>
  );
};
