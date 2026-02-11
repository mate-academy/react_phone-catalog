import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';
import logo from '../../assets/logos/Logo.svg';
import arrowUp from '../../assets/Icons/Arrow-up.svg';

export const Footer = () => {
  const getUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={classNames(styles.footer, 'inlineContainer')}>
      <div className={classNames(styles.footer__content, 'gridContainer')}>
        <div className={styles.footer__part}>
          <Link to="/home" className={styles.footer__linkHome}>
            <img src={logo} className={styles.footer__home} alt="logo" />
          </Link>
        </div>
        <div className={styles.footer__part}>
          <ul className={styles.footer__list}>
            <ul className={classNames(styles.footer__link, 'uppercase')}>
              <a
                href="https://github.com/sborichevskyi"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </ul>
            <ul className={classNames(styles.footer__link, 'uppercase')}>
              <a
                href="https://github.com/sborichevskyi"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contacts
              </a>
            </ul>
            <ul className={classNames(styles.footer__link, 'uppercase')}>
              <a
                href="https://github.com/sborichevskyi"
                className={styles.footer__link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Rights
              </a>
            </ul>
          </ul>
        </div>
        <div className={styles.footer__part}>
          <div className={styles.footer__upper} onClick={() => getUp()}>
            <p className={classNames(styles.footer__text, 'small-text')}>
              Back to top
            </p>
            <button className={styles.footer__button}>
              <img className={styles.footer__arrow} src={arrowUp} alt="upp" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
