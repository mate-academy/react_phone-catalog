import classNames from 'classnames';
import { TopBar } from '../TopBar';
import styles from './Menu.module.scss';
import { Nav } from '../Nav';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/app/providers/Cart';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useFavourites } from '@/app/providers/Favorities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Menu = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { cart } = useCart();
  const { favourites } = useFavourites();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile && (
        <aside
          aria-label="Side bar menu navigation"
          className={classNames(styles.menu, { [styles.isOpen]: isOpen })}
        >
          <TopBar setOpen={setOpen} type="Menu" />
          <Nav type="Menu" />
          <div className={styles.bottomContainer}>
            <NavLink
              aria-label={t('navigation.favourites')}
              to="/favourites"
              className={({ isActive }: { isActive: boolean }) => {
                return classNames(styles.icon, { [styles.active]: isActive });
              }}
            >
              <IconWithCounter count={favourites.length} type="heart"></IconWithCounter>
            </NavLink>
            <NavLink
              aria-label={t('navigation.cart')}
              to="/cart"
              className={({ isActive }: { isActive: boolean }) => {
                return classNames(styles.icon, { [styles.active]: isActive });
              }}
            >
              <IconWithCounter count={cart.length} type="cart"></IconWithCounter>
            </NavLink>
          </div>
        </aside>
      )}
    </>
  );
};
