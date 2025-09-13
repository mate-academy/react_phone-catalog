import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import arrowLeftDefault from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowLeftHover from '../../assets/icons/Chevron (Arrow Left).svg';
import arrowLeftDisabled from '../../assets/icons/Chevron (Arrow Left Gray).svg';
import arrowRightDefault from '../../assets/icons/Chevron (Arrow Right).svg';
import arrowRightHover from '../../assets/icons/Chevron (Arrow Right).svg';
import arrowRightDisabled from '../../assets/icons/Chevron (Arrow Right Gray).svg';
import { useState, useEffect } from 'react';

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
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(visibleCountDesktop);
  const [hoveredLeft, setHoveredLeft] = useState(false);
  const [hoveredRight, setHoveredRight] = useState(false);

  useEffect(() => {
    fetch(`/api/${category}.json`) // подгружаем данные из нужной категории
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then((data: ProductType[]) => {
        const filtered = data.filter(p => p.id !== excludeId); // исключаем текущий товар
        const fixed = filtered.map(p => ({
          ...p,
          images: p.images.map(img => (img.startsWith('/') ? img : `/${img}`)),
        }));

        setProducts(fixed);
      })
      .catch();
  }, [category, excludeId]);

  useEffect(() => {
    setIsOverflowing(products.length > visibleCount);
  }, [products, visibleCount]);

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

  const handlePrev = () =>
    setStartIndex(
      prev => (prev - visibleCount + products.length) % products.length,
    );
  const handleNext = () =>
    setStartIndex(prev => (prev + visibleCount) % products.length);
  /* eslint-disable @typescript-eslint/indent */
  const visibleProducts = products.length
    ? Array.from(
        { length: Math.min(visibleCount, products.length) },
        (_, i) => products[(startIndex + i) % products.length],
      )
    : [];

  if (products.length === 0) {
    return <p>Loading products...</p>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.arrows}>
          <button
            className={`${styles.arrowBtn} ${styles.arrowLeft} ${!isOverflowing ? styles.disabled : ''}`}
            onClick={handlePrev}
            disabled={!isOverflowing}
            onMouseEnter={() => setHoveredLeft(true)}
            onMouseLeave={() => setHoveredLeft(false)}
          >
            <img
              src={
                !isOverflowing
                  ? arrowLeftDisabled
                  : hoveredLeft
                    ? arrowLeftHover
                    : arrowLeftDefault
              }
              alt="Prev"
            />
          </button>

          <button
            className={`${styles.arrowBtn} ${styles.arrowRight} ${!isOverflowing ? styles.disabled : ''}`}
            onClick={handleNext}
            disabled={!isOverflowing}
            onMouseEnter={() => setHoveredRight(true)}
            onMouseLeave={() => setHoveredRight(false)}
          >
            <img
              src={
                !isOverflowing
                  ? arrowRightDisabled
                  : hoveredRight
                    ? arrowRightHover
                    : arrowRightDefault
              }
              alt="Next"
            />
          </button>
        </div>
      </div>

      <div className={styles.productsWrapper}>
        <div className={styles.productsGrid}>
          {visibleProducts.map(product => (
            <ProductCard
              key={product.id}
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
          ))}
        </div>
      </div>
    </section>
  );
};
