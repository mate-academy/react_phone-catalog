import { Link, useLocation } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';
import { IconHome } from '../Icons/IconHome';

export const BreadCrumbs = () => {
  const location = useLocation();
  let currentLink = '..';

  const crumbs = location.pathname.split('/').map(crumb => {
    if (crumb === '') {
      return;
    } else {
      currentLink += `/${crumb}`;
    }

    return (
      <div key={crumb} className={style.crumb}>
        <Link to={currentLink}>{crumb === '' ? <IconHome /> : crumb}</Link>
      </div>
    );
  });

  return <div className={style.breadCrumbs}>{crumbs}</div>;
};
