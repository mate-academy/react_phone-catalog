import React, { useState, useEffect, useMemo } from 'react';
import { CategoryColumn } from '../CategoryColumn';
import { getProducts } from '../../api/api';
import { Product } from '../../types/Product';
import './ShopByCategory.scss';

export const ShopByCategory:React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(setProducts);
  }, []);

  const getProductsByType = (type: string) => (
    products.filter(product => product.type === type)
  );

  const phonesCount = useMemo(() => (
    getProductsByType('phone').length
  ), [products]);

  const tabletsCount = useMemo(() => (
    getProductsByType('tablet').length
  ), [products]);

  const accessoriesCount = useMemo(() => (
    getProductsByType('accessories').length
  ), [products]);

  return (
    <section className="shop-by-category home-page__shop-by-category">
      <div className="container">
        <div className="block-header shop-by-category__block-header">
          <h2 className="title shop-by-category__title">
            Shop by category
          </h2>
        </div>
        <div className="shop-by-category__columns">
          <CategoryColumn
            title="phones"
            quantity={phonesCount}
          />
          <CategoryColumn
            title="tablets"
            quantity={tabletsCount}
          />
          <CategoryColumn
            title="accessories"
            quantity={accessoriesCount}
          />
        </div>
      </div>

    </section>
  );
};
