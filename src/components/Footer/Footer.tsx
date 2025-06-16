import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Button } from '../Button';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <NavLink to={'/'} className={styles.footer__logo}>
        <div className={styles.footer__logo__img} />
      </NavLink>
      <div className={styles.footer__contacts}>
        <a
          className={styles.footer__contacts__item}
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className={styles.footer__contacts__item}
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contacts
        </a>
        <a
          className={styles.footer__contacts__item}
          href="https://example.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          rights
        </a>
      </div>
      <div className={styles.footer__back_to_top}>
        <p className={styles.footer__back_to_top__text}>Back to top</p>
        <Button
          direction="up"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        />
      </div>
    </footer>
  );
};
