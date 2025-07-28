// import React from 'react';
import { Link } from 'react-router-dom';
import './shopByCategorySection.scss';

type Props = {
  title: string;
  totalPhoneModels: number;
  totalTabletsModels: number;
  totalAccessoriesModels: number;
};

export const ShopByCategorySection: React.FC<Props> = ({
  title,
  totalPhoneModels,
  totalTabletsModels,
  totalAccessoriesModels,
}) => {
  return (
    <div className="category-block">
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

          <div className='category-properties'>
            <h4>Mobile phones</h4>

            <p className='main-body-text-14'>
              {totalPhoneModels} mldels
            </p>
          </div>
        </div>

        <div className="link-container">
          <Link to="/" className="category-link bg-tablets">
            <img
              className="category-link-img img"
              src="/img/category-tablets.png"
              alt="category tablets"
            />
          </Link>
          <div className='category-properties'>
            <h4>Tablets</h4>

            <p className='main-body-text-14'>
              {totalTabletsModels} mldels
            </p>
          </div>
        </div>

        <div className="link-container">
          <Link to="/" className="category-link bg-accessories">
            <img
              className="category-link-img img"
              src="/img/category-accessories.png"
              alt="category accessories"
            />
          </Link>
          <div className='category-properties'>
            <h4>Accessories</h4>

            <p className='main-body-text-14'>
              {totalAccessoriesModels} models
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
