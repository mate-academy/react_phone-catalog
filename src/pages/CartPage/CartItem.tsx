import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  CartContext,
} from '../../helpers/SavedItemsContext';
import { generateSlugForProduct } from '../../helpers/utils';

export const CartItem:React.FC<Product> = (product) => {
  const {
    price,
    discount,
    imageUrl,
    quantity,
    name,
    type,
    id,
  } = product;
  const priceAfterDiscount = price * ((100 - discount) / 100);
  const { changeCartItems } = useContext(CartContext);
  const slug = generateSlugForProduct({ type, id });

  return (
    <div className="cart-item">
      <div className="cart-item__content-wrapper">
        <button
          type="button"
          className="cart-item__remove-item"
          onClick={() => {
            changeCartItems(product);
          }}
        >
          {}
        </button>
        <Link
          to={slug}
          className="cart-item__product-preview"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <Link
          to={slug}
          className="cart-item__product-name"
        >
          {name}
        </Link>
      </div>
      <div className="cart-item__content-wrapper">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="
              button
              cart-item__quantity-button
              cart-item__quantity-button--remove
            "
            onClick={() => {
              changeCartItems({
                ...product,
                quantity: quantity && quantity - 1,
              });
            }}
            disabled={!quantity || quantity <= 1}
          >
            {}
          </button>
          <div className="cart-item__quantity-amount">
            {quantity}
          </div>
          <button
            type="button"
            className="
              button
              cart-item__quantity-button
              cart-item__quantity-button--add
            "
            onClick={() => {
              changeCartItems({
                ...product,
                quantity: quantity && quantity + 1,
              });
            }}
          >
            {}
          </button>
        </div>
        <span className="cart-item__price">
          {String.fromCodePoint(0x00024)}
          {priceAfterDiscount * (quantity || 1)}
        </span>
      </div>
    </div>
  );
};
