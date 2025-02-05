import { useMemo } from 'react';
import { cartPath, favouritesPath, settingsPath } from '../../consts/paths';
import { MenuLinkSVGOption } from '../../types/enums';
import { BurgerMenuMenuLink } from '../BurgerMenuMenuLink/BurgerMenuMenuLink';
import { useCart } from '../Contexts/CartContext';
import { useLanguage } from '../Contexts/LanguageContext';
import styles from './BurgerMenuMenuLinks.module.scss';

export const BurgerMenuMenuLinks: React.FC = () => {
  const { cart } = useCart();
  const { accessSettings, accessFavourites, accessCart } =
    useLanguage().localeTexts;

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
