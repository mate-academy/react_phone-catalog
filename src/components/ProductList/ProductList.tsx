import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { Product } from '../../types/Product';
import './ProductList.scss';

interface ProductListProps {
  title: string;
  products: Product[];
  showControls?: boolean;
}

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
  showControls = true,
}) => {
  return (
    <section className="product-list">
      <div className="product-list__header">
        <h2 className="product-list__title">{title}</h2>
        {showControls && (
          <div className="product-list__controls">
            <button className="product-list__control product-list__control--prev">
              &lt;
            </button>
            <button className="product-list__control product-list__control--next">
              &gt;
            </button>
          </div>
        )}
      </div>

      <div className="product-list__grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            image={product.image}
            screen={product.screen}
            capacity={product.capacity}
            ram={product.ram}
          />
        ))}
      </div>
    </section>
  );
};
