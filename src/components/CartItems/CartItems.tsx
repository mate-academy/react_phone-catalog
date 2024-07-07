import { useContext, useEffect, useState } from 'react';
import { BackButton } from '../BackButton/BackButton';
import style from './CartItems.module.scss';
import close from '../../image/Cart-icon/close.svg';
import Minus from '../../image/Cart-icon/minus.svg';
import Plus from '../../image/Cart-icon/plus.svg';
import { StateContext } from '../../store/StateProvider';

export const CartItems = () => {
  const { cart, setToCart } = useContext(StateContext);
  const [count, setCount] = useState<number[]>(() => {
    const data = localStorage.getItem('count');

    if (data === null) {
      return cart.map(() => 1);
    }

    try {
      return JSON.parse(data);
    } catch (e) {
      localStorage.removeItem('count');
      return cart.map(() => 1);
    }
  });

  useEffect(() => {
    localStorage.setItem('count', JSON.stringify(count));
  }, [count]);

  const handleIncrement = (index: number) => {
    setCount(prevCounts =>
      prevCounts.map((prevCount, i) =>
        index === i ? prevCount + 1 : prevCount,
      ),
    );
  };

  const handleDecrement = (i: number) => {
    setCount(prevCounts =>
      prevCounts.map((prevCount, index) =>
        index === i && prevCount > 1 ? prevCount - 1 : prevCount,
      ),
    );
  };

  const handleDelete = (i: number) => {
    const newCart = cart.filter((_, index) => index !== i);

    setToCart(newCart);
  };

  return (
    <div className={style.cart}>
      <div className={style.cart__wrapper}>
        <BackButton className={style.cart__cartBack} />

        <h1 className={style.cart__title}>Cart</h1>

        <div className={style.cart__gridContainer}>
          <ul className={style.cart__list}>
            {cart.map((item, i) => (
              <li className={style.cart__item} key={item.itemId}>
                <div className={style.cart__itemWrapper}>
                  <div className={style.cart__leftContainer}>
                    <button
                      className={style.cart__closeButton}
                      onClick={() => handleDelete(i)}
                    >
                      <img src={close} alt="Close icon" />
                    </button>
                    <img
                      src={item.image}
                      alt="Gadget Photo"
                      className={style.cart__gadgetPhoto}
                    />
                    <p className={style.cart__gadgetName}>{item.name}</p>
                  </div>

                  <div className={style.cart__rightContainer}>
                    <div className={style.cart__quantityButtons}>
                      <button
                        className={style.cart__button}
                        onClick={() => handleDecrement(i)}
                      >
                        <img src={Minus} alt="Minus" />
                      </button>
                      <span className={style.cart__count}>{count[i]}</span>
                      <button
                        className={style.cart__button}
                        onClick={() => handleIncrement(i)}
                      >
                        <img src={Plus} alt="Plus" />
                      </button>
                    </div>
                    <p className={style.cart__gadgetPrice}>${item.fullPrice}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <div className={style.cart__priceContainer}>
              <div className={style.cart__priceWrap}>
                <div className={style.cart__totalWrap}>
                  <span className={style.cart__price}>$0</span>
                  <span className={style.cart__totalItems}>
                    Total for 3 items
                  </span>
                </div>

                <span className={style.cart__borderLine}></span>
                <button className={style.cart__checkout}>Checkout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
