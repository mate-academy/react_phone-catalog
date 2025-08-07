import { NavigationLink } from '@ui/navLink';
import { navLinksList } from '@widgets/header/model';
import styles from '../../styles/mainNavigation.module.scss';

export const HeaderMainNavigation = () => {
  return (
    <nav aria-label="main navigation">
      <ul className={styles['main-navigation']}>
        {navLinksList.map(link => (
          <NavigationLink key={link.title} data={link} />
        ))}
      </ul>
    </nav>
  );
};
