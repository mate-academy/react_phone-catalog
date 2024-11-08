import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Icons, Logo } from '@ui/index';

import * as hook from '@hooks/index';

import { ROUTES } from '@utils/constants/routes';
import { scrollToTop } from '@utils/helpers/scrollToTop';
import { Labels } from '@utils/types/labels.enum';

import { NavIcon, NavLinks, NavUtilities } from '../index';
import { LINKS_MENU } from '../navbar/navbar.data';
import styles from './NavDesktop.module.scss';

export const NavDesktop: FC = () => {
  const { pathname } = useLocation();
  const { cartCount } = hook.useCart();
  const { favouritesCount } = hook.useFavourites();
  const [isOpenFavourite, setIsOpenFavourite] = useState(false);

  useEffect(() => {
    setIsOpenFavourite(pathname === ROUTES.FAVOURITES);
  }, [pathname]);

  return (
    <nav className={styles.navDesktop}>
      <div className={styles.items}>
        <Logo onClickAction={scrollToTop} />

        <ul className={styles.links}>
          {LINKS_MENU.map(item => (
            <NavLinks key={item.name} item={item} onClick={scrollToTop} />
          ))}
        </ul>
      </div>

      <div className={styles.wrapper}>
        <NavUtilities id="toggle-desktop" />

        <NavIcon
          text={Labels.Favourite}
          products={favouritesCount}
          ROUTE={ROUTES.FAVOURITES}
          onIconClick={scrollToTop}
        >
          <Icons.HeartIcon isOpen={isOpenFavourite} />
        </NavIcon>

        <NavIcon
          text={Labels.Cart}
          products={cartCount}
          ROUTE={ROUTES.CART}
          onIconClick={scrollToTop}
        >
          <Icons.BagIcon />
        </NavIcon>
      </div>
    </nav>
  );
};
