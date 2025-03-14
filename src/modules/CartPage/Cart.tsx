/* eslint-disable import/no-extraneous-dependencies */
import { useNavigate } from 'react-router-dom';
import style from './Cart.module.scss';
import { useCart } from '../shared/context/CartContext';
import { useProducts } from '../shared/context/ProductsContext';
import { useState } from 'react';
import { Modal } from './Modal';
import { useTheme } from '../shared/context/ThemeContext';
import { t } from 'i18next';

export const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    removeProduct,
    totalPrice,
    totalQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart();
  const { phones, tablets, accessories } = useProducts();
  const allProducts = [...phones, ...tablets, ...accessories];
  const addedProducts = allProducts.filter(item =>
    products.some(p => p.id === item.id),
  );

  const { theme } = useTheme();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.back}>
        <div className={style.back__image}>
          <img src="./icons/arrow-left.png" alt="Back" />
        </div>
        <span className={style.back__word} onClick={() => navigate(-1)}>
          {t('back')}
        </span>
      </div>
      <h1 className={style.title}>{t('cart')}</h1>
      {!products.length && (
        <div className={style.warning}>
          <p className={style.warning__message}>{t('Your cart is empty')}</p>
        </div>
      )}
      {products.length > 0 && (
        <div className={style.cart}>
          <div className={style.cart__items}>
            {addedProducts.map(prod => (
              <div className={style.cart__item} key={prod.id}>
                <div className={style.cart__mobile1}>
                  <button
                    className={style.cart__remove}
                    onClick={() => removeProduct(prod.id)}
                  >
                    <img
                      src={
                        theme === 'light'
                          ? './icons/close.png'
                          : './icons/close-dark-theme.png'
                      }
                      alt="Remove"
                    />
                  </button>
                  <img
                    className={style.cart__image}
                    src={prod.images[0]}
                    alt="Gadget"
                  />
                  <span className={style.cart__name}>{prod.name}</span>
                </div>
                <div className={style.cart__mobile2}>
                  <div className={style.cart__quantity}>
                    <button
                      className={style.cart__minus}
                      onClick={() => decreaseQuantity(prod.id)}
                    >
                      <img
                        src={
                          theme === 'light'
                            ? './icons/minus.png'
                            : './icons/minus-dark-theme.png'
                        }
                        alt="Less"
                      />
                    </button>
                    <span className={style.cart__number}>
                      {products.find(p => p.id === prod.id)?.quantity}
                    </span>
                    <button
                      className={style.cart__plus}
                      onClick={() => increaseQuantity(prod.id)}
                    >
                      <img
                        src={
                          theme === 'light'
                            ? './icons/plus.png'
                            : './icons/plus-dark-theme.png'
                        }
                        alt="More"
                      />
                    </button>
                  </div>
                  <span className={style.cart__money}>
                    ${prod.priceDiscount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={style.cart__price}>
            <p className={style.cart__total}>${totalPrice}</p>
            <p className={style.cart__count}>
              {t('Total for')} {totalQuantity} {t('items')}
            </p>
            <button
              className={style.cart__checkout}
              onClick={() => setIsModalOpen(true)}
            >
              {t('checkout')}
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <Modal onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </div>
  );
};
