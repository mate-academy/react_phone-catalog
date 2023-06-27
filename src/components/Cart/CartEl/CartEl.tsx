import closeIcon from '../../../assets/svg/close.svg';
import minusIcon from '../../../assets/svg/minus.svg';
import plusIcon from '../../../assets/svg/plus.svg';
import { useCart } from '../../../contexts/cartContext';
import { CartProduct } from '../../../types/cartItem';
import { IconButton } from '../../UI/IconButton/IconButton';
import './CartEl.scss';

type CartElProps = {
  product: CartProduct;
  quantity: number;
};

export const CartEl = ({ product, quantity }: CartElProps) => {
  const { changeItemQuantity, deleteCartItem } = useCart();
  const {
    price, name, image, itemId,
  } = product;

  return (
    <div className="cart-el">
      <button
        data-cy="cartDeleteButton"
        type="button"
        onClick={() => deleteCartItem(itemId)}
        className="cart-el__delete"
      >
        <img src={closeIcon} alt="Delete item" />
      </button>

      <img className="cart-el__img" src={`_new/${image}`} alt="" />

      <p className="cart-el__name">{name}</p>

      <div className="cart-el__controls">
        <IconButton
          svg={minusIcon}
          alt="Decrement quantity"
          onClick={() => changeItemQuantity(itemId, -1)}
          isDisabled={quantity <= 1}
        />

        <p className="cart-el__quantity">{quantity}</p>

        <IconButton
          svg={plusIcon}
          alt="Increment quantity"
          onClick={() => changeItemQuantity(itemId, 1)}
        />
      </div>

      <p className="cart-el__price">{`$${price}`}</p>
    </div>
  );
};
