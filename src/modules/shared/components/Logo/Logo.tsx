import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useTheme } from '../../context';
import styles from './Logo.module.scss';

export const Logo = () => {
  const { theme } = useTheme();

  return (
    <Link to="/" className={styles.logo} aria-label="Nice Gadgets home">
      <img
        src="img/logo/Logo.png"
        alt="Nice Gadgets"
        className={classNames(styles.image, {
          [styles.light]: theme === 'light',
        })}
      />
    </Link>
  );
};
