import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ShopByCategory.scss';
import { SHOP_CATEGORIES } from '../../../../helpers/variables';
import { getProducts } from '../../../../api/getProducts';
import { Product } from '../../../../helpers/types';

export const ShopByCategory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  return (
    <div className="ShopByCategory">
      <h1 className="ShopByCategory-Title">Shop by category</h1>

      <div className="ShopByCategory-Categories">
        {SHOP_CATEGORIES.map(category => (
          <NavLink
            key={category.id}
            className="Category ShopByCategory-Category"
            to={category.href}
          >
            <div className={`Category-Image_wrapper Category-${category.id}`}>
              <img
                src={category.img}
                alt={category.name}
                className="Category-Image"
              />
            </div>

            <h2 className="Category-Title">{category.name}</h2>
            <span className="Category-ModelsQuantity">
              {`${products.filter((product: Product) => product.type
                 === category.type).length} models`}
            </span>

          </NavLink>
        ))}
      </div>

    </div>
  );
};
