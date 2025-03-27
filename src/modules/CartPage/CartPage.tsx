import React, { useState } from 'react';
import style from './CartPage.module.scss';
import arrowLeft from '../../shared/icons/chevron-arrow-left.svg';
import plusIcon from '../../shared/icons/plus.svg';
import minusIcon from '../../shared/icons/minus.svg';
import removeIcon from '../../shared/icons/close.svg';
import EmptyBag from '/img/cart-is-empty.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/Products';
import { Loader } from '@/components/Loader/Loader';
import { Modal } from './components/ModalWindow/Modal';

export const CartPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [modalWindow, setModalWindow] = useState(false);
  const cartContext = useCart();

  if (!cartContext) {
    return 'CartContext is not loading';
  }

  const { cart, removeFromCart, setCart, clearCart } = cartContext;
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.finalPrice || 0) * (item.quantity || 1),
    0,
  );

  const handleAddProduct = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
      ),
    );
  };

  const handleSubstraction = (id: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item,
      ),
    );
  };

  setInterval(() => {
    setLoading(false);
  }, 1000);

  console.log('cart', cart);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={style.shopingBag}>
          <button onClick={() => navigate(-1)} className={style.navigate}>
            <img src={arrowLeft} alt="arrow icon left" className={style.whiteIcon} />
            <p className={style.linkBack}>Back</p>
          </button>

          <h1 className={style.title}>{cart.length === 0 ? 'Your cart is empty' : 'Cart'}</h1>

          <div className={style.onDesctop}>
            <div>
              {cart.length === 0 && (
                <img src={EmptyBag} alt="Empty bag" className={style.emptyBag} />
              )}
              {cart.map((item: Product) => (
                <div className={style.shopCart} key={item.id}>
                  <div className={style.wrapper}>
                    <div className={style.cartDetail}>
                      <img
                        src={removeIcon}
                        alt="remove icon"
                        className={style.removeIcon}
                        onClick={() => removeFromCart(item.id)}
                      />

                      {/* <img src={item.image} alt="phone image" className={style.itemImg} /> */}
                      <NavLink to={`/${item.category}/${item.itemId}`}>
                      <img src={item.image} alt="phone image" className={style.itemImg} />
                      </NavLink>

                      <h2 className={style.itemTitle}>{item.name}</h2>
                    </div>

                    <div className={style.cartInfo}>
                      <div className={style.cartCount}>
                        <img
                          src={minusIcon}
                          alt="minus icon"
                          className={item.quantity > 1 ? `${style.plusIcon}` : `${style.minusIcon}`}
                          onClick={() => handleSubstraction(item.id)}
                        />

                        <p>{item.quantity || 1}</p>

                        <img
                          src={plusIcon}
                          alt="plus icon"
                          className={style.plusIcon}
                          onClick={() => handleAddProduct(item.id)}
                        />
                      </div>

                      <h2 className={style.price}>${item.finalPrice}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className={style.total}>
                <div className={style.totalContainer}>
                  <h1 className={style.totalTitle}>${totalPrice}</h1>
                  <p className={style.totalDescription}>Total for {cart.length} items</p>
                </div>

                <div className={style.checkout}>
                  <button className={style.checkoutBtn} onClick={() => setModalWindow(true)}>
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Modal isActive={modalWindow} setModalWindow={setModalWindow} clearCart={clearCart} />
    </>
  );
};
