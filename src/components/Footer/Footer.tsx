import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../../public/img/Nice-Gadgets-logo.png';
import BackToTop from '../BackToTop/BackToTop';

const footerLinks = [
  { text: 'Github', href: 'https://github.com/futdevelop' },
  { text: 'Contacts', href: 'https://t.me/kolya2' },
  { text: 'Rights', href: 'https://t.me/kolya2' },
];

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
            {footerLinks.map(link => (
              <div className={styles.footer__link}>
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
