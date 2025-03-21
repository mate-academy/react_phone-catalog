import cl from 'classnames';
import s from './ShopPage.module.scss';
import { useSetShop, useShop } from '../../context/ShopContext';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { BackTo } from '../../components/BackTo';
import { wait } from '../../httpClient';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';

export const ShopPage = () => {
  const shop = useShop();
  const setShop = useSetShop();
  const [loading, setIsLoading] = useState(false);
  const [idButton, setIdButton] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    wait().finally(() => setIsLoading(false));
  }, []);

  const [itemsCount, setItemsCount] = useState(
    shop.map(e => ({ id: e.id, count: 1, price: e.fullPrice })),
  );

  const getItem = (id: number) => itemsCount.find(i => i.id === id);

  const getItemCount = (id: number) => getItem(id)?.count;

  const getTotalPrice = () => {
    return itemsCount.reduce((sum, e) => sum + e.count * e.price, 0);
  };

  const deleteItem = (id: number) => setShop(shop.filter(e => e.id !== id));

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
      {shop.length === 0 ? (
        <div className={s.ShopPage__isEmpty}>
          <h2 className={s.ShopPage__timeBuy}>
            Your cart is empty. Time to buy something!
          </h2>
          <img src="/img/cart-is-empty.png" className="cat-photo"></img>
        </div>
      ) : (
        <div className={s.ShopPage__containerCard}>
          {shop.map(e => (
            <article key={e.id} className={s.ShopPage__card}>
              <div className={s.ShopPage__info}>
                <button
                  className={s.ShopPage__buttonDelete}
                  onClick={() => deleteItem(e.id)}
                >
                  <img
                    src={
                      idButton === e.id
                        ? '/img/icons/icon-closeBlack.svg'
                        : '/img/icons/icon-close.svg'
                    }
                    onMouseEnter={() => setIdButton(e.id)}
                    onMouseLeave={() => setIdButton(null)}
                    className={cl('icon', s.ShopPage__buttonDeleteImg)}
                    alt="icon-close"
                  />
                </button>
                <div className={s.ShopPage__imgBlock}>
                  <img
                    src={`/${e.image}`}
                    alt="item-photo"
                    className={s.ShopPage__img}
                  />
                </div>
                <p className={s.ShopPage__itemName}>{e.name}</p>
              </div>

              <div className={s.ShopPage__buttons}>
                <div className={s.ShopPage__countInfo}>
                  <Button
                    direction="minus"
                    onClick={() => deleteCount(e.id)}
                    disabled={isCountOne(e.id)}
                  />
                  <p className={s.ShopPage__count}>{getItemCount(e.id)}</p>
                  <Button direction="plus" onClick={() => addCount(e.id)} />
                </div>

                <h3 className={s.ShopPage__price}>{`$${e.fullPrice}`}</h3>
              </div>
            </article>
          ))}
        </div>
      )}
      {shop.length > 0 && (
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
