import styles from './Footer.module.scss';
import { Link, useLocation } from 'react-router-dom';
const logoSvg = `${import.meta.env.BASE_URL}img/site/Nice Gadgets.svg`;
const handOkSvg = `${import.meta.env.BASE_URL}img/site/hand-ok.svg`;
const arrowBackToTop = `${import.meta.env.BASE_URL}img/site/arrow-back-to-top.svg`;

export default function Footer() {
  const location = useLocation();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <img src={logoSvg} alt="Nice Gadgets" />
          <img
            className={styles.logoHandOk}
            src={handOkSvg}
            alt="Hand OK icon"
          />
        </div>

        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <a
              href="https://github.com/srvalle/react_phone-catalog"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname === '/contacts' ? styles.menuItemActive : ''}`}
          >
            <Link to="/contacts">Contacts</Link>
          </li>
          <li
            className={`${styles.menuItem} ${location.pathname === '/rights' ? styles.menuItemActive : ''}`}
          >
            <Link to="/rights">Rights</Link>
          </li>
        </ul>

        <button
          type="button"
          className={styles.backToTop}
          onClick={handleScrollToTop}
        >
          <span className={styles.backToTopText}>Back to top</span>
          <div className={styles.backToTopIcon}>
            <img src={arrowBackToTop} alt="Back to top" />
          </div>
        </button>
      </div>
    </footer>
  );
}
