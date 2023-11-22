import { useState } from 'react';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard';

import './ProductsSlider.scss';

type Props = {
  sliderTitle: string,
  products: Product[],
};

export const ProductsSlider: React.FC<Props> = ({ sliderTitle, products }) => {
  const [offset, setOffset] = useState(0);

  const screenWidth = document.documentElement.clientWidth;
  const isMediumScreen = screenWidth <= 992 && screenWidth > 576;
  const isExtraSmallScreen = screenWidth <= 576;

  const getFrameProductsCount = () => {
    if (isExtraSmallScreen) {
      return 1;
    }

    if (isMediumScreen) {
      return 2;
    }

    return 4;
  };

  const frameProductsCount = getFrameProductsCount();
  const scrollProductsCount = isMediumScreen ? 1 : 2;
  const oneOffsetStep = 100 / products.length;
  const offsetStep = oneOffsetStep * scrollProductsCount;
  const maxOffset = 100 - (oneOffsetStep * frameProductsCount);
  const isFirstProduct = offset === 0;
  const isLastProduct = offset === maxOffset;

  const slidesStyle = {
    width: `${(products.length / frameProductsCount) * 100}%`,
    transform: `translateX(-${offset}%)`,
  };

  const handleNextClick = () => {
    setOffset(prev => {
      return prev + offsetStep > maxOffset
        ? maxOffset
        : prev + offsetStep;
    });
  };

  const handlePreviousClick = () => {
    setOffset(prev => {
      return prev - offsetStep < 0
        ? 0
        : prev - offsetStep;
    });
  };

  return (
    <div className="ProductsSlider">
      <div className="ProductsSlider__title-wrapper">
        <h2 className="title">{sliderTitle}</h2>

        <div className="ProductsSlider__buttons">
          <button
            type="button"
            aria-label="Previous"
            className="ProductsSlider__button ProductsSlider__button--previous"
            onClick={handlePreviousClick}
            disabled={isFirstProduct}
          />

          <button
            type="button"
            aria-label="Next"
            className="ProductsSlider__button ProductsSlider__button--next"
            onClick={handleNextClick}
            disabled={isLastProduct}
          />
        </div>
      </div>

      <div className="ProductsSlider__slides-wrapper">
        <div className="ProductsSlider__slides" style={slidesStyle}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
