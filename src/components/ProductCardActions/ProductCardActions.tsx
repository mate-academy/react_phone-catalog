/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import './product-card-actions.scss';
import { useCallback, useContext, useMemo } from 'react';
import { Product } from '../../types/Product';
import { MainContext } from '../../context';
import { CartItem } from '../../types/CartItem';

type Props = {
  product: Product,
};

export const ProductCardActions: React.FC<Props> = ({
  product,
}) => {
  const {
    cartItems,
    setCartItems,
    favouritesItems,
    setFavouritesItems,
  } = useContext(MainContext);

  const isAddToCartBtnActive = useMemo(() => {
    return cartItems.some((item) => item.product.id === product.id);
  }, [product, cartItems]);

  const isAddToFavBtnActive = useMemo(() => {
    return favouritesItems.some((item) => item.id === product.id);
  }, [product, favouritesItems]);

  const addToCart = useCallback((selectedProduct: Product) => {
    if (!selectedProduct) {
      return;
    }

    const cartItem: CartItem = {
      id: +selectedProduct.id,
      qnty: 1,
      product: selectedProduct,
    };

    if (isAddToCartBtnActive) {
      setCartItems((prev) => prev.filter(
        itemCart => itemCart.product !== selectedProduct,
      ));

      return;
    }

    setCartItems((prev) => [...prev, cartItem]);
  }, [isAddToCartBtnActive]);

  const addToFavourites = useCallback((selectedProduct: Product) => {
    if (isAddToFavBtnActive) {
      setFavouritesItems((prev) => prev.filter(
        item => item.id !== selectedProduct.id,
      ));

      return;
    }

    setFavouritesItems((prev) => [...prev, selectedProduct]);
  }, [isAddToFavBtnActive]);

  return (
    <>
      <button
        type="button"
        name="add-to-card"
        className={classNames(
          'add-to-card primary__button button',
          {
            selected: isAddToCartBtnActive,
          },
        )}
        onClick={() => addToCart(product)}
      >
        {!isAddToCartBtnActive ? 'Add to cart' : 'Added to cart'}
      </button>
      <button
        type="button"
        name="add-to-favourite"
        className={classNames(
          'add-to-favourite button icon',
          {
            selected: isAddToFavBtnActive,
          },
        )}
        onClick={() => addToFavourites(product)}
      />
    </>
  );
};
