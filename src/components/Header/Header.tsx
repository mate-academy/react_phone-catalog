import styles from './Header.module.scss';
import logo from '/img/Logo@3x.png';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img
        src="/img/Logo.png"
        alt="logo"
        className={styles.header__logo}
        srcSet={`${logo} 3x`}
      />

      <a href="#" className={`${styles.icon} ${styles.icon__burger}`}></a>
    </header>
  );
};
