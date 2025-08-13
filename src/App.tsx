import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { ThemeContext } from './components/Themes';

export const App = () => {
  const getDefaultTheme = (): string => {
    const locarStorageTheme = localStorage.getItem('theme');

    return locarStorageTheme || 'dark';
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [theme, setTheme] = useState(getDefaultTheme());

  useEffect(() => {
    if (menuIsOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuIsOpen]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <div className="App">
          <Navbar
            setMenuIsOpen={() => setMenuIsOpen(true)}
            setMenuIsClose={() => setMenuIsOpen(false)}
            menuIsOpen={menuIsOpen}
          />

          <Sidebar
            openMenu={menuIsOpen}
            setOpenMenu={() => setMenuIsOpen(false)}
          />

          <div className="section">
            <div className="container__page">
              <Outlet />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};
