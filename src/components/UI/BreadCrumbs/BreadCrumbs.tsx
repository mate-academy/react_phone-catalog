import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PAGE } from '../../../definitions/enums/Router';
import { capitalize } from '../../../utils/stringHelper';

export const BreadCrumbs: React.FC = memo(() => {
  const location = useLocation();
  // const { } = useParams();
  const breadCrumbs = location.pathname.slice(1).split('/');
  const category = breadCrumbs[0];

  return (
    <ul>
      <li>
        <Link to={PAGE.Home}>
          <img src="./img/icons/home-icon.svg" alt="home icon" />
        </Link>
      </li>
      <img src="./img/icons/arrow-right-icon.svg" alt="arrow icon" />
      <li>
        <Link to={breadCrumbs[0]}>
          {capitalize(category)}
        </Link>
      </li>
      <img src="./img/icons/arrow-right-icon.svg" alt="arrow icon" />
      <li>
        <Link to={location.pathname} />
      </li>
    </ul>
  );
});
