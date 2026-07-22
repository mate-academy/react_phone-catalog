// #regionImport
import classNames from 'classnames';

import React from 'react';
import { Typography } from '@shared/ui/Typography';
import { ArrowButton } from '@shared/components/ArrowButton';
import { Product } from 'src/types/Product';
import { useSlider } from '@hooks/useSlider';

import styles from './ProductsSlider.module.scss';
import stylesBtn from '@shared/components/ArrowButton/ArrowBtn.module.scss';
import sliderStyles from '../PicturesSlider/PicturesSlider.module.scss';

import { ProductCard } from '@shared/ui/ProductCard/ProductCard';
import { Container } from '@shared/components/Container';
import { useCardsPerView } from './hooks/useCardsPerView';
// #endregion

type Props = {
  title: string;
  products: Product[];
  showOldPrice?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  showOldPrice = true,
}) => {
  const { viewportRef, firstCardRef, countSlide, cardWidth } =
    useCardsPerView();

  const { currentSlide, nextSlide, prevSlide, isFirst, isLast } = useSlider(
    products.length,
    false,
    countSlide,
  );

  const gapCard = 16;

  return (
    <section className={styles.products}>
      <Container>
        <div className={styles.productsTop}>
          <div className={styles.productsTitleWidthMobile}>
            <Typography variant="h2">{title}</Typography>
          </div>

          <div className={styles.productsTopButtons}>
            <ArrowButton
              direction="prev"
              onClick={prevSlide}
              disabled={isFirst}
              className={classNames(
                stylesBtn.arrowButton,
                stylesBtn.mobileArrow,
              )}
            />

            <ArrowButton
              direction="next"
              onClick={nextSlide}
              disabled={isLast}
              className={classNames(
                stylesBtn.arrowButton,
                stylesBtn.mobileArrow,
              )}
            />
          </div>
        </div>
      </Container>

      <div className={styles.productsWrapperViewport}>
        <div
          className={classNames(
            sliderStyles.viewport,
            sliderStyles.viewportWithGap,
          )}
          ref={viewportRef}
        >
          <div
            className={classNames(
              sliderStyles.track,
              sliderStyles.trackWithGap,
            )}
            style={{
              transform: `translateX(-${currentSlide * (cardWidth + gapCard)}px)`,
            }}
          >
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                ref={index === 0 ? firstCardRef : undefined}
                showOldPrice={showOldPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
