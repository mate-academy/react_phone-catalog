import React from 'react';
import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  return (
    <>
      <h2 className="category--text">Shop by category</h2>

      <div className="category__type">
        <div>
          <Link to="/phones">
            <img className="category-home__img" src="/img/Phones.png" />
          </Link>
          <h3>Mobile phones</h3>
          <p>95 models</p>
        </div>

        <div>
          <Link to="/tablets">
            <img className="category-home__img" src="/img/Tablets.png" />
          </Link>

          <h3>Tablets</h3>
          <p>24 models</p>
        </div>

        <div>
          <Link to="/accessories">
            <img className="category-home__img" src="/img/Accessories.png" />
          </Link>

          <h3>Accessories</h3>
          <p>100 models</p>
        </div>
      </div>
    </>
  );
};
