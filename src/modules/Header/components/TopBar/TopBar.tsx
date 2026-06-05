import { Logo } from '@/components/Logo';
import { Nav } from '../Nav';
import { Icon } from '@/components/Icon';
import styles from './Topbar.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useCart } from '@/app/providers/Cart';
import { useFavourites } from '@/app/providers/Favorities';
import { Setting } from '../Setting';

export const TopBar = ({
  type,
  setOpen,
}: {
  type: 'Header' | 'Menu';
  setOpen: (value: boolean) => void;
}) => {
  const { favourites } = useFavourites();
  const { totalItems } = useCart();

  return (
    <div className={styles.topbar}>
      {type === 'Header' && (
        <>
          <div className={styles.leftContainer}>
            <Logo type="Header" className={''}></Logo>
            <Nav type="Header" />
          </div>
          <div className={styles.rightContainer}>

            <NavLink
              aria-label="favourites"
              to="/favourites"
              className={({ isActive }: { isActive: boolean }) => {
                return classNames(styles.icon, styles.iconHeartAndCart, {
                  [styles.active]: isActive,
                });
              }}
            >
              <IconWithCounter type="heart" count={favourites.length} />
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }: { isActive: boolean }) => {
                return classNames(styles.icon, styles.iconHeartAndCart, {
                  [styles.active]: isActive,
                });
              }}
            >
              <IconWithCounter type="cart" count={totalItems} />
            </NavLink>
            <button
              className={classNames(styles.icon, styles.iconMenu)}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Icon type="menu"></Icon>
            </button>
            <Setting className={styles.settingHeader}></Setting>
          </div>
        </>
      )}

      {type === 'Menu' && (
        <>
          <div className={styles.leftContainer}>
            <Logo type="Header" className={''}></Logo>
          </div>
          <div className={styles.rightContainer}>
            <Setting></Setting>

            <button
              className={styles.icon}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon type="close"></Icon>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
