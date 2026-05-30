import { useEffect, useState } from 'react';
import './App.scss';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { SideBar } from './components/SideBar';
import { Outlet } from 'react-router-dom';

export const App = () => {
  // const getDefaultTheme = (): string => {
  //   const localStorageTheme = localStorage.getItem('theme');

  //   return localStorageTheme || 'dark';
  // };

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (menuIsOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuIsOpen]);

  return (
    <div className="App">
      <NavBar
        setMenuIsOpen={() => setMenuIsOpen(true)}
        setMenuIsClose={() => setMenuIsOpen(false)}
        menuIsOpen={menuIsOpen}
      />

      <SideBar openMenu={menuIsOpen} setOpenMenu={() => setMenuIsOpen(false)} />

      <div className="section">
        <div className="container__page">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};
