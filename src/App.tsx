import './App.scss';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './modules/shared/components/Navbar';
import { AsideMenu } from './modules/shared/components/AsideMenu';
import { Footer } from './modules/shared/components/Footer';
import { useEffect, useState } from 'react';

export const App = () => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const productPages = ['/phones', '/tablets', '/accessories'];

    setShowSearch(productPages.includes(location.pathname));
  }, [location.pathname]);

  return (
    <div className="App">
      {location.pathname !== '/menu' && (
        <div className="App__header" id="header">
          <Navbar showSearch={showSearch} />
        </div>
      )}
      {location.pathname === '/menu' && (
        <aside className="App__menu" id="menu">
          <AsideMenu />
        </aside>
      )}
      <main className="App__main" id="main">
        {location.pathname === '/' && (
          <section className="App__section" id="home">
            <div className="App__section-content App__section-content">
              <h1 className="App__h App__h--h1">Product Catalog</h1>
            </div>
          </section>
        )}
        <Outlet />
      </main>
      <footer className="App__footer" id="footer">
        <Footer />
      </footer>
    </div>
  );
};
