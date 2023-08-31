import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import './NavLinkMain.scss';

type Props = NavLinkProps & {
  type: 'text' | 'cart' | 'favourite';
};

export const NavLinkMain: React.FC<Props> = ({
  type,
  children,
  ...props
}) => {
  return (
    <NavLink
      className={({ isActive }) => classNames(
        'NavLinkMain',
        { [`NavLinkMain--${type}`]: type },
        { 'is-active': isActive },
      )}
      {...props}
    >
      {children}
    </NavLink>
  );
};
