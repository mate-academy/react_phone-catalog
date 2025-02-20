import React from 'react';
import './ProductCatalog.scss';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../types/Product';
import { ProductFilter } from '../ProductFilter';
import { ProductCard } from '../ProductCard';

type Props = {
  title: string;
  products: Product[];
};

export const ProductCatalog: React.FC<Props> = ({ title, products }) => {
  return (
    <div className="product-catalog">
      <div className="container container--with-paddings">
        <Breadcrumbs />
        <h1 className="product__title">{title}</h1>

        <p className="product__count">{`${products.length} models`}</p>
        <ProductFilter />

        <div className="product__container">
          {products.map(product => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>

        {/* <Pagination total={products.length } /> */}
      </div>
    </div>
  );
};
