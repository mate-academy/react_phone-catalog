import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import logo from '/public/img/niceLogo.png';
import { IoIosArrowUp } from 'react-icons/io';
export const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="/">
        <img
          className={styles.footer__logo}
          src={logo}
          alt="NiceGadgetLogo"
        ></img>
      </a>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <a
              href="https://github.com/OlegMysko/react_phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.nav__link}
            >
              GitHub
            </a>
          </li>
          <li className={styles.nav__item}>
            <Link to="/contacts" className={styles.nav__link}>
              Contacts
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/rights" className={styles.nav__link}>
              rights
            </Link>
          </li>
        </ul>
      </nav>

      <a
        href="#top"
        onClick={e => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={styles.footer__button}
      >
        <span className={styles.footer__text}>Back to Top</span>
        <IoIosArrowUp className={styles.footer__icon} />
      </a>
    </div>
  );
};
