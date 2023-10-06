import classNames from 'classnames';
import {
  FC,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CartStorageContext } from '../../Context/CartStorageContext';
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
  const { cartItems, handleAddToCart } = useContext(CartStorageContext);

  const [isInCart, setIsInCart] = useState(() => {
    try {
      return cartItems.find((item: CartProduct) => item.id === id) || false;
    } catch {
      return false;
    }
  });

  const handleAddItem = () => {
    if (isInCart || !handleAddToCart) {
      return;
    }

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
  };

  useEffect(() => {
    setIsInCart(cartItems.find((item: CartProduct) => item.id === id) || false);
  }, [cartItems]);

  return (
    <button
      type="button"
      className={classNames(
        'button__buy',
        { 'button__add-to-cart': !isInCart },
        { button__selected: isInCart },
      )}
      onClick={handleAddItem}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
