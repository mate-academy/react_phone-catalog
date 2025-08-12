import React from 'react';
import { Link } from 'react-router-dom';
import './productNotFoundPage.scss';

export const ProductNotFoundPage: React.FC = () => {

  return (
    <div className="product-not-found">
      <img
        className="product-not-found-img"
        src="/img/product-not-found.png"
        alt="Product not found page"
      />

      <div className="product-not-found-box">
        <h2 className="product-not-found-title">Product not found</h2>

        <div className='link-box'>

        <Link to="/" className="back-link">
          <img src="./img/icons/ArrowLeft.svg" alt="Arrow Left" />
          Back to Home
        </Link>
        </div>
      </div>
    </div>
  );
};
