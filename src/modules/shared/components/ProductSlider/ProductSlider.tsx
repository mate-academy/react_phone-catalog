//#region imports
import { ProductCard } from '../ProductCard';
import { SliderButton } from '../SliderButton';
import { Slider } from '../Slider';
import { Product } from '../../types/Product';
import { useTranslation } from 'react-i18next';
import { useSlider } from '../../hooks/useSlider';
import { useCallback } from 'react';
import baseStyles from './base.module.scss';
//#endregion

type Props = {
  title: string;
  products: Product[];
};

export const ProductSlider: React.FC<Props> = ({ title, products }) => {
  const { t } = useTranslation('shared');
  const sliderGap = 16;

  const { refs, currentScroll, maxScroll, controls } = useSlider(
    sliderGap,
    products.length,
    0,
  );
  const { goNext, goPrev } = controls;

  const renderSlide = useCallback(
    (product: Product) => <ProductCard product={product} />,
    [],
  );

  return (
    <div className={baseStyles.slider}>
      <div className={baseStyles.topBar}>
        <h2>{title}</h2>

        <div className={baseStyles.sliderButtons}>
          <SliderButton
            direction="left"
            onClick={goPrev}
            disabled={currentScroll <= 0}
            ariaLabel={t('previousSlide')}
          />

          <SliderButton
            direction="right"
            onClick={goNext}
            disabled={currentScroll >= maxScroll}
            ariaLabel={t('nextSlide')}
          />
        </div>
      </div>

      <Slider
        refs={refs}
        sliderClass={baseStyles.mainContainer}
        containerClass={baseStyles.container}
        slides={products}
        gap={sliderGap}
        scroll={currentScroll}
        renderSlide={renderSlide}
      />
    </div>
  );
};
