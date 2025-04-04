import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '/img/nice-gadgets-logo.svg';
import BackToTop from '../BackToTop/BackToTop';
import { footerLinks } from '../../utils';

export const Footer = () => {
  return (
    <>
      <div className={styles['footer-wrapper']}>
        <div className={styles.footer}>
          <div className={`${styles.logo} ${styles.footer__logo}`}>
            <Link to="/home">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className={styles.footer__links}>
            {footerLinks.map((link, idx) => (
              <div className={styles.footer__link} key={idx}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.text}
                </a>
              </div>
            ))}
          </div>

          <BackToTop />
        </div>
      </div>
    </>
  );
};
