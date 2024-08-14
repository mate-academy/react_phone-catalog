import classNames from 'classnames';
import styles from './NavigationItem.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { homePath } from '../../consts/paths';

type Props = {
  title: string;
  to: string;
};

export const NavigationItem: React.FC<Props> = ({ title, to }) => {
  const { pathname } = useLocation();
  const isActive = to === homePath ? pathname === to : pathname.startsWith(to);

  return (
    <li
      className={classNames(
        styles.NavigationItem,
        isActive && styles.NavigationItem_active,
      )}
    >
      <NavLink aria-current="page" className={styles.Link} to={to}>
        {title}
      </NavLink>
    </li>
  );
};
