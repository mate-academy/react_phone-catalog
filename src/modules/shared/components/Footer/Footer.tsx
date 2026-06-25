import { NavLink } from 'react-router-dom';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './Footer.module.scss';

export const Footer = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <img src={getImg('/img/logo.svg')} alt="Nice Gadgets" />
        </NavLink>

        <nav className={styles.nav}>
          <a
            href="https://github.com/NiaAnastasia"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            Github
          </a>
          <a
            href="https://github.com/NiaAnastasia"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            Contacts
          </a>
          <a
            href="https://github.com/NiaAnastasia"
            target="_blank"
            rel="noreferrer"
            className={styles.navLink}
          >
            Rights
          </a>
        </nav>

        <button className={styles.backToTop} onClick={handleScrollToTop}>
          <span>Back to top</span>
          <div className={styles.backToTopIcon}>
            <img src={getImg('/img/icons/arrow-up.svg')} alt="arrow up" />
          </div>
        </button>
      </div>
    </footer>
  );
};
