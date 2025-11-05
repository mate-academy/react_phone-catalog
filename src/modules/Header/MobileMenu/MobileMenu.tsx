import styles from './MobileMenu.module.scss';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import Icon from '../../shared/Icon';

const MobileMenu: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <div className={styles.menu}>
      <Navigation modifier="mobileMenu" />
      <div className={cn(styles.buttons)}>
        <Icon
          href="favorites"
          iconStyles={{
            icon: pathname.startsWith('/favorites')
              ? ['border_bottom', 'width_100']
              : ['width_100'],
            image: 'favorites',
          }}
        />
        <Icon
          href="cart"
          iconStyles={{
            icon: pathname.startsWith('/cart')
              ? ['border_bottom', 'width_100']
              : ['width_100'],
            image: 'cart',
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
