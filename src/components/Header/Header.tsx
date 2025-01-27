import { Link } from 'react-router-dom';
import logo from '../../media/img/Logo.svg';
import { Buttons } from '../Buttons';
import { Nav } from '../Nav';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_left}>
        <Link to="home" className={styles.header_link}>
          <img src={logo} alt="logo" className={styles.header_logo} />
        </Link>

        <Nav />
      </div>

      <div className={styles.header_right}>
        <Buttons />
      </div>
    </div>
  );
};
