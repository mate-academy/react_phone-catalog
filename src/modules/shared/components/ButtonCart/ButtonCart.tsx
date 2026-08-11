import { useContext } from 'react';
import scss from './ButtonCart.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import classNames from 'classnames';
import { StorageCartItem } from '../../../../api/types';

interface Props {
  productId: number;
  image: string;
  name: string;
  price: number;
  className?: string;
}

export const ButtonCart: React.FC<Props> = ({
  productId,
  image,
  name,
  price,
  className,
}) => {
  const { cartItems, setCartItems } = useContext(DataContext);

  const isInCart = cartItems.some(item => item.productId === productId);

  const toggleCart = (productIdToToggle: number) => {
    setCartItems((prevItems: StorageCartItem[]) => {
      const exists = prevItems.some(
        (cartItem: StorageCartItem) => cartItem.productId === productIdToToggle,
      );

      if (exists) {
        return prevItems.filter(
          (cartItem: StorageCartItem) =>
            cartItem.productId !== productIdToToggle,
        );
      } else {
        return [
          ...prevItems,
          {
            id: productIdToToggle,
            quantity: 1,
            productId: productIdToToggle,
            image: image,
            name: name,
            price: price,
          },
        ];
      }
    });
  };

  return (
    <button
      type="button"
      aria-pressed={isInCart}
      aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
      className={classNames(scss.buttonCart, className)}
      onClick={() => toggleCart(productId)}
    >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
