import './nav-link.scss';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  children?: ReactNode;
  path: string;
  linkType: string;
  text?: string;
};

export const PageNavLink: React.FC<Props> = ({
  children,
  text,
  path,
  linkType,
}) => {
  return (
    <NavLink
      to={path}
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
