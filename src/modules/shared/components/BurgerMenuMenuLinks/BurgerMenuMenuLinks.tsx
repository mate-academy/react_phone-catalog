import { useEffect, useMemo, useRef } from 'react';
import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { MenuLinkSVGOption } from '../../types/enums';
import { BurgerMenuMenuLink } from '../BurgerMenuMenuLink/BurgerMenuMenuLink';
import { useCart } from '../Contexts/CartContext';
import { useLanguage } from '../Contexts/LanguageContext';
import styles from './BurgerMenuMenuLinks.module.scss';
import { useFavourites } from '../Contexts/FavouritesContext';
import { useLocation } from 'react-router-dom';

export const BurgerMenuMenuLinks: React.FC = () => {
  const { cart } = useCart();
  const { favourites } = useFavourites();
  const location = useLocation();
  const savedFavouritesQuantity = useRef(favourites.length);
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;

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
    <menu className={styles.BurgerMenuMenuLinks}>
      <BurgerMenuMenuLink
        to={settingsPath}
        alt={accessSettings}
        svgOption={MenuLinkSVGOption.Settings}
        className={styles.BurgerMenuMenuLink}
      />

      <BurgerMenuMenuLink
        to={favouritesPath}
        alt={accessFavourites}
        svgOption={MenuLinkSVGOption.Heart}
        notificationQuantity={
          location.pathname === favouritesPath
            ? savedFavouritesQuantity.current
            : favourites.length
        }
        className={styles.BurgerMenuMenuLink}
      />

      <BurgerMenuMenuLink
        to={cartPath}
        alt={accessCart}
        svgOption={MenuLinkSVGOption.Bag}
        notificationQuantity={cartQuantity}
        className={styles.BurgerMenuMenuLink}
      />
    </menu>
  );
};
