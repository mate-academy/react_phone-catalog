import { useMemo, useState } from 'react';

import {
  addCount,
  clearCart,
  decCount,
  deleteCart,
} from '../../redux/cartSlice';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { AllProduct } from '../../types/UnionType';

import styles from './CartPage.module.scss';

import { BackButton } from '../../components/BackButton';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { CartEmpty } from '../../components/CartEmpty/CartEmpty';
import { Modal } from '../../components/Modal';

export const CartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector(state => state.cart.data) as {
    item: AllProduct;
    count: number;
  }[];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    setIsModalOpen(false);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleMinus = (id: string) => {
    dispatch(decCount(id));
  };

  const handlePlus = (id: string) => {
    dispatch(addCount(id));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCart(id));
  };

  const info = useMemo(() => {
    const result = {
      price: 0,
      count: 0,
    };

    result.price = cartList.reduce((sum, item) => {
      result.count += item.count;

      return (
        sum +
        ('price' in item.item ? item.item.price : item.item.priceDiscount) *
          item.count
      );
    }, 0);

    return result;
  }, [cartList]);

  return (
    <div className={styles.cartPage}>
      {cartList.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <BackButton />
          <h1 className={styles.cartPage__title}>Cart</h1>
          <div className={styles.cartPage__content}>
            <div className={styles.cartPage__list}>
              {cartList.map(({ item, count }) => (
                <div className={styles.cardList} key={item.id}>
                  <span
                    className={styles.cardList__cross}
                    onClick={() =>
                      handleDelete('itemId' in item ? item.itemId : item.id)
                    }
                  />
                  <Link
                    to={`/${item.category}/${item.name.split(' ').join('_').toLowerCase()}`}
                  >
                    <img
                      src={'image' in item ? item.image : item.images[0]}
                      alt={item.name}
                      className={styles.cardList__img}
                    />
                  </Link>
                  <Link
                    to={`/${item.category}/${item.name.split(' ').join('_').toLowerCase()}`}
                  >
                    <span className={styles.cardList__name}>{item.name}</span>
                  </Link>
                  <div className={styles.cardList__controller}>
                    <div
                      className={classNames(
                        styles.cardList__button,
                        styles['cardList__button--minus'],
                      )}
                      onClick={() =>
                        handleMinus('itemId' in item ? item.itemId : item.id)
                      }
                    >
                      -
                    </div>
                    <span className={styles.cardList__count}>{count}</span>
                    <div
                      className={classNames(
                        styles.cardList__button,
                        styles['cardList__button--plus'],
                      )}
                      onClick={() =>
                        handlePlus('itemId' in item ? item.itemId : item.id)
                      }
                    >
                      +
                    </div>
                  </div>
                  <h3>{`$${'price' in item ? item.price : item.priceDiscount}`}</h3>
                </div>
              ))}
            </div>
            <div className={styles.cartPage__totalBox}>
              <div className={styles.cartPage__totalText}>
                <h2>${info.price}</h2>
                <span
                  className={styles.cartPage__totalItems}
                >{`Total for ${info.count} items`}</span>
              </div>
              <hr className={styles.cartPage__line} />
              <button
                className={styles.cartPage__button}
                onClick={() => handleCheckoutClick()}
              >
                Checkout
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
