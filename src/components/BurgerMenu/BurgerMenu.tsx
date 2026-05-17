import { useLocation } from 'react-router-dom';
import { useBurgerMenu } from '../../hooks/context/useBurgerMenu';
import { NavMain } from '../../shared/components/NavMain';
import { HeaderButton } from '../../shared/UI/Buttons/HeaderButton';
import { BagIcon } from '../../shared/UI/Icon/BagIcon';
import { FavoriteIcon } from '../../shared/UI/Icon/FavoriteIcon';
import styles from './BurgerMenu.module.scss';
import cn from 'classnames';

export const BurgerMenu = () => {
  const { isOpen } = useBurgerMenu();
  const location = useLocation();

  return (
    <div className={cn(styles.menu, { [styles.menu_active]: isOpen })}>
      <NavMain />

      <div className={styles.buttons}>
        <HeaderButton
          to="favorites"
          className={styles.button}
          active={location.pathname === '/favorites'}
        >
          <FavoriteIcon />
        </HeaderButton>
        <HeaderButton
          to="cart"
          className={styles.button}
          active={location.pathname === '/cart'}
        >
          <BagIcon />
        </HeaderButton>
      </div>
    </div>
  );
};
