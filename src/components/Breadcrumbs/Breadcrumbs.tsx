import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import { Icon } from '../Icon';
import { Icons } from '../../types/enums/Icons';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const lastEl = pathnames
    .pop()?.split('-')
    .map(str => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    })
    .join(' ');

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
};
