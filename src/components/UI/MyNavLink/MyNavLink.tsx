import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './MyNavLink.scss';

type Props = {
  children: React.ReactNode;
  pathname: string;
  search?: string;
};

export const MyNavLink: React.FC<Props> = ({
  children,
  pathname,
  search = '',
}) => {
  const { hash } = useLocation();
  const isSideMenuActive = hash.includes('side-menu');

  return (
    <NavLink
      to={{ pathname, search }}
      replace={isSideMenuActive}
      className={({ isActive }) => classNames('my-navlink', {
        'my-navlink--active': isActive,
        'my-navlink-side-menu': isSideMenuActive,
      })}
    >
      {children}
    </NavLink>
  );
};
