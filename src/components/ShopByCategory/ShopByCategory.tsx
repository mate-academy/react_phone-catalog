import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SHOP_CATEGORIES } from '../../helpers/variables';
import { Product } from '../../helpers/types';
import { getGoods } from '../../store';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const products = useSelector(getGoods);

  return (
    <div className="ShopByCategory">
      <h1 className="ShopByCategory-Title">Shop by category</h1>

      <div className="ShopByCategory-Categories">
        {SHOP_CATEGORIES.map(category => (
          <Link
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

          </Link>
        ))}
      </div>

    </div>
  );
};
