import { NavLink, NavLinkProps } from 'react-router-dom';

import classNames from 'classnames';
import './NavigationLink.scss';

type Props = NavLinkProps & {
  type: 'text' | 'icon';
};

export const NavigationLink: React.FC<Props> = ({
  type,
  children,
  ...props
}) => (
  <NavLink
    className={({ isActive }) => classNames(
      'NavigationLink',
      { [`NavigationLink--${type}`]: type },
      { 'is-active': isActive },
    )}
    {...props}
  >
    {children}
  </NavLink>
);

// export const NavigationLink = () => (
//   <h1>Nav links</h1>
// );
