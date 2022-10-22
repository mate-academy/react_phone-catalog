import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as cartProductActions
  from '../../app/features/cartProductsSlice';
import * as favoritesActions from '../../app/features/favoritesSlice';
import { Product } from '../../types/Product';
import { CartProduct } from '../../types/CartProduct';
import './Order.scss';

type Props = {
  currentProduct: Product | null;
  buttonSize: string
};

export const Order: React.FC<Props> = ({ currentProduct, buttonSize }) => {
  const dispatch = useAppDispatch();
  const { cartProducts } = useAppSelector(state => state.cartProducts);
  const [cartProduct, setCartProduct] = useState<CartProduct | null>(null);
  const { favorites } = useAppSelector(state => state.favorites);
  const { pathname } = useLocation();

  useEffect(() => {
    const match = cartProducts.find(
      product => product.id === currentProduct?.id,
    );

    if (match) {
      setCartProduct(match);
    }

    if (!match && currentProduct) {
      const newCartProduct = {
        id: currentProduct.id,
        product: { ...currentProduct },
        quantity: 1,
      };

      setCartProduct(newCartProduct);
    }
  }, []);

  const isCartButtonActive = cartProducts.some(
    product => product.id === cartProduct?.id,
  );
  const isFavoriteButtonActive = favorites.some(
    product => product.id === currentProduct?.id,
  );

  const handlerCartButtonClick = () => {
    if (isCartButtonActive && cartProduct) {
      dispatch(cartProductActions.deleteCartProduct(cartProduct));

      return;
    }

    dispatch(cartProductActions.addCartProduct(cartProduct));
  };

  const handlerFavoriteButtonClick = () => {
    if (pathname === '/favorites' && currentProduct) {
      dispatch(
        favoritesActions.deleteFavorite(currentProduct),
      );

      return;
    }

    if (isFavoriteButtonActive && currentProduct) {
      dispatch(favoritesActions.deleteFavorite(currentProduct));

      return;
    }

    dispatch(favoritesActions.addFavorite(currentProduct));
  };

  return (
    <div className="Order">
      <button
        type="button"
        className={classNames(
          'Order__cart-button',
          `Order__cart-button--${buttonSize}`,
          { 'Order__cart-button--active': isCartButtonActive },
        )}
        onClick={handlerCartButtonClick}
      >
        {!isCartButtonActive
          ? 'Add to cart'
          : 'Added to cart'}

      </button>

      <button
        data-cy="addToFavorite"
        aria-label="addToFavorite"
        type="button"
        className={classNames(
          'Order__favorite-button',
          `Order__favorite-button--${buttonSize}`,
          { 'Order__favorite-button--active': isFavoriteButtonActive },
        )}
        onClick={handlerFavoriteButtonClick}
      />
    </div>
  );
};
