import { Link } from 'react-router-dom';
import logo from '../../media/img/Logo.svg';
import { Buttons } from '../Buttons';
import { Nav } from '../Nav';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Link to="home" className={styles.header__link}>
          <img src={logo} alt="logo" className={styles.header__logo} />
        </Link>

        <Nav />
      </div>

      <div className={styles.header__right}>
        <Buttons />
      </div>
    </div>
  );
};
