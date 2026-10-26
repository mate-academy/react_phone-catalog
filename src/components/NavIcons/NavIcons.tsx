import cn from 'classnames';
import styles from './NavIcons.module.scss';
import { NavItem } from '../NavItem/NavItem';
import { NavIconsVariant, NavItemVariants } from '../../types/Types';
import { IconBadge } from '../ui/IconBadge/IconBadge';
import { useStoreContext } from 'src/context/StoreContext';

type Props = {
  variant: NavIconsVariant;
  isBurgerOpen?: boolean;
  onButtonClick?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NavIcons: React.FC<Props> = ({
  variant,
  onButtonClick,
  isBurgerOpen,
}) => {
  const navItemVariant =
    variant === NavIconsVariant.burger
      ? NavItemVariants.burger
      : NavItemVariants.navicons;

  const { favourites, cartProducts } = useStoreContext();

  return (
    <div
      className={cn(
        variant === NavIconsVariant.header
          ? styles.headerIcons
          : styles.burgerIcons,
      )}
    >
      {onButtonClick && (
        <button
          type="button"
          className={styles.burgerButton}
          onClick={() => {
            onButtonClick(prev => !prev);
          }}
        >
          <img
            src={isBurgerOpen ? 'icons/close.svg' : 'icons/menu.svg'}
            alt="menu"
          />
        </button>
      )}

      <NavItem to={'favourites'} variant={navItemVariant}>
        <IconBadge count={favourites.length}></IconBadge>
        <img src="icons/favourites-heart-like.svg" alt="Favourites" />
      </NavItem>
      <NavItem to={'cart'} variant={navItemVariant}>
        <IconBadge count={cartProducts.length}></IconBadge>
        <img src="icons/shopping-bag-cart.svg" alt="Cart" />
      </NavItem>
    </div>
  );
};
