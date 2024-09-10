import { CSSProperties, memo, useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { shuffleArray } from '../../utils/shuffleFunction';

import { useProductData } from '../../hooks/useProductData';

import { Button } from '../Button';
import { Product } from '../Product';

import styles from './ProductSlider.module.scss';
const {
  productSlider,
  productSlider__wrapper,
  productSlider__title,
  productSlider__buttonsWrapper,
  productSlider__carousel,
  productSlider__carouselWrapper,
} = styles;

type ProductSliderProps = {
  title: string;
  apiUrl: string;
  discount: boolean;
  newOnly: boolean;
  suggestedProducts?: boolean;
};

export const ProductSlider = memo(
  ({
    title,
    apiUrl,
    discount,
    newOnly,
    suggestedProducts,
  }: ProductSliderProps) => {
    const { category } = useParams();
    const products = useProductData(apiUrl, category, newOnly);

    const [currentIndex, setCurrentIndex] = useState(0);

    // #region click handlers
    const handlePrevClick = useCallback(() => {
      setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, []);

    const handleNextClick = useCallback(() => {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, Math.max(products.length - 1, 0)),
      );
    }, [products.length]);
    // #endregion

    // #region conditions
    const productsStartPosition = useMemo(
      () => currentIndex === 0,
      [currentIndex],
    );
    const productsEndPosition = useMemo(
      () => currentIndex === products.length,
      [currentIndex, products.length],
    );
    // #endregion

    const productsAfterDiscount = useMemo(
      () =>
        discount
          ? products.sort(
              (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
            )
          : products,
      [products, discount],
    );

    // shuffling products to generate a random suggestions
    const shuffledProducts = useMemo(
      () =>
        suggestedProducts
          ? shuffleArray(productsAfterDiscount)
          : productsAfterDiscount,
      [products, suggestedProducts],
    );

    return (
      <div className={productSlider}>
        <div className={productSlider__wrapper}>
          <h2 className={productSlider__title}>{title}</h2>

          <div className={productSlider__buttonsWrapper}>
            <Button
              bgImg="/icons/icon-arrow.svg"
              action={handlePrevClick}
              disabled={productsStartPosition}
              additionalStyles={{
                transform: 'rotate(-180deg)',
                borderColor: '#B4BDC3',
              }}
            />

            <Button
              bgImg="/icons/icon-arrow.svg"
              action={handleNextClick}
              disabled={productsEndPosition}
              additionalStyles={{ borderColor: '#B4BDC3' }}
            />
          </div>
          <div className={productSlider__carouselWrapper}>
            <div
              className={productSlider__carousel}
              style={
                {
                  '--current-index': currentIndex,
                } as CSSProperties
              }
            >
              {shuffledProducts.map((item, index) => (
                <Product product={item} discount={discount} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ProductSlider.displayName = 'ProductSlider';
