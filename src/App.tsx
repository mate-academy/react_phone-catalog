/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { Desktop } from './utils/DesktopContext';
import { Tablet } from './utils/TabletContext';
import { Outlet } from 'react-router-dom';
import { MenuOpen } from './utils/MenuContext';
import './App.scss';
import classNames from 'classnames';
import { useWindowSize } from 'react-use';
import Favicon from 'react-favicon';

export const App = () => {
  const [faviconUrl, setFaviconUrl] = useState('./img/favicon.png');

  useEffect(() => setFaviconUrl('./img/favicon.png'), []);

  const { width } = useWindowSize();

  const [onTablet, setOnTablet] = useState(width >= 640);
  const [onDesktop, setOnDesktop] = useState(width >= 1200);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (width >= 1200) {
      setOnDesktop(true);
      setOnTablet(false);
      setIsMenuOpen(false);
    } else if (width >= 640) {
      setOnDesktop(false);
      setOnTablet(true);
      setIsMenuOpen(false);
    } else {
      setOnDesktop(false);
      setOnTablet(false);
    }
  }, [width]);

  return (
    <div className={classNames('App', { 'hidden-overflow': isMenuOpen })}>
      <Favicon url={faviconUrl} />
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
