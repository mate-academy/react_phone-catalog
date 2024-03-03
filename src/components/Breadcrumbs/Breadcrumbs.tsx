import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import { memo, useMemo } from 'react';
import { Icon } from '../Icon';
import { Icons } from '../../types/Icons';

export const Breadcrumbs = memo(() => {
  const location = useLocation();

  const pathnames = useMemo(() => {
    return location.pathname.split('/').filter((x) => x);
  }, [location]);

  const lastEl = useMemo(() => {
    return pathnames
      .pop()?.split('-')
      .map(str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(' ');
  }, [pathnames]);

  return (
    <nav aria-label="breadcrumbs2">
      <ol className="breadcrumbs">
        <ul className="breadcrumbs__link">
          <NavLink to="/">
            <Icon icon={Icons.Home} />
          </NavLink>
          <Icon icon={Icons.ArrowRight} />
        </ul>
        {pathnames.map((link, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <ul className="breadcrumbs__link" key={link}>
              <NavLink to={routeTo}>
                {link}
              </NavLink>
              <Icon icon={Icons.ArrowRight} />
            </ul>
          );
        })}
        <ul className="breadcrumbs__current">
          {lastEl}
        </ul>
      </ol>
    </nav>
  );
});
