import logo from './../../../images/header/logo.svg';
import styles from './Logo.module.scss';

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo} alt="Footer logo" className={styles.logo__img} />
    </div>
  );
};
