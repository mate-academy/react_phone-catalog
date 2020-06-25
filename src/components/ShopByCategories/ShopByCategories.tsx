import React, { useEffect, useState } from 'react';
import './ShopByCategories.scss';
import { Link } from 'react-router-dom';
import { getProducts } from '../../helpers/api';

const ShopByCategories = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [tablets, setTablets] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(data => setPhones(data.filter((product: Product) => product.type === 'phone')));
  }, []);


  useEffect(() => {
    getProducts()
      .then(data => setTablets(data.filter((product: Product) => product.type === 'tablet')));
  }, []);

  useEffect(() => {
    getProducts()
      .then(data => setAccessories(data.filter((product: Product) => product.type === 'accessories')));
  }, []);

  return (

    <>
      <div className="ShopByCategories">
        <p className="ShopByCategories__title">Shop By Categories</p>
        <div className="ShopByCategories__wrapper">
          <div className="ShopByCategories__item">
            <Link to="phones" className="ShopByCategories__link">

              <div className="ShopByCategories__phones">
                <img
                  src="./img/categories/phones.svg"
                  alt="category__phones"
                  className="ShopByCategories__img"
                />
              </div>

              <h3 className="ShopByCategories__name">Mobile phones</h3>
              <p className="ShopByCategories__count">
                {phones.length}
                {' '}
                models
              </p>

            </Link>
          </div>

          <div className="ShopByCategories__item">
            <Link to="tablets" className="ShopByCategories__link">

              <div className="ShopByCategories__tablets">
                <img
                  src="./img/categories/tablets.svg"
                  alt="category__tablets"
                  className="ShopByCategories__img"
                />
              </div>

              <h3 className="ShopByCategories__name">Tablets</h3>
              <p className="ShopByCategories__count">
                {tablets.length}
                {' '}
                models
              </p>

            </Link>
          </div>

          <div className="ShopByCategories__item">
            <Link to="accessories" className="ShopByCategories__link">

              <div className="ShopByCategories__accessories">
                <img
                  src="./img/categories/accessories.svg"
                  alt="category__phones"
                  className="ShopByCategories__img"
                />
              </div>

              <h3 className="ShopByCategories__name">Accessories</h3>
              <p className="ShopByCategories__count">
                {accessories.length}
                {' '}
                models
              </p>

            </Link>
          </div>
        </div>

      </div>
    </>
  );
};

export default ShopByCategories;
