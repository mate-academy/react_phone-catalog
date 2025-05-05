/* eslint-disable max-len */
import s from './ShopPage.module.scss';
import * as cartActions from '../../store/cart';
import PlusIcon from '../../img/icons/icon-plus.svg?react';
import MinusIcon from '../../img/icons/icon-minus.svg?react';
import CloseIcon from '../../img/icons/icon-close.svg?react';
import cartEmpty from '../../img/otherImages/cart-is-empty.png';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { BackTo } from '../../components/BackTo';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks';

export const ShopPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const [loading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    document.title = `Nice Gadgets | Cart`;

    const setLoader = async () => {
      setIsLoading(true);
      await wait();
      setIsLoading(false);
    };

    setLoader();
  }, []);

  const [itemsCount, setItemsCount] = useState(
    cart.map(e => ({ id: e.id, count: 1, price: e.fullPrice })),
  );

  const getItem = (id: number) => itemsCount.find(i => i.id === id);

  const getItemCount = (id: number) => getItem(id)?.count;

  const getTotalPrice = () => {
    return itemsCount.reduce((sum, e) => sum + e.count * e.price, 0);
  };

  const deleteItem = (id: number) => dispatch(cartActions.remove(id));

  const addCount = (id: number) => {
    const item = getItem(id);

    if (item) {
      item.count++;
      setItemsCount(itemsCount.map(i => (i.id === id ? item : i)));
    }
  };

  const deleteCount = (id: number) => {
    const item = getItem(id);

    if (item && item.count !== 1) {
      item.count--;
      setItemsCount(itemsCount.map(i => (i.id === id ? item : i)));
    }
  };

  const isCountOne = (id: number) => {
    const item = getItem(id);

    if (item) {
      return item.count === 1;
    }

    return false;
  };

  const getAllItemsCount = itemsCount.reduce((sum, e) => sum + e.count, 0);

  const handleClickCheckout = async () => {
    setIsModalLoading(true);
    setIsModalOpen(true);

    await wait();
    setIsModalLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={s.ShopPage}>
      <BackTo />

      <h1 className={s.ShopPage__title}>Cart</h1>
      {cart.length === 0 ? (
        <div className={s.ShopPage__isEmpty}>
          <h2 className={s.ShopPage__timeBuy}>
            Your cart is empty. Time to buy something!
          </h2>
          <img src={cartEmpty} className="cat-photo"></img>
        </div>
      ) : (
        <div className={s.ShopPage__containerCard}>
          {cart.map(e => (
            <article key={e.id} className={s.ShopPage__card}>
              <div className={s.ShopPage__info}>
                <button
                  className={s.ShopPage__buttonDelete}
                  onClick={() => deleteItem(e.id)}
                >
                  <CloseIcon className={`icon ${s.ShopPage__close}`} />
                </button>
                <div className={s.ShopPage__imgBlock}>
                  <img
                    src={`${e.image}`}
                    alt="item-photo"
                    className={s.ShopPage__img}
                  />
                </div>
                <p className={s.ShopPage__itemName}>{e.name}</p>
              </div>

              <div className={s.ShopPage__buttons}>
                <div className={s.ShopPage__countInfo}>
                  <Button
                    IconProp={MinusIcon}
                    onClick={() => deleteCount(e.id)}
                    disabled={isCountOne(e.id)}
                  />
                  <p className={s.ShopPage__count}>{getItemCount(e.id)}</p>
                  <Button IconProp={PlusIcon} onClick={() => addCount(e.id)} />
                </div>

                <h3 className={s.ShopPage__price}>{`$${e.fullPrice}`}</h3>
              </div>
            </article>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className={s.ShopPage__totalBlock}>
          <div className={s.ShopPage__textTotal}>
            <h2>{`$${getTotalPrice()}`}</h2>
            <p className={s.ShopPage__itemsCount}>
              {`Total for ${getAllItemsCount} ${getAllItemsCount === 1 ? 'item' : 'items'}`}
            </p>
          </div>
          <div className={s.ShopPage__line}></div>
          <button
            onClick={handleClickCheckout}
            className={s.ShopPage__checkout}
          >
            Checkout
          </button>
        </div>
      )}

      {isModalOpen && (
        <Modal onModalOpen={setIsModalOpen} isLoading={isModalLoading} />
      )}
    </div>
  );
};
