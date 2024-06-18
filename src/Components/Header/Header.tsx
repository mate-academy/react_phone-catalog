import { Navbar } from '../NavBar';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className="logo">
        <img src="img/icons/Logo.png" alt="" className="logo-img" />
      </div>
      <Navbar />
    </div>
  );
};
