import { FC, useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import { Logo } from '@ui/logo/Logo';
import { NavLinks } from '../nav-links/NavLinks';

import { menu } from '../navbar/navbar.data';

import { BagIcon } from '@ui/icon/BagIcon';
import { NavIcon } from '../nav-icon/NavIcon';
import { ROUTES } from '@utils/constants/routes';
import { HeartIcon } from '@ui/icon/HeartIcon';
import { useAppSelector } from '@hooks/hook';
import { selectTotalQuantity } from '@store/features/cart/cart.slice';

import styles from './NavMobile.module.scss';

export const NavMobile: FC = () => {
  const { items } = useAppSelector(state => state.favorite);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpenFavorite(pathname === ROUTES.FAVORITE);
  }, [pathname]);

  const closeMenu = () => {
    setOpenMenu(false);
    document.body.classList.remove(styles.hiddenScroll);
  };

  const toggleMenu = () => {
    setOpenMenu(!isOpenMenu);

    if (!isOpenMenu) {
      document.body.classList.add(styles.hiddenScroll);
    } else {
      document.body.classList.remove(styles.hiddenScroll);
    }
  };

  const hasProduct = items.length;

  return (
    <nav className={styles.navMobile}>
      <div className={styles.headerBurger}>
        <Logo closeMenu={closeMenu} />

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
              {menu.map((item, idx) => (
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
                text="Favorite"
                products={hasProduct}
                ROUTE={ROUTES.FAVORITE}
                closeMenu={closeMenu}
              >
                <HeartIcon isOpen={isOpenFavorite} />
              </NavIcon>
              <NavIcon
                text="Cart"
                products={totalQuantity}
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
