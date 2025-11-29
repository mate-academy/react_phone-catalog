import React from 'react';
import './Category.scss';
import { Link } from 'react-router-dom';

interface Props {
  imgSrc: string;
  categoryName: string;
  categoryLength: number | undefined;
  categoryPath: string;
}

export const Category: React.FC<Props> = ({
  imgSrc,
  categoryName,
  categoryLength,
  categoryPath,
}) => {
  return (
    <Link to={`/${categoryPath}`} className="category__card">
      <div className="category__card-content">
        <div className="category__photo">
          <img src={imgSrc} alt="" className="category__img" />
        </div>
        <div className="card__title-wrapper">
          <h4 className="category__title">{categoryName}</h4>
          <span className="category__quantity">{categoryLength} models</span>
        </div>
      </div>
    </Link>
  );
};
