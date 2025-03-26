import { Outlet } from 'react-router-dom';
import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer/Footer';
import { ThemeContext } from './components/ColorThemes/ColorThemes';
// import { CartProvider } from './components/BuyCard/CartContext';
// import { useProductHooks } from './components/ProductPage/usePhonesHooks';

export const App = () => {
  const getDefaultTheme = (): string => {
    const localStorageTheme = localStorage.getItem('theme');

    return localStorageTheme || 'dark';
  };

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [theme, setTheme] = useState(getDefaultTheme());
  // const { loading } = useProductHooks();

  useEffect(() => {
    if (menuIsOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }, [menuIsOpen]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* <CartProvider> */}
      <div className={`theme-${theme}`}>
        <div className="App">
          <Navbar
            setMenuIsOpen={() => setMenuIsOpen(true)}
            setMenuIsClose={() => setMenuIsOpen(false)}
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
          {/* <div className="footer__wrapper"> */}
          <Footer />
          {/* </div> */}
        </div>
      </div>
      {/* </CartProvider> */}
    </ThemeContext.Provider>
  );
};
