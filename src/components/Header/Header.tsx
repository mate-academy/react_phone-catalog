import classNames from 'classnames';
import styles from '../Header/Header.module.scss';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <nav className={classNames(styles.nav)}>
      <Link to="/" className={classNames(styles.nav__item)}>
        <img src="./icons/logo.svg" alt="logo" />
      </Link>

      <Link
        to="#menu"
        className={classNames(styles.nav__item, styles.nav__burger)}
      >
        <img src="./icons/burger.svg" alt="Open menu button" />
      </Link>
    </nav>
  );
};
