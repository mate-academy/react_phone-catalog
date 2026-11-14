import { NavLink, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import classNames from 'classnames';

import styles from './Breadcrumbs.module.scss';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.breadcrumbs__crumb, {
    [styles.active]: isActive,
  });

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments.map((segment, index) => {
    const to = `/${segments.slice(0, index + 1).join('/')}`;

    return (
      <NavLink to={to} key={to} className={getLinkClass} end>
        <IoIosArrowForward className={styles['breadcrumbs__crumb-arrow']} />
        {segment.split('-').join(' ')}
      </NavLink>
    );
  });

  return (
    <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
      <NavLink to="/" className={getLinkClass} end>
        <FiHome className={styles['breadcrumbs__crumb-icon-home']} />
      </NavLink>
      {crumbs}
    </nav>
  );
};
