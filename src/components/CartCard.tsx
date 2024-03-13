/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { getProductPriceWithDiscount } from '../helpers/ProductMethods';
import { CartItem } from '../types/CartItem';

type Props = {
  cartItem: CartItem;
  setCartItems: (item: CartItem[]) => void;
  cartItems: CartItem[];
};
export const CartCard: React.FC<Props> = ({
  cartItem,
  setCartItems,
  cartItems,
}) => {
  const price =
    cartItem.product?.discount > 0
      ? getProductPriceWithDiscount(cartItem.product)
      : cartItem.product.price;

  const handleDelete = () => {
    const filteredItems = cartItems.filter((item) => item.id !== cartItem.id);

    setCartItems(filteredItems);
  };

  const isDisabledMinusButton = cartItem.quantity <= 1;
  const handlePlus = () => {
    const updatedCartItems = cartItems.map((el) => {
      if (el.id === cartItem.id) {
        return { ...el, quantity: cartItem.quantity + 1 };
      }

      return el;
    });

    setCartItems(updatedCartItems);
  };

  const handleMinus = () => {
    const updatedCartItems = cartItems.map((el) => {
      if (el.id === cartItem.id) {
        return { ...el, quantity: cartItem.quantity - 1 };
      }

      return el;
    });

    setCartItems(updatedCartItems);
  };

  return (
    <div className="cart-card">
      <div className="cart-card__left">
        <div
          data-cy="cartDeleteButton"
          className="icon icon--close cart-card__icon"
          onClick={handleDelete}
        />
        <img
          src={cartItem.product.imageUrl}
          alt="product"
          className="cart-card__img"
        />
        <p className="cart-card__name">{cartItem.product.name}</p>
      </div>

      <div className="cart-card__right">
        <div className="cart-card__quantity-control">
          <button
            className="button"
            aria-label="button-slider-left"
            type="button"
            disabled={isDisabledMinusButton}
            onClick={handleMinus}
          >
            -
          </button>

          <p data-cy="productQauntity" className="cart-card__quantity">
            {cartItem.quantity}
          </p>

          <button
            className="button"
            aria-label="button-slider-right"
            type="button"
            onClick={handlePlus}
          >
            +
          </button>

        </div>
        <p className="cart-card__price">{`$${price}`}</p>
      </div>
    </div>
  );
};
