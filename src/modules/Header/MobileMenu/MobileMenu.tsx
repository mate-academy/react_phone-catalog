import styles from './MobileMenu.module.scss';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import { useAppSelector } from '../../../store/hooks';
import IconWithCounter from '../IconWithCounter';

const MobileMenu: React.FC = () => {
  const { items, favorites } = useAppSelector(state => state);
  const favoritesCount = Object.keys(favorites).length;
  const itemsCount = Object.keys(items).length;

  return (
    <div className={styles.menu}>
      <Navigation modifier="mobileMenu" />
      <div className={cn(styles.buttons)}>
        <IconWithCounter
          href="favorites"
          count={favoritesCount}
          image={'favorites'}
          mobileMenu
        />
        <IconWithCounter
          href="cart"
          count={itemsCount}
          image={'cart'}
          mobileMenu
        />{' '}
      </div>
    </div>
  );
};

export default MobileMenu;
