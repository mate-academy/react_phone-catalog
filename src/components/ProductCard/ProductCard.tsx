import styles from './productcard.module.scss';
import { Product } from '../../services/productType';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../services/enums';
import React from 'react';
import { ButtonsAddandFavorits } from './ButtonAdd';
import { useAppSelector } from '../../Hooks/hooks';
import { Theme } from '../../services/theme';

type Props = {
  item: Product;
  type: ProductType;
};

export const ProductCard: React.FC<Props> = ({ item }) => {
  const theme = useAppSelector(state => state.theme.theme);

  return (
    <>
      <section
        className={
          theme === Theme.light
            ? styles.cardProductSection
            : styles.cardProductSectionDark
        }
      >
        <NavLink to={`/${item.category}/${item.itemId}`}>
          <img
            className={styles.productImages}
            src={item.image}
            alt="Product"
          />
        </NavLink>
        <h3
          className={
            theme === Theme.light
              ? styles.productTitles
              : styles.productTitlesDark
          }
        >
          {item.name}
        </h3>
        <div className={styles.productPrices}>
          <span
            className={
              theme === Theme.light ? styles.priceNow : styles.priceNowDark
            }
          >{`$${item.fullPrice}`}</span>
          <span
            className={
              theme === Theme.light ? styles.priceOld : styles.priceOldDark
            }
          >{`$${item.price}`}</span>
        </div>
        <span className={styles.line}></span>
        <div className={styles.techSpecs}>
          <div
            className={
              theme === Theme.light
                ? styles.techSpectName
                : styles.techSpectNameDark
            }
          >
            <span className={styles.screen}>Screen</span>
            <span className={styles.capacity}>Capacity</span>
            <span className={styles.ram}>RAM</span>
          </div>
          <div
            className={
              theme === Theme.light
                ? styles.techSpecsSpecs
                : styles.techSpecsSpecsDark
            }
          >
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
