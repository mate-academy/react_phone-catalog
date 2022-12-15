import { FC } from 'react';
import classNames from 'classnames';
import { Product } from '../../../types/Product';
import { CartItem } from '../../../types/CartItem';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import './ToCardButton.scss';

type Props = {
  width: string;
  height: string;
  currentProduct: Product;
};

export const ToCardButton: FC<Props> = ({ width, height, currentProduct }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  // const [isAdded, setIsAdded] = useState(cartItems
  //   .some(cartItem => cartItem.product.id === currentProduct.id));
  const isAdded = false;

  const styles = {
    width,
    height,
  };

  const addToCart = () => {
    const newCartItem: CartItem = {
      id: currentProduct.id,
      quantity: 1,
      product: currentProduct,
    };

    setCartItems([...cartItems, newCartItem]);
  };

  const removeFromCart = () => {
    setCartItems([...cartItems
      .filter(cartItem => cartItem.product.id !== currentProduct.id)]);
  };

  return (
    <button
      type="button"
      className={classNames(
        'to-card-button',
        { 'to-card-button--added': isAdded },
      )}
      style={styles}
      onClick={isAdded ? removeFromCart : addToCart}
    >
      {isAdded ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
