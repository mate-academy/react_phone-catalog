import { ProductCard } from '../../../shared/ProductCard';
import apiProducts from '../../../../../public/api/products.json';
import styles from './ProductsSlider.module.scss';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const imagesChevron = '/public/img/icons/';

interface ProductsSliderProps {
  title?: string;
  products?: typeof apiProducts;
  excludeId?: number;
}

const CARD_WIDTH = 272;
const GAP = 16;

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  excludeId,
}) => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1200) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const hotPriceProducts = [...apiProducts]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  const getSuggestedProducts = useMemo(() => {
    const filteredProducts = excludeId
      ? apiProducts.filter(p => p.id !== excludeId)
      : apiProducts;

    return [...filteredProducts].sort(() => Math.random() - 0.5).slice(0, 10);
  }, [excludeId]);

  const brandNewProducts = [...apiProducts]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const result = useMemo(() => {
    switch (title) {
      case 'Hot prices':
        return hotPriceProducts;

      case 'Brand new models':
        return brandNewProducts;

      case 'You may also like':
        return getSuggestedProducts;

      default:
        return [];
    }
  }, [title, brandNewProducts, hotPriceProducts, getSuggestedProducts]);

  const maxIndex = Math.max(0, result.length + 1 - visibleCards);

  const handleNext = () => {
    setIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <>
      <div className={styles.productsslider__header}>
        {title && <h2 className={styles.productsslider__title}>{title}</h2>}
        <div className={styles.productsslider__buttons}>
          <button
            className={styles.productsslider__buttons_left}
            onClick={handlePrev}
            disabled={index === 0}
          >
            <img
              className={styles.productsslider__buttons_img}
              src={imagesChevron + 'icon-chevron-arrow-left.png'}
              alt="left arrow"
            />
          </button>
          <button
            className={styles.productsslider__buttons_right}
            onClick={handleNext}
            disabled={index >= maxIndex}
          >
            <img
              className={styles.productsslider__buttons_img}
              src={imagesChevron + 'icon-chevron-arrow-right.png'}
              alt="right arrow"
            />
          </button>
        </div>
      </div>
      <div className={styles.productsslider}>
        <div
          className={styles.productsslider__track}
          style={{
            transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          }}
        >
          {result.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          <button
            className={styles.productsslider__loadmore}
            onClick={() => navigate('/phones')}
          >
            Load More
          </button>
        </div>
      </div>
    </>
  );
};
