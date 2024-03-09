import React from 'react';
import { Link } from 'react-router-dom';

import './NoProducts.scss';

type Props = {
  label?: string;
};

export const NoProducts: React.FC<Props> = ({
  label: text = 'No Products Found',
}) => {
  return (
    <div className="no-products">
      <div className="no-products__image-container">
        <img
          src="./img/no-product-found.png"
          alt="No Products Found"
          className="no-products__image"
        />
      </div>
      <h1 className="no-products__text">{text}</h1>
      <Link to="/home">
        <button type="button" className="no-products__button">
          Back to the home
        </button>
      </Link>
    </div>
  );
};
