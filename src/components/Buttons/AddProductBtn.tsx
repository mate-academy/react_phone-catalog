import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, getProducts } from '../../redux';
import { addToCart, deleteFromCart } from '../../redux/cart';

export const AddProductBtn = ({ productId, styleSize }: PrimaryBtnProps) => {
  const cart: Product[] = useSelector(getCart);
  const products: Product[] = useSelector(getProducts);
  const dispatch = useDispatch();


  const handleAddingToCart = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, prodId: string) => {
      const product = products.find(p => p.id === prodId);

      if (e.target.checked) {
        dispatch(addToCart(product));
      } else {
        dispatch(deleteFromCart(prodId));
      }
    }, [dispatch, products],
  );

  const isInCart = useMemo(() => (
    cart.some(product => product.id === productId)
  ), [cart, productId]);

  return (
    <label
      className={cn(
        'button-to-cart', styleSize,
      )}
      htmlFor={`button-to-cart__${productId}`}
    >
      <input
        className="button-to-cart__input"
        type="checkbox"
        id={`button-to-cart__${productId}`}
        checked={isInCart}
        onChange={(e) => handleAddingToCart(e, productId)}
      />
      <span className="button-to-cart__title">
        {isInCart ? 'Remove from card' : 'Add to cart'}
      </span>
    </label>
  );
};
