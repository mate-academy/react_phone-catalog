import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './categories.scss';

interface Item {
  type: 'tablet' | 'phone' | 'accessory';
}

export const Categories = () => {
  const [productCounts,
    setProductCounts] = useState({ tablets: 0, phones: 0, accessories: 0 });

  useEffect(() => {
    fetch(
      'https://mate-academy.github.io/react_phone-catalog/api/products.json',
    )
      .then((response) => response.json())
      .then((data: Item[]) => {
        const counts = data.reduce(
          (acc: {
            tablets: number;
            phones: number; accessories: number
          }, item: Item) => {
            const newAcc = { ...acc };

            if (item.type === 'tablet') {
              newAcc.tablets += 1;
            } else if (item.type === 'phone') {
              newAcc.phones += 1;
            } else if (item.type === 'accessory') {
              newAcc.accessories += 1;
            }

            return newAcc;
          }, { tablets: 0, phones: 0, accessories: 0 },
        );

        setProductCounts(counts);
      })
      .catch(() => []);
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by Category</h1>

      <div className="categories-row">
        <NavLink to="/phones" className="category">
          <img
            src={`${process.env.PUBLIC_URL}/img/phones.png`}
            className="category-img phones"
            alt="phones"
          />
          <h3 className="category-name">Mobile Phones</h3>
          <p className="category-counter">
            {productCounts.phones}
            {' '}
            models
          </p>
        </NavLink>

        <NavLink to="/tablets" className="category">
          <img
            src={`${process.env.PUBLIC_URL}/img/tablets.png`}
            className="category-img tablets"
            alt="tablets"
          />
          <h3 className="category-name">Tablets</h3>
          <p className="category-counter">
            {productCounts.tablets}
            {' '}
            models
          </p>
        </NavLink>

        <NavLink to="/accessories" className="category">
          <img
            src={`${process.env.PUBLIC_URL}/img/accesories.png`}
            className="category-img accessories"
            alt="accessories"
          />
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
