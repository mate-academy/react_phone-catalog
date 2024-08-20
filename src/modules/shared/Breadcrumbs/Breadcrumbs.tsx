import { Link, useLocation } from 'react-router-dom';

import classNames from 'classnames';
import { FC } from 'react';
import { FiHome } from 'react-icons/fi';
import { GoChevronLeft } from 'react-icons/go';
import { ROUTES } from '../../../constants/ROUTES';
import styles from './Breadcrumbs.module.css';

interface Props {
  className?: string;
}

export const Breadcrumbs: FC<Props> = ({ className }) => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(path => path !== '');
  let breadcrumbsPath = '';

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={classNames(styles.container, className)}>
      <Link to={ROUTES.HOME} className={styles.icon}>
        <FiHome size={16} />
      </Link>
      {pathnames.map((name, idx) => {
        breadcrumbsPath += `/${name}`;
        const isLast = idx === pathnames.length - 1;

        return isLast ? (
          <div key={idx} className={styles.activeLink}>
            <GoChevronLeft size={16} className={styles.icon} />
            <span>{capitalize(name)}</span>
          </div>
        ) : (
          <Link key={idx} to={breadcrumbsPath} className={styles.link}>
            <GoChevronLeft size={16} className={styles.icon} />
            <span>{capitalize(name)}</span>
          </Link>
        );
      })}
    </div>
  );
};
