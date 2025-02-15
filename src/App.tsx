import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Menu } from './components/Menu';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

export const App = () => {
  const [menuPage, setMenuPage] = useState(false);

  const { pathname } = useLocation();

  const getLinkClass = (
    { isActive }: { isActive: boolean },
    styles: CSSModuleClasses,
  ) => {
    return classNames('link-upper-text', { [styles.active]: isActive });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuPage(false);
  }, [pathname]);

  return (
    <div className="App">
      <h1 className="hiddenTitle">Product Catalog</h1>
      {menuPage ? (
        <div className="menuTab">
          <Menu
            checkMenu={menuPage}
            menuPage={setMenuPage}
            getLinkClass={getLinkClass}
          />
        </div>
      ) : (
        <div className="appContent">
          <div className="topBar" id="top">
            <Header
              checkMenu={menuPage}
              menuPage={setMenuPage}
              getLinkClass={getLinkClass}
            />
          </div>

          <div className="content">
            <Outlet />
          </div>

          <div className="footer">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};
