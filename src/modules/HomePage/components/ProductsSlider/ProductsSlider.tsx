import { useCallback, useContext, useState } from 'react';
// eslint-disable-next-line max-len
import { ButtonArrow } from '../../../shared/components/ButtonArrow/ButtonArrow';
// eslint-disable-next-line max-len
import { ProductCard } from '../../../shared/components/ProductCard/ProductCard';
import scss from './ProductsSlider.module.scss';
import { DataContext } from '../../../../context/ContextProvider';

export const ProductsSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { products } = useContext(DataContext);

  const prevSlide = useCallback(
    () => setActiveSlide(prev => (prev === 0 ? products.length - 1 : prev - 1)),
    [products.length],
  );
  const nextSlide = useCallback(
    () => setActiveSlide(prev => (prev === products.length - 1 ? 0 : prev + 1)),
    [products.length],
  );

  // eslint-disable-next-line no-console
  console.log(activeSlide);

  return (
    <div className={scss.slider}>
      <div className={scss.slider__header}>
        <h2 className={scss.slider__header_title}>Brand new models</h2>
        <div className={scss.slider__header_buttons}>
          <ButtonArrow direction="left" onClick={prevSlide} />
          <ButtonArrow direction="right" onClick={nextSlide} />
        </div>
      </div>
      <div className={scss.slider__productCard}>
        <div className={scss.slider__productCard__container}>
          {products[0] && (
            <ProductCard product={products[0]} hasDiscount={true} />
          )}
        </div>

        <div className={scss.slider__productCard__container}>
          {products[1] && (
            <ProductCard product={products[1]} hasDiscount={false} />
          )}
        </div>
      </div>
    </div>
  );
};
