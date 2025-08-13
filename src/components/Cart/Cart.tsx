/* eslint-disable max-len */
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import cartStyle from './Cart.module.scss';
import { useCart } from '../../context/CartContext';
import { Products } from '../../types/types';
import HeaderLogoMenu from '../HeaderLogoMenu/HeaderLogoMenu';
import { useNavigate } from 'react-router-dom';
import ModalContent from '../ModalContent/ModalContent';
import Footer from '../Footer';
import { useState } from 'react';
import cn from 'classnames';

const Cart = () => {
  const { cartItems, setCartItems, addToCart } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const addQuantiy = (product: Products) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      }),
    );
  };

  const minusQuantiy = (product: Products) => {
    const chosenCart = cartItems.find(cart => cart.id === product.id);

    if (chosenCart?.quantity === 1) {
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      }),
    );
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.fullPrice * item.quantity;
  }, 0);

  const overFlowBaheivior = cartItems.length === 0 ? 'hidden' : 'auto';

  return (
    <>
      <HeaderLogoMenu />

      <div
        style={{
          height: '100vh',
          overflow: `${overFlowBaheivior}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'space-between',
        }}
      >
        <div className={cartStyle.cart}>
          <div className={cartStyle['cart__path-of-user']}>
            <span
              className={cartStyle['cart__arrow-left']}
              onClick={() => navigate(-1)}
            ></span>
            <button
              onClick={() => navigate(-1)}
              className={cartStyle.cart__back}
            >
              Back
            </button>
          </div>

          <h1 className={cartStyle.cart__title}>Cart</h1>

          {cartItems.length === 0 ? (
            <>
              <h3>Cart list is empty</h3>
              <img
                src="./img/cart-is-empty.png"
                alt="epty bag"
                style={{
                  width: '300px',
                  display: 'block',
                  margin: 'auto',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  left: '0',
                }}
              >
                <Footer />
              </div>
            </>
          ) : (
            <div>
              <div className={cartStyle['cart__content-wrapper']}>
                <div className={cartStyle.cart__list}>
                  {cartItems.map(item => {
                    return (
                      <Link
                        to={`/${item.category}/${item.itemId}`}
                        key={item.id}
                      >
                        <div className={cartStyle.cart__cart} key={item.itemId}>
                          <div className={cartStyle['cart__gadget-info']}>
                            <button
                              className={cartStyle['cart__icon-close']}
                              onClick={event => {
                                event.preventDefault();
                                addToCart(item);
                              }}
                            ></button>
                            <img
                              src={item.image}
                              alt="image"
                              className={cartStyle.cart__image}
                            />
                            <div className={cartStyle.cart__name}>
                              {item.name}
                            </div>
                          </div>

                          <div className={cartStyle['cart__gadget-deteils']}>
                            <div className={cartStyle['cart__change-quantity']}>
                              <button
                                onClick={event => {
                                  event.preventDefault();
                                  addQuantiy(item);
                                }}
                                className={`${cartStyle['cart__button-add']} ${cartStyle.cart__buttons}`}
                              ></button>
                              <span>{item.quantity}</span>
                              <button
                                onClick={event => {
                                  event.preventDefault();
                                  minusQuantiy(item);
                                }}
                                className={cn(`${cartStyle.cart__buttons}`, {
                                  [
                                    item.quantity === 1 ?
                                    cartStyle[
                                    'cart__button-get-out--no-access'
                                    ]
                                  ]: cartStyle[
                                    'cart__button-get-out'
                                  ]
                                 })}
                              ></button>
                            </div>
                            <div className={cartStyle['cart__single-price']}>
                              ${item.fullPrice}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className={cartStyle['cart__desicion-border']}>
                  <div className={cartStyle['cart__items-info']}>
                    <div className={cartStyle['cart__items-price']}>
                      ${totalPrice}
                    </div>
                    <div className={cartStyle['cart__items-qauntity']}>
                      Total for{' '}
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{' '}
                      items
                    </div>
                  </div>

                  <button
                    className={cartStyle['cart__button-checkout']}
                    onClick={event => {
                      event.preventDefault();
                      setShowModal(true);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {cartItems.length > 0 && <Footer />}
      </div>

      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.body,
        )}
    </>
  );
};

export default Cart;
