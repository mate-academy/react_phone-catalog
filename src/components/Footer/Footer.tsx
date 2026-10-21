import { NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';
import { getAssetUrl } from '../../utils/assets';

const footerLinks = [
  {
    label: 'Github',
    href: 'https://github.com/nkgrand/react_phone-catalog',
  },
  {
    label: 'Contacts',
    href: 'https://github.com/nkgrand',
  },
  {
    label: 'Rights',
    href: 'https://github.com/nkgrand/react_phone-catalog/blob/develop/LICENSE',
  },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <NavLink to="/">
          <img
            src={getAssetUrl('img/logo.svg')}
            alt="Product Catalog Logo"
            className={styles.logo}
          />
        </NavLink>

        <div className={styles.nav}>
          {footerLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className={styles.backToTop}>
          <span className={styles.backToTopText}>Back to top</span>
          <button
            type="button"
            className={styles.backToTopBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <img
              src={getAssetUrl('img/icons/arrow-up.svg')}
              alt="Arrow up"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </footer>
  );
};
