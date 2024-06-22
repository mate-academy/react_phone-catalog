import { NavLink, useLocation } from 'react-router-dom';
import styles from './NavigationButton.module.scss';

import cn from 'classnames';

type Props = {
  children: React.ReactNode;
  href: string;
};

export const NavigationButton: React.FC<Props> = ({ children, href }) => {
  const { pathname } = useLocation();

  return (
    <NavLink
      to={href}
      state={{
        prevPath: pathname,
      }}
      className={({ isActive }) =>
        cn(styles.Link, {
          [styles.Active]: isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
};
