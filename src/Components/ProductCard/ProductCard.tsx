import React from 'react';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/favoritesContext';
import { useCart } from '../../context/cartContext';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, toggleCart } = useCart();

  const isFavorite = favorites.includes(product.itemId);
  const isAdded = cart.find(
    cartProduct => cartProduct.item?.itemId === product.itemId,
  );

  return (
    <div className="product">
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          className="product__photo"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <div className="product__wrapper">
        <p className="product__name">{product.name}</p>
        <div className="product__prices">
          <p className="product__price">${product.price}</p>
          <p className="product__full-price">
            {product.fullPrice && '$' + product.fullPrice}
          </p>
        </div>
      </div>

      <div className="product__characteristics">
        <div className="product__characteristics--section">
          <p className="detail">Screen</p>
          <p className="param">{product.screen}</p>
        </div>
        <div className="product__characteristics--section">
          <p className="detail">Capacity</p>
          <p className="param">{product.capacity}</p>
        </div>
        <div className="product__characteristics--section">
          <p className="detail">RAM</p>
          <p className="param">{product.ram}</p>
        </div>
      </div>

      <div className="product__buttons">
        <button
          className={classNames('product__button--add-to-cart', {
            'button-active': isAdded,
          })}
          onClick={() => toggleCart(product)}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button
          className={classNames('product__button--add-to-favorite', {
            'favorite-active': isFavorite,
          })}
          onClick={() => toggleFavorite(product.itemId)}
        ></button>
      </div>
    </div>
  );
};
