/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useMemo } from 'react';

import { MainContext } from '../../../../../../context/MainContext';
import { ProductsContext } from '../../../../../../context/ProductsContext';
// eslint-disable-next-line max-len
import { YMAL_TITLE } from '../../../../../ProductDetails/constants/ModelsTitle';
import { LeftArrow } from './components/Arrows/LeftArrow';
import { RightArrow } from './components/Arrows/RightArrow';
import styles from './Header.module.scss';

interface Props {
  title: string;
  cardIndex: number;
  setCardIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const Header: React.FC<Props> = React.memo(
  ({ title, cardIndex, setCardIndex }) => {
    const { isMobile, isDesktop, isTablet } = useContext(MainContext);
    const { products, suggestedProducts } = useContext(ProductsContext);

    const preparedProducts = useMemo(
      () => (title === YMAL_TITLE ? suggestedProducts : products),
      [suggestedProducts, products],
    );

    const DESKTOP_END = preparedProducts.length - 4;
    const TABLET_END = preparedProducts.length - 2;
    const MOBILE_END = preparedProducts.length - 1;

    // #region functions

    const getrightButtonCondition = useCallback(() => {
      if (isDesktop) {
        return cardIndex === DESKTOP_END;
      }

      if (isTablet) {
        return cardIndex === TABLET_END;
      }

      return cardIndex === MOBILE_END;
    }, [cardIndex, isDesktop, isTablet]);

    const leftArrowHandler = useCallback(() => {
      setCardIndex(index => index - 1);
    }, []);

    // #endregion
    // #region useEffects

    useEffect(() => {
      if (preparedProducts.length > 0 && cardIndex >= DESKTOP_END) {
        if (isDesktop) {
          setCardIndex(DESKTOP_END);

          return;
        }

        if (isTablet) {
          setCardIndex(TABLET_END);

          return;
        }

        if (isMobile) {
          setCardIndex(MOBILE_END);
        }
      }
    }, [isDesktop, isTablet, isMobile]);

    useEffect(() => {
      if (
        preparedProducts.length > 0 &&
        cardIndex > 0 &&
        cardIndex < DESKTOP_END
      ) {
        setCardIndex(index => index);
      }
    }, [isDesktop, isTablet, isMobile]);

    // #endregion

    return (
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>

        <nav className={styles.nav}>
          <LeftArrow
            cardIndex={cardIndex}
            leftArrowHandler={leftArrowHandler}
          />
          <RightArrow
            setCardIndex={setCardIndex}
            getrightButtonCondition={getrightButtonCondition}
          />
        </nav>
      </header>
    );
  },
);

Header.displayName = 'Header';
