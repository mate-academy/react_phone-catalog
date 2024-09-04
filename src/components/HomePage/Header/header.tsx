// import { NavLink } from 'react-router-dom';
import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_buttoms_container}>
        <a href="">
          <img src="./img/logo.png" alt="logo" className={styles.header_logo} />
        </a>

        <div className={styles.header_buttoms}>home</div>
        <div className={styles.header_buttoms}>Phones</div>
        <div className={styles.header_buttoms}>tablets</div>
        <div className={styles.header_buttoms}>accessories</div>
      </div>

      <div>
        <a href="" className={styles.header_buttoms_additional}>
          <img src="/img/Vector_heart.svg" alt="logo" />
        </a>
        <a href="" className={styles.header_buttoms_additional}>
          <img src="/img/Shopping_bag.svg" alt="logo" />
        </a>
      </div>
    </div>
  );
};
