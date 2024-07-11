import { Link, useLocation } from 'react-router-dom';
import style from './BreadCrumbs.module.scss';
import { IconHome } from '../Icons/IconHome';
import { useContext } from 'react';
import { LanguageContext } from '../../store/LanguageProvider';

export const BreadCrumbs = () => {
  const { t } = useContext(LanguageContext);
  const { pathname } = useLocation();
  let currentLink = '..';

  const crumbs = pathname.split('/').map(crumb => {
    currentLink += `/${crumb}`;

    return (
      <div key={crumb} className={style.crumb}>
        <Link to={currentLink}>
          {crumb === '' ? <IconHome /> : t(crumb.replaceAll('-', ' '))}
        </Link>
      </div>
    );
  });

  return <div className={style.breadCrumbs}>{crumbs}</div>;
};
