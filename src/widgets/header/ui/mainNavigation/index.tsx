import { navLinksList } from '@widgets/header/model';
import styles from '../../styles/mainNavigation.module.scss';
import { UINavLink } from './UINavLink';

export const HeaderMainNavigation = () => {
  return (
    <nav aria-label="main navigation">
      <ul className={styles['main-navigation']}>
        {navLinksList.map(link => (
          <UINavLink key={link.title} link={link} />
        ))}
      </ul>
    </nav>
  );
};
