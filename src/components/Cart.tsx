import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
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
      (phone) => prevCartPhonesArr?.some((item) => phone.phoneId === item.id),
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
  const { setSelectedProduct } = useAppContext();

  return (
    <section className="cart__wrapper">
      <div className="cart__content">
        <h2 className="cart__content__title">Cart</h2>
        <div className="cart__content__blocks">
          {!prevCartPhonesArr || prevCartPhonesArr.length === 0 ? (
            <div>
              <p className="phones__header__paragraph">Your cart is empty</p>
              <NavLink to="/" className="phones__header__return-home">
                Return HOME page
                <img className="phones__header__return-home__img" src={HomeWhite} alt="building" />
              </NavLink>
            </div>
          ) : (
            <>
              <div className="cart__content__blocks__products">
                {productInCart?.map((item) => (
                  
                  <div className="cart__content__blocks__products__device">
                    <img
                      onClick={() => handleDeleteInCart(item.itemId)}
                      className="cart__content__blocks__products__device__close"
                      src={CloseIcon}
                      alt="close icon"
                    />
                    <NavLink to={`/phones/${item.itemId}`} className="cart__content__blocks__products__device__block-img" 
                    onClick={() =>setSelectedProduct(item.itemId)}
                    // onClick={() => navigate(`/phones/${item.itemId}`)}
                    
                    >
                      <img 
                        className="cart__content__blocks__products__device__img"
                        src={`https://mate-academy.github.io/react_phone-catalog/_new/${item.image}`}
                        alt=""
                      />
                    </NavLink>
                    <span
                      className="cart__content__blocks__products__device__name"
                    >
                      {item.name}
                    </span>
                    <div className="cart__content__blocks__products__device__buttons">
                      <button
                        onClick={() => handleCountDown(item.itemId)}
                        className={cn(
                          "cart__content__blocks__products__device__button",
                          {"cart__content__blocks__products__device__button--disabled": prevCartPhonesArr?.find((elem) => (elem.id === item.itemId))?.count === 1}
                        )}
                        disabled={prevCartPhonesArr?.find((elem) => (elem.id === item.itemId))?.count === 1}
                      >
                        <span className={cn(
                          "cart__content__blocks__products__device__button__minus",
                          // {"cart__content__blocks__products__device__button__minus--disabled": prevCartPhonesArr?.find((elem) => (elem.id === item.id))?.count === 0}
                        )} />
                      </button>
                      <span className="cart__content__blocks__products__device__caunt">{prevCartPhonesArr?.find((elem) => (elem.id === item.itemId))?.count}</span>
                      <button onClick={() => handleCountUp(item.itemId)} className="cart__content__blocks__products__device__button">
                        <span className="cart__content__blocks__products__device__button__plus" />
                      </button>
                    </div>
                    <span className="cart__content__blocks__products__device__price">
                      {`$${item.price}`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="cart__content__blocks__sum-price">
                <span className="cart__content__blocks__sum-price__title">
                  ${totalCaunt}
                </span>
                <span className="cart__content__blocks__sum-price__text">
                  Total for {productInCart?.length} items
                </span>
                <div className="cart__content__blocks__sum-price__row"></div>
                <button className="cart__content__blocks__sum-price__button">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
