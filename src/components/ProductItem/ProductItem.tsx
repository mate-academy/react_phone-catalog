import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Product } from '../../types/Product';

import './ProductItem.scss';

type Props = {
  product: Product
};

export const ProductItem: FC<Props> = ({ product }) => {
  return (
    <div className="product__item">
      <div className="product__item-container">
        <div className="product__item-content">
          <Link to="/" className="product__item-link">
            <img
              src={`_new/${product.image}`}
              alt="phone"
              className="product__item-img"
            />
            <h2 className="product__item-subtitle">{product.name}</h2>
          </Link>

          <div className="product__item__price">
            <span className="product-item__price-discount">{`$${product.price}`}</span>
            <span className="product-item__full-price">{`$${product.fullPrice}`}</span>
          </div>

          <ul>
            <li>
              screen
            </li>
            <li>
              capacity
            </li>
            <li>
              ram
            </li>
          </ul>

          <ul>
            <li>
              {product.screen}
            </li>
            <li>
              {product.capacity}
            </li>
            <li>
              {product.ram}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
