import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';

import { Logo } from '../Logo';

import arrowUpIcon from '../../images/icons/arrow-up.svg';

export const Footer: React.FC = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <Logo Footer={true} />

          <ul className={styles.footer__links}>
            <li className={styles.footer__linkItem}>
              <Link
                to="https://github.com/AnnNikiforova"
                target="_blank"
                className={styles.footer__link}
              >
                Github
              </Link>
            </li>
            <li className={styles.footer__linkItem}>
              <Link to="/" target="_blank" className={styles.footer__link}>
                Contacts
              </Link>
            </li>
            <li className={styles.footer__linkItem}>
              <Link to="/" target="_blank" className={styles.footer__link}>
                rights
              </Link>
            </li>
          </ul>

          <button
            className={styles.footer__toTop}
            onClick={handleScrollToTop}
            aria-label="Back to top"
          >
            <span className={styles.footer__toTopText}>Back to top</span>
            <div className={styles.footer__toTopButton}>
              <img src={arrowUpIcon} alt="Arrow up" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
