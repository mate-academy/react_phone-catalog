import { NavLink } from 'react-router-dom';
import styles from './Logo.module.scss';
import logoBlack from '/src/images/Logo-black.svg';
import logoWhite from '/src/images/Logo-white.svg';
import useThemeStore from '../../stores/useThemeStore';

export const Logo = () => {
  const { currentTheme } = useThemeStore();
  const logo = currentTheme === 'dark' ? logoWhite : logoBlack;

  return (
    <div className={styles.logo}>
      <NavLink to="/" className={styles['logo-link']}>
        <img className={styles.logo__img} src={logo} alt="NAMU logo" />
      </NavLink>
    </div>
  );
};
