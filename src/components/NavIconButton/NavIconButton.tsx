import React from 'react';
import { NavLink } from 'react-router-dom';
import useCartStore from '../../stores/useCartStore';
import useFavoritesStore from '../../stores/useFavoritesStore';
import favoritesHeartIcon from '../../images/icons/favourites-heart.svg';
import shoppingBagIcon from '../../images/icons/shopping-bag.svg';

// Класи стилів потрібно буде винести з Navbar.module.scss
// наприклад, у shared/NavIconButton.module.scss або GlobalStyles

// ПРИПУЩЕННЯ: Ви винесли потрібні стилі (icon__button, notification-badge, styles.icon)
// У цьому прикладі використовуємо стилі з Navbar (якщо вони спільні)

// Потрібні стилі (запозичені з Navbar.module.scss для прикладу)
const styles = {
  icon__button: 'icon__button',
  'icon-button-active': 'icon-button-active',
  icon__item: 'icon__item',
  icon: 'icon',
  'notification-badge': 'notification-badge',
};

type ItemType = 'favourites' | 'cart';

type Props = {
  type: ItemType;
  iconClass: ({ isActive }: { isActive: boolean }) => string;
  onLinkClick?: () => void;
};

export const NavIconButton: React.FC<Props> = ({
  type,
  iconClass,
  onLinkClick,
}) => {
  const { favorites } = useFavoritesStore();
  const { getTotalItems } = useCartStore();

  const isCart = type === 'cart';
  const count = isCart ? getTotalItems() : favorites.length;
  const path = isCart ? '/cart' : '/favourites';
  const iconSrc = isCart ? shoppingBagIcon : favoritesHeartIcon;
  const altText = isCart ? 'shopping bag' : 'favourites heart';

  return (
    <NavLink
      to={path}
      className={iconClass}
      onClick={onLinkClick}
      aria-label={path.substring(1)}
    >
      <span className={styles.icon__item}>
        <img className={styles.icon} src={iconSrc} alt={altText} />
      </span>

      {count > 0 && (
        <span className={styles['notification-badge']}>{count}</span>
      )}
    </NavLink>
  );
};
