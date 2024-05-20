import { useContext } from 'react';
import styles from './Logo.module.scss';
import logo from './images/logo.png';
import darkLogo from './images/darkLogo.png';
import { AppContext } from '../../../utils/AppContext';

export const Logo = () => {
  const { isDarkTheme } = useContext(AppContext);

  return (
    <div className={styles.logo}>
      <img
        alt="logo-image"
        src={isDarkTheme ? darkLogo : logo}
        className={styles.logo__image}
      />
    </div>
  );
};
