import closeIcon from '../../assets/svg/close.svg';
import minusIcon from '../../assets/svg/minus.svg';
import plusIcon from '../../assets/svg/plus.svg';
import { IconButton } from '../Buttons/IconButton/IconButton';
import './CartEl.scss';

export const CartEl = () => {
  return (
    <div className="cart-el">
      <button type="button" className="cart-el__delete">
        <img src={closeIcon} alt="Delete item" />
      </button>

      <img
        className="cart-el__img"
        src="_new/img/phones/apple-iphone-7/black/00.jpg"
        alt=""
      />

      <p>Apple iPhone 11 Pro Max 64GB Gold (iMT9G2FS/A)</p>

      <div className="cart-el__controls">
        <IconButton
          svg={minusIcon}
          alt="Decrement quantity"
          onClick={() => {}}
        />
        <p className="cart-el__quantity">1</p>
        <IconButton
          svg={plusIcon}
          alt="Increment quantity"
          onClick={() => {}}
        />
      </div>

      <p className="cart-el__price">1099$</p>
    </div>
  );
};
