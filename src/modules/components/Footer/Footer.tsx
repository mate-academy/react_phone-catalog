import { Link } from 'react-router-dom';
import logo from '@img/navigation/logo.svg';
import logoBlack from '@img/navigation/logo-black.svg';
import buttonFooter from '@img/icons/arrow-top-footer.svg';
import buttonFooterBlack from '@img/icons/arrow-top-footer-black.svg';
import styles from './Footer.module.scss';

type Props = {
  isLightMode: boolean;
};

export const Footer: React.FC<Props> = ({ isLightMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footer__box}>
        <Link to="/home" className={styles.footer__img}>
          <img
            src={!isLightMode ? logo : logoBlack}
            alt="logo"
            className={styles.footer__logo}
          />
        </Link>
        <div className={styles.footer__info}>
          <a
            target="_blank"
            className={styles.footer__link}
            href="https://github.com/MateuszCieplak"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            target="_blank"
            className={styles.footer__link}
            href="https://github.com/MateuszCieplak"
            rel="noreferrer"
          >
            Contacts
          </a>
          <a
            target="_blank"
            className={styles.footer__link}
            href="https://github.com/MateuszCieplak"
            rel="noreferrer"
          >
            Rights
          </a>
        </div>
        <div className={styles.footer__bottom} onClick={() => scrollToTop()}>
          <span className={styles['footer__button-info']}>Back to top</span>
          <button className={styles.footer__button}>
            <img
              className={styles['footer__button-image']}
              src={!isLightMode ? buttonFooter : buttonFooterBlack}
              alt="Back-top-button"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
