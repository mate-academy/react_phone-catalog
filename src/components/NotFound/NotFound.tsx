import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.scss';

type Props = {
  type: 'product' | 'page';
};

export const NotFound: React.FC<Props> = ({ type }) => {
  let title;
  let imgSrc;

  if (type === 'product') {
    title = 'Product not found';
    imgSrc = 'img/product-not-found.png';
  } else {
    title = 'Page not found';
    imgSrc = 'img/page-not-found.png';
  }

  return (
    <div className="product-not-found">
      <img className="product-not-found-img" src={imgSrc} alt={title} />

      <div className="product-not-found-box">
        <h2 className="product-not-found-title">{title}</h2>

        <div className="link-box">
          <Link to="/" className="back-link">
            <img src="img/icons/ArrowLeft.svg" alt="Arrow Left" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
