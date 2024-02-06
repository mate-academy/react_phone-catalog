/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { CartItem as TypeCartItem } from '../../types/CartItem';
import './cart-item.scss';

type Props = {
  item: TypeCartItem,
};

export const CartItem: React.FC<Props> = ({ item }) => {
  const {
    qnty,
    product,
  } = item;

  return (
    <>
      <button className="cross__icon icon" type="button" />
      <div className="item__image">
        <img
          src={`./${product.image}`}
          alt={product.name}
        />
      </div>
      <p className="item__title">{product.name}</p>
      <div className="item-counter">
        <button
          className="minus-button button"
          type="button"
        >
          -
        </button>
        <p className="item__amount">{qnty}</p>
        <button
          className="plus-button button"
          type="button"
        >
          +
        </button>
      </div>
      <p className="total__price">{`${product.price}$`}</p>
    </>
  );
};
