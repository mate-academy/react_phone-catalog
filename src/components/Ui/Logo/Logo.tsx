import styles from './Logo.module.scss';

export const Logo = () => (
  <a href="/">
    <img src="public/img/logo.png" alt="Logo" className={styles.logo} />
  </a>
);
