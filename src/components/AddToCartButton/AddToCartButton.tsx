import {
  FC, useContext, useEffect, useState,
} from 'react';
import classNames from 'classnames';

import { CartStorageContext } from '../../context/CartStorageContext';
import { CartProduct } from '../../types/CartProduct';

import './AddToCartButton.scss';

type Props = {
  id: string;
  product: string;
  name: string;
  price: number;
  imageUrl: string;
};

export const AddToCartButton: FC<Props> = ({
  id,
  product,
  name,
  price,
  imageUrl,
}) => {
  const {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
  } = useContext(CartStorageContext);

  const [isInCart, setIsInCart] = useState(() => {
    try {
      return cartItems.find((item: CartProduct) => item.id === id) || false;
    } catch {
      return false;
    }
  });

  const handleCart = () => {
    if (!handleAddToCart || !handleRemoveFromCart) {
      return;
    }

    if (isInCart) {
      handleRemoveFromCart(id);
      setIsInCart(false);
    } else {
      const newItem = {
        id,
        quantity: 1,
        product,
        name,
        price,
        imageUrl,
      };

      handleAddToCart(newItem);
      setIsInCart(true);
    }
  };

  useEffect(() => {
    setIsInCart(cartItems.find((item: CartProduct) => item.id === id) || false);
  }, [cartItems]);

  return (
    <button
      type="button"
      onClick={handleCart}
      className={classNames(
        'button__buy',
        { 'button__add-to-cart': !isInCart },
        { button__selected: isInCart },
      )}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
