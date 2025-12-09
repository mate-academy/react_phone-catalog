import React from 'react';
import './NotFoundPage.scss';
import { Link } from 'react-router-dom';

type Props = {
  type: 'product' | 'page';
};

export const NotFoundPage: React.FC<Props> = ({ type }) => {
  let title;
  let imgSrc;

  if (type === 'product') {
    title = 'Product not found';
    imgSrc = '/img/product-not-found.png';
  } else {
    title = 'Page not found';
    imgSrc = '/img/page-not-found.png';
  }

  return (
    <div className="productNotFound">
      <img src={imgSrc} alt={title} className="productNotFound__img" />

      <div className="productNotFound__box">
        <h2 className="productNotFound__title">{title}</h2>
        <div className="backToHome">
          <Link to="/" className="backToHome__link">
            <img
              src="/img/icons/Arrow-Left_icon.svg"
              alt="Back To Home Arrow"
              className="icon"
            />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
