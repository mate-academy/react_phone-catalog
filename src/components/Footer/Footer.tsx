import React from 'react';
import styles from './Footer.module.scss';
import '../../styles/App.scss';
import ArrowButton from '../ArrowButton';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.footer}>
      <div className={`${styles.footer__wrapper} page__footer-wrapper`}>
        <a href="#">
          <img src="../public/img/footer/logo.png" alt="" />
        </a>

        <nav className={styles.footer__nav}>
          <ul className={styles.footer__list}>
            <li className={styles.footer__item}>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                github
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                contacts
              </a>
            </li>
            <li className={styles.footer__item}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__link}
              >
                rights
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.footer__back}>
          <span className={styles['footer__back-text']}>Back to top</span>
          <ArrowButton onHandlePage={scrollToTop}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876 9.52855L7.52876 5.52856C7.78911 5.26821 8.21122 5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891 12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891 10.7317 11.5288 10.4714L8.00016 6.94277L4.47157 10.4714C4.21122 10.7317 3.78911 10.7317 3.52876 10.4714Z"
                fill="currentColor"
              />
            </svg>
          </ArrowButton>
        </div>
      </div>
    </section>
  );
};

export default Footer;
