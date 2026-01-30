import { Link, useLocation } from 'react-router-dom';
import homeimage from '../../images/icons/home-image.svg';
import arrowRight from '../../images/icons/arrow-right.svg';
import React, { Fragment } from 'react';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const location = pathname.split('/').slice(1);

  return (
    <div className="catalog__bradcrumbs bradcrumbs">
      <Link to="/">
        <img src={homeimage} />
      </Link>
      {location.map((item, i) =>
        i < location.length - 1 ? (
          <Fragment key={item}>
            <img src={arrowRight} alt="" />
            <Link to={`/${item}`} className="bradcrumbs__link">
              <span>{item}</span>
            </Link>
          </Fragment>
        ) : (
          <Fragment key={item}>
            <img src={arrowRight} alt="" />
            <span className="bradcrumbs__link bradcrumbs__link--last">
              {item}
            </span>
          </Fragment>
        ),
      )}
    </div>
  );
};
