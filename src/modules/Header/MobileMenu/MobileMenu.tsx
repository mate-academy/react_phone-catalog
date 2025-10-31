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
            width: 'width_100',
            image: 'favorites',
            borderType: pathname.startsWith('/favorites')
              ? 'border_bottom'
              : undefined,
          }}
        />
        <Icon
          href="cart"
          iconStyles={{
            width: 'width_100',
            image: 'cart',
            borderType: pathname.startsWith('/cart')
              ? 'border_bottom'
              : undefined,
          }}
        />
      </div>
    </div>
  );
};

export default MobileMenu;
