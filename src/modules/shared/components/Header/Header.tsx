import { Device } from '../../types/types';
import { LogoLink } from '../LogoLink';
import { MenuLink } from '../MenuLink';
import { Navigation } from '../Navigation';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.Header}>
      <LogoLink className={styles.LogoLink} />
      <Navigation />

      <section className={styles.Menus}>
        <MenuLink
          device={Device.NotMobile}
          src="./img/icons/settings.svg"
          alt="settings menu link"
          className={styles.MenuLink}
        />

        <MenuLink
          device={Device.NotMobile}
          src="./img/icons/heart.svg"
          alt="favourites menu link"
          className={styles.MenuLink}
        />

        <MenuLink
          device={Device.NotMobile}
          src="./img/icons/bag.svg"
          alt="cart menu link"
          className={styles.MenuLink}
        />

        <MenuLink
          device={Device.Mobile}
          src="./img/icons/burger.svg"
          alt="navigation menu link"
          className={styles.MenuLink}
        />
      </section>
    </header>
  );
};
