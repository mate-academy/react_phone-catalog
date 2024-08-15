import { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectFavoritesItems,
  setFavoritesItems,
} from '../../redux/slices/favoritesItemsSlice';
import {
  selectCartItems,
  setCartItems,
} from '../../redux/slices/cartItemsSlice';
import { CommonPropsProduct } from '../../types/CommonPropsProduct';
import { StorageItem } from '../../types/StorageItem';
import styles from './AddButtons.module.scss';

interface Props {
  product: CommonPropsProduct;
  onProductDetailsPage?: boolean;
}

export const AddButtons: React.FC<Props> = ({
  product,
  onProductDetailsPage = false,
}) => {
  const favoritesItems = useAppSelector(selectFavoritesItems);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const { itemId } = product;

  const isProductInCart = useMemo(
    () =>
      cartItems.some(
        ({ product: cartProduct }) => cartProduct.itemId === itemId,
      ),
    [itemId, cartItems],
  );

  const isProductInFavorites = useMemo(
    () =>
      favoritesItems.some(
        ({ product: favoritesProduct }) => favoritesProduct.itemId === itemId,
      ),
    [itemId, favoritesItems],
  );

  const handleAddToCart = useCallback(() => {
    if (isProductInCart) {
      return;
    }

    const newItem: StorageItem = {
      id: +new Date(),
      quantity: 1,
      product,
    };

    dispatch(setCartItems([...cartItems, newItem]));
  }, [cartItems, isProductInCart, product, dispatch]);

  const handleAddToFavorites = useCallback(() => {
    if (!isProductInFavorites) {
      const newItem: StorageItem = {
        id: +new Date(),
        quantity: 1,
        product,
      };

      dispatch(setFavoritesItems([...favoritesItems, newItem]));

      return;
    }

    const newItems = favoritesItems.filter(
      ({ product: favoritesProduct }) => favoritesProduct.itemId !== itemId,
    );

    dispatch(setFavoritesItems(newItems));
  }, [dispatch, favoritesItems, isProductInFavorites, itemId, product]);

  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={classNames(styles.btnToCart, {
          [styles.btnToCartSelected]: isProductInCart,
        })}
        onClick={handleAddToCart}
      />
      <button
        type="button"
        className={classNames(
          styles.btnToFavorites,
          {
            [styles.btnToFavoritesSelected]: isProductInFavorites,
          },
          { [styles.btnToFavoritesDetails]: onProductDetailsPage },
        )}
        onClick={handleAddToFavorites}
      />
    </div>
  );
};
