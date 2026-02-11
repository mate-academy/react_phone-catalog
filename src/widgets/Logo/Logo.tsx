import { Link } from 'react-router-dom';

import styles from './Logo.module.scss';
import { useTheme } from '@/hooks/useTheme';

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link to="/" className={styles.logo}>
      <img src={`img/${theme}-logo.png`} alt="logo" />
    </Link>
  );
};
