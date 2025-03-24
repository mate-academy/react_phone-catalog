import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../../public/img/Nice-Gadgets-logo.png';
import Divider from '@mui/material/Divider';

export const Footer = () => {
  return (
    <>
      {/* <div className={styles.fullWidthDivider}>
        <Divider />
      </div> */}

      <div className={styles.footer}>
        <div className={`${styles.logo} ${styles.footer__logo}`}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <div className={styles.footer__links}>
          <div className={styles.footer__link}>
            <a
              href="https://github.com/futdevelop"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </div>
          <div className={styles.footer__link}>
            <a href="https://t.me/kolya2" target="_blank" rel="noreferrer">
              Contacts
            </a>
          </div>
          <div className={styles.footer__link}>
            <a href="https://t.me/kolya2" target="_blank" rel="noreferrer">
              Rights
            </a>
          </div>
        </div>

        <div className={styles.footer__backToTop}>
          <p>Back To Top</p>
          <div
            className={styles.footer__backToTop__icon}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/public/img/icons/arrows/arrow-top.svg" alt="BackToTop" />
          </div>
        </div>
      </div>
    </>
  );
};
