/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useMemo } from 'react';

import { MainContext } from '../../../../../../context/MainContext';
import { ProductsContext } from '../../../../../../context/ProductsContext';
// eslint-disable-next-line max-len
import { YMAL_TITLE } from '../../../../../ProductDetails/constants/ModelsTitle';
import { HOT_PRICES_TITLE } from '../../../../constants/ProductTitle';
import { Model } from './components/Model';
import styles from './Main.module.scss';

interface Props {
  title: string;
  getMarginInline: (isItForTransform?: boolean) => 'auto' | '16px' | '24px';
  transformValue: string;
}

export const Main: React.FC<Props> = React.memo(
  ({ title, getMarginInline, transformValue }) => {
    // #region context

    const { isDesktop } = useContext(MainContext);
    const {
      products,
      suggestedProducts,
      suggestedProductsCache,
      currentProduct,
    } = useContext(ProductsContext);

    // #endregion
    // #region products arrays

    const sortedProducts = useMemo(
      () =>
        products.toSorted((productA, productB) => {
          const discountA = productA.fullPrice - productA.price;
          const discountB = productB.fullPrice - productB.price;

          if (title === HOT_PRICES_TITLE) {
            return discountB - discountA;
          }

          return (productB.year as number) - (productA.year as number);
        }),
      [products],
    );

    const preparedProducts = useMemo(() => {
      if (title === YMAL_TITLE) {
        const namespaceId = currentProduct?.namespaceId;

        if (namespaceId && suggestedProductsCache[namespaceId]) {
          return suggestedProductsCache[namespaceId];
        }

        return suggestedProducts;
      }

      return sortedProducts;
    }, [sortedProducts, suggestedProducts, currentProduct]);

    // #endregion

    return (
      <main
        className={styles.products}
        style={{
          left: isDesktop ? getMarginInline() : `-${getMarginInline()}`,
        }}
      >
        <div
          className={styles.wrapper}
          style={{
            marginLeft: getMarginInline(),
            transform: `translateX(${transformValue})`,
          }}
        >
          {preparedProducts.map(product => {
            const {
              id,
              itemId,
              category,
              name,
              image,
              price,
              fullPrice,
              screen,
              capacity,
              ram,
            } = product;

            return (
              <Model
                itemId={itemId}
                category={category}
                isMinWidthFixedValue={true}
                sectionTitle={title}
                key={id}
                name={name}
                image={image}
                price={price}
                fullPrice={fullPrice}
                screen={screen}
                capacity={capacity}
                ram={ram}
              />
            );
          })}
        </div>
      </main>
    );
  },
);

Main.displayName = 'Main';
