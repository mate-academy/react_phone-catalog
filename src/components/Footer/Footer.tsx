import styles from './Footer.module.scss';
import arrowUp from '../../items/vector.png';
import { Link } from 'react-router-dom';
import logo from '../../icons/logo.png';

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_hr} />
      <div className={styles.footer_content}>
        <Link to="#">
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>

        <div className={styles.links}>
          <ul className={styles.list}>
            <li>
              <Link className={styles.link} to="#">
                GITHUB
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="#">
                CONTACTS
              </Link>
            </li>
            <li>
              <Link className={styles.link} to="#">
                RIGHTS
              </Link>
            </li>
          </ul>
        </div>

        <div
          className={styles['footer-btn']}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className={styles['footer-btn__text']}>Back to top</span>
          <button type="button" className={styles['back-to-top']}>
            <img
              src={arrowUp}
              alt="Arrow up"
              className={styles['back-to-top__icon']}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
