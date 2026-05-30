// ProductSlider.tsx
import { useState, useEffect, useRef } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import ProductCard from '../ProductCard';
import style from './ProductSlider.module.scss';
import { Product } from '../../types/Product';

// É uma boa prática ter tipos compartilhados em um arquivo separado,

interface ProductSliderProps {
  title: string;
  products: Product[];
}

// Este custom hook é muito útil. Ele poderia ser movido para seu próprio arquivo
// em `src/hooks/` para ser reutilizado em outros componentes, se necessário.
const useItemsPerView = () => {
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;

      if (width <= 639) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (width <= 1199) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(4); // Desktop: 4 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);

    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  return itemsPerView;
};

export default function ProductSlider({ title, products }: ProductSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerView = useItemsPerView();

  // Mede a largura do contêiner do slider para um cálculo preciso
  useEffect(() => {
    const sliderElement = sliderRef.current;

    if (!sliderElement) {
      return;
    }

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setSliderWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(sliderElement);

    return () => resizeObserver.disconnect();
  }, []);

  const getSlideDistance = () => {
    if (sliderWidth === 0) {
      return 0;
    }

    const gap = 16; // Isso poderia ser uma prop ou lido do CSS se variar
    const totalGapWidth = gap * (itemsPerView - 1);
    const itemWidth = (sliderWidth - totalGapWidth) / itemsPerView;

    return currentSlide * (itemWidth + gap);
  };

  const slidePrevious = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
  };

  const maxSlide =
    products.length > itemsPerView ? products.length - itemsPerView : 0;

  const slideNext = () => {
    setCurrentSlide(prev => Math.min(maxSlide, prev + 1));
  };

  // Reseta a posição do slide se os produtos ou itemsPerView mudarem
  useEffect(() => {
    setCurrentSlide(0);
  }, [products, itemsPerView]);

  return (
    <section className={style.section}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>{title}</h2>
        <div className={style.sectionButtons}>
          <button
            className={style.sectionPrevious}
            onClick={slidePrevious}
            disabled={currentSlide === 0}
            aria-label={`Previous ${title} slide`}
          >
            <IoChevronBack aria-hidden="true" />
          </button>
          <button
            className={style.sectionNext}
            onClick={slideNext}
            disabled={currentSlide >= maxSlide}
            aria-label={`Next ${title} slide`}
          >
            <IoChevronForward aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={style.productsSlider} ref={sliderRef}>
        <div
          className={style.productsGrid}
          style={{ transform: `translateX(-${getSlideDistance()}px)` }}
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
