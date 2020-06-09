import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShopByCategory.scss';

import { getProducts } from '../../helpers/api';

export const ShopByCategory = () => {
  const [data, setData] = useState<Slide[]>([]);
  const [phones, setPhones] = useState<Slide[]>([]);
  const [tablets, setTablets] = useState<Slide[]>([]);
  const [accessories, setAccessories] = useState<Slide[]>([]);

  useEffect(() => {
    getProducts().then(dataServer => setData(dataServer));
  }, []);

  useEffect(() => {
    setPhones(data.filter((product: Slide) => product.type === 'phone'));
  }, [data]);

  useEffect(() => {
    setTablets(data.filter((product: Slide) => product.type === 'tablet'));
  }, [data]);

  useEffect(() => {
    setAccessories(data
      .filter((product: Slide) => (product.type === 'accessory')));
  }, [data]);

  return (
    <div className="WrapCategory">
      <h2 className="Category__Title">Shop by category</h2>
      <div className="Category">
        <div className="WrapInner">
          <Link to="/phones">
            <div className="Category__Phones">
              <img
                src="./img/category/category-phones.png"
                alt="category__phones"
                className="Category__Img"
              />
            </div>
            <h3 className="Category__Subtitle">Mobile phones</h3>
            <p className="Category__SumModels">
              {phones.length}
              {' '}
              models
            </p>
          </Link>
        </div>
        <div className="WrapInner">
          <Link to="/tablets">
            <div className="Category__Tablets">
              <img
                src="./img/category/category-tablets.png"
                alt="category__phones"
                className="Category__Img"
              />
            </div>
            <h3 className="Category__Subtitle">Tablets</h3>
            <p className="Category__SumModels">
              {tablets.length}
              {' '}
              models
            </p>
          </Link>
        </div>
        <div className="WrapInner">
          <Link to="/accessories">
            <div className="Category__Accessories">
              <img
                src="./img/category/category-accessories.png"
                alt="category__phones"
                className="Category__Img"
              />
            </div>
            <h3 className="Category__Subtitle">Accessories</h3>
            <p className="Category__SumModels">
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
