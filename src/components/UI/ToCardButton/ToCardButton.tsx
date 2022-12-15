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

  const styles = {
    width,
    height,
  };

  const handleClick = () => {
    const isAdded = cartItems
      .some(cartItem => cartItem.product.id === currentProduct.id);

    if (!isAdded) {
      const newCartItem: CartItem = {
        id: currentProduct.id,
        quantity: 1,
        product: currentProduct,
      };

      setCartItems([...cartItems, newCartItem]);
    } else {
      setCartItems([...cartItems
        .filter(cartItem => cartItem.product.id !== currentProduct.id)]);
    }
  };

  // const addToCart = () => {
  //   const newCartItem: CartItem = {
  //     id: currentProduct.id,
  //     quantity: 1,
  //     product: currentProduct,
  //   };
  //
  //   setCartItems((currentItems) => {
  //     console.log(currentItems)
  //     localStorage
  //       .setItem('cart', JSON.stringify([...currentItems, newCartItem]));
  //
  //     return [...currentItems, newCartItem];
  //   });
  // };

  return (
    <button
      type="button"
      className={classNames(
        'to-card-button',
        // { 'to-card-button--added': isAdded },
      )}
      style={styles}
      onClick={handleClick}
    >
      Added to cart

      {/* {isAdded ? 'Added to cart' : 'Add to cart'} */}
    </button>
  );
};
