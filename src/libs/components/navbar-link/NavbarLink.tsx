import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './styles.scss';
import { NavbarLinkType } from '../navbar/libs/types/navbar-links.type';
import { getLinkClass } from '../../helpers';

type Props = {
  className?: string;
  link?: NavbarLinkType;
  children?: React.ReactNode;
  isIconLink?: boolean;
};

export const NavbarLink: React.FC<Props> = ({
  className,
  link,
  children,
  isIconLink,
}) => {
  const { pathname, search } = useLocation();

  return (
    <div className={classNames(className, 'navbar-link')}>
      {link && (
        <NavLink
          to={link.url}
          className={getLinkClass}
          state={{ pathname, search }}
        >
          {isIconLink ? children : link.title}
        </NavLink>
      )}
    </div>
  );
};
