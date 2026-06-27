import styles from './CartPage.module.scss';

import svgStringMinus from './../shared/assets/Icons/minus.svg?raw';
import svgStringPlus from './../shared/assets/Icons/plus.svg?raw';

import { useTranslation } from 'react-i18next';

import BackButton from '../shared/BackButton';
import { Link } from 'react-router-dom';
import { BASE_URL, CURRENCY_SYMBOL } from '../constants';
import Button from '../shared/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { itemsActions } from '../../store/index';
import {
  selectCartItems,
  selectTotalPrice,
  selectTotalCount,
} from '../../store/slices/itemsSlice';
import Messages from '../shared/Message';
import ModalDialog from '../shared/ModalDialog';
import { useState } from 'react';

const CartPage = () => {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);

  const items = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectTotalPrice);
  const totalCount = useAppSelector(selectTotalCount);

  const dispatch = useAppDispatch();

  const handleDialogSubmit = () => {
    setShowDialog(false);
    dispatch(itemsActions.clear());
  };

  const totalMessage = t('cart.items', { count: totalCount });

  return (
    <div className="container">
      <BackButton />
      <div className={styles.cart}>
        <h1 className={styles.cart__title}>{t(`cart.title`)}</h1>

        {totalCount !== 0 && (
          <>
            <ul className={styles.cart__items}>
              {items.map(({ id, product, quantity }) => (
                <li key={id} className={styles.item}>
                  <div className={styles.item__firstRow}>
                    <button
                      className={styles.item__buttonClose}
                      onClick={() => dispatch(itemsActions.remove(product))}
                    ></button>
                    <Link
                      className={styles.item__photo}
                      to={`/${product.category}/${product.itemId}`}
                    >
                      <img
                        className={styles.item__image}
                        src={BASE_URL + `/` + product.image}
                        alt={product.name}
                      />
                    </Link>
                    <Link
                      className={styles.item__productName}
                      to={`/${product.category}/${product.itemId}`}
                    >
                      {product.name}
                    </Link>
                  </div>

                  <div className={styles.item__secondRow}>
                    <div className={styles.itemAmount}>
                      <button
                        className={styles.itemAmount__button}
                        disabled={quantity === 1}
                        onClick={() => dispatch(itemsActions.decrease(product))}
                        dangerouslySetInnerHTML={{ __html: svgStringMinus }}
                      ></button>
                      <p className={styles.itemAmount__value}>{quantity}</p>
                      <button
                        className={styles.itemAmount__button}
                        onClick={() => dispatch(itemsActions.add(product))}
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
            <div className={styles.cart__total}>
              <p className={styles.cart__totalPrice}>
                {CURRENCY_SYMBOL + totalPrice}
              </p>
              <p className={styles.cart__totalAmount}>{totalMessage}</p>
              <div className={styles.cart__totalDivider}></div>
              <Button
                text={t('cart.checkout')}
                handleClick={() => setShowDialog(true)}
              />
            </div>
          </>
        )}
      </div>

      {totalCount === 0 && (
        <Messages type="emptyList" text={t('cart.empty_cart')} />
      )}

      <ModalDialog
        isOpen={showDialog}
        onSubmit={handleDialogSubmit}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        Checkout is not implemented yet. Do you want to clear the Cart?
      </ModalDialog>
    </div>
  );
};

export default CartPage;
