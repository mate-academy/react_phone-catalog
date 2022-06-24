/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LocalStorageContext } from '../../LocalStorageContext';

import './ProductCard.scss';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [like, setLike] = useState(false);
  const { storageItems, setStorageItems } = useContext(LocalStorageContext);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    const inCart = keys.includes(`cart-${product.id}`);
    const inFav = keys.includes(`fav-${product.id}`);

    setAdded(inCart);
    setLike(inFav);
  });

  const handleAdd = () => {
    setAdded(true);
    setStorageItems(storageItems + 1);
    localStorage.setItem(`cart-${product.id}`, JSON.stringify({
      id: product.age,
      quantity: 1,
      product,
    }));
  };

  const handleLike = () => {
    if (!like) {
      setLike(true);
      setStorageItems(storageItems + 1);
      localStorage.setItem(`fav-${product.id}`, JSON.stringify(product));
    } else {
      setLike(false);
      setStorageItems(storageItems - 1);
      localStorage.removeItem(`fav-${product.id}`);
    }
  };

  return (
    <div className="ProductCard">
      <Link to={`/${product.type}s/${product.id}`} className="ProductCard__redirect">
        <img
          src={`/${product.imageUrl}`}
          alt={product.name}
          className="ProductCard__img"
        />
      </Link>
      <div className="ProductCard__wrapper">
        <Link to={`/${product.type}s/${product.id}`} className="ProductCard__redirect">
          <p className="ProductCard__title">{product.name}</p>
        </Link>
        <div className="ProductCard__prices">
          {product.discount !== 0 ? (
            <>
              <p
                className="
                ProductCard__prices-text
                ProductCard__prices-text--main"
              >
                $
                {product.price * (1 - product.discount / 100)}
              </p>
              <p
                className="
                        ProductCard__prices-text
                        ProductCard__prices-text--with-discount"
              >
                $
                {product.price}
              </p>
            </>
          ) : (
            <p
              className="
              ProductCard__prices-text
              ProductCard__prices-text--main"
            >
              $
              {product.price}
            </p>
          )}
        </div>
        <div className="ProductCard__info">
          <p className="ProductCard__info-text">
            Screen
            <span className="ProductCard__info-value">{product.screen}</span>
          </p>
          <p className="ProductCard__info-text">
            Capacity
            <span
              className="ProductCard__info-value"
            >
              {product.capacity}
            </span>
          </p>
          <p className="ProductCard__info-text">
            RAM
            <span className="ProductCard__info-value">{product.ram}</span>
          </p>
        </div>
        <div className="ProductCard__actions">
          {!added ? (
            <button
              type="button"
              className="main-button ProductCard__actions-button"
              onClick={handleAdd}
              value={product.id}
            >
              Add to cart
            </button>
          ) : (
            <button
              type="button"
              className="main-button ProductCard__actions-button"
              disabled
            >
              Added to cart
            </button>
          )}
          {!like ? (
            <button
              type="button"
              className="button button--heart"
              value={product.id}
              onClick={handleLike}
            />
          ) : (
            <button
              type="button"
              className="button button--heart button--heart--disabled"
              value={product.id}
              onClick={handleLike}
            />
          )}
        </div>
      </div>
    </div>

  );
};
