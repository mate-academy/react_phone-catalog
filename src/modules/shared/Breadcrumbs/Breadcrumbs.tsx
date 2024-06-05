import { Link, useLocation } from 'react-router-dom';

import { ROUTES } from '../../../constants/ROUTES';
import styles from './Breadcrumbs.module.css';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(path => path !== '');
  let breadcrumbsPath = '';

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className={styles.container}>
      <Link to={ROUTES.HOME} className={styles.icon}>
        <img src="img/icons/home-icon.svg" alt="home icon" />
      </Link>
      {pathnames.map((name, idx) => {
        breadcrumbsPath += `/${name}`;
        const isLast = idx === pathnames.length - 1;

        return isLast ? (
          <div key={idx} className={styles.activeLink}>
            <img
              src="img/icons/arrow-right-grey-icon.svg"
              alt="arrow icon"
              className={styles.icon}
            />
            <span>{capitalize(name)}</span>
          </div>
        ) : (
          <Link key={idx} to={breadcrumbsPath} className={styles.link}>
            <img
              src="img/icons/arrow-right-grey-icon.svg"
              alt="arrow icon"
              className={styles.icon}
            />
            <span>{capitalize(name)}</span>
          </Link>
        );
      })}
    </div>
  );
};
