import React from 'react';
import { ProductCard } from '../../components/shared/ProductCard';

interface Props {
  category: string;
}

export const ProductsPage: React.FC<Props> = ({ category }) => {
  return (
    <div className="products-page">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <p>Здесь будет список товаров для категории: {category}</p>

      {
        <div className="products__container">
          <ProductCard product={product} oldPrice={true} />
        </div>
      }

      {/*
         Дальше ты можешь использовать переменную category,
         чтобы отфильтровать товары из твоего JSON или сделать запрос к API
      */}
    </div>
  );
};
