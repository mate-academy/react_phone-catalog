import styles from './productcard.module.scss';
import { Product } from '../../services/productType';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../services/enums';
import React from 'react';
import { ButtonsAddandFavorits } from './ButtonAdd';

type Props = {
  item: Product;
  type: ProductType;
};

export const ProductCard: React.FC<Props> = ({ item }) => {
  return (
    <>
      <section className={styles.cardProductSection}>
        <NavLink to={`/${item.category}/${item.itemId}`}>
          <img
            className={styles.productImages}
            src={item.image}
            alt="Product"
          />
        </NavLink>
        <h3 className={styles.productTitles}>{item.name}</h3>
        <div className={styles.productPrices}>
          <span className={styles.priceNow}>{`$${item.fullPrice}`}</span>
          <span className={styles.priceOld}>{`$${item.price}`}</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.techSpecs}>
          <div className={styles.techSpectName}>
            <span className={styles.screen}>Screen</span>
            <span className={styles.capacity}>Capacity</span>
            <span className={styles.ram}>RAM</span>
          </div>
          <div className={styles.techSpecsSpecs}>
            <span className={styles.screenSpecs}>{item.screen}</span>
            <span className={styles.capacitySpecs}>{item.capacity}</span>
            <span className={styles.ramSpecs}>{item.ram}</span>
          </div>
        </div>
        <ButtonsAddandFavorits item={item} />
      </section>
    </>
  );
};
