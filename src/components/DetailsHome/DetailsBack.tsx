import React from 'react';
import { Link, Location } from 'react-router-dom';

type Props = {
  location: Location;
}

export const DetailsBack: React.FC<Props> = ({ location }) => {
  return (
    <>
      <div className="page-phones">
        <Link to="/">
          <img className="page-phones__house" src="./img/Home.svg" alt="Home" />
        </Link>
        <img
          className="page-phones__arrow"
          src="./img/Chevron (Arrow Right).svg"
          alt="Chevron"
        />
        <p className="page-phones__catygory-text">
          {location.pathname.includes('/tablets')
            ? 'Tablets'
            : location.pathname.includes('/phones')
              ? 'Phones'
              : location.pathname.includes('/accessories')
                ? 'Accessories'
                : ''}
        </p>
      </div>

      <Link to={location.pathname.includes('/tablets')
        ? '/tablets'
        : location.pathname.includes('/phones')
          ? '/phones'
          : location.pathname.includes('/accessories')
            ? '/accessories'
            : ''}>
        <div className='details__back'>
          <img src="./img/Icons_Chevron (Arrow Right).svg" alt="Home" />
          <p className='details__back--text'>Back</p>
        </div>
      </Link>
    </>
  );
};
