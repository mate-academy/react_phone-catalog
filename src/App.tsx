import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useState } from 'react';
import { Footer } from './components/Footer/Footer';

export const App = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [menuIsClose, setMenuIsClose] = useState(false);

  return (
    <div className="App">
      <Navbar
        setMenuIsOpen={() => setMenuIsOpen(true)}
        setMenuIsClose={() => setMenuIsClose(true)}
        menuIsOpen={menuIsOpen}
      />

      <Sidebar
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={() => setMenuIsOpen(false)}
      />

      <div className="section">
        <div className="container__page">
          <Outlet />
        </div>
      </div>

      <div className="footer__wrapper">
        <Footer />
      </div>
    </div>
  );
};
