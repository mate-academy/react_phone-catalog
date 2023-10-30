import { useState } from 'react';
import { PhoneInCart } from '../../types/PhoneInCart';
import { Cancel } from '../../SVG/Cancel/Cancel';
import { useCart } from '../../hooks/useCart';
import './CartItem.scss';

type Props = {
  info: PhoneInCart;
};

export const CartItem: React.FC<Props> = ({ info }) => {
  const { changeNumber, removeFromCart } = useCart();
  const [disappearCartAnimation, setDisappearCartAnimation] = useState(false);

  return (
    <div className={`CartItem ${disappearCartAnimation && 'cartItemDisappearAnimation'}`}>
      <button
        type="button"
        className="CartItem__cancelBtn"
        onClick={() => {
          setDisappearCartAnimation(true);
          setTimeout(() => {
            removeFromCart(info.id);
          }, 400);
        }}
      >
        <Cancel />
      </button>
      <div className="CartItem__imgWrap">
        <img
          src={info.imageUrl}
          alt="gadget"
          className="CartItem__img"
        />
      </div>
      <h2 className="CartItem__name">
        {info.name}
      </h2>
      <div className="CartItem__number-price">
        <div className="CartItem__number-wrapper">
          <button
            type="button"
            className="CartItem__numberBtn"
            onClick={() => {
              if (info.number === 1) {
                return;
              }

              changeNumber(info, 'SUBTRACT');
            }}
          >
            -
          </button>
          <h3 className="CartItem__number">{info.number}</h3>
          <button
            type="button"
            className="CartItem__numberBtn"
            onClick={() => {
              changeNumber(info);
            }}
          >
            +
          </button>
        </div>
        <h3 className="CartItem__price">{`$${info.price - info.discount}`}</h3>
      </div>
    </div>
  );
};
