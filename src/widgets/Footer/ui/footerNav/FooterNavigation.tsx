import { Link } from 'react-router-dom';
import { links } from '../../model';
import styles from './footerNav.module.scss';

export const FooterNavigation = () => {
  return (
    <nav
      role="navigation"
      aria-label="Footer navigation"
      className={styles.container}
    >
      <ul className={styles['footer-nav']}>
        {links.map(link => (
          <li key={link.to} className={styles['nav-item']}>
            <Link
              to={link.to}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
