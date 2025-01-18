import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';

export const BreadCrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const arrow = (
    <img
      className={style.breadcrumbs__icons}
      src="src\components\BreadCrumbs\assets\Arrow Right-inactive.png"
      alt=""
    />
  );

  const homeIcon = (
    <img
      className={style.breadcrumbs__icons}
      src="src\components\BreadCrumbs\assets\Home.png"
      alt=""
    />
  );

  return (
    <nav className={style.breadcrumbs}>
      <ul className={style.breadcrumbs__list}>
        <li className={style.breadcrumbs__path}>
          <Link to="/">{homeIcon}</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li className={style.breadcrumbs__path} key={to}>
              {arrow}
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
