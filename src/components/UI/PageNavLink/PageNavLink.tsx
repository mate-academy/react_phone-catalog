import './nav-link.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  path: string;
  linkType: string;
  text?: string;
  goBackLocation?: {
    pathname: string;
    search: string;
  }
};

export const PageNavLink: React.FC<Props> = ({
  children,
  text,
  path,
  linkType,
  goBackLocation,
}) => {
  return (
    <NavLink
      to={path}
      state={goBackLocation}
      className={({ isActive }) => classNames(
        `header__${linkType}-link`,
        'nav-link',
        { 'nav-link--active': isActive },
      )}
    >
      {(children && children) || (text && text)}
    </NavLink>
  );
};
