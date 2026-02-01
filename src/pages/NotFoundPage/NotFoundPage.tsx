import { Link } from 'react-router-dom';
import { useTheme } from '../../components/context/ThemeContext';
import React from 'react';
import './NotFoundPage.scss';

type Props = {
  type: 'product' | 'page';
};

export const NotFoundPage: React.FC<Props> = ({ type }) => {
  const { theme } = useTheme();
  let title;
  let imgSrc;

  if (type === 'product') {
    title = 'Product not found';
    imgSrc = import.meta.env.BASE_URL + 'img/product-not-found.png';
  } else {
    title = 'Page not found';
    imgSrc = import.meta.env.BASE_URL + 'img/page-not-found.png';
  }

  return (
    <div className="productNotFound">
      <img src={imgSrc} alt={title} className="productNotFound__img" />
      <div className="productNotFound__box">
        <h2 className="productNotFound__title">{title}</h2>
        <div className="backToHome">
          <Link to="/" className="backToHome__link">
            <img
              src={
                theme === 'light'
                  ? import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg'
                  : import.meta.env.BASE_URL + 'img/icons/Arrow-Left_icon.svg' //Dark icon dont forget
              }
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
