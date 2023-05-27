import './MainNavigation.scss';
import { Link, useLocation } from 'react-router-dom';
import home from '../../Icons/home.svg';
import arrowRight from '../../Icons/arrow-right.svg';

export const MainNavigation = () => {
  const location = useLocation();

  let pageTitle = '';

  switch (location.pathname) {
    case '/phones':
      pageTitle = 'Phones';
      break;
    case '/tablets':
      pageTitle = 'Tablets';
      break;
    case '/accessories':
      pageTitle = 'Accessories';
      break;
    default:
      pageTitle = 'Home';
      break;
  }

  return (
    <div className="main-navigation">
      <div className="main-navigation__content">
        <Link to="/">
          <img src={home} alt="home" className="main-navigation__home" />
        </Link>

        <img
          src={arrowRight}
          alt="arrowRight"
          className="main-navigation__arrow"
        />

        <Link to={location.pathname} className="main-navigation__category">
          {pageTitle}
        </Link>
      </div>
    </div>
  );
};
