import React from 'react';
import styles from './ModelItem.module.scss';
import '../../../../styles/variables.scss';
import { Products } from '../../../../types/Products';

interface Props {
  model: Products;
  modelsTitle: string;
}

export const ModelItem: React.FC<Props> = ({ model, modelsTitle }) => {
  return (
    <div className={`models__item ${styles.item}`}>
      <div className={styles.item__wrapper}>
        <div className={styles.item__photo}>
          <img className={styles.item__image} src={model.image} alt="" />
        </div>
        <div className={styles.item__content}>
          <div className={styles.item__title}>
            <p>{model.name}</p>
          </div>
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
            <a href="" className={styles['item__add-to-cart']}>
              Add to cart
            </a>
            <button className={styles['item__add-to-favorite']}></button>
          </div>
        </div>
      </div>
    </div>
  );
};
