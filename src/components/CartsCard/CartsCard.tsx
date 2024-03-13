import { Dispatch, SetStateAction, useEffect } from "react";
import { TypeCard } from "../../types/TypeCard";
import { useCartPhones } from "../../helpers/useArrays";
import {
  decreasePhonesCountToSell,
  increasePhonesCountToSell,
} from "../../features/cartSlice";

interface T {
  phone: TypeCard;
  setSumArray: Dispatch<SetStateAction<Record<string, number>>>;
}

export const CartsCard: React.FC<T> = ({ phone, setSumArray }) => {
  // const [count, setCount] = useState(1);

  useEffect(() => {
    setSumArray((currentState) => ({
      ...currentState,
      [phone.id]: 1,
    }));
  }, []);

  const changeCount = (key: string) => {
    switch (key) {
      case "-":
        // setCount(count - 1);
        decreasePhonesCountToSell(phone.id);

        setSumArray((currentState) => ({
          ...currentState,
          [phone.id]: currentState[phone.id] - 1,
        }));
        break;

      case "+":
        // setCount(count + 1);
        increasePhonesCountToSell(phone.id);

        setSumArray((currentState) => ({
          ...currentState,
          [phone.id]: currentState[phone.id] + 1,
        }));
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
