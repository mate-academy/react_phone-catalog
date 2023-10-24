import {
  FC,
  useContext,
  useState,
} from 'react';
import { getFinalPrice } from '../../helpers/getFinalPrice';
import { Product } from '../../types/Product';
import './CartItem.scss';
import { NavbarContext } from '../../context/NavbarContext';

type Props = {
  product: Product,
  isClicked: boolean,
  setIsClicked: (par: boolean) => void;
};

export const CartItem: FC<Props> = ({
  product,
  isClicked,
  setIsClicked,
}) => {
  const {
    name,
    price,
    discount,
    id,
  } = product;
  const modifiedImageUrl = product.imageUrl.replace('phones', 'products');
  const finalPrice = getFinalPrice(price, discount);
  const { handleAddToCartFn } = useContext(NavbarContext);
  const getAmount = () => {
    const res = localStorage.getItem(id);

    if (res) {
      return +res;
    }

    return 1;
  };

  const [amount, setAmount] = useState(getAmount());

  const addDevice = () => {
    setIsClicked(!isClicked);
    const quantity = localStorage.getItem(id);

    if (quantity && amount) {
      const res = +quantity + 1;

      localStorage.setItem(id, String(res));
      setAmount(getAmount());
    }
  };

  const minusDevice = () => {
    setIsClicked(!isClicked);
    const quantity = localStorage.getItem(id);

    if (quantity && amount && +quantity > 1) {
      const res = +quantity - 1;

      localStorage.setItem(id, String(res));
      setAmount(getAmount());
    }
  };

  return (
    <div className="cart-item">
      <button
        data-cy="cartDeleteButton"
        className="cart-item__button-delete"
        type="button"
        aria-label="delete"
        onClick={(e) => {
          handleAddToCartFn(e, product);
          setIsClicked(!isClicked);
        }}
      />
      <img
        className="cart-item__image"
        src={modifiedImageUrl}
        alt="device"
      />
      <p className="cart-item__name">{name}</p>
      <div className="cart-item__buttons-wrapper">
        <button
          type="button"
          className="cart-item__button"
          onClick={minusDevice}
        >
          -
        </button>
        <p className="cart-item__amount">{amount}</p>
        <button
          type="button"
          className="cart-item__button"
          onClick={addDevice}
        >
          +
        </button>
      </div>
      <span className="cart-item__price">{`$${finalPrice}`}</span>
    </div>
  );
};
