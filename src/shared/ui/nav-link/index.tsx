import { NavLink } from 'react-router-dom';
import { NavigationItem } from '../../types/NavLinkProps';
import styles from './nav-link.module.scss';

type Props = {
  data: NavigationItem;
};

export const NavigationLink: React.FC<Props> = ({ data }) => {
  const { name, path, labelProp } = data;

  return (
    <li className={`${styles['nav-item']}`}>
      <NavLink
        className={`${styles['nav-item__link']}`}
        to={path}
        aria-label={`Go to ${labelProp}`}
      >
        {name}
      </NavLink>
    </li>
  );
};
