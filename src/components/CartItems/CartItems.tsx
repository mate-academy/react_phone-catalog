import { useContext, useState } from 'react';
import { BackButton } from '../BackButton/BackButton';
import style from './CartItems.module.scss';
import { ProductsContext } from '../../store/ProductsProvider';
import close from '../../image/Cart-icon/close.svg';
import Minus from '../../image/Cart-icon/minus.svg';
import Plus from '../../image/Cart-icon/plus.svg';

export const CartItems = () => {
  const { products } = useContext(ProductsContext);
  const [count, setCount] = useState(0);

  return (
    <div className={style.cart}>
      <div className={style.cart__wrapper}>
        <BackButton className={style.cart__cartBack} />

        <h1 className={style.cart__title}>Cart</h1>

        <div className={style.cart__gridContainer}>
          <ul className={style.cart__list}>
            {products.map(item => (
              <li className={style.cart__item} key={item.itemId}>
                <div className={style.cart__itemWrapper}>
                  <button className={style.cart__closeButton}>
                    <img src={close} alt="Close icon" />
                  </button>
                  <img
                    src={item.image}
                    alt="Gadget Photo"
                    className={style.cart__gadgetPhoto}
                  />
                  <p className={style.cart__gadgetName}>{item.name}</p>

                  <div className={style.cart__quantityButtons}>
                    <button
                      className={style.cart__button}
                      onClick={() =>
                        setCount(prevCount =>
                          prevCount > 0 ? prevCount - 1 : prevCount,
                        )
                      }
                    >
                      <img src={Minus} alt="Minus" />
                    </button>
                    <span className={style.cart__count}>{count}</span>
                    <button
                      className={style.cart__button}
                      onClick={() => setCount(prevCount => prevCount + 1)}
                    >
                      <img src={Plus} alt="Plus" />
                    </button>
                  </div>
                  <p className={style.cart__gadgetPrice}>${item.fullPrice}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
