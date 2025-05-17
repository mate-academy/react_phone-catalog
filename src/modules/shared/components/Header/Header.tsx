import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__links}>
          <Link to="/">
            <img className={styles.header__logo} src="public/icons/Logo.svg" />
          </Link>

          <Link className={styles.header__button} to="/menu">
            <img
              className={styles['header__button-image']}
              src="public/icons/Union.svg"
              alt="menu button"
            />
          </Link>
        </div>
      </div>
    </>
  );
};
