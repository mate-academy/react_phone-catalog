import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Link to="/">
          <img
            src="img/Logo.svg"
            alt="Phone catalog"
            className={styles.footer__logo}
          />
        </Link>

        <div className={styles.information}>
          <Link
            to={'https://github.com/'}
            target="_blank"
            className={styles.link}
          >
            <p className={styles.information__text}>Github</p>
          </Link>
          <Link to={''} className={styles.link}>
            <p className={styles.information__text}>Contacts</p>
          </Link>
          <Link to={''} className={styles.link}>
            <p className={styles.information__text}>rights</p>
          </Link>
        </div>

        <div className={styles['button-back']}>
          <p className={styles['button-back__text']}>Back to top</p>

          <button
            className={styles['button-back__btn']}
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              });
            }}
          >
            <img src="img/icons/back-icon.svg" alt="Back button" />
          </button>
        </div>
      </footer>
    </>
  );
};
