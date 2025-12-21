import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const Footer = () => {
  const scrolToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <Link to="/" className={styles.footer__link}>
        <img
          src="img/imagess/Logo.png"
          alt="logo"
          className={styles.footer__link__img}
        ></img>
      </Link>

      <div className={styles.container}>
        <a
          href="https://github.com/RuslanKonoplya/react_phone-catalog"
          className={styles.container__link}
        >
          GITHUB
        </a>

        <a href="#" className={styles.container__link}>
          CONTACTS
        </a>

        <a href="#" className={styles.container__link}>
          RIGHTS
        </a>
      </div>

      <div className={styles.back_to_top} onClick={scrolToTop}>
        <span className={styles.button_text}>Back to top</span>
        <span className={styles.icon}></span>
      </div>
    </footer>
  );
};
