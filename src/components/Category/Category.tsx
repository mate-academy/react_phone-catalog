import './Category.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails } from '../../types/productDetails';

type Props = {
  title: string;
  goods: ProductDetails[] | Omit<ProductDetails, 'camera' | 'zoom'>[];
};

export const Category: React.FC<Props> = ({ title, goods }) => {
  const getBackgroundColor = () => {
    if (title === 'phones') {
      return '#6D6474';
    }

    if (title === 'acessories') {
      return '#D53C51';
    }

    return '#D3D3D3';
  };

  return (
    <Link to={`/${title}`} className="category" key={title}>
      <div
        className="category-wrapper"
        style={{
          backgroundColor: getBackgroundColor(),
        }}
      >
        <img
          className={classNames('category-image', {
            'category-image-phones': title === 'phones',
            'category-image-tablets': title === 'tablets',
            'category-image-acessories': title === 'acessories',
          })}
        />
      </div>
      <div className="category-info">
        <h4 className="category-info__title">
          {title[0].toUpperCase() + title.slice(1)}
        </h4>
        <p className="category-info__amount">{`${goods.length} models`}</p>
      </div>
    </Link>
  );
};
