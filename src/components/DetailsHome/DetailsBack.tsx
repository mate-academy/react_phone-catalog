import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';

type Product = Phone | Tablet | Accessory;

type Props = {
  product: Product;
};

export const DetailsBack: React.FC<Props> = ({ product }) => {
  const location = useLocation();

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
        <Link
          to={
            location.pathname.includes('/tablets')
              ? '/tablets'
              : location.pathname.includes('/phones')
                ? '/phones'
                : location.pathname.includes('/accessories')
                  ? '/accessories'
                  : ''
          }
        >
          <p className="page-phones__catygory-text">
            {location.pathname.includes('/tablets')
              ? 'Tablets'
              : location.pathname.includes('/phones')
                ? 'Mobile phones'
                : location.pathname.includes('/accessories')
                  ? 'Accessories'
                  : ''}
          </p>
        </Link>

        <img
          className="page-phones__arrow"
          src="./img/Chevron (Arrow Right).svg"
          alt="Chevron"
        />

        <div>{product.name}</div>
      </div>

      <Link
        to={
          location.state?.from ||
          (location.pathname.includes('/tablets')
            ? '/tablets'
            : location.pathname.includes('/phones')
              ? '/phones'
              : location.pathname.includes('/accessories')
                ? '/accessories'
                : '')
        }
      >
        <div className="details__back">
          <img src="./img/Icons_Chevron (Arrow Right).svg" alt="Back" />
          <p className="details__back--text">Back</p>
        </div>
      </Link>
    </>
  );
};
