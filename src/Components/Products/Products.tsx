import { Products } from '../../types/Products';
import './Products.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  currentProducts: Products[];
  currentSlide: number;
};

export const Product: React.FC<Props> = ({ currentSlide, currentProducts }) => {
  return (
    <div
      className="products-phones"
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
      }}
    >
      {currentProducts.map(product => (
        <Link
          key={product.id}
          to={`phones/${product.id}`}
          className="products-phone"
        >
          <div className="products-container">
            <div className="products_">
              <div className="products-img">
                <img src={product.image} alt="" className="products-image" />
              </div>
              <p className="products-title">{product.name}</p>
              <span className="products-price">${product.fullPrice}</span>
            </div>
            <div className="products__bottom">
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
          </div>
        </Link>
      ))}
    </div>
  );
};
