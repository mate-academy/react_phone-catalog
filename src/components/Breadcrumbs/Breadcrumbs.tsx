import { NavLink, useLocation } from 'react-router-dom';
import './Breadcrumbs.scss';
import HomeIcon from './../../img/home-icon.svg';
import RightArrow from './../../img/right-arrow.png';

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav className="breadcrumbs">
      <NavLink to="/" className="breadcrumbs__link">
        <img src={HomeIcon} alt="home-icon" />
      </NavLink>
      {pathnames.map((name, index) => {
        const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={name} className="breadcrumbs__current">
            <img src={RightArrow} alt="arrow" />
            <div className="breadcrumbs__name">{capitalize(name)}</div>
          </span>
        ) : (
          <span key={name} className="breadcrumbs__uncurrent">
            <img src={RightArrow} alt="arrow" />
            <NavLink to={routeTo} className="breadcrumbs__link">
              <div className="breadcrumbs__name">{capitalize(name)}</div>
            </NavLink>
          </span>
        );
      })}
    </nav>
  );
};
