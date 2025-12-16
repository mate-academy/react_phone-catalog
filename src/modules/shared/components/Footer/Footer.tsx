import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { Container } from '../Container';

const footerLinks = [
  { href: 'https://github.com/Nazarii84/react_phone-catalog', label: 'Github' },
  { href: '#contacts', label: 'Contacts' },
  { href: '#rights', label: 'Rights' },
] as const;

export const Footer = () => {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <NavLink to="/" className={styles.logo}>
            NICE<span className={styles.logoEmoji}>👌</span>
            <br />
            GADGETS
          </NavLink>

          <nav className={styles.nav}>
            {footerLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={styles.navLink}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className={styles.backToTop}
            onClick={handleBackToTop}
          >
            <span className={styles.backToTopText}>Back to top</span>
            <span className={styles.backToTopIcon}>˄</span>
          </button>
        </div>
      </Container>
    </footer>
  );
};
