import { Link } from 'react-router-dom';
import { Product } from '../../types/product';
import React from 'react';
import { useArrayContext } from '../../ArrayContext';
import classNames from 'classnames';

type Props = {
  product: Product;
  style: Record<string, string>;
  showOldPrice: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  style,
  showOldPrice,
}) => {
  const { favoriteProducts, cartProducts, handleLike, handleCart } =
    useArrayContext();

  return (
    <div className="product-card" style={style}>
      <Link className="product-card__link" to={`/phones/${product.itemId}`}>
        <img className="product-card__img" src={product.image} alt="" />
      </Link>
      <p className="product-card__name">{product.name}</p>
      <div className="product-card__price">
        <h3 className="product-card__new-price">${product.price}</h3>
        {showOldPrice && (
          <h3 className="product-card__old-price">${product.fullPrice}</h3>
        )}
      </div>
      <div className="underline"></div>
      <ul className="product-card__description">
        <li className="product-card__li">
          <p className="product-card__li-option">Screen</p>
          <p className="product-card__li-value">{product.screen}</p>
        </li>
        <li className="product-card__li">
          <p className="product-card__li-option">Capacity</p>
          <p className="product-card__li-value">{product.capacity}</p>
        </li>
        <li className="product-card__li">
          <p className="product-card__li-option">RAM</p>
          <p className="product-card__li-value">{product.ram}</p>
        </li>
      </ul>
      <div className="product-card__buttons">
        <button
          className={classNames('button-add', {
            'button-add__added': cartProducts
              .map(a => a.id)
              .includes(product.id),
          })}
          onClick={() => handleCart(product)}
        >
          {cartProducts.map(a => a.id).includes(product.id)
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames('button-heart button-size-medium', {
            'button-heart-filled': favoriteProducts
              .map(a => a.id)
              .includes(product.id),
          })}
          onClick={() => handleLike(product)}
        />
      </div>
    </div>
  );
};
