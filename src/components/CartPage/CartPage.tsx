import { useState } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useComponentLoading,
} from '../../app/hooks';
import { setCartList } from '../../features/productSlice';
import { Product } from '../../features/types/Product';
import { PageTitle } from '../titles/PageTitle';
import { ShownRoute, ShownRouteOrigin } from '../ui/ShownRoute';
import cl from './CartPage.module.scss';
import { Loader } from '../ui/Loader';

const textContent = {
  title: {
    en: 'Cart',
    ua: 'Кошик',
  },
  empty: {
    en: 'Your cart is empty!',
    ua: 'Ваш кошик порожній!',
  },
  modal: {
    en: 'Thanks for using our shop! :)',
    ua: 'Дякуємо за використання нашого магазину! :)',
  },
  checkout: {
    en: 'Checkout',
    ua: 'Оформити',
  },
};

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useComponentLoading(300);
  const [isModalShown, setIsModalShown] = useState(false);

  const { cartList, totalItemsInCart } = useAppSelector(st => st.products);
  const { language } = useAppSelector(st => st.global);

  function removeItem(item: Product) {
    dispatch(setCartList(cartList.filter(prod => prod.id !== item.id)));
  }

  function changeQuantity(operation: '++' | '--', item: Product) {
    const updatedList = cartList.map(prod =>
      /* eslint-disable */
      prod.id === item.id
        ? {
            ...prod,
            quantity:
              operation === '++'
                ? (prod.quantity ?? 0) + 1
                : (prod.quantity ?? 0) - 1,
          }
        : prod,
    );

    dispatch(setCartList(updatedList));
    /* eslint-enable */
  }

  const totalPrice = cartList.reduce((acc, curr) => {
    return curr.price * (curr.quantity || 1) + acc;
  }, 0);

  if (isModalShown && cartList.length === 0) {
    return (
      <div className="container">
        <ShownRoute origin={ShownRouteOrigin.ONCART} />
        <section className={cl.modalSection}>
          {textContent.modal[language]}
        </section>
      </div>
    );
  }

  if (cartList.length === 0 && !isModalShown) {
    return isLoading ? (
      <Loader />
    ) : (
      <div className="container">
        <ShownRoute origin={ShownRouteOrigin.ONCART} />
        <h1 style={{ color: '#f1f2f9', marginTop: '16px' }}>
          {textContent.empty[language]}
        </h1>
      </div>
    );
  }

  const getWordEndingInUkrainian = (num: number) => {
    if (num === 1) {
      return '';
    }

    if (num >= 2 && num <= 4) {
      return 'и';
    }

    return 'ів';
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <ShownRoute origin={ShownRouteOrigin.ONCART} />

      <article className={cl.pageContent}>
        <PageTitle text={textContent.title[language]} />

        <ul className={cl.list}>
          {cartList.map(item => (
            <li key={item.id} className={cl.list__item}>
              <div className={cl.imgAndNameContainer}>
                <button
                  className={cl.imgAndNameContainer__removeButton}
                  onClick={() => removeItem(item)}
                >
                  <svg className={cl.imgAndNameContainer__removeButtonIcon} />
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className={cl.imgAndNameContainer__img}
                />
                <p className={cl.imgAndNameContainer__name}>{item.name}</p>
              </div>
              <div className={cl.quantAndPriceContainer}>
                <div className={cl.quantityContainer}>
                  <button
                    className={`${cl.quantityContainer__changeQuantButton} ${item.quantity === 1 && cl.quantityContainer__changeQuantButtonDisabled}`}
                    onClick={() => changeQuantity('--', item)}
                  >
                    <svg
                      className={`${cl.quantityContainer__changeQuantButtonIconMinus} ${item.quantity === 1 && cl.quantityContainer__changeQuantButtonIconMinusDisabled}`}
                    />
                  </button>
                  {item.quantity}
                  <button
                    className={cl.quantityContainer__changeQuantButton}
                    onClick={() => changeQuantity('++', item)}
                  >
                    <svg
                      className={
                        cl.quantityContainer__changeQuantButtonIconPlus
                      }
                    />
                  </button>
                </div>
                <p
                  className={cl.quantAndPriceContainer__price}
                >{`$${item.price}`}</p>
              </div>
            </li>
          ))}
        </ul>

        <section className={cl.totalAndCheckoutContainer}>
          <h3
            className={cl.totalAndCheckoutContainer__title}
          >{`$${totalPrice}`}</h3>

          <small className={cl.totalAndCheckoutContainer__subtitle}>
            {language === 'en'
              ? `Total for ${totalItemsInCart} item${totalItemsInCart > 1 ? 's' : ''}`
              : `Всього за ${totalItemsInCart} товар${getWordEndingInUkrainian(totalItemsInCart)}`}
          </small>

          <div className={cl.totalAndCheckoutContainer__underline} />

          <button
            className={cl.totalAndCheckoutContainer__button}
            onClick={() => {
              dispatch(setCartList([]));
              setIsModalShown(true);
            }}
          >
            {textContent.checkout[language]}
          </button>
        </section>
      </article>
    </div>
  );
};
