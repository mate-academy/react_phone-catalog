import classNames from 'classnames';
import { TopBar } from '../TopBar';
import styles from './Menu.module.scss';
import { Nav } from '../Nav';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/app/providers/Cart';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useFavourites } from '@/app/providers/Favorities';
import { useEffect, useState } from 'react';

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
        <aside className={classNames(styles.menu, { [styles.isOpen]: isOpen })}>
          <TopBar setOpen={setOpen} type="Menu" />
          <Nav type="Menu" />
          <div className={styles.bottomContainer}>
            <NavLink
              to="/favorites"
              className={({ isActive }: { isActive: boolean }) => {
                return classNames(styles.icon, { [styles.active]: isActive });
              }}
            >
              <IconWithCounter count={favourites.length} type="heart"></IconWithCounter>
            </NavLink>
            <NavLink
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
