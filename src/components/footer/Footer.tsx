import { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './Footer.module.scss';

import { ArrowUpIcon } from 'ui/icon/ArrowUpIcon';
import { Logo } from 'ui/logo/Logo';

import { ROUTES } from 'utils/constants/routes';

export const Footer: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer>
      <hr />
      <div className="container">
        <div className={styles.footer}>
          <Logo />

          <div className={styles.contacts}>
            <a
              href="https://github.com/Galers"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link to={ROUTES.CONTACT}>Contact</Link>
            {/* TODO: Edit correct link */}
            <Link to={ROUTES.ERROR}>Rights</Link>
          </div>

          <button className={styles.button} onClick={scrollToTop}>
            Back to top
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
