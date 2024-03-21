import React, { memo, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Cart } from '../../utils/Cart';
import { Favorites } from '../../utils/Favorites';
import { ProductsContext } from '../../store/ProductsContext';

import './ActionButtons.scss';

type Props = {
  size: string;
  productId: string;
};

export const ActionButtons: React.FC<Props> = memo(({ size, productId }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [isInFav, setIsInFav] = useState(false);
  const { products } = useContext(ProductsContext);

  useEffect(() => {
    Cart.load();
    Favorites.load();
    setIsInCart(Cart.items.some(item => item.id === productId));
    setIsInFav(Favorites.items.some(item => item.id === productId));
  }, [productId]);

  const handleAddToCart = () => {
    const product = products.find(p => p.itemId === productId);

    if (product) {
      if (isInCart) {
        Cart.removeItem(productId);
        setIsInCart(false);
      } else {
        Cart.addItem({ id: productId, quantity: 1, product });
        setIsInCart(true);
      }
    }
  };

  const handleAddToFav = () => {
    const product = products.find(p => p.itemId === productId);

    if (product) {
      if (isInFav) {
        Favorites.removeItem(productId);
        setIsInFav(false);
      } else {
        Favorites.addItem({ id: productId, product });
        setIsInFav(true);
      }
    }
  };

  return (
    <div className="ActionButtons">
      <button
        type="button"
        className={classNames('ActionButtons__addToCart', {
          'ActionButtons__addToCart--added': isInCart,
        })}
        aria-label="Add to cart Button"
        onClick={handleAddToCart}
      >
        {isInCart ? `Added to cart` : `Add to cart`}
      </button>
      <button
        type="button"
        className="ActionButtons__addToFav"
        aria-label="Add to fav Button"
        style={{ width: size, height: size }}
        onClick={handleAddToFav}
        data-cy="addToFavorite"
      >
        <i
          className={classNames('fa-heart ActionButtons__heart', {
            'far ': !isInFav,
            'fas ActionButtons__heart--red': isInFav,
          })}
        />
      </button>
    </div>
  );
});
