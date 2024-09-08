import { FC, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useIconSrc } from '../../utils/hooks/useIconSrc';
import { HOME } from '../../utils/routes';
import classNames from 'classnames';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  const { logoUrl, arrowLeftUrl } = useIconSrc();

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const contentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;

      setShowBackToTop(contentHeight > viewportHeight);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.wrapper, styles.container)}>
        <NavLink to={HOME} className={styles.logoLink}>
          <img src={logoUrl} alt="logo" className={styles.logo} />
        </NavLink>
        <nav className={styles.nav}>
          <Link
            to="https://github.com/yaros-dev"
            className={styles.item}
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            to="https://www.linkedin.com/in/yaroslav-pazynenko-5496ba237/"
            className={styles.item}
            target="_blank"
          >
            Contact
          </Link>
          <Link
            to="https://github.com/yaros-dev"
            className={styles.item}
            target="_blank"
          >
            Rights
          </Link>
        </nav>
        <div
          className={classNames(styles.backToTop, {
            [styles.layout]: !showBackToTop,
          })}
        >
          <p className={styles.backToTopText}>Back to top</p>
          <button
            aria-label="Scroll to top"
            type="button"
            id="back-to-top"
            onClick={scrollToTop}
            className={styles.backToTopButton}
          >
            <img
              src={arrowLeftUrl}
              alt="back to top"
              className={styles.backToTopIcon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
