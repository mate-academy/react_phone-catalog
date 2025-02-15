import { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import style from './TotalCount.module.scss';

const TotalCount = () => {
  const [isShowMessage, setIsShowMessage] = useState(false);

  const handleClickCheckout = () => {
    setIsShowMessage(true);

    setTimeout(() => {
      setIsShowMessage(false);
    }, 2000);
  };

  const { cart } = useAppSelector(state => state.cart);

  const totalSum = cart.reduce(
    (acc, item) => acc + item.price * (item.count ?? 1),
    0,
  );

  const totalItems = cart.reduce((acc, item) => acc + (item.count ?? 1), 0);

  return (
    <section className={style.total}>
      <div className={style.wrapper}>
        <span className={style.price}>${totalSum}</span>
        <span className={style.count}>Total for {totalItems} items</span>
        <div className={style.line}></div>
        <button className={style.buy} onClick={handleClickCheckout}>
          Checkout
        </button>

        {isShowMessage && (
          <p className={style.message}>
            Sorry, this feature is not yet available 😖
          </p>
        )}
      </div>
    </section>
  );
};

export default TotalCount;
