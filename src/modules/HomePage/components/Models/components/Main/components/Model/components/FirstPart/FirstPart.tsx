/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from 'react';
import styles from './FirstPart.module.scss';
import { MainContext } from '../../../../../../../../../../context/MainContext';
import { FirstPartLink } from './components/FirstPartLink';
import { ProductsContext } from '../../../../../../../../../../context/ProductsContext';
import { useMediaQuery } from 'react-responsive';
import { Product } from '../../../../../../../../../../types/CategoriesTypes/Product';

interface Props {
  props: Product;
  isPriceHot: boolean;
}

export const FirstPart: React.FC<Props> = React.memo(
  ({ isPriceHot, props }) => {
    const { itemId, category, image, name, price, fullPrice } = props;

    // #region context

    const { isDesktop, isOnHomePage, modelOnClickHandler } =
      useContext(MainContext);
    const { currentProduct, getTitle } = useContext(ProductsContext);

    // #endregion

    const isSmallDesktop = useMediaQuery({ query: '(min-width: 768px)' });

    // #region markups

    const priceMarkup = useMemo(
      () => <div className={styles.price}>${fullPrice}</div>,
      [],
    );

    const hotPriceMarkup = useMemo(
      () => (
        <div className={styles['price-wrapper']}>
          <div className={styles.price}>${price}</div>
          <div className={styles['old-price']}>${fullPrice}</div>
        </div>
      ),
      [],
    );

    // #endregion
    // #region values

    const firstPartProductTitle = useMemo(() => {
      if (
        (!isOnHomePage && isSmallDesktop && !isDesktop) ||
        isOnHomePage ||
        currentProduct
      ) {
        return getTitle(name, 6);
      }

      return name;
    }, [isSmallDesktop, isDesktop]);

    const firstPartMarkup = useMemo(
      () => (isPriceHot ? hotPriceMarkup : priceMarkup),
      [],
    );

    // #endregion

    return (
      <div className={styles['first-part']}>
        <div
          className={styles.wrapper}
          onClick={() => modelOnClickHandler(category, itemId, props)}
        >
          <img src={`/${image}`} alt={name} className={styles.image} />
          <FirstPartLink
            firstPartProductTitle={firstPartProductTitle}
            name={name}
          />
        </div>
        {firstPartMarkup}
      </div>
    );
  },
);

FirstPart.displayName = 'FirstPart';
