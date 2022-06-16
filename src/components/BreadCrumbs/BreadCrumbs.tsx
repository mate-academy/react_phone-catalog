import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Arrow } from '../../assets/icons/small-arrow.svg';
import { ReactComponent as Home } from '../../assets/icons/Home.svg';

import './breadCrumbs.scss';

type Props = {
  title: string;
};

export const BreadCrumbs: React.FC<Props> = ({ title }) => {
  const location = useLocation().pathname.split('/').slice(1);

  return (
    <div className="breadcrumbs">
      <Link to="/" className="breadcrumbs__link">
        <Home />
      </Link>

      <div className="breadcrumbs__arrow">
        <Arrow />
      </div>

      {location.slice(0, -1).map((item) => (
        <>
          <Link
            key={item}
            to={`/${item}`}
            className="breadcrumbs__link"
          >
            {item}
          </Link>
          <div className="breadcrumbs__arrow">
            <Arrow />
          </div>
        </>
      ))}

      <span className="breadcrumbs__text">
        {title}
      </span>

    </div>
  );
};
