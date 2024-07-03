/* eslint-disable prettier/prettier */
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';
import React from 'react';

type Props = {
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <div className="products">
      <form className="products__form" action="/api/products" method="POST">
        <div className="selection-field">
          <label htmlFor="sort-by" className="selection-field__label">
            Sort by
          </label>
          <select className="selection-field__sort" id="sort-by">
            <option value="Newest">Newest</option>
            <option value="Alphabetically">Alphabetically</option>
            <option value="Cheapest">Cheapest</option>
          </select>
        </div>
        <div className="selection-field">
          <label htmlFor="pagination" className="selection-field__label">
            Items on page
          </label>
          <select className="selection-field__pag" id="pagination">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="All">All</option>
          </select>
        </div>
      </form>
      <div className="products__product">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};
