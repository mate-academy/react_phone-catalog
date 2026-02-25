import styles from './NavButtons.module.scss';
import { FavoriteIcon } from '../../UI/Icon/FavoriteIcon';
import { BagIcon } from '../../UI/Icon/BagIcon';
import { MenuIcon } from '../../UI/Icon/MenuIcon';
import { HeaderButton } from '../../UI/Buttons/HeaderButton';
import { CloseIcon } from '../../UI/Icon/CloseIcon';
import { useBurgerMenu } from '../../../hooks/context/useBurgerMenu';
import { useLocation } from 'react-router-dom';
import { useCart } from '../../../hooks/context/useCart';
import { useFavorite } from '../../../hooks/context/useFavorite';

export const NavButtons = () => {
  const { isOpen, openBurgerMenu, closeBurgerMenu } = useBurgerMenu();
  const lacation = useLocation();
  const { howManyItems: cartItems } = useCart();
  const { howManyItem: favoriteItems } = useFavorite();

  return (
    <div className={styles.container}>
      <div className={styles.descTop}>
        <HeaderButton
          to="/favorites"
          active={lacation.pathname === '/favorites'}
          counter={favoriteItems}
        >
          <FavoriteIcon />
        </HeaderButton>

        <HeaderButton
          to="/cart"
          active={lacation.pathname === '/cart'}
          counter={cartItems}
        >
          <BagIcon />
        </HeaderButton>
      </div>

      <div className={styles.mobile}>
        {isOpen ? (
          <HeaderButton onClick={closeBurgerMenu}>
            <CloseIcon />
          </HeaderButton>
        ) : (
          <HeaderButton onClick={openBurgerMenu}>
            <MenuIcon />
          </HeaderButton>
        )}
      </div>
    </div>
  );
};
