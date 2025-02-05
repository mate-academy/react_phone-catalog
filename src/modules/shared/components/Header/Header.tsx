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
import { useMemo } from 'react';

export const Header: React.FC = () => {
  const { isBurgerMenuOpened, handleCloseBurgerMenu, handleToggleBurgerMenu } =
    useBurgerMenu();
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;
  const { cart } = useCart();

  const handleToggleBurgerMenuButtonClick = () => {
    handleToggleBurgerMenu();
  };

  const handleLinkClick = () => {
    handleCloseBurgerMenu();
  };

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
