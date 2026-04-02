import styles from './Footer.module.scss';
import { Container } from '../Container';
import { NavLink } from 'react-router-dom';

type Props = {
  className?: string;
};

export const Footer: React.FC<Props> = ({ className }) => {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <Container className={styles.content}>
        <NavLink to="/" className={styles.logo}>
          <img src="/img/logo.png" alt="Nice Gadgets" />
        </NavLink>
        <nav className={styles.links}>
          <a
            href="https://github.com/ivanilnytskyy/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="#">Contacts</a>
          <a href="#">Rights</a>
        </nav>

        <button type="button" className={styles.back}>
          Back to top{' '}
          <span className={styles.ctrl} onClick={handleBackToTop}>
            <img src="/img/up.png" alt="up" />
          </span>
        </button>
      </Container>
    </footer>
  );
};
