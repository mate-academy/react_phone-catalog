import styles from './Logo.module.scss';

export const Logo = () => (
  <a href="/">
    <img src="public/img/Logo.png" alt="Logo" className={styles.logo} />
  </a>
);
