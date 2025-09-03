import { useCallback, useContext, useMemo, useState } from 'react';
// eslint-disable-next-line max-len
import { ButtonArrow } from '../../../shared/components/ButtonArrow/ButtonArrow';
// eslint-disable-next-line max-len
import { ProductCard } from '../../../shared/components/ProductCard/ProductCard';
import scss from './ProductsSlider.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import { Product } from '../../../../api/types';

export const ProductsSlider: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { products } = useContext(DataContext);

  const newestProducts = useMemo(() => {
    let max = -Infinity;

    for (const { year } of products) {
      if (year > max) {
        max = year;
      }
    }

    const filteredByYear = products.filter(device => device.year === max);
    const getModel = (device: Product) => {
      const parts = device.image.split('/');

      return parts.at(-3)?.toLowerCase();
    };

    const modelGroups = new Map<string, Product[]>();

    for (const prod of filteredByYear) {
      const key = getModel(prod);

      if (key) {
        const check = modelGroups.get(key);

        if (check) {
          check.push(prod);
        } else {
          modelGroups.set(key, [prod]);
        }
      }
    }

    const test = Array.from(modelGroups.values()).map(group => {
      const stop = group.length > 3 ? 3 : group.length;
      const result = [];

      for (let i = 0; i < stop; i++) {
        result.push(group[i]);
      }

      return result;
    });

    return test.flat(1);
  }, [products]);

  const prevSlide = useCallback(
    () =>
      setActiveSlide(prev =>
        prev === 0 ? newestProducts.length - 1 : prev - 1,
      ),
    [newestProducts.length],
  );
  const nextSlide = useCallback(
    () =>
      setActiveSlide(prev =>
        prev === newestProducts.length - 1 ? 0 : prev + 1,
      ),
    [newestProducts.length],
  );

  return (
    <div className={scss.slider}>
      <div className={scss.slider__header}>
        <h2 className={scss.slider__header_title}>Brand new models</h2>
        <div className={scss.slider__header_buttons}>
          <ButtonArrow direction="left" onClick={prevSlide} />
          <ButtonArrow direction="right" onClick={nextSlide} />
        </div>
      </div>
      <div
        className={scss.slider__productCard}
        style={{ '--index': -activeSlide } as React.CSSProperties}
      >
        {newestProducts.map(prod => {
          return (
            <div className={scss.slider__productCard__container} key={prod.id}>
              <ProductCard product={prod} hasDiscount={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
