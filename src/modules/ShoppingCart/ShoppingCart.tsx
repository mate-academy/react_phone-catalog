//#region Styles
import style from './ShoppingCart.module.scss';
//#endregion

//#region StateApp
import { useContext, useEffect, useState } from 'react';
//#endregion

//#region Context
import { ShoppingContex } from '../../context/ShoppingContex';
//#endregion

//#region Local Components

import Cart from './Cart/Cart';
//#endregion

//#region Router

import { Link } from 'react-router-dom';
//#endregion

//#region Global Components

import { ProductsEmpty } from '@GlobalComponents';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
//#endregion

//#region SweetAlert
// Модальное окно уведомлений с React поддержкой.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
//#endregion

//#region Hooks
import { useTimer } from '../../Hooks/useTimer';
//#endregion

//#region i18n
import { useTranslation } from 'react-i18next';
//#endregion

export const ShoppingCart = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { clearCart, cartItems, getCartTotal } = useContext(ShoppingContex);
  const { start, clear } = useTimer();

  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);

    start(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clear();
    };
  }, [clear, start]);

  const MySwal = withReactContent(Swal);

  const handleClick = () => {
    return MySwal.fire({
      title: t('checkoutError.title'),
      text: t('checkoutError.text'),
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('checkoutError.confirmButtonText'),
      cancelButtonText: t('checkoutError.cancelButtonText'),
      didOpen: () => {
        MySwal.isLoading();
      },
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: t('checkoutError.success.title'),
          text: t('checkoutError.success.text'),
          icon: 'success',
        });

        start(() => {
          clearCart();
        }, 1000);
      }
    });
  };

  return (
    <>
      <main className="mian">
        {isLoading ? (
          <div className={style.isLoading}>
            <LoadingSpinner />
          </div>
        ) : (
          <section className="section">
            <div className="container">
              <div className={style.wrapper}>
                {cartItems.length > 0 ? (
                  <>
                    <div className={style.back}>
                      <Link className={style.back__link} to={'/'}>
                        {t('page.back')}
                      </Link>
                    </div>
                    <h1 className={`title ${style.title}`}>{t('page.cart')}</h1>

                    <div className={style.content}>
                      <div className={style.cards}>
                        {cartItems.map(item => (
                          <Cart item={item} key={item.id} />
                        ))}
                      </div>

                      <div className={style['cart-price']}>
                        <span className={style['cart-price__total']}>
                          ${getCartTotal()}
                        </span>
                        <span className={style['cart-price__quantity']}>
                          {t('page.totalItems', {
                            count: cartItems.length,
                          })}
                        </span>

                        <div className={style['cart-price__button']}>
                          <button onClick={handleClick}>
                            {t('page.checkout')}
                          </button>
                          <span className={style.line}></span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <ProductsEmpty title={t('page.cart')} />
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};
