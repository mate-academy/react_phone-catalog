import { useCallback, useContext, useMemo, useState } from 'react';
import { ButtonArrow } from '../../../shared/components/ButtonArrow';
import { ProductCard } from '../../../shared/components/ProductCard';
import scss from './ProductsSlider.module.scss';
import { DataContext } from '../../../../context/ContextProvider';
import { Product, Slider } from '../../../../api/types';

interface Props {
  title: string;
  type: Slider;
}

export const ProductsSlider: React.FC<Props> = ({ title, type }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const { products } = useContext(DataContext);
  const hasDiscount = type === 'new' ? false : true;

  const sliderProducts = useMemo(() => {
    let filtered = [];

    const getModel = (device: Product) => {
      const parts = device.image.split('/');

      return parts.at(-3)?.toLowerCase();
    };

    switch (type) {
      case 'new': {
        let max = -Infinity;

        for (const { year } of products) {
          if (year > max) {
            max = year;
          }
        }

        filtered = products.filter(device => device.year === max);

        break;
      }

      case 'hot': {
        const filteredByPrice = products.sort(
          (a, b) => b.fullPrice - a.fullPrice,
        );

        filtered = filteredByPrice.slice(0, 20);

        break;
      }
    }

    const modelGroups = new Map<string, Product[]>();

    for (const prod of filtered) {
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
  }, [products, type]);

  const prevSlide = useCallback(
    () =>
      setActiveSlide(prev =>
        prev === 0 ? sliderProducts.length - 1 : prev - 1,
      ),
    [sliderProducts.length],
  );
  const nextSlide = useCallback(
    () =>
      setActiveSlide(prev =>
        prev === sliderProducts.length - 1 ? 0 : prev + 1,
      ),
    [sliderProducts.length],
  );

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const x = e.targetTouches[0].clientX;

    setTouchStart(x);
    setTouchEnd(x);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const delta = touchStart - touchEnd;
    const THRESHOLD = 30;

    if (Math.abs(delta) < THRESHOLD) {
      return;
    }

    if (delta > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <div className={scss.slider}>
      <div className={scss.slider__header}>
        <h2 className={scss.slider__header_title}>{title}</h2>
        <div className={scss.slider__header_buttons}>
          <ButtonArrow direction="left" onClick={prevSlide} />
          <ButtonArrow direction="right" onClick={nextSlide} />
        </div>
      </div>
      <div
        className={scss.slider__productCard}
        style={{ '--index': -activeSlide } as React.CSSProperties}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {sliderProducts.map(prod => {
          return (
            <div className={scss.slider__productCard__container} key={prod.id}>
              <ProductCard product={prod} hasDiscount={hasDiscount} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
