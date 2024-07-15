import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header/Header';
import { useState } from 'react';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
      <Outlet />
      <footer></footer>
    </div>
  );
};
