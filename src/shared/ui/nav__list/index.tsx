import { NavigationItem } from '@shared/types/NavLinkProps';
import { NavigationLink } from '../nav-link';

type Props = {
  list: NavigationItem[];
  className: string;
};

export const NavList = ({ list, className }: Props) => {
  return (
    <nav style={{ display: 'flex' }}>
      <ul className={className}>
        {list.map(link => (
          <NavigationLink key={link.name} data={link} />
        ))}
      </ul>
    </nav>
  );
};
