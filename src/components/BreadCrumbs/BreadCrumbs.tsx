import { Link, NavLink, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './BreadCrumbs.scss';

import { editProductName } from '../../helpers/editProductName';

const linkClasses = (value: string, location: string[]) => cn(
  'bread-crumbs__link',
  { active: location.length > 1 && location[0] === value },
);

const BreadCrumbs = () => {
  const location = useLocation().pathname.slice(1).split('/');

  return (
    <div className="bread-crumbs">
      <div className="container">
        <div className="bread-crumbs__wrapper">
          <Link className="bread-crumbs__home" to="/">
            <img src="./icons/home.svg" alt="icon" />
          </Link>

          {location.map(value => (
            <NavLink
              key={value}
              to={`/${value}`}
              className={() => linkClasses(value, location)}
            >
              <img src="./icons/rightDis.svg" alt="icon" />
              {editProductName(value)}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
