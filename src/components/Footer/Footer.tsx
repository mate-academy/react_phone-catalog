import { Logo } from '../Logo';
import { IconChevronUp } from '../Icons';
import styles from './Footer.module.scss';

const REPO_URL = 'https://github.com/nester02/react_phone-catalog';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Logo className={styles.logo} />

        <ul className={styles.links}>
          <li>
            <a
              className={styles.link}
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>

          <li>
            <a
              className={styles.link}
              href="https://github.com/nester02"
              target="_blank"
              rel="noreferrer"
            >
              Contacts
            </a>
          </li>

          <li>
            <a
              className={styles.link}
              href={`${REPO_URL}/blob/master/LICENSE`}
              target="_blank"
              rel="noreferrer"
            >
              Rights
            </a>
          </li>
        </ul>

        <button
          type="button"
          className={styles.backToTop}
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
          }}
        >
          Back to top
          <span className={styles.backToTopButton}>
            <IconChevronUp />
          </span>
        </button>
      </div>
    </footer>
  );
};
