import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <NavLink to="/" className={styles.footer__logoLink}>
          <img
            src="img/footer/footer-logo.png"
            alt="nice gadgets logo"
            width="89px"
            className={styles.footer__img}
          />
        </NavLink>
        <nav className={styles.footer__navigation}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/panasovskyi/react_phone-catalog"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.footer__link}
              >
                github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/panasovskyi/react_phone-catalog"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.footer__link}
              >
                contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/panasovskyi/react_phone-catalog"
                target="_blank"
                rel="noreferrer noopener"
                className={styles.footer__link}
              >
                rights
              </a>
            </li>
          </ul>
        </nav>
        <div className={styles.footer__up}>
          <p className={styles.footer__label}>Back to top</p>

          <button className={styles.footer__button}>
            <img
              src="img/icons/arrow-left-active.svg"
              alt="back to top"
              className={styles.footer__icon}
              onClick={scrollToTop}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
