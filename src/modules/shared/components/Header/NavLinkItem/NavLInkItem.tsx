import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../Header.module.scss';

type Props = {
  label: string;
  to: string;
};

export const NavLinkItem: React.FC<Props> = ({ label, to }) => {
  const location = useLocation();

  return (
    <NavLink
      to={{ pathname: to, search: location.search }}
      className={({ isActive }) =>
        // eslint-disable-next-line max-len
        classNames(styles.navbar__item, { [styles.navbar__item_isActive]: isActive })
      }
    >
      {label}
    </NavLink>
  );
};
