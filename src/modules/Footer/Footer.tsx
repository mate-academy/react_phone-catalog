import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: React.FC = () => {
  return (
    <>
      <hr />
      <div className={`container ${styles.footer}`}>
        <Link to="/" className={styles.footer__logo}>
          <img
            className={styles['footer__logo--img']}
            src="public/img/Logogadgets.svg"
            alt="Nice Gadgets company logo"
          />
        </Link>
        <span className={styles.footer__links}>
          <Link
            className="uppercase"
            to={'https://github.com/ykrapivka?tab=repositories'}
          >
            Github
          </Link>
          <Link
            className="uppercase"
            to={'https://github.com/ykrapivka?tab=repositories'}
          >
            Contacts
          </Link>
          <Link
            className="uppercase"
            to={'https://github.com/ykrapivka?tab=repositories'}
          >
            Rights
          </Link>
        </span>
        <button onClick={scrollToTop} className={styles.footer__button}>
          Back to Top
          <img src="public/img/icons/BackToTOP.svg" />
        </button>
      </div>
    </>
  );
};

export default Footer;
