import classNames from 'classnames';
import styles from './PageLink.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { homePath } from '../../consts/paths';

type Props = {
  title: string;
  to: string;
};

export const PageLink: React.FC<Props> = ({ title, to }) => {
  const { pathname } = useLocation();
  const isActive = to === homePath ? pathname === to : pathname.startsWith(to);

  return (
    <li
      className={classNames(
        styles.PageLink,
        isActive && styles.PageLink_active,
      )}
    >
      <NavLink aria-current="page" className={styles.Link} to={to}>
        {title}
      </NavLink>
    </li>
  );
};
