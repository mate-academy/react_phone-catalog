import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { NavLinks } from '../nav-links/NavLinks';
import { Logo } from '@ui/logo/Logo';

import { menu } from '../navbar/navbar.data';

import { SearchBar } from '../search-bar/SearchBar';
import { ROUTES } from '@utils/constants/routes';
import { NavIcon } from '../nav-icon/NavIcon';
import { HeartIcon } from '@ui/icon/HeartIcon';
import { useAppSelector } from '@hooks/hook';
import { selectTotalQuantity } from '@store/features/cart/cart.slice';
import { BagIcon } from '@ui/icon/BagIcon';

import styles from './NavDesktop.module.scss';

export const NavDesktop: FC = () => {
  const { items } = useAppSelector(state => state.favorite);
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(pathname === ROUTES.FAVORITE);
  }, [pathname]);

  const hasProduct = items.length;

  return (
    <nav className={styles.navDesktop}>
      <div className={styles.items}>
        <Logo />

        <ul className={styles.links}>
          {menu.map(item => (
            <NavLinks key={item.name} item={item} />
          ))}
        </ul>

        <div className={styles.searchBar}>
          <SearchBar />
        </div>
      </div>

      <div className={styles.wrapper}>
        <NavIcon text="Favorite" products={hasProduct} ROUTE={ROUTES.FAVORITE}>
          <HeartIcon isOpen={isOpen} />
        </NavIcon>
        <NavIcon text="Cart" products={totalQuantity} ROUTE={ROUTES.CART}>
          <BagIcon />
        </NavIcon>
      </div>
    </nav>
  );
};
