import { Link, useLocation, NavLink } from 'react-router-dom';
import GoHome from '../../icons/GoHome.svg';
import { getPathName } from '../../helpers/getPathName';
import Arrow__Right from '../../icons/Arrow_right.svg';
import './BreadCrumbs.scss';

const BreadCrumbs = () => {
  const location = useLocation().pathname;
  const pathName = location.slice(1).split('/');

  return (
    <div className="breadCrumbs" data-cy="breadCrumbs">
      <Link
        to="/"
        className="breadCrumbs__home-link"
      >
        <img src={GoHome} alt="HOME" />
      </Link>

      {pathName.map((value) => (
        <NavLink
          className="breadCrumbs__link"
          key={value}
          to={`/${value}`}
        >
          <img src={Arrow__Right} alt="" className="breadCrumbs__img" />
          <span className="breadCrumbs__name">
            {getPathName(value)}
          </span>
        </NavLink>
      ))}
    </div>
  );
};

export default BreadCrumbs;
