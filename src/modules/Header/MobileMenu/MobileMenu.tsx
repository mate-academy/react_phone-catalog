import styles from './MobileMenu.module.scss';
import cn from 'classnames';
import Navigation from '../Navigation/Navigation';
import Icon from '../../shared/Icon';
import { IconModifiers } from '../../../types/iconModifiers';

const MobileMenu: React.FC<{ pathname: string }> = ({ pathname }) => {
  return (
    <div className={styles.menu}>
      <Navigation modifier="nav--mobile-menu" />
      <div className={cn(styles.buttons)}>
        <div
          className={cn(styles.button, {
            [styles['button--active']]: pathname.startsWith('/favorites'),
          })}
        >
          <Icon href="favorites" modifiers={IconModifiers.Favorites} />
        </div>
        <div
          className={cn(styles.button, {
            [styles['button--active']]: pathname.startsWith('/cart'),
          })}
        >
          <Icon href="cart" modifiers={IconModifiers.Cart} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
