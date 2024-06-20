import cartIcon from '../../assets/images/cart-icon.svg';
import favoriteIcon from '../../assets/images/favourite-icon.svg';
import { logo } from '../../assets/index';
import { NavigationButton } from '../../ui/NavigationButton';
import { HeaderLinks } from '../HeaderLinks/HeaderLinks';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.Container}>
        <div className={styles.HeaderContent}>
          <div className={styles.HeaderInner}>
            <img className={styles.HeaderLogo} src={logo} alt="logo" />

            <HeaderLinks />
          </div>

          <nav className={styles.HeaderNavigation}>
            <NavigationButton href="/favorites">
              <img src={favoriteIcon} alt="favorites" />
            </NavigationButton>
            <NavigationButton href="/cart">
              <img src={cartIcon} alt="cart" />
            </NavigationButton>
          </nav>
        </div>
      </div>
    </header>
  );
};
