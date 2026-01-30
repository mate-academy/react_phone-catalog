import styles from './CartPage.module.scss';
import svgStringMinus from './../shared/assets/Icons/minus.svg?raw';
import svgStringPlus from './../shared/assets/Icons/plus.svg?raw';

import { useTranslation } from 'react-i18next';

import BackButton from '../shared/BackButton';
import { useContext } from 'react';
import { DispatchContext, StateContext } from '../../store';
import { ProductCatalogContext } from '../../ProductCatalogContext';
import { ProductCatalogItem } from '../../types/ProductCatalogItem';
import { Link } from 'react-router-dom';
import { CURRENCY_SYMBOL } from '../constants';
import Button from '../shared/Button';

const CartPage = () => {
  const { t } = useTranslation();
  // const items = useAppSelector(state => state.items);

  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const { products } = useContext(ProductCatalogContext);

  const cartProducts: ProductCatalogItem[] = state.cart.size
    ? products.filter(product => state.cart.has(product.id))
    : [];

  const totalPrice = cartProducts.reduce(
    (acc, product) => acc + product.price * (state.cart.get(product.id) || 0),
    0,
  );
  const totalAmount = state.cartTotalAmount;
  const totalMessage = t('cart.items', { count: totalAmount });

  return (
    <div className="container">
      <BackButton />
      <div className={styles.cart}>
        <h1 className={styles.cart__title}>{t(`cart.title`)}</h1>

        {totalAmount !== 0 && (
          <ul className={styles.cart__items}>
            {cartProducts.map(product => (
              <li key={product.id} className={styles.item}>
                <div className={styles.item__firstRow}>
                  <button
                    className={styles.item__buttonClose}
                    onClick={() =>
                      dispatch({ type: 'removeFromCart', payload: product.id })
                    }
                  ></button>
                  <Link
                    className={styles.item__photo}
                    to={`/${product.category}/${product.itemId}`}
                  >
                    <img
                      className={styles.item__image}
                      src={'/' + product.image}
                      alt={product.name}
                    />
                  </Link>
                  <p className={styles.item__productName}>{product.name}</p>
                </div>

                <div className={styles.item__secondRow}>
                  <div className={styles.itemAmount}>
                    <button
                      className={styles.itemAmount__button}
                      disabled={state.cart.get(product.id) === 1}
                      onClick={() =>
                        dispatch({
                          type: 'deleteFromCart',
                          payload: product.id,
                        })
                      }
                      dangerouslySetInnerHTML={{ __html: svgStringMinus }}
                    ></button>
                    <p className={styles.itemAmount__value}>
                      {state.cart.get(product.id)}
                    </p>
                    <button
                      className={styles.itemAmount__button}
                      onClick={() =>
                        dispatch({ type: 'addToCart', payload: product.id })
                      }
                      dangerouslySetInnerHTML={{ __html: svgStringPlus }}
                    ></button>
                  </div>
                  <p className={styles.item__price}>
                    {CURRENCY_SYMBOL + product.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {totalAmount !== 0 && (
          <div className={styles.cart__total}>
            <p className={styles.cart__totalPrice}>
              {CURRENCY_SYMBOL + totalPrice}
            </p>
            <p className={styles.cart__totalAmount}>{totalMessage}</p>
            <div className={styles.cart__totalDivider}></div>
            <Button
              text={t('cart.checkout')}
              handleClick={() => dispatch({ type: 'clearCart' })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
