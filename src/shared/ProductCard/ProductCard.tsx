import './ProductCard.scss';
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Link, useSearchParams } from 'react-router-dom';

type CartItem = {
  item: Product;
  quantity: number;
};

type PropsCardProps = {
  currentProduct: Product;
  discount?: boolean;
  setCart?: React.Dispatch<React.SetStateAction<Product[]>>;
  setFavorite?: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductCard: React.FC<PropsCardProps> = ({
  currentProduct,
  discount = false,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [cart, setCartState] = useState<CartItem[]>(() => {
    return JSON.parse(localStorage.getItem('CartStore') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('CartStore', JSON.stringify(cart));
  }, [cart]);

  const [favorite, setFavoriteState] = useState<Product[]>(() => {
    return JSON.parse(localStorage.getItem('FavoriteStore') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('FavoriteStore', JSON.stringify(favorite));
  }, [favorite]);

  const handleOpenProductCard = (productId: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('product', productId);
    setSearchParams(params);
  };

  const handleAddToCart = () => {
    const storedCart: CartItem[] = JSON.parse(
      localStorage.getItem('CartStore') || '[]',
    );

    const isAlreadyInCart = storedCart.some(
      cartItem => cartItem?.item?.id === currentProduct.id,
    );

    let updatedCart;

    if (isAlreadyInCart) {
      updatedCart = storedCart.filter(
        item => item?.item?.id !== currentProduct.id,
      );
    } else {
      updatedCart = [...storedCart, { item: currentProduct, quantity: 1 }];
    }

    setCartState(updatedCart);
    localStorage.setItem('CartStore', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToFavorite = () => {
    const storedFavorite: Product[] = JSON.parse(
      localStorage.getItem('FavoriteStore') || '[]',
    );

    const isAlreadyInFavorite = storedFavorite.some(
      item => item.id === currentProduct.id,
    );

    let updatedFavorite: Product[];

    if (isAlreadyInFavorite) {
      updatedFavorite = storedFavorite.filter(
        item => item.id !== currentProduct.id,
      );
    } else {
      updatedFavorite = [...storedFavorite, currentProduct];
    }

    setFavoriteState(updatedFavorite);
    localStorage.setItem('FavoriteStore', JSON.stringify(updatedFavorite));
    window.dispatchEvent(new Event('favUpdated'));
  };

  const isInCart = cart.some(
    cartItem => cartItem?.item?.id === currentProduct.id,
  );

  const isInFavorite = favorite.some(item => item.id === currentProduct.id);

  return (
    <div className="card">
      <div className="card__content">
        <Link
          className="card__photo"
          to={`/${currentProduct.category}/${currentProduct.itemId}`}
          onClick={() => handleOpenProductCard(currentProduct.itemId)}
        >
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="card__image"
          />
        </Link>

        <Link
          to={`/${currentProduct.category}/${currentProduct.itemId}`}
          onClick={() => handleOpenProductCard(currentProduct.itemId)}
          className="card__title text-body"
        >
          {currentProduct.name}
        </Link>

        {discount ? (
          <div className="card__price-group">
            <p className="card__price text-h3">${currentProduct.price}</p>
            <p className="card__fullprice">${currentProduct.fullPrice}</p>
          </div>
        ) : (
          <p className="text-h3">${currentProduct.fullPrice}</p>
        )}

        <div className="card__line"></div>

        <div className="card__info">
          <div className="card__info-point">
            <p className="card__info-feature text-small">Screen</p>
            <p className="card__info-significance text-small">
              {currentProduct.screen}
            </p>
          </div>
          <div className="card__info-point">
            <p className="card__info-feature text-small">Capacity</p>
            <p className="card__info-significance text-small">
              {currentProduct.capacity}
            </p>
          </div>
          <div className="card__info-point">
            <p className="card__info-feature text-small">RAM</p>
            <p className="card__info-significance text-small">
              {currentProduct.ram}
            </p>
          </div>
        </div>

        <div className="card__button-group">
          {isInCart ? (
            <button
              className="button card__button-add--selected"
              onClick={handleAddToCart}
            >
              <div className="text-button text-added">Added</div>
            </button>
          ) : (
            <button
              className="button card__button-add"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          )}
          <button
            className="icon icon-40 card__button-favorite"
            onClick={handleAddToFavorite}
          >
            {isInFavorite ? (
              <div className="icon--heart-fill"></div>
            ) : (
              <div className="icon--heart-empty"></div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
