import { Logo } from '@/components/Logo';
import { Nav } from '../Nav';
import { Icon } from '@/components/Icon';
import styles from './Topbar.module.scss';
import { useTheme } from '@/app/providers/Theme/ThemeContext';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconWithCounter } from '@/components/IconWithCounter';
import { useCart } from '@/app/providers/Cart';
import { useFavourites } from '@/app/providers/Favorities';

export const TopBar = ({
  type,
  setOpen,
}: {
  type: 'Header' | 'Menu';
  setOpen: (value: boolean) => void;
}) => {
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const { favourites } = useFavourites();
  const { cart } = useCart();

  return (
    <div className={styles.topbar}>
      {type === 'Header' && (
        <>
          <div className={styles.leftContainer}>
            <Logo type="Header" className={''}></Logo>
            <Nav type="Header" />
          </div>
          <div className={styles.rightContainer}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button onClick={() => i18n.changeLanguage('ua')}>UA</button>
              <button onClick={() => i18n.changeLanguage('en')}>EN</button>
            </div>
            <button className={styles.swicherThemeContainer} onClick={() => toggleTheme()}>
              <div
                className={classNames(styles.swicherTheme, {
                  [styles.swicherThemeDark]: theme === 'dark',
                })}
              ></div>
            </button>
            <NavLink
              aria-label="favorites"
              to="/favorites"
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
              <IconWithCounter type="cart" count={cart.length} />
            </NavLink>
            <button
              className={classNames(styles.icon, styles.iconMenu)}
              onClick={() => {
                setOpen(true);
              }}
            >
              <Icon type="menu"></Icon>
            </button>
          </div>
        </>
      )}

      {type === 'Menu' && (
        <>
          <div className={styles.leftContainer}>
            <Logo type="Header" className={''}></Logo>
          </div>
          <div className={styles.rightContainer}>
            <button className={styles.swicherThemeContainer} onClick={() => toggleTheme()}>
              <div
                className={classNames(styles.swicherTheme, {
                  [styles.swicherThemeDark]: theme === 'dark',
                })}
              ></div>
            </button>
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
