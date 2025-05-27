import styles from './Loader.module.scss';

import Logo from '../../../assets/icons/header-icons/logo-icon.svg';

export const Loader = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__spin}></div>
      <img src={Logo} alt="Логотип компанії" className={styles.spinner__logo} />
    </div>
  );
};
