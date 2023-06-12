import classNames from 'classnames';
import { Phone } from '../../types/Phone';
import { CartItem } from '../../types/CartItem';

type Props = {
  phone: Phone,
  cartProducts: CartItem[],
  setCartProducts: React.Dispatch<React.SetStateAction<CartItem[]>>,
};

export const CartButton: React.FC<Props> = ({
  phone,
  cartProducts,
  setCartProducts,
}) => {
  const isInCart = cartProducts.some(
    (cartProduct) => cartProduct.id === phone.id,
  );

  const handleAddToCart = () => {
    setCartProducts((prevCartProducts) => {
      const existingCartItem = prevCartProducts.find(
        (cartItem) => cartItem.product.id === phone.id,
      );

      if (existingCartItem) {
        return prevCartProducts.map((cartItem) => {
          if (cartItem.product.id === phone.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }

          return cartItem;
        });
      }

      const newCartItem: CartItem = {
        id: phone.id,
        quantity: 1,
        product: phone,
      };

      return [...prevCartProducts, newCartItem];
    });
  };

  return (
    <div className="cart-button">
      <button
        type="button"
        onClick={handleAddToCart}
        className={classNames('phone__button', {
          'phone__button--clicked': isInCart,
        })}
      >
        Add to cart
      </button>
    </div>
  );
};
