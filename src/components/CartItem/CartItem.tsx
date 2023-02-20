import classNames from 'classnames';
import { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { CartItemInfo } from '../../types/CartItemInfo';
import './CartItem.scss';

type Props = {
  product: CartItemInfo;
  deleteItem: (productId: string) => void;
  addItem: (productId: string) => void;
};

export const CartItem: React.FC<Props> = ({
  product,
  deleteItem,
  addItem,
}) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  return (
    <div className="cartItem">
      <button
        aria-label="deleteItem"
        type="button"
        className="cartItem__delete"
        data-cy="cartDeleteButton"
        onClick={() => setCartItems(cartItems
          .filter(item => item.id !== product.id))}
      />

      <img className="cartItem__image" src={product.image} alt="product" />

      <h4 className="cartItem__name">{product.name}</h4>

      <div className="cartItem__amount">
        <button
          onClick={() => deleteItem(product.id)}
          type="button"
          disabled={product.quantity <= 1}
          className={classNames(
            'cartItem__button', {
              'cartItem__button--disabled': product.quantity <= 1,
            },
          )}
        >
          {product.quantity > 1
            ? (
              <img
                src="./img/deleteItem.svg"
                alt="deleteItem"
              />
            )
            : (
              <img
                src="./img/deleteItemDisabled.svg"
                alt="deleteItemDisabled"
              />
            )}
        </button>

        <p className="cartItem__count">{product.quantity}</p>

        <button
          onClick={() => addItem(product.id)}
          type="button"
          className="cartItem__button"
        >
          <img src="./img/addItem.svg" alt="addItem" />
        </button>
      </div>

      <p className="cartItem__price">{`$${product.price - product.price * (product.discount / 100)}`}</p>
    </div>
  );
};
