import React from 'react';
import './ShopCategory.scss';
import { Link } from 'react-router-dom';

interface CategoriesCounts {
  phones: number;
  tablets: number;
  accessories: number;
}

interface Props {
  counts: CategoriesCounts;
}

export const ShopCategory: React.FC<Props> = ({ counts }) => {
  return (
    <>
      <section className="shop-category">
        <div className="shop-category__wrapper">
          <h2 className="shop-category__header">Shop by category</h2>
          <div className="shop-category__card-wrapper">
            <div className="shop-category__card">
              <Link to={'/phones'}>
                <div className="shop-category__image-container">
                  <img
                    src="img/categories/PhonesCategory.png"
                    className="shop-category__image"
                    alt=""
                  />
                </div>
                <p className="shop-category__name">Mobile phones</p>
                <p className="shop-category__amount">{counts.phones} models</p>
              </Link>
            </div>
            <div className="shop-category__card">
              <Link to={'/tablets'}>
                <div className="shop-category__image-container">
                  <img
                    src="img/categories/TabletCategory.png"
                    className="shop-category__image"
                    alt=""
                  />
                </div>
                <p className="shop-category__name">Tablets</p>
                <p className="shop-category__amount">{counts.tablets} models</p>
              </Link>
            </div>
            <div className="shop-category__card">
              <Link to={'/accessories'}>
                <div className="shop-category__image-container">
                  <img
                    src="img/categories/AccessoriesCategory.png"
                    className="shop-category__image"
                    alt=""
                  />
                </div>
                <p className="shop-category__name">Accessories</p>
                <p className="shop-category__amount">
                  {counts.accessories} models
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
