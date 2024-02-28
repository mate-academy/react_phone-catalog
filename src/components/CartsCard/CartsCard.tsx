import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { TypeCard } from '../../types/TypeCard';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  // addPhonesInCart,
  deletePhonesInCart,
} from '../../features/cartSlice';
// import { deletePhonesInCart } from '../../features/favouritesSlice';
// import { useAppDispatch } from '../../store';

interface T {
  phone: TypeCard;
  setSumArray: Dispatch<SetStateAction<Record<string, number>>>;
}

export const CartsCard: React.FC<T> = ({ phone, setSumArray }) => {
  const [count, setCount] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSumArray((currentState) => ({
      ...currentState,
      [phone.id]: 1,
    }));
  }, []);

  const changeCount = (key: string) => {
    switch (key) {
      case '-':
        setCount(count - 1);

        setSumArray((currentState) => ({
          ...currentState,
          [phone.id]: currentState[phone.id] - 1,
        }));
        break;

      case '+':
        setCount(count + 1);

        setSumArray((currentState) => ({
          ...currentState,
          [phone.id]: currentState[phone.id] + 1,
        }));
        break;
      default:
        break;
    }
  };

  const phonesCart = useAppSelector(
    (state) => state.cartPhones.phonesInCart,
  );

  // const oldCart = localStorage.getItem('cart') || '';
  // const newCart: TypeCard[] = JSON.parse(oldCart);

  const changeCart = () => {
    if (phonesCart.some(item => item.id === phone.id)) {
      // localStorage.setItem('cart', JSON.stringify(
      //   newCart.filter(item => item.id !== phone.id),
      // ));

      dispatch(deletePhonesInCart(phone));

      // return;
    }

    // if (oldCart) {
    //   newCart.push(phone);
    //   localStorage.setItem('cart', JSON.stringify(newCart));
    // } else {
    //   localStorage.setItem('cart', JSON.stringify([phone]));
    // }

    // dispatch(addPhonesInCart(phone));
  };

  return (
    <>
      <li className="phones__item">
        <div className="left-container">
          <button
            data-cy="cartDeleteButton"
            className="phones__close"
            type="button"
            // onClick={() => dispatch(deletePhonesInCart(phone))}
            onClick={() => changeCart()}
          >
            <img
              src="img/Close.png"
              alt="Close"
            />
          </button>

          <img
            src={`_new/${phone.image}`}
            alt="phone"
            className="phones__img"
          />

          <p>{phone.name}</p>
        </div>

        <div className="right-container">
          <div className="phones__count">
            <button
              type="button"
              onClick={() => changeCount('-')}
              disabled={count === 1}
            >
              -
            </button>
            <p>{count}</p>
            <button
              type="button"
              onClick={() => changeCount('+')}
              disabled={count >= 99}
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
