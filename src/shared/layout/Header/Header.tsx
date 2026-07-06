import styles from './Header.module.scss';
import { Logo } from '../../ui/logo';
import { NavBarHeader } from '../../ui/navBarHeader';
import { ButtonBarHeader } from '../../ui/buttonBarHeader/ButtonBarHeader';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.navBar}>
          <Logo imgClassName={styles.navLogo} />
          <NavBarHeader className={`uppercase ${styles.navLinks}`} />
        </div>
        <ButtonBarHeader />
      </div>
    </header>
  );
};
