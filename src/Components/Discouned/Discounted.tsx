import { Discounted } from '../../types/Discounted';
import { ProductCard } from '../ProductCard/ProductCard';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  DiscountedProducts: Discounted[];
};

export const Discount: React.FC<Props> = ({ DiscountedProducts }) => {
  return (
    <div className="products-phones">
      {DiscountedProducts.map(product => (
        <Link
          to={`phones/${product.itemId}`}
          key={product.id}
          className="products-phone"
        >
          <div className="products-container">
            <div className="products-img">
              <img src={product.image} alt="" className="products-image" />
            </div>
            <p className="products-title">{product.name} (MQ0G3)</p>
            <span className="products-price">
              ${product.fullPrice}{' '}
              <span className="products-price-span">${product.price}</span>
            </span>
            <div className="products-string"></div>
            <div className="products-info">
              <p className="products-text products-text__first">
                Screen <span className="products-span">{product.screen}</span>
              </p>
              <p className="products-text">
                Capacity{' '}
                <span className="products-span">{product.capacity}</span>
              </p>
              <p className="products-text">
                RAM <span className="products-span">{product.ram}</span>
              </p>
            </div>
            <ProductCard product={product} />
          </div>
        </Link>
      ))}
    </div>
  );
};
