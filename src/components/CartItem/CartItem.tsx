import { useContext } from 'react';
import { Context } from '../../context/Context';
import { Product } from '../../types/Product';
import './CartItem.scss';

export const CartItem: React.FC<Product> = (product) => {
  const {
    imageUrl,
    name,
    price,
    quantity,
    discount,
  } = product;

  const priceAfterDiscount = price * ((100 - discount) / 100);

  const { changeCart } = useContext(Context);

  const addItem = () => {
    changeCart({
      ...product,
      quantity: quantity && quantity + 1,
    });
  };

  const substractItem = () => {
    changeCart({
      ...product,
      quantity: quantity && quantity - 1,
    });
  };

  return (
    <li className="cart__item">
      <button
        data-cy="cartDeleteButton"
        className="cart__item__icon"
        type="button"
        onClick={() => changeCart(product)}
      >
        <span
          className="cart__item__icon--close"
        />
      </button>

      <div className="cart__image--container">
        <img
          src={imageUrl}
          alt="product"
          className="cart__image"
        />
      </div>

      <div className="cart__item-title">
        {name}
      </div>

      <div className="cart__buttons">
        <button
          className="cart__buttons__icon"
          type="button"
          onClick={() => substractItem()}
          disabled={!quantity || quantity <= 1}
        >
          <span
            className="cart__buttons__icon--substract"
          />
        </button>

        <div className="cart__quantity">
          {quantity}
        </div>

        <button
          className="cart__buttons__icon"
          type="button"
          onClick={() => addItem()}
        >
          <span
            className="cart__buttons__icon--add"
          />
        </button>
      </div>

      <div className="cart__price">
        {`$${priceAfterDiscount * (quantity || 1)}`}
      </div>
    </li>
  );
};
