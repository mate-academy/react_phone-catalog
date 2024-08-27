import { useState } from 'react';
import { Desktop } from './utils/DesktopContext';
import { Tablet } from './utils/TabletContext';
import { Outlet } from 'react-router-dom';
import { MenuOpen } from './utils/MenuContext';
import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const [onTablet, setOnTablet] = useState(window.outerWidth >= 640);
  const [onDesktop, setOnDesktop] = useState(window.outerWidth >= 1200);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSetOnDevice = () => {
    if (window.outerWidth >= 1200) {
      setOnDesktop(true);
      setOnTablet(false);
    } else if (window.outerWidth >= 640) {
      setOnDesktop(false);
      setOnTablet(true);
    } else {
      setOnDesktop(false);
      setOnTablet(false);
    }
  };

  window.addEventListener('resize', handleSetOnDevice);

  return (
    <div className={classNames('App', { 'hidden-overflow': isMenuOpen })}>
      <h1 className="not-visible-title">Product Catalog</h1>
      <Desktop.Provider value={onDesktop}>
        <Tablet.Provider value={onTablet}>
          <MenuOpen.Provider value={{ isMenuOpen, setIsMenuOpen }}>
            <Outlet />
          </MenuOpen.Provider>
        </Tablet.Provider>
      </Desktop.Provider>
    </div>
  );
};
