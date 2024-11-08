import Hamburger from 'hamburger-react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { Icons, Logo } from '@ui/index';

import { useCart, useFavourites, useTheme } from '@hooks/index';

import { ROUTES } from '@utils/constants/routes';
import { scrollToTop } from '@utils/helpers/scrollToTop';
import { Labels } from '@utils/types/labels.enum';

import { NavIcon, NavLinks, NavUtilities } from '../index';
import { LINKS_MENU } from '../navbar/navbar.data';
import styles from './NavMobile.module.scss';

export const NavMobile: FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { color } = useTheme();
  const { cartCount } = useCart();
  const { favouritesCount } = useFavourites();
  const [isOpenFavourite, setIsOpenFavourite] = useState(false);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const localShow = t('nav.show');

  useEffect(() => {
    setIsOpenFavourite(pathname === ROUTES.FAVOURITES);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('hiddenScroll', isOpenMenu);
    return () => {
      document.body.classList.remove('hiddenScroll');
    };
  }, [isOpenMenu]);

  const closeMenu = useCallback(() => {
    setOpenMenu(false);
    scrollToTop();
  }, []);

  return (
    <nav className={styles.navMobile}>
      <div className={styles.headerBurger}>
        <div className={styles.headerWrapper}>
          <Logo onClickAction={closeMenu} />

          {!isOpenMenu && <NavUtilities id="toggle-mobile" />}
        </div>
        <div className={styles.burger}>
          <Hamburger
            toggled={isOpenMenu}
            toggle={setOpenMenu}
            size={16}
            color={color}
            duration={0.8}
            easing="ease"
            hideOutline={true}
            label={localShow}
          />
        </div>
      </div>
      <AnimatePresence>
        {isOpenMenu && (
          <motion.div
            className={styles.items}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.links}>
              {LINKS_MENU.map((item, idx) => (
                <NavLinks
                  key={item.name}
                  item={item}
                  idx={idx}
                  onClick={closeMenu}
                />
              ))}
            </ul>
            <div className={styles.wrapper}>
              <NavIcon
                text={Labels.Favourite}
                products={favouritesCount}
                ROUTE={ROUTES.FAVOURITES}
                onIconClick={closeMenu}
              >
                <Icons.HeartIcon isOpen={isOpenFavourite} />
              </NavIcon>
              <NavIcon
                text={Labels.Cart}
                products={cartCount}
                ROUTE={ROUTES.CART}
                onIconClick={closeMenu}
              >
                <Icons.BagIcon />
              </NavIcon>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
