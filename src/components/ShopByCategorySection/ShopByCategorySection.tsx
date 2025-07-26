// import React from 'react';
import { Link } from 'react-router-dom';
import './shopByCategorySection.scss';

type Props = {
  title: string;
};

export const ShopByCategorySection: React.FC<Props> = ({ title }) => {
  return (
    <div className='category-block'>
      <h2>{title}</h2>

      <div className="section-link-block">
        <div className="link-container">
          <Link to="/" className="category-link bg-phone">
            <img
              className="category-link-img img"
              src="/img/category-phones.webp"
              alt="category phones"
            />
          </Link>

          <h4>Mobile phones</h4>

          <div className="total-models"></div>
        </div>

        <div className="link-container">
          <Link to="/" className="category-link bg-tablets">
            <img
              className="category-link-img img"
              src="/img/category-tablets.png"
              alt="category tablets"
            />
          </Link>

          <h4>Tablets</h4>

          <div className="total-models"></div>
        </div>

        <div className="link-container">
          <Link to="/" className="category-link bg-accessories">
            <img
              className="category-link-img img"
              src="/img/category-accessories.png"
              alt="category accessories"
            />
          </Link>

          <h4>Accessories</h4>

          <div className="total-models"></div>
        </div>
      </div>
    </div>
  );
};
