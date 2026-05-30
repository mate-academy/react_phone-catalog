import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowIcon } from '../icons/Arrow';

export const Footer = () => {
  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <img src="/img/header/LogoLarge.svg" alt="Nice Gadgets" />
        </Link>

        <nav className={styles.nav}>
          <a
            href="https://github.com/VladChudin/react_phone-catalog"
            target="_blank"
            rel="noreferrer"
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

        <div className={styles.button__back}>
          <p className={styles.text}>Back to top</p>
          <button className={styles.button} onClick={scrollToTop}>
            <ArrowIcon direction="up" />
          </button>
        </div>
      </div>
    </footer>
  );
};
