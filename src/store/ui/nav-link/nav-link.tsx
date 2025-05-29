import { NavLink } from 'react-router-dom';
import { NavigationItem } from '../../types/NavLinkProps';
import './nav-link.scss';

type Props = {
  data: NavigationItem;
};

export const NavigationLink: React.FC<Props> = ({ data }) => {
  const { name, path, labelProp } = data;

  return (
    <li className="nav-item">
      <NavLink
        className="nav-item__link"
        to={path}
        aria-label={`Go to ${labelProp}`}
      >
        {name}
      </NavLink>
    </li>
  );
};
