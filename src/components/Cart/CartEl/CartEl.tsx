import closeIcon from '../../../assets/svg/close.svg';
import { useCart } from '../../../contexts/cartContext';
import { Product } from '../../../types/product';
import { IconButton } from '../../UI/IconButton/IconButton';
import './CartEl.scss';

type CartElProps = {
  product: Pick<Product, 'itemId' | 'image' | 'price' | 'name'>;
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

      <img className="cart-el__img" src={image} alt="" />

      <p className="cart-el__name">{name}</p>

      <div className="cart-el__controls">
        <IconButton
          alt="Decrement quantity"
          onClick={() => changeItemQuantity(itemId, -1)}
          isDisabled={quantity <= 1}
        >
          -
        </IconButton>

        <p data-cy="productQauntity" className="cart-el__quantity">
          {quantity}
        </p>

        <IconButton
          alt="Increment quantity"
          onClick={() => changeItemQuantity(itemId, 1)}
        >
          +
        </IconButton>
      </div>

      <p className="cart-el__price">{`$${price}`}</p>
    </div>
  );
};
