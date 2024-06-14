import { Link } from 'react-router-dom';
import { ButtonWithErrow } from '../UIKit/ButtonWithErrow';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={`${styles.logo} hover--scale`}>
        <img src={'img/logo.png'} alt="logo" className={styles.logo_img} />
      </Link>
      <ul className={styles.nav}>
        <li>
          <Link to="/" className={`${styles.link} link--underline`}>
            GITHUB
          </Link>
        </li>
        <li>
          <Link to="/" className={`${styles.link} link--underline`}>
            CONTACTS
          </Link>
        </li>
        <li>
          <Link to="/" className={`${styles.link} link--underline`}>
            RIGHTS
          </Link>
        </li>
      </ul>

      <div className={styles.buttonBack}>
        <p className={`${styles.link} link--underline`}>Back to top</p>
        <Link
          to="#"
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
        >
          <ButtonWithErrow
            className={`${styles.buttonBack__errow} button button--small`}
          />
        </Link>
      </div>
    </div>
  );
};
