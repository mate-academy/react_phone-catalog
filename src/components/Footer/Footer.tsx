import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { assetUrl } from '../../utils/assets';
import styles from './Footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.content}`}>
      <Link className={styles.logo} to="/" aria-label="Nice Gadgets home">
        <img
          className={styles.lightLogo}
          src={assetUrl('img/figma-assets/logo-footer.svg')}
          alt="NICE GADGETS"
          width="89"
          height="32"
        />
        <img
          className={styles.darkLogo}
          src={assetUrl('img/figma-assets/logo-footer-dark.svg')}
          alt=""
          aria-hidden="true"
          width="89"
          height="32"
        />
      </Link>
      <nav className={styles.links} aria-label="Footer navigation">
        <a
          href="https://github.com/AndrzejFront/react_phone-catalog"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://github.com/AndrzejFront"
          target="_blank"
          rel="noreferrer"
        >
          Contacts
        </a>
        <a
          href="https://www.gnu.org/licenses/gpl-3.0.html"
          target="_blank"
          rel="noreferrer"
        >
          Rights
        </a>
      </nav>
      <button
        className={styles.back}
        type="button"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
              .matches
              ? 'instant'
              : 'smooth',
          })
        }
      >
        Back to top
        <span className="icon-button">
          <Icon name="up" />
        </span>
      </button>
    </div>
  </footer>
);
