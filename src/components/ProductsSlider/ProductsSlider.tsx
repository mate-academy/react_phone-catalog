import { useState, useEffect, useMemo } from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import arrowLeftWhite from '../../assets/icons/arrow-left-white.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import arrowRightWhite from '../../assets/icons/arrow-right-white.svg';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductsSlider.module.scss';
import { useScreenType } from '../../hooks/useScreenType';
import { Product } from '../../types/Product';
import { getProducts, getSuggestedProducts } from '../../api/api';
import { sortByNewest, sortByDiscount } from '../../utils/productHelpers';
import { useTheme } from '../context/ThemeContext';

type Props = {
  title: string;
  type: 'new' | 'hot' | 'suggested';
  productId?: string;
};

const getItemsPerView = (screenType: ReturnType<typeof useScreenType>) => {
  switch (screenType) {
    case 'desktop':
      return 4;
    case 'tablet':
      return 2;

    default:
      return 1;
  }
};

export const ProductsSlider: React.FC<Props> = ({ title, type, productId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const screenType = useScreenType();
  const itemsPerView = getItemsPerView(screenType);

  useEffect(() => {
    if (type === 'suggested' && productId) {
      getSuggestedProducts(productId).then(setProducts);
    } else {
      getProducts().then(setProducts);
    }
  }, [type, productId]);

  const visibleProducts = useMemo(() => {
    if (type === 'new') {
      return sortByNewest(products);
    }

    if (type === 'hot') {
      return sortByDiscount(products);
    }

    return products;
  }, [products, type]);

  const maxIndex = Math.max(0, visibleProducts.length - itemsPerView);

  const listStyle = {
    transform: `translateX(calc(-${(startIndex * 100) / itemsPerView}% - ${(startIndex * 16) / itemsPerView}px))`,
  } as React.CSSProperties;

  useEffect(() => {
    if (startIndex > maxIndex) {
      setStartIndex(maxIndex);
    }
  }, [maxIndex, startIndex]);

  const handlePrevClick = () => {
    setStartIndex(prevIndex => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  const handleNextClick = () => {
    setStartIndex(prevIndex => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };

  const { theme } = useTheme();

  return (
    <section className={styles.products}>
      <div className={styles.top}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={handlePrevClick}
            disabled={visibleProducts.length <= itemsPerView}
          >
            <img
              src={theme === 'dark' ? arrowLeftWhite : arrowLeft}
              alt="Previous"
            />
          </button>
          <button
            className={styles.button}
            onClick={handleNextClick}
            disabled={visibleProducts.length <= itemsPerView}
          >
            <img
              src={theme === 'dark' ? arrowRightWhite : arrowRight}
              alt="Next"
            />
          </button>
        </div>
      </div>
      <div className={styles.sliderWindow}>
        <div className={styles.cards} style={listStyle}>
          {visibleProducts.map(product => (
            <div className={styles.cardWrapper} key={product.id}>
              <ProductCard {...product} showFullPrice={type === 'hot'} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
