import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import './ProductCard.scss';

import heart from '../../images/icons/heart_like.svg';
import heartFilled from '../../images/icons/favourites-filled.svg';

type Props = {
  product: Product,
  isHotPrice: boolean
};

export const ProductCard: React.FC<Props> = ({
  product, isHotPrice = true,
}) => {
  const [isLiked, setIsLiked] = useState(product.isFavorite);
  const [isInCart, setIsInCart] = useState(false);
  const { pathname, search } = useLocation();

  const handleAddToCart = () => {
    const cartItems: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');

    const index = cartItems.findIndex((cartItem) => cartItem.id === product.id);

    if (index === -1) {
      cartItems.push(product);
    } else {
      cartItems.splice(index, 1);
    }

    localStorage.setItem('CartItems', JSON.stringify(cartItems));
    setIsInCart(!isInCart);
  };

  useEffect(() => {
    const likedProducts: Product[] = JSON
      .parse(localStorage.getItem('LikedProducts') || '[]');
    const index = likedProducts
      .findIndex((likedProduct) => likedProduct.id === product.id);

    const cardProducts: Product[] = JSON
      .parse(localStorage.getItem('CartItems') || '[]');

    const cartIndex = cardProducts
      .findIndex((cartProduct) => cartProduct.id === product.id);

    setIsInCart(cartIndex !== -1);

    setIsLiked(index !== -1);
  }, [product.id]);

  const handleUpdateFavorite = () => {
    const newLikedStatus = !isLiked;

    setIsLiked(newLikedStatus);

    let likedProducts: Product[] = JSON
      .parse(localStorage.getItem('LikedProducts') || '[]');

    const index = likedProducts
      .findIndex((likedProduct) => likedProduct.id === product.id);

    if (newLikedStatus && index === -1) {
      likedProducts.push(product);
    } else if (!newLikedStatus && index !== -1) {
      likedProducts = likedProducts
        .filter((likedProduct) => likedProduct.id !== product.id);
    }

    localStorage.setItem('LikedProducts', JSON.stringify(likedProducts));
  };

  return (
    <div
      className="card"
      data-cy="cardsContainer"
    >
      <Link
        to={`/phones/${product.phoneId}`}
        state={{ pathname, search }}
        className="card__top"
      >
        <img
          src={`_new/${product.image}`}
          alt="product_image"
          className="card__image"

        />
      </Link>
      <Link
        to={`/phones/${product.phoneId}`}
        state={{ pathname, search }}
        className="card__title"
      >
        {product.name}
      </Link>
      <div className="card__prices">
        {isHotPrice ? (
          <>
            <p className="card__currentPrice">{`$${product.price}`}</p>
            <p className="card__oldPrice">{`$${product.fullPrice}`}</p>
          </>
        ) : (
          <p className="card__currentPrice">{`$${product.price}`}</p>
        )}
      </div>
      <div className="card__characteristics">
        <div className="card__details">
          <p className="card__details-title">Screen</p>
          <p className="card__details-value">{product.screen}</p>
        </div>
        <div className="card__details">
          <p className="card__details-title">Capacity</p>
          <p className="card__details-value">{product.capacity}</p>
        </div>
        <div className="card__details">
          <p className="card__details-title">RAM</p>
          <p className="card__details-value">{product.ram}</p>
        </div>
      </div>
      <div className="card__buttons">
        <button
          type="button"
          className={cn('card__add-to-cart',
            { 'card__add-to-cart-in-cart': isInCart })}
          onClick={handleAddToCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button
          type="button"
          className={cn('card__favorite', { card__selected: isLiked })}
          onClick={handleUpdateFavorite}
        >
          {isLiked ? (
            <img
              src={heartFilled}
              alt="favorite_heart"
              className="card__icon"
            />
          ) : (
            <img
              src={heart}
              alt="favorite_heart"
              className="card__icon"
            />
          )}
        </button>
      </div>
    </div>
  );
};
