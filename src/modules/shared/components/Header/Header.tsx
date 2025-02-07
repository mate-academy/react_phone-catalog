import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { MenuLinkSVGOption } from '../../types/enums';
import { BurgerMenu } from '../BurgerMenu';
import { useLanguage } from '../Contexts/LanguageContext';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import { PageLinks } from '../PageLinks';
import styles from './Header.module.scss';
import classNames from 'classnames';
import { ToggleBurgerMenuButton } from '../ToggleBurgerMenuButton';
import { useBurgerMenu } from '../Contexts/BurgerMenuContext';
import { useCart } from '../Contexts/CartContext';
import { useEffect, useMemo, useRef } from 'react';
import { useFavourites } from '../Contexts/FavouritesContext';
import { useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isBurgerMenuOpened, handleCloseBurgerMenu, handleToggleBurgerMenu } =
    useBurgerMenu();
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;
  const { cart } = useCart();
  const { favourites } = useFavourites();
  const location = useLocation();
  const savedFavouritesQuantity = useRef(favourites.length);

  const handleToggleBurgerMenuButtonClick = () => {
    handleToggleBurgerMenu();
  };

  const handleLinkClick = () => {
    handleCloseBurgerMenu();
  };

  useEffect(() => {
    if (location.pathname !== favouritesPath) {
      savedFavouritesQuantity.current = favourites.length;
    }
  }, [favourites.length, location.pathname]);

  const cartQuantity = useMemo(
    () => cart.reduce((quantity, product) => quantity + product.quantity, 0),
    [cart],
  );

  return (
    <header className={styles.Header}>
      <nav className={styles.Navigation}>
        <menu className={styles.Menu}>
          <li className={styles.LogoLinkWrapper}>
            <LogoLink className={styles.LogoLink} onClick={handleLinkClick} />
          </li>

          <li>
            <PageLinks className={styles.PageLinks} />
          </li>

          <li className={styles.MenuLinksWrapper}>
            <menu className={styles.MenuLinks}>
              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={settingsPath}
                  alt={accessSettings}
                  svgOption={MenuLinkSVGOption.Settings}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={favouritesPath}
                  alt={accessFavourites}
                  svgOption={MenuLinkSVGOption.Heart}
                  notificationQuantity={
                    location.pathname === favouritesPath
                      ? savedFavouritesQuantity.current
                      : favourites.length
                  }
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <MenuLink
                  to={cartPath}
                  alt={accessCart}
                  svgOption={MenuLinkSVGOption.Bag}
                  notificationQuantity={cartQuantity}
                />
              </li>

              <li className={styles.MenuLinksItem}>
                <ToggleBurgerMenuButton
                  burgerMenuOpened={isBurgerMenuOpened}
                  onClick={handleToggleBurgerMenuButtonClick}
                />
              </li>
            </menu>
          </li>
        </menu>
      </nav>

      <BurgerMenu
        className={classNames(
          styles.BurgerMenu,
          isBurgerMenuOpened && styles.BurgerMenu_opened,
        )}
      />
    </header>
  );
};
