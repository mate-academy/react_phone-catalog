import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__logo} onClick={scrollToTop}>
        <img
          src={'./logo/Logo.svg'}
          alt="Logo"
          className={styles.footer__logo}
        />
      </Link>
      <ul className={styles.footer__list}>
        {['Github', 'Contacts', 'Rights'].map(element => (
          <li key={element}>
            <Link
              to="https://github.com/s1rserg"
              target="_blank"
              className={styles.footer__link}
            >
              {element}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.back}>
        <div className={styles.back__text} onClick={scrollToTop}>
          Back to top
        </div>
        <button className={styles.back__button} onClick={scrollToTop}>
          <img
            src="./icons/back.svg"
            alt="To top"
            className={styles.back__icon}
          />
        </button>
      </div>
    </footer>
  );
};
