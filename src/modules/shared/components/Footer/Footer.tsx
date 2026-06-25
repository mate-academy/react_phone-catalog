import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowUpIcon } from '../../ui/Icons/Icons';

// TODO: troque pelo link do seu repositório no GitHub
const GITHUB_URL = 'https://github.com/SEU-USUARIO/react_phone-catalog';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <Link to="/" className={styles.logo}>
          Nice<span className={styles.logoAccent}>Gadgets</span>
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
          <ArrowUpIcon />
        </button>
      </div>
    </footer>
  );
};
