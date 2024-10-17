import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '@ui/logo/Logo';
import { ArrowUpIcon } from '@ui/icon/ArrowUpIcon';

import { ROUTES } from '@utils/constants/routes';
import { scrollToTop } from '@utils/helpers/scrollToTop';

import styles from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footer}>
          <Logo onClickAction={scrollToTop} />

          <div className={styles.contacts}>
            <a
              href="https://github.com/Galers"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
            >
              GitHub
            </a>
            <Link to={ROUTES.CONTACT} title="Contact">
              Contact
            </Link>
            <Link to={ROUTES.RIGHTS} title="Rights">
              Rights
            </Link>
          </div>

          <button
            className={styles.button}
            onClick={scrollToTop}
            type="button"
            aria-label="Scroll to the top of the page"
            title="Back to top"
          >
            Back to top
            <ArrowUpIcon />
          </button>
        </div>
      </div>
    </footer>
  );
};
