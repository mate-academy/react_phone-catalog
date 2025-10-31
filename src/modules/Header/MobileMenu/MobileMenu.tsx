import styles from './MobileMenu.module.scss';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import Icon from '../../shared/Icon';

const MobileMenu: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <div className={styles.menu}>
      <Navigation modifier="nav--mobile-menu" />
      <div className={cn(styles.buttons)}>
        <div
          className={cn(styles.button, {
            [styles.button_active]: pathname.startsWith('/favorites'),
          })}
        >
          <Icon href="favorites" iconStyles={{ image: 'favorites' }} />
        </div>
        <div
          className={cn(styles.button, {
            [styles.button_active]: pathname.startsWith('/cart'),
          })}
        >
          <Icon href="cart" iconStyles={{ image: 'cart' }} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
