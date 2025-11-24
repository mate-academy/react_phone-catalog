import { useCallback, useContext, useMemo, useState } from 'react';
import { ButtonArrow } from '../ButtonArrow';
import { ProductCard } from '../ProductCard';
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
    let productsToShow: Product[] = [];

    function shuffleArray(array: Product[]) {
      const copy = [...array];

      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap
      }

      return copy;
    }

    switch (type) {
      case 'new':
        const maxYear = Math.max(...products.map(p => p.year));

        productsToShow = products.filter(p => p.year === maxYear);
        break;
      case 'hot':
        productsToShow = [...products]
          .sort((a, b) => b.fullPrice - a.fullPrice)
          .slice(0, 20);
        break;
      case 'rand':
        productsToShow = shuffleArray(products).slice(0, 20);
        break;
    }

    const groups = new Map();

    productsToShow.forEach(product => {
      const modelKey = product.image.split('/').slice(-3, -2)[0] || 'unknown';

      if (!groups.has(modelKey)) {
        groups.set(modelKey, []);
      }

      groups.get(modelKey).push(product);
    });

    return Array.from(groups.values()).flatMap(group => group.slice(0, 3));
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
