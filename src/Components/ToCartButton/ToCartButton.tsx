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
  const [productInCart, setProductInCart] = useState(
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
        { 'button--active': productInCart },
      )}
      onClick={() => addHandler(
        'CartItems',
        {
          id,
          quantity: 1,
          product,
        },
        setProductInCart,
        setCart,
        cart,
      )}
    >
      {productInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
