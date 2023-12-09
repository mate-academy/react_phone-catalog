import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './categories.scss'; // Импортируйте ваши стили здесь
import phones from './phones.png';
import tablets from './tablets.png';
import accessories from './accesories.png';

export const Categories = () => {
  const [productCounts, setProductCounts] = useState({ tablets: 0, phones: 0, accessories: 0 });

  useEffect(() => {
    fetch('https://mate-academy.github.io/react_phone-catalog/api/products.json')
      .then((response) => response.json())
      .then((data) => {
        const counts = data.reduce((acc, item) => {
          if (item.type === 'tablet') {
            acc.tablets += 1;
          } else if (item.type === 'phone') {
            acc.phones += 1;
          } else if (item.type === 'accessory') {
            acc.accessories += 1;
          }

          return acc;
        }, { tablets: 0, phones: 0, accessories: 0 });

        setProductCounts(counts);
      })
      .catch((error) => console.error('Error fetching product list:', error));
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by Category</h1>

      <div className="categories-row">
        <NavLink to="/phones" className="category">
          <img src={phones} className="category-img phones" alt="phones" />
          <h3 className="category-name">Mobile Phones</h3>
          <p className="category-counter">
            {productCounts.phones}
            {' '}
            models
          </p>
        </NavLink>

        <NavLink to="/tablets" className="category">
          <img src={tablets} className="category-img tablets" alt="tablets" />
          <h3 className="category-name">Tablets</h3>
          <p className="category-counter">
            {productCounts.tablets}
            {' '}
            models
          </p>
        </NavLink>

        <NavLink to="/accessories" className="category">
          <img src={accessories} className="category-img accessories last" alt="accessories" />
          <h3 className="category-name">Accessories</h3>
          <p className="category-counter">
            {productCounts.accessories}
            {' '}
            models
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default Categories;
