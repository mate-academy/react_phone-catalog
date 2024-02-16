import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import './ProductActions.scss';
import { useAppDispatch, useAppSelector } from '../../api/hooks';
import {
  addItem as addFavouriteItem,
  removeItem as removeFavouriteItem,
} from '../../features/favouritesSlice';
import { localClient } from '../../helpers/localClient';
import { ProductItem } from '../../types/ProductItem';
import { addItem } from '../../features/cartSlice';

interface ProductActionsProps {
  product: ProductItem;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const favourites = useAppSelector(state => state.favourites.favourites);
  const cart = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    // Check if the product is in the cart
    const isInCart = cart.some(item => item.id === product.id);

    setAddedToCart(isInCart);
  }, [cart, product.id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    dispatch(addItem(product));
  };

  const handleAddToFavourite = () => {
    dispatch(addFavouriteItem(product));
    localClient.write('favourites', [...favourites, product]);
  };

  const handleRemoveFromFavourite = () => {
    dispatch(removeFavouriteItem(product.id));

    const listWithRemovedItem = favourites.filter(item => {
      return item.id !== product.id;
    });

    localClient.write('favourites', listWithRemovedItem);
  };

  const isItemInFavourites = () => {
    return favourites.find((item: ProductItem) => {
      return item.id === product.id;
    });
  };

  const handleCartButtonClick = () => {
    if (addedToCart) {
      navigate('/cart');
    } else {
      handleAddToCart();
    }
  };

  useEffect(() => {
    localClient.write('cart', cart);
  }, [cart]);

  return (
    <div className="actions">
      { /* eslint-disable-next-line */}
      <button
        className={cn('actions-toCart', {
          'actions-toCart--added': addedToCart,
        })}
        onClick={handleCartButtonClick}
      >
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
      { /* eslint-disable-next-line */}
      <button
        className={cn('actions-toFavourite', {
          'actions-toFavourite--added': isItemInFavourites(),
        })}
        onClick={isItemInFavourites()
          ? handleRemoveFromFavourite
          : handleAddToFavourite}
        data-cy="addToFavorite"
      />
    </div>
  );
};

export default ProductActions;
