import { ProductCard } from '../../../shared/ProductCard';
import apiProducts from '../../../../../public/api/products.json';
import styles from './ProductsSlider.module.scss';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { ProductType } from 'models/product.model';
const imagesChevron = '/public/img/icons/';

interface ProductsSliderProps {
  title?: string;
  products?: typeof apiProducts;
  excludeId?: number;
}

const CARD_WIDTH = 272;
const VISIBLE_CARDS = 4;

export const ProductsSlider: React.FC<ProductsSliderProps> = ({
  title,
  excludeId,
}) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const maxIndex = apiProducts.slice(0, 10).length - VISIBLE_CARDS + 1;

  const hotPriceProducts = [...apiProducts]
    .sort((a, b) => {
      const discountA = a.fullPrice - a.price;
      const discountB = b.fullPrice - b.price;

      return discountB - discountA;
    })
    .slice(0, 10);

  const getSuggestedProducts = (
    products: ProductType[],
    limit: number,
    excludeIdProduct?: number,
  ): ProductType[] => {
    const filteredProducts = excludeIdProduct
      ? products.filter(p => p.id !== excludeIdProduct)
      : products;

    return [...filteredProducts]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const brandNewProducts = [...apiProducts]
    .sort((a, b) => b.year - a.year)
    .slice(0, 10);

  const handleNext = () => {
    setIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setIndex(prev => Math.max(prev - 1, 0));
  };

  const result = useMemo(() => {
    switch (title) {
      case 'Hot prices':
        return hotPriceProducts;

      case 'Brand new':
        return brandNewProducts;

      case 'You may also like':
        return getSuggestedProducts(apiProducts, 10, excludeId ?? -1);

      default:
        return [];
    }
  }, [title, excludeId, brandNewProducts, hotPriceProducts]);

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
            transform: `translateX(-${index * CARD_WIDTH}px)`,
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
