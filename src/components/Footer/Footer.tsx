import { Link } from 'react-router-dom';
import s from './Footer.module.scss';
import logo from '../../assets/images/Logo.svg';
import button from '../../assets/images/icons/Vector (Stroke).svg';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <footer className={s.footer}>
      <div className={s.footerContent}>
        <Link to="/" className={s.logo} aria-label="Go to home page">
          <img src={logo} alt="logo" />
        </Link>
        <ul className={s.linkList}>
          <li>
            <a
              href="https://github.com"
              className={s.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GITHUB
            </a>
          </li>
          <li>
            <a href="tel:+12345555555" className={s.footerLink}>
              CONTACTS
            </a>
          </li>
          <li>
            <a className={s.footerLink} href="/">
              RIGHTS
            </a>
          </li>
        </ul>

        <div className={s.backToTop} onClick={scrollToTop}>
          <span className={s.backText}>Back to top</span>
          <button type="button" className={s.buttonImg}>
            <img src={button} alt="scroll up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
