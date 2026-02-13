import s from './Breadcrumbs.module.scss';
import home from '../../assets/images/icons/Home.svg';
import arrow from '../../assets/images/icons/Vector-right(Stroke).svg';
import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname.slice(1);

  if (path === '/') {
    return null;
  }

  return (
    <div className={s.navContent}>
      {path && (
        <>
          <Link to="/" className={s.homeLink}>
            <img className={s.navImg} src={home} alt="home" />
          </Link>

          <div className={s.arrow}>
            <img className={s.navImg} src={arrow} alt="arrow" />
          </div>

          <span className={s.path}>{path}</span>
        </>
      )}
    </div>
  );
};
