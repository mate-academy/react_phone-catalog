import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from './Context';
import CloseIcon from '../img/Close.svg';
import HomeWhite from '../img/Home-white.svg';

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
  const { prevCartPhonesArr, setPrevCartPhonesArr } = useAppContext();

  const [productInCart, setProductInCart] = useState<Phones[] | undefined>();

  const handleDeleteInCart = (deletElem: string) => {
    if (prevCartPhonesArr && prevCartPhonesArr.find(elem => elem.id.includes(deletElem))) {
      setPrevCartPhonesArr(prevCartPhonesArr.filter(elem => elem.id !== deletElem))
    }
  }

  useEffect(() => {
    const result = getPhone?.filter(
      (phone) => prevCartPhonesArr?.some((item) => phone.id === item.id),
    );

    setProductInCart(result);

    if (prevCartPhonesArr) {
      const sum = prevCartPhonesArr.map(elem => elem.count * elem.fullPrice);
      const totalCaunt = sum.reduce((total, currentValue) => total + currentValue, 0);
      setTotalCaunt(totalCaunt);
  }
  }, [prevCartPhonesArr]);

  const [totalCaunt, setTotalCaunt] = useState(0);

  const handleCountUp = (id: string) => {
    
    const updatedCartPhones = prevCartPhonesArr?.map(elem => {
        if (elem.id === id) {
            return { ...elem, count: elem.count + 1 };
        }
      

        return elem;
    });
    if (updatedCartPhones) {
        setPrevCartPhonesArr(updatedCartPhones);
    }
  }

  const handleCountDown = (id: string) => {
    
    const updatedCartPhones = prevCartPhonesArr?.map(elem => {
        if (elem.id === id) {
            return { ...elem, count: elem.count - 1 };
        }
      

        return elem;
    });
    if (updatedCartPhones) {
        setPrevCartPhonesArr(updatedCartPhones);
    }
  }


  return (
    <section className="cart__wrapper">
      <div className="cart__content">
        <h2 className="cart__content__title">Cart</h2>
        <div className="cart__content__blocks">
          {prevCartPhonesArr === undefined && (
            <div>
              <p className="phones__header__paragraph">Your cart is empty.</p>
              <NavLink to="/" className="phones__header__return-home">
                Return HOME page
                <img className="phones__header__return-home__img" src={HomeWhite} alt="building" />
              </NavLink>
            </div>
          )}
          <div className="cart__content__blocks__products">
            {productInCart?.map((item) => (
              
              <div className="cart__content__blocks__products__device">
                <img
                  onClick={() => handleDeleteInCart(item.id)}
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
                  
                  <button onClick={() => handleCountDown(item.id)} className="cart__content__blocks__products__device__button">
                    <span className="cart__content__blocks__products__device__button__minus"></span>
                  </button>
                  <span className="cart__content__blocks__products__device__caunt">{prevCartPhonesArr?.find((elem) => (elem.id === item.id))?.count}</span>
                  <button onClick={() => handleCountUp(item.id)} className="cart__content__blocks__products__device__button">
                    <span className="cart__content__blocks__products__device__button__plus"></span>
                  </button>
                </div>
                <span className="cart__content__blocks__products__device__price">{`$${item.price}`}</span>
              </div>
            ))}
          </div>
          <div className="cart__content__blocks__sum-price">
            <span className="cart__content__blocks__sum-price__title">${totalCaunt}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
