import { NavigationItem } from '../../types/NavLinkProps';
import { NavigationLink } from '../nav-link';
import styles from './navList.module.scss';

type Props = {
  list: NavigationItem[];
  cN: string;
};

export const NavList = ({ list, cN }: Props) => {
  return (
    <nav className={styles['nav-container']}>
      <ul className={`${cN}`}>
        {list.map(link => (
          <NavigationLink key={link.name} data={link} />
        ))}
      </ul>
    </nav>
  );
};
