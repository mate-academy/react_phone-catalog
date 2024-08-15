import { useState } from 'react';

import closeIcon from '../../assets/images/CloseMenu.svg';
import menuIcon from '../../assets/images/Menu.svg';

import { cartIcon, favoriteIcon, logo } from '../../assets/index';
import { NavigationButton } from '../../ui/NavigationButton';

import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getLengthItems } from '../../utils/getLengthItems';
import { AsideMenu } from '../AsideMenu';

import styles from './MainHeader.module.scss';
import { Navigation } from './Navigation';

export const MainHeader = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const totalItems = getLengthItems(cart);

  const handleToogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.headerInner}>
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>

              <Navigation />
            </div>

            <div className={styles.list}>
              <NavigationButton href="/favorites">
                {!!favorites.length && (
                  <span className={styles.counter}>{favorites.length}</span>
                )}
                <img
                  className={styles.icon}
                  src={favoriteIcon}
                  alt="favorites"
                />
              </NavigationButton>
              <NavigationButton href="/cart">
                {!!cart.length && (
                  <span className={styles.counter}>{totalItems}</span>
                )}
                <img className={styles.icon} src={cartIcon} alt="cart" />
              </NavigationButton>

              <button onClick={handleToogleMenu} className={styles.button}>
                <img src={showMenu ? closeIcon : menuIcon} alt="cart" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AsideMenu active={showMenu} onCloseMenu={handleCloseMenu} />
    </>
  );
};
