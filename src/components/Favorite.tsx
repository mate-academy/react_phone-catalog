import React from 'react';
import { useSelector } from 'react-redux';
import { getFavorite } from '../store/index';
import { ProductPreview } from './ProductPreview';

export const Favorite: React.FC = () => {
  const goodsList = useSelector(getFavorite);

  return (
    <div className="basket">
      <h2 className="basket__title">Favorite list</h2>
      <ul className="phones__list">
        {
          goodsList.map(product => (
            <ProductPreview product={product} path={`/${product.type}s/`} key={product.id} />
          ))
        }
      </ul>
    </div>
  );
};
