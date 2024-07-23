import React, { useContext, useState } from 'react';
import { ArrayContext } from '../../ArrayContext';
import { Link, useLocation } from 'react-router-dom';
import home from '../../img/icons/home.svg';
import arrowRight from '../../img/icons/arrowRight.svg';
import closeButton from '../../img/icons/close-gray.svg';
import { Modal } from '../../components/modal/modal';
import { Product } from '../../types/product';
import classNames from 'classnames';

export const Cart: React.FC = () => {
  const { cartProducts, setCartProducts } = useContext(ArrayContext);
  const location = useLocation();
  const pathname = location.pathname.split('').slice(1).join('');
  const totalPrice = cartProducts
    .map(product => +product.price)
    .reduce((product, currentValue) => product + currentValue, 0);
  const [modal, setModal] = useState(false);

  function getUnickProducts() {
    const newArr: Product[] | undefined = [];

    for (const n of cartProducts) {
      if (!newArr.map(a => a.id).includes(n.id)) {
        newArr.push(n);
      }
    }

    return newArr;
  }

  return (
    <section className="cart">
      <div className="products__nav">
        <Link className="products__home" to={'/'}>
          <img src={home} className="img" alt="" />
        </Link>
        <img src={arrowRight} alt="arrowRight" />
        <p className="products__pathname">
          {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
        </p>
      </div>
      <div className="products__title">
        <h1 className="products__h1">Cart</h1>
        <p className="products__subtitle">{cartProducts.length} models</p>
      </div>
      {cartProducts.length === 0 ? (
        <p className='h3'>Your cart is empty</p>
      ) : (
        <div className="cart__container">
          <div className="cart__list">
            {getUnickProducts().map(product => (
              <div key={product.id} className="cart__item">
                <div className="cart__item-left-bar">
                  <button
                    className="cart__delete"
                    onClick={() => {
                      setCartProducts([
                        ...cartProducts.filter(item => item.id !== product.id),
                      ]);
                    }}
                  >
                    <img src={closeButton} alt="" />
                  </button>
                  <Link
                    to={`/phones/${product.itemId}`}
                    className="cart__img-container"
                  >
                    <img className="cart__img" src={product.image} alt="" />
                  </Link>
                  <Link to={`/phones/${product.itemId}`} className="body-text">
                    {product.name}
                  </Link>
                </div>
                <div className="cart__item-right-bar">
                  <div className="cart__plus-minus">
                    <button
                      disabled={
                        cartProducts.filter(item => product.id === item.id)
                          .length === 1
                      }
                      className={classNames('button-size b-minus button-slider', {
                        'button-slider__disabled b-minus-g':
                          cartProducts.filter(item => product.id === item.id)
                            .length === 1,
                      })}
                      onClick={() => {
                        const index = cartProducts.findLastIndex(
                          item => item.id === product.id,
                        );
                        const newCartProducts = [...cartProducts];

                        newCartProducts.splice(index, 1);
                        setCartProducts(newCartProducts);
                      }}
                    />
                    <p className="cart__amount body-text">
                      {cartProducts.filter(item => product.id === item.id).length}
                    </p>
                    <button
                      className="button-size b-plus button-slider"
                      onClick={() => {
                        setCartProducts([...cartProducts, product]);
                      }}
                    />
                  </div>
                  <p className="h3 cart__price">
                    $
                    {cartProducts
                      .filter(item => item === product)
                      .map(item => +item.price)
                      .reduce((item, currentValue) => item + currentValue, 0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="cart__total">
            <div className="cart__price-info">
              <p className="h2">${totalPrice}</p>
              <p className="body-text secondary-color">
                Total for {cartProducts.length} items
              </p>
            </div>
            <div>underline</div>
            <button
              onClick={() => {
                setModal(true);
              }}
              className="cart__button"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
      {modal && <Modal setModal={setModal} />}
    </section>
  );
};
