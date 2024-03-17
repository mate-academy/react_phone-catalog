import { TypeCard } from "../../types/TypeCard";
import { useCartPhones } from "../../helpers/useArrays";
import {
  decreasePhonesCountToSell,
  increasePhonesCountToSell,
} from "../../features/cartSlice";
import { useAppDispatch } from "../../store";

interface T {
  phone: TypeCard;
}

export const CartsCard: React.FC<T> = ({ phone }) => {
  const dispatch = useAppDispatch();

  const changeCount = (key: string) => {
    switch (key) {
      case "-":
        dispatch(decreasePhonesCountToSell(phone.id));
        break;

      case "+":
        dispatch(increasePhonesCountToSell(phone.id));
        break;
      default:
        break;
    }
  };

  const changeCart = useCartPhones();

  return (
    <>
      <li className="phones__item">
        <div className="left-container">
          <button
            data-cy="cartDeleteButton"
            className="phones__close"
            type="button"
            onClick={() => changeCart(phone)}
          >
            <img src="./img/Close.png" alt="Close" />
          </button>

          <img
            src={`https://mate-academy.github.io/react_phone-catalog/_new/${phone.image}`}
            alt="phone"
            className="phones__img"
          />

          <p>{phone.name}</p>
        </div>

        <div className="right-container">
          <div className="phones__count">
            <button
              type="button"
              onClick={() => changeCount("-")}
              disabled={phone.countToSell === 1}
            >
              -
            </button>
            <p>{phone.countToSell}</p>
            <button
              type="button"
              onClick={() => changeCount("+")}
              disabled={phone.countToSell >= 99}
            >
              +
            </button>
          </div>

          <h2 className="phones__price">{`$${phone.price}`}</h2>
        </div>
      </li>
    </>
  );
};
