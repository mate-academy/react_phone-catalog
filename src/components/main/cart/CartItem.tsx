import { ProductInCart } from '../../../helpers/types/ProductInCart';

type CartItemProps = {
  productInCart: ProductInCart
  onRemoveClick: (id: string) => void
  onQuantityClick: (id: string, isMinus: boolean) => void
};

export const CartItem = ({
  productInCart: { product, quantity },
  onRemoveClick,
  onQuantityClick,
}: CartItemProps) => {
  const {
    imageUrl,
    name,
    discountedPrice,
    id,
  } = product;
  const totalPrice = `$${(+(discountedPrice * quantity).toFixed(2))}`;

  return (
    <li className="cart-item">
      <button
        type="button"
        className="cart-item__remove-button"
        data-cy="cartDeleteButton"
        onClick={() => onRemoveClick(id)}
      >
        <img
          className="cart-item__remove-icon"
          src="img/cart/close.svg"
          alt="Delete item"
        />
      </button>

      <img
        className="cart-item__product-image"
        src={imageUrl}
        alt="Product"
      />

      <p className="cart-item__product-name">{name}</p>

      <button
        className="cart-item__minus"
        type="button"
        disabled={quantity === 1}
        onClick={() => onQuantityClick(id, true)}
      >
        -
      </button>

      <div
        data-cy="productQauntity"
        className="cart-item__quantity"
      >
        {quantity}
      </div>

      <button
        className="cart-item__plus"
        type="button"
        onClick={() => onQuantityClick(id, false)}
      >
        +
      </button>

      <span className="cart-item__total-price">{totalPrice}</span>
    </li>
  );
};
