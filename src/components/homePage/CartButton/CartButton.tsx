import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { AllAction, deleteCart, loadCart } from '../../../store/cartStore/cartStore';
import { cartItem } from '../../../store/fullStore/store';

type Props = {
  gadget: Gadget;
};

const CartButton: React.FC<Props> = ({ gadget }) => {
  const cartItems = useSelector(cartItem);
  const dispatch = useDispatch<Dispatch<AllAction>>();

  const isAddedToCart = (idItem: string) => (
    cartItems.find(item => item.id === idItem)
  );

  return (
    <>
      {isAddedToCart(gadget.id)
        ? (
          <input
            type="button"
            value="Delete from cart"
            className={classNames(
              'gadget__button-add-to-cart',
              { 'gadget__button-add-to-cart-selected': true },
              'gadget__button-delete-from-cart',
            )}
            onClick={() => dispatch(deleteCart(gadget.id))}
          />
        )
        : (
          <input
            type="button"
            value="Add to cart"
            className={classNames(
              'gadget__button-add-to-cart',
              { 'gadget__button-add-to-cart-selected': true },
            )}
            onClick={() => dispatch(loadCart(gadget, 1))}
          />
        )}
    </>
  );
};

export default CartButton;
