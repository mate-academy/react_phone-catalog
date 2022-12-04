import { FC, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';
import { Title } from './UI/Title';
import { SliderTitleLoader } from './Loaders/SliderTitleLoader';
import { ProductCardLoader } from './Loaders/ProductCardLoader';
import { SliderButton } from './UI/SliderButton';

type Props = {
  title: string;
  products: Product[];
  isLoading: boolean;
};

export const ProductsSlider: FC<Props> = (
  { title, products, isLoading },
) => {
  const [sliderTransform, setSliderTransform] = useState(0);

  const sliderConfig = {
    productsCount: products.length,
    productWithGapWidth: 288,
    visibleProducts: 4,
  };

  const maxTransformWidth = () => {
    const {
      productsCount,
      productWithGapWidth,
      visibleProducts,
    } = sliderConfig;

    return (productsCount - visibleProducts) * productWithGapWidth;
  };

  const sliderListStyles = {
    transform: `translateX(${sliderTransform}px)`,
    transition: 'transform 500ms',
  };

  const nextProduct = () => {
    setSliderTransform((current) => current - sliderConfig.productWithGapWidth);
  };

  const prevProduct = () => {
    setSliderTransform((current) => current + sliderConfig.productWithGapWidth);
  };

  return (
    <div className="slider">
      <div className="slider__header">
        {isLoading ? (
          <SliderTitleLoader />
        ) : (
          <>
            <Title title={title} />
            <div className="slider__buttons">
              <SliderButton
                width="32px"
                height="32px"
                direction="prev"
                action={prevProduct}
                isDisabled={sliderTransform === 0}
              />
              <SliderButton
                width="32px"
                height="32px"
                direction="next"
                action={nextProduct}
                isDisabled={maxTransformWidth() <= Math.abs(sliderTransform)}
              />
            </div>
          </>
        )}
      </div>
      <div
        className="slider__products"
        style={sliderListStyles}
      >
        {isLoading ? (
          <>
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
            <ProductCardLoader />
          </>
        ) : (
          <>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
