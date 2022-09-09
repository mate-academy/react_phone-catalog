import classNames from 'classnames';
import { useContext, useState } from 'react';
import {
  addHandler, findItem, parseStorage,
} from '../../Helpers/functions/storage-helpers';
import { Product } from '../../Helpers/types/Product';
import { CartContext } from '../Context/CartContextProvider';

type Props = {
  id: string,
  product: Product,
  isLarge: boolean,
};

export const ToCartButton: React.FC<Props> = ({ id, product, isLarge }) => {
  const [isInCart, setIsInCart] = useState(
    findItem(parseStorage('CartItems'), id),
  );

  const { cart, setCart } = useContext(CartContext);

  return (
    <button
      type="button"
      className={classNames(
        'button',
        'body-text',
        { 'button--large': isLarge },
        { 'button--active': isInCart },
      )}
      onClick={() => addHandler(
        'CartItems',
        {
          id,
          quantity: isInCart?.quantity || 1,
          product,
        },
        setIsInCart,
        setCart,
        cart,
      )}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
