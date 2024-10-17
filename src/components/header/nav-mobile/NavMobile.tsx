import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hamburger from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';

import { NavLinks } from '../nav-links/NavLinks';
import { NavIcon } from '../nav-icon/NavIcon';
import { Logo } from '@ui/logo/Logo';
import { BagIcon } from '@ui/icon/BagIcon';
import { HeartIcon } from '@ui/icon/HeartIcon';

import { useCart } from '@hooks/useCart';
import { useFavourites } from '@hooks/useFavourites';
import { ROUTES } from '@utils/constants/routes';
import { DATA_MENU } from '../navbar/navbar.data';

import styles from './NavMobile.module.scss';

export const NavMobile: FC = () => {
  const { pathname } = useLocation();
  const { hasCartProduct } = useCart();
  const { hasFavouritesProduct } = useFavourites();

  const [isOpenFavourite, setIsOpenFavourite] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    setIsOpenFavourite(pathname === ROUTES.FAVOURITES);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setOpenMenu(false);
    document.body.classList.remove('hiddenScroll');
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!isOpenMenu);

    if (!isOpenMenu) {
      document.body.classList.add('hiddenScroll');
    } else {
      document.body.classList.remove('hiddenScroll');
    }
  };

  return (
    <nav className={styles.navMobile}>
      <div className={styles.headerBurger}>
        <Logo onClickAction={closeMenu} />

        <div className={styles.burger}>
          <Hamburger
            toggled={isOpenMenu}
            toggle={setOpenMenu}
            onToggle={toggleMenu}
            size={16}
            color="#313237"
            duration={0.8}
            easing="ease"
            hideOutline={true}
            label="Show menu"
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            className={styles.items}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className={styles.links}>
              {DATA_MENU.map((item, idx) => (
                <NavLinks
                  key={item.name}
                  item={item}
                  idx={idx}
                  closeMenu={closeMenu}
                />
              ))}
            </ul>
            <div className={styles.wrapper}>
              <NavIcon
                text="Favourite"
                products={hasFavouritesProduct}
                ROUTE={ROUTES.FAVOURITES}
                closeMenu={closeMenu}
              >
                <HeartIcon isOpen={isOpenFavourite} />
              </NavIcon>
              <NavIcon
                text="Cart"
                products={hasCartProduct}
                ROUTE={ROUTES.CART}
                closeMenu={closeMenu}
              >
                <BagIcon />
              </NavIcon>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
