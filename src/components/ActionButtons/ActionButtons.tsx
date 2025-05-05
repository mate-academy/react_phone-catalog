/* eslint-disable @typescript-eslint/no-shadow */
import styles from './ActionButtons.module.scss';
import FavouritesIcon from '../FavouritesIcon/FavouritesIcon';
import { Product } from '../../types/product';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToFavourites,
  removeFromFavourites,
} from '../../store/slices/favouriteProductsSlice';
import {
  addToCart,
  removeFromCart,
} from '../../store/slices/cartProductsSlice';

interface ActionButtonProps {
  product?: Product;
  productId?: string;
  // isInFavourites?: boolean;
}

const ActionButtons = ({ product }: ActionButtonProps) => {
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isProductInFavourites, setIsProductInFavourites] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
      const favouritesItems: Product[] = JSON.parse(
        localStorage.getItem('favourites') || '[]',
      );

      setIsProductInCart(
        cartItems.some((item: Product) => item.id === product.id),
      );
      setIsProductInFavourites(
        favouritesItems.some((item: Product) => item.id === product.id),
      );
    }
  }, [product]);

  const triggerAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!product?.id) {
        return;
      }

      const storedCarts = localStorage.getItem('cart');
      const cart: Product[] = storedCarts ? JSON.parse(storedCarts) : [];

      const isAlreadyCart = cart.some(item => item.id === product.id);

      let updatedCart;

      if (isAlreadyCart) {
        updatedCart = cart.filter(item => item.id !== product.id);
        dispatch(removeFromCart({ ...product, quantity: 1 }));
        setIsProductInCart(false);
      } else {
        updatedCart = [...cart, { ...product, quantity: 1 }];
        dispatch(addToCart({ ...product, quantity: 1 }));

        setIsProductInCart(true);
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
    },
    [product, setIsProductInCart, dispatch],
  );

  const triggerFavourites = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!product?.id) {
        return;
      }

      const storedFavourites = localStorage.getItem('favourites');
      const favourites: Product[] = storedFavourites
        ? JSON.parse(storedFavourites)
        : [];

      const isAlreadyFavourite = favourites.some(
        item => item.id === product.id,
      );

      let updatedFavourites;

      if (isAlreadyFavourite) {
        updatedFavourites = favourites.filter(item => item.id !== product.id);
        dispatch(removeFromFavourites(product));
        setIsProductInFavourites(false);
      } else {
        updatedFavourites = [...favourites, product];
        dispatch(addToFavourites(product));

        setIsProductInFavourites(true);
      }

      localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    },
    [product, setIsProductInFavourites, dispatch],
  );

  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.buttons__addToCart} ${isProductInCart ? styles.buttons__addToCart_active : ''}`}
        onClick={triggerAddToCart}
      >
        {isProductInCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        onClick={triggerFavourites}
        className={`${styles.buttons__favourites} ${isProductInFavourites ? styles.buttons__favourites_active : ''}`}
      >
        <FavouritesIcon />
      </button>
    </div>
  );
};

export default ActionButtons;
