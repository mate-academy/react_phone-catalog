import '../../styles/NavBarItem/NavBarItem.scss';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';

type Props = NavLinkProps & {
  type: 'text' | 'fav' | 'cart';
};

export const NavBarItem: React.FC<Props> = ({
  type,
  children,
  ...props
}) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => classNames('nav-item', `nav-item-${type}`, {
        'is-active': isActive,
      })}
    >
      {children}
    </NavLink>
  );
};
