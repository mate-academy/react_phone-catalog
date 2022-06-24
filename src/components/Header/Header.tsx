import { useLocation } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';

import { Logo } from '../Logo';
import { Nav } from '../Nav';
import { Favorites } from '../Favorites';
import { Cart } from '../Cart';
import { Search } from '../Search';
import { LocalStorageContext } from '../../LocalStorageContext';

import './Header.scss';

export const Header = () => {
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1);

  const [localItems, setLocalItems] = useState(0);
  const { storageItems } = useContext(LocalStorageContext);

  useEffect(() => {
    if (localItems !== storageItems) {
      setLocalItems(storageItems);
    } else {
      setLocalItems(storageItems);
    }
  });

  return (
    <header className="Header">
      <nav className="Header__nav">
        <Logo />
        {path[0] !== 'cart' && (
          <Nav />
        )}
      </nav>
      <Search />
      <div className="Header__products">
        {path[0] !== 'cart' && (
          <Favorites />
        )}
        <Cart />
      </div>
    </header>
  );
};
