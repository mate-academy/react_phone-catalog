import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Product } from '../../types/Product';
import { CartContext } from '../../context/CartProvider';
import { FavouriteContext } from '../../context/FavouriteProvider';
import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    addedToFavorites,
    removefromFavorites,
  } = useContext(FavouriteContext);
  const { addedToOrder, removeItem } = useContext(CartContext);

  const getCheckInCart = () => {
    if (product) {
      if (product.inOrder) {
        removeItem(product);
      } else {
        addedToOrder(product);
      }
    }
  };

  const getCheckInFavorites = () => {
    if (product) {
      if (product.inFavourite) {
        removefromFavorites(product);
      } else {
        addedToFavorites(product);
      }
    }
  };

  return (
    <div className="ProductCard">
      <Link
        to={`/${product.type}s/${product.id}`}
        className="ProductCard__label"
      >
        <img
          src={product.imageUrl}
          alt={product.type}
          className="ProductCard__img"
        />
      </Link>
      <span className="ProductCard__name">
        {product.name}
      </span>
      <div className="ProductCard__prices-block">
        {product.discount > 0 ? (
          <>
            <p className="ProductCard__priceWithDiscount">
              &#36;
              {product.priceWithDiscount}
            </p>
            <p className="ProductCard__price">
              &#36;
              {product.price}
            </p>
          </>
        ) : (
          <p className="ProductCard__priceWithDiscount">
            &#36;
            {product.price}
          </p>
        )}
      </div>
      <div className="ProductCard__info-block">
        <div className="ProductCard__characteristics">
          <p className="ProductCard__characteristic-name">Screen</p>
          <p className="ProductCard__characteristic-info">{product.screen}</p>
        </div>
        <div className="ProductCard__characteristics">
          <p className="ProductCard__characteristic-name">Capacity</p>
          <p className="ProductCard__characteristic-info">{product.capacity}</p>
        </div>
        <div className="ProductCard__characteristics">
          <p className="ProductCard__characteristic-name">RAM</p>
          <p className="ProductCard__characteristic-info">{product.ram}</p>
        </div>
      </div>
      <div className="ProductCard__footer">
        <button
          type="button"
          className={classNames(`ProductCard__addToCart + ${product.inOrder
            ? 'ProductCard__addToCart--added'
            : ''
          }`)}
          onClick={() => getCheckInCart()}
        >
          {product.inOrder
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          type="button"
          data-cy="addToFavorite"
          className={classNames(`ProductCard__moveToFavorite + ${product.inFavourite
            ? 'ProductCard__moveToFavorite--added'
            : ''
          }`)}
          onClick={() => getCheckInFavorites()}
          aria-label="add to favourite"
        />
      </div>
    </div>
  );
};
