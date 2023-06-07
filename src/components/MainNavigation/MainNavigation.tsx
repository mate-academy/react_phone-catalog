import './MainNavigation.scss';
import { Link, useLocation } from 'react-router-dom';
import home from '../../Icons/home.svg';

export const MainNavigation = () => {
  let currentLink = '';

  const crumbs = useLocation()
    .pathname.split('/')
    .filter((crumb) => crumb !== '');

  return (
    <div className="main-navigation">
      <div className="main-navigation__content">
        <Link to="/">
          <img src={home} alt="home" className="main-navigation__home" />
        </Link>

        {crumbs.map((crumb) => {
          const title = crumb.split('-').join(' ');

          currentLink += `/${crumb.toLowerCase()}`;

          return (
            <Link
              to={`${currentLink}`}
              key={crumb}
              className="main-navigation__category"
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
