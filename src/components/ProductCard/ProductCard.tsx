import React from 'react';
import { ButtonsAddToCart, ButtonsFavourites } from '../Buttons/Button';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { name, fullPrice, price, screen, capacity, ram, image, itemId } =
    product;

  return (
    <div className="product__card">
      <Link to={`/products/${itemId}`}>
        <img src={image} alt={name} className="product__card-img" />
      </Link>

      <div className="product__card-block">
        <Link to={`/products/${itemId}`}>
          <h2 className="product__card-title">{name}</h2>
        </Link>

        <div className="product__card-block-price">
          {price ? (
            <>
              <span className="product__card-price">{`$${price}`}</span>
              <span className="product__card-fullPrice">{`$${fullPrice}`}</span>
            </>
          ) : (
            <span className="product__card-fullPrice">{`$${fullPrice}`}</span>
          )}
        </div>

        <span className="product__card-border"></span>

        <ul className="product__card-list ul">
          <li className="product__item ul__item">
            Screen
            <span className="product__item-span ul__item-span">{screen}</span>
          </li>

          <li className="product__item ul__item">
            Capacity
            <span className="product__item-span ul__item-span">{capacity}</span>
          </li>

          <li className="product__item ul__item">
            RAM
            <span className="product__item-span ul__item-span">{ram}</span>
          </li>
        </ul>

        <div className="product__card-group">
          <ButtonsAddToCart
            title={`Add to cart`}
            size={`small`}
            product={product}
          />

          <ButtonsFavourites product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
