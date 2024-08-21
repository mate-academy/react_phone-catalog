import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ModelItem.module.scss';
import { Products } from '../../../../types/Products';
import { useAppContext } from '../../../../AppContext';

interface Props {
  model: Products;
  modelsTitle: string;
}

export const ModelItem: React.FC<Props> = ({ model, modelsTitle }) => {
  const { favourites, cart, handleAddCart, handleAddFavourite } =
    useAppContext();

  const selected = favourites.some(fav => fav.id === model.id);
  const add = cart.some(item => item.id === model.id);

  return (
    <div className={`models__item ${styles.item}`}>
      <div className={styles.item__wrapper}>
        <Link
          to={`/${model.category}/${model.itemId}`}
          className={styles.item__photo}
        >
          <img className={styles.item__image} src={model.image} alt="" />
        </Link>
        <div className={styles.item__content}>
          <Link
            to={`/${model.category}/${model.itemId}`}
            className={styles.item__title}
          >
            <p>{model.name}</p>
          </Link>
          <div className={styles.item__price}>
            {modelsTitle === 'Hot prices' ? (
              <>
                <h3
                  className={styles['item__price-num']}
                >{`$${model.price}`}</h3>
                <h3 className={styles['item__price--discount']}>
                  {`$${model.fullPrice}`}
                </h3>
              </>
            ) : (
              <h3
                className={styles['item__price-num']}
              >{`$${model.fullPrice}`}</h3>
            )}
          </div>
          <div className={styles.item__info}>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Screen</p>
              <p className={styles.item__value}>{model.screen}</p>
            </div>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Capacity</p>
              <p className={styles.item__value}>{model.capacity}</p>
            </div>
            <div className={styles.item__block}>
              <p className={styles.item__name}>Ram</p>
              <p className={styles.item__value}>{model.ram}</p>
            </div>
          </div>
          <div className={styles.item__buttons}>
            {!add ? (
              <button
                className={styles['item__add-to-cart']}
                onClick={() => handleAddCart(model)}
              >
                Add to cart
              </button>
            ) : (
              <button
                className={`${styles['item__add-to-cart']} ${styles['item__add-to-cart--added']}`}
                onClick={() => handleAddCart(model)}
              >
                Added
              </button>
            )}
            {!selected ? (
              <button
                className={`${styles['item__add-to-favorite']} ${styles['item__add-to-favorite--default']}`}
                onClick={() => handleAddFavourite(model)}
              ></button>
            ) : (
              <button
                className={`${styles['item__add-to-favorite']} ${styles['item__add-to-favorite--selected']}`}
                onClick={() => handleAddFavourite(model)}
              ></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
