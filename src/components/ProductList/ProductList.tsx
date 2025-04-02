import React from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';
import productListStyles from './ProductList.module.scss';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <section className={productListStyles.products}>
      <ul className={productListStyles.products__list}>
        {products.map(product => (
          <li key={product.id} className={productListStyles.products__listItem}>
            <ProductCard
              id={product.itemId}
              title={product.name}
              imageSrc={product.image}
              imageAlt={product.itemId}
              fullPrice={product.fullPrice}
              discountPrice={product.price}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
