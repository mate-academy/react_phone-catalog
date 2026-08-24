import styles from './footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <nav className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__logo}>
          <Link to="/">
            <img
              className={styles.footer__logo__img}
              src={`${import.meta.env.BASE_URL}/img/Logo.svg`}
              alt="logo nice gadgets"
            />
            <img
              className={styles.footer__logo__imgDark}
              src={`${import.meta.env.BASE_URL}/img/icons-dark/Logo.svg`}
              alt="logo nice gadgets"
            />
          </Link>
        </div>

        <div className={styles.footer__items}>
          <a
            href="https://github.com/anastasiiadns/react_phone-catalog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__item}
          >
            GitHub
          </a>
          <Link
            to="https://github.com/anastasiiadns"
            className={styles.footer__item}
          >
            Contacts
          </Link>
          <Link to="/rights" className={styles.footer__item}>
            Rights
          </Link>
        </div>

        <div className={styles.footer__top}>
          <p className={styles.footer__backToTop}>Back to top</p>
          <button
            className={styles.footer__arrow}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            <img
              className={styles.footer__arrow__img}
              src={`${import.meta.env.BASE_URL}/img/icons/ArrowRight.svg`}
              alt="icon arrow right"
            />
            <img
              className={styles.footer__arrow__imgDark}
              src={`${import.meta.env.BASE_URL}/img/icons-dark/Arrow-Right-Upp.svg`}
              alt="icon arrow right"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};
