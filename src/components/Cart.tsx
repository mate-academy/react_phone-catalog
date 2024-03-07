import { useEffect, useState } from 'react';
import CloseIcon from '../img/Close.svg';
import { useAppContext } from './Context';

/* eslint-disable */

interface Phones {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export const Cart = () => {
  const { getPhone } = useAppContext();
  const { prevCartPhonesArr } = useAppContext();

  const [productInCart, setProductInCart] = useState<Phones[] | undefined>();

  useEffect(() => {
    const result = getPhone?.filter(
      (phone) => prevCartPhonesArr?.some((item) => phone.id === item),
    );

    setProductInCart(result);
  }, []);

  return (
    <section className="cart__wrapper">
      <div className="cart__content">
        <h2 className="cart__content__title">Cart</h2>
        <div className="cart__content__blocks">
          <div className="cart__content__blocks__products">
            {productInCart?.map((item) => (
              <div className="cart__content__blocks__products__device">
                <img
                  className="cart__content__blocks__products__device__close"
                  src={CloseIcon}
                  alt="close icon"
                />
                <img
                  className="cart__content__blocks__products__device__img"
                  src={`https://mate-academy.github.io/react_phone-catalog/_new/${item.image}`}
                  alt=""
                />
                <span
                  className="cart__content__blocks__products__device__name"
                >
                  {item.name}
                </span>
                <div>
                  
                  <button className="cart__content__blocks__products__device__minus"></button>
                  <span className="cart__content__blocks__products__device__caunt"></span>
                  <button className="cart__content__blocks__products__device__plus"></button>
                </div>
                <span className="cart__content__blocks__products__device__price">{`$${item.price}`}</span>
              </div>
            ))}
          </div>
          <div className="cart__content__blocks__sum-price"></div>
        </div>
      </div>
    </section>
  );
};
