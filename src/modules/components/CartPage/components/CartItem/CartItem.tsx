import React, { useCallback, useContext } from 'react';
import './CartItem.scss';
import { CircleButton } from '../../../../shared/components/Buttons/CircleButton';
import { icons } from '../../../../../global-assets/static';
import { DispatchCartContext } from '../../../../shared/reducer/CartReducer';
import { CartElement } from '../../../../shared/types/CartElement';
import { motion } from 'framer-motion';

type CartItemProps = {
  product: CartElement;
};

export const CartItem: React.FC<CartItemProps> = React.memo(({ product }) => {
  const cartDispatch = useContext(DispatchCartContext);
  const IconCancel = icons.close.valuePath;

  const deleteProduct = useCallback(() => {
    cartDispatch({ type: 'removeItem', payload: product.id });
  }, [product.id, cartDispatch]);

  const decreaseProductAmount = () => {
    cartDispatch({ type: 'decrease', payload: product.id });
  };

  const increaseProductAmount = () => {
    cartDispatch({ type: 'increase', payload: product.id });
  };

  return (
    <motion.div
      className="cart-item"
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.3 }}
    >
      <div className="cart-item__content">
        <div className="cart-item__product-info">
          <button className="cart-item__product-info__btn-close">
            <IconCancel
              className="cart-item__product-info__icon"
              onClick={deleteProduct}
            />
          </button>
          <div className="cart-item__product-info__image">
            <img
              src={product.product.image}
              alt={`${product.product.name} image`}
            />
          </div>
          <span className="cart-item__product-info__name">
            {product.product.name}
          </span>
        </div>
        <div className="cart-item__price-info">
          <div className="cart-item__price-info__controls">
            <div className="cart-item__btn-adjust-amount">
              <button
                className="cart-item__btn-adjust-amount--minus"
                onClick={decreaseProductAmount}
                disabled={product.quantity === 1}
              >
                <CircleButton icon={icons.minus.valuePath} />
              </button>
              <div className="cart-item__btn-adjust-amount__amount">
                {product.quantity}
              </div>
              <button
                className="cart-item__btn-adjust-amount--plus"
                onClick={increaseProductAmount}
              >
                <CircleButton icon={icons.plus.valuePath} />
              </button>
            </div>
          </div>
          <div className="cart-item__price-info__price">{`$${product.product.price * product.quantity}`}</div>
        </div>
      </div>
    </motion.div>
  );
});

CartItem.displayName = 'CartItem';
