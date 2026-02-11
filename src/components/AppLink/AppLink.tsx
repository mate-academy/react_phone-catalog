import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import styles from './AppLink.module.scss';

export const AppLink: React.FC<NavLinkProps> = ({ className, ...rest }) => (
  <NavLink
    {...rest}
    className={({ isActive }) =>
      classNames(styles.link, className, { [styles.active]: isActive })
    }
  />
);
