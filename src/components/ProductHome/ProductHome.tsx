import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { Tablet } from '../../types/tablet';
import { Accessory } from '../../types/accessory';
import { Sorted } from '../Sorted';

type Props = {
  product: Phone[] | Tablet[] | Accessory[];
};

export const ProductHome: React.FC<Props> = ({ product }) => {
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
        <p className="page-phones__catygory-text">
          {location.pathname.includes('/tablets')
            ? 'Tablets'
            : location.pathname.includes('/phones')
              ? 'Mobile phones'
              : location.pathname.includes('/accessories')
                ? 'Accessories'
                : ''}
        </p>
      </div>

      <h1 className="page-phones__main-text">
        {location.pathname.includes('/tablets')
          ? 'Tablets'
          : location.pathname.includes('/phones')
            ? 'Mobile phones'
            : location.pathname.includes('/accessories')
              ? 'Accessories'
              : ''}
      </h1>
      <p className="page-phones__conter-models">{product.length} models</p>

      <Sorted />
    </>
  );
};
