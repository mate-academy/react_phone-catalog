import { useContext } from 'react';
import { BackButton } from '../BackButton/BackButton';
import style from './CartItems.module.scss';
import { ProductsContext } from '../../store/ProductsProvider';
import close from '../../image/Cart-icon/close.svg';

export const CartItems = () => {
  const { products } = useContext(ProductsContext);

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
