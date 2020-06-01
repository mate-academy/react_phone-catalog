import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

import { getProducts } from '../../helpers/api';

// interface Slide {
//   imageUrl: string;
//   age: number;
//   name: string;
//   snippet: string;
//   price: number;
//   discount: number;
//   screen: string;
//   capacity: string;
//   ram: string;
//   id: string;
//   type: string;
// }


export const ShopByCategory = () => {
  const [phones, setPhones] = useState<Slide[]>([]);
  const [tablets, setTablets] = useState<Slide[]>([]);
  const [accessories, setAccessories] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(data => setPhones(data.filter((product: Slide) => product.type === 'phone')));
  }, []);

  useEffect(() => {
    getProducts().then(data => setTablets(data.filter((product: Slide) => product.type === 'tablet')));
  }, []);

  useEffect(() => {
    getProducts().then(data => setAccessories(data
      .filter((product: Slide) => (product.type !== 'tablet' && product.type !== 'phone'))));
  }, []);


  return (
    <div className="wrap-category">
      <h2 className="category__title">Shop by category</h2>
      <div className="category">
        <div className="wrap-inner">
          <Link to="/phones">
            <div className="category__phones">
              <img
                src="./img/category/category-phones.png"
                alt="category__phones"
                className="category__img"
              />
            </div>
            <h3 className="category__subtitle">Mobile phones</h3>
            <p className="category__sum-models">
              {phones.length}
              {' '}
              models
            </p>
          </Link>
        </div>
        <div className="wrap-inner">
          <Link to="/tablets">
            <div className="category__tablets">
              <img
                src="./img/category/category-tablets.png"
                alt="category__phones"
                className="category__img"
              />
            </div>
            <h3 className="category__subtitle">Tablets</h3>
            <p className="category__sum-models">
              {tablets.length}
              {' '}
              models
            </p>
          </Link>
        </div>
        <div className="wrap-inner">
          <Link to="/accessories">
            <div className="category__accessories">
              <img
                src="./img/category/category-accessories.png"
                alt="category__phones"
                className="category__img"
              />
            </div>
            <h3 className="category__subtitle">Accessories</h3>
            <p className="category__sum-models">
              {accessories.length}
              {' '}
              models
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
