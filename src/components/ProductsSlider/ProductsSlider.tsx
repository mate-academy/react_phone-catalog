import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import arrowLeftDefault from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowLeftDisabled from '../../assets/icons/Chevron (Arrow Left Gray).svg';
import arrowRightDefault from '../../assets/icons/Chevron (Arrow Right).svg';
import arrowRightDisabled from '../../assets/icons/Chevron (Arrow Right Gray).svg';
import { useState, useEffect, useRef } from 'react';

interface ProductType {
  id: string;
  name: string;
  images: string[];
  priceRegular: number;
  priceDiscount: number;
  capacity?: string;
  ram?: string;
  screen?: string;
  isNew: boolean;
  products?: ProductType[];
  category?: 'phones' | 'tablets' | 'accessories';
}

interface ProductsSliderProps {
  title: string;
  category: 'phones' | 'tablets' | 'accessories';
  excludeId?: string;
  visibleCountDesktop?: number;
}

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  category,
  excludeId,
  visibleCountDesktop = 4,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(visibleCountDesktop);

  const trackRef = useRef<HTMLDivElement>(null);

  // Загрузка продуктов
  useEffect(() => {
    fetch(`api/${category}.json`)
      .then(res => res.json())
      .then((data: ProductType[]) => {
        const filtered = data.filter(p => p.id !== excludeId);

        setProducts(filtered);
      });
  }, [category, excludeId]);

  // Адаптивность
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(2);
      } else if (window.innerWidth < 1200) {
        setVisibleCount(3);
      } else {
        setVisibleCount(visibleCountDesktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [visibleCountDesktop]);

  const handlePrev = () => setStartIndex(prev => Math.max(prev - 1, 0));
  const handleNext = () =>
    setStartIndex(prev => Math.min(prev + 1, products.length - visibleCount));

  const slideWidth = trackRef.current
    ? trackRef.current.clientWidth / visibleCount
    : 0;

  if (!products.length) {
    return <p>Loading products...</p>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button
            className={`${styles.arrowBtn} ${startIndex === 0 ? styles.disabled : ''}`}
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <img
              src={startIndex === 0 ? arrowLeftDisabled : arrowLeftDefault}
              alt="Prev"
            />
          </button>

          <button
            className={`${styles.arrowBtn} ${startIndex + visibleCount >= products.length ? styles.disabled : ''}`}
            onClick={handleNext}
            disabled={startIndex + visibleCount >= products.length}
          >
            <img
              src={
                startIndex + visibleCount >= products.length
                  ? arrowRightDisabled
                  : arrowRightDefault
              }
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className={styles.productsWrapper} ref={trackRef}>
        <div
          className={styles.productsTrack}
          style={{
            transform: `translateX(-${startIndex * slideWidth}px)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.productSlide}>
              <ProductCard
                category={product.category}
                originalId={product.id}
                image={product.images[0]}
                title={product.name}
                price={`$${product.priceDiscount}`}
                oldPrice={`$${product.priceRegular}`}
                isNew={product.isNew}
                specs={{
                  screen: product.screen || '-',
                  capacity: product.capacity || '-',
                  ram: product.ram || '-',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
