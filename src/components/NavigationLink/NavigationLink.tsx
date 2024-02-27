import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type NavLinkProps = {
  to: string,
  name?: string,
  extraClass?: string;
  children?: React.ReactNode,
};

export const NavigationLink: React.FC<NavLinkProps> = ({
  to,
  name,
  extraClass,
  children,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames('nav__link', `${extraClass}`, {
        'nav__link--active': isActive,
      })}
    >
      {name}
      {children}
    </NavLink>
  );
};
