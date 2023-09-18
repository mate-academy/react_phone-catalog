import { Phone } from '../../types/Phone';
import { IMG_LINK } from '../../utils/IMG_LINK';
import './style.scss';

type Props = {
  product: Phone;
  amount: number;
  onDelete: (id: string) => void;
  onChange: (id: string, value: number) => void;
};

export const CartProduct: React.FC<Props> = ({
  product, onDelete, amount, onChange,
}) => {
  return (
    <div className="cart-product">
      <button
        type="button"
        className="cart-product__delete"
        onClick={() => onDelete(product.id)}
      >
        <img
          src="./icons/close.svg"
          alt="Delete"
          className="cart-product__icon"
        />
      </button>

      <div className="cart-product__photo">
        <img
          src={`${IMG_LINK}${product.image}`}
          alt={product.name}
          className="cart-product__image"
        />
      </div>

      <div className="cart-product__name">
        {`${product.name}`}
        <br />
        (iMT9G2FS/A)
      </div>

      <div className="cart-product__buttons">
        <button
          type="button"
          className="cart-product__button"
          onClick={() => onChange(product.itemId, -1)}
          disabled={amount === 1}
        >
          <img
            src="./icons/minus.svg"
            alt="minus amount"
            className="cart-product__icon"
          />
        </button>

        <div className="cart-product__amount">
          {amount}
        </div>

        <button
          type="button"
          className="cart-product__button"
          onClick={() => onChange(product.itemId, 1)}
        >
          <img
            src="../../icons/plus.svg"
            alt="plus amount"
            className="cart-product__icon"
          />
        </button>
      </div>

      <p className="cart-product__price">{`$${product.price * amount}`}</p>

    </div>
  );
};
