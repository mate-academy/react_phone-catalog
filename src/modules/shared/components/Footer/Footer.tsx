import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowUpIcon } from '../../ui/Icons/Icons';
import logo from '../../../../../public/img/Logo.svg';

const GITHUB_URL = 'https://github.com/cassiaqueiroz/react_phone-catalog';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={`${styles.row} container`}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Nice Gadgets" className={styles.logoImg} />
        </Link>

        <nav className={styles.links}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Github
          </a>
          <a href="#contacts" className={styles.link}>
            Contacts
          </a>
          <a href="#rights" className={styles.link}>
            Rights
          </a>
        </nav>

        <button
          type="button"
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Voltar ao topo"
        >
          <span className={styles.backToTopLabel}>Back to top</span>
          <span className={styles.backToTopIcon} aria-hidden="true">
            <ArrowUpIcon />
          </span>
        </button>
      </div>
    </footer>
  );
};
