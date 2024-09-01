import { useEffect, useState } from 'react';
import { Desktop } from './utils/DesktopContext';
import { Tablet } from './utils/TabletContext';
import { Outlet } from 'react-router-dom';
import { MenuOpen } from './utils/MenuContext';
import './App.scss';
import classNames from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useWindowSize } from 'react-use';

export const App = () => {
  const { width } = useWindowSize();

  const [onTablet, setOnTablet] = useState(width >= 640);
  const [onDesktop, setOnDesktop] = useState(width >= 1200);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (width >= 1200) {
      setOnDesktop(true);
      setOnTablet(false);
    } else if (width >= 640) {
      setOnDesktop(false);
      setOnTablet(true);
    } else {
      setOnDesktop(false);
      setOnTablet(false);
    }
  }, [width]);

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
