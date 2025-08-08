import { Link } from 'react-router-dom';
import { linksList } from '../../model';
import styles from '../../styles/footerNav.module.scss';
import { NavAriaLabels, NavElementName, RoutePath } from '@shared/types';

export const FooterNavigation = () => {
  return (
    <nav
      role="navigation"
      aria-label="Footer navigation"
      className={styles.container}
    >
      <ul className={styles['footer-nav']}>
        <li className={styles['nav-item']}>
          <Link
            to={RoutePath.Github}
            rel="nofollow"
            aria-label={NavAriaLabels.Github}
            className={styles.link}
          >
            {NavElementName.Github}
          </Link>
        </li>
        {linksList.map(link => (
          <li key={link.path} className={styles['nav-item']}>
            <Link
              to={link.path}
              aria-label={link.ariaLabel}
              className={styles.link}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
