import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.Footer}>
      <div className={styles.Footer__wrapper}>
        <div className={styles.Footer__logoWrapper}>
          <Link to={'/'} onClick={goToTop}>
            <img
              src="img/icons/Logo.svg"
              alt="company logo"
              className={styles.Footer__logo}
            />
          </Link>
        </div>
        <div className={styles.Footer__contacts}>
          <Link
            to={'https://github.com/maksym-kostetskyi'}
            target="_blank"
            className={styles.Footer__contactsLink}
          >
            Github
          </Link>
          <Link
            to={'mailto:mkost996@gmail.com'}
            className={styles.Footer__contactsLink}
          >
            Contacts
          </Link>
          <Link
            to={'https://github.com/maksym-kostetskyi'}
            target="_blank"
            className={styles.Footer__contactsLink}
          >
            Rights
          </Link>
        </div>
        <div className={styles.Footer__backBlock}>
          <p className={styles.Footer__backBlockText}>Back to top</p>
          <button
            onClick={goToTop}
            className={styles.Footer__backBlockButton}
          ></button>
        </div>
      </div>
    </div>
  );
};
