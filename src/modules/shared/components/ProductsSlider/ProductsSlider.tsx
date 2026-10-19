import { useState, useEffect } from 'react';
import { Product } from '../../../../types/Product';
import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../ProductCard/ProductCard';
import { getProductIndex } from '../../../../utils/product';

type Props = {
  products: Product[];
  title: string;
  showFullPrice?: boolean;
};

function getCardsPerView() {
  if (window.innerWidth < 640) {
    return 1;
  }

  if (window.innerWidth < 1200) {
    return 2;
  }

  return 4;
}

export const ProductsSlider: React.FC<Props> = ({
  products,
  title,
  showFullPrice,
}) => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleProducts = products.slice(startIndex, startIndex + 4);

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(products.length - cardsPerView, 0);

    setStartIndex(currentIndex => {
      return Math.min(currentIndex, maxIndex);
    });
  }, [products.length, cardsPerView]);

  return (
    <div className={styles.products__slider}>
      <div className={styles['products__slider-header']}>
        <h2 className={styles['products__slider-title']}>{title}</h2>

        <div className={styles['products__slider-actions']}>
          <button
            type="button"
            className={styles['products__slider-btn']}
            onClick={() =>
              setStartIndex(prev =>
                getProductIndex(products, prev, 'prev', cardsPerView),
              )
            }
          >
            <img
              src="./img/arrLeft.png"
              alt="Previous slide"
              className={styles['products__slider-btn-icon']}
            />
          </button>

          <button
            type="button"
            className={styles['products__slider-btn']}
            onClick={() =>
              setStartIndex(prev =>
                getProductIndex(products, prev, 'next', cardsPerView),
              )
            }
          >
            <img
              src="./img/arrRight.png"
              alt="Next slide"
              className={styles['products__slider-btn-icon']}
            />
          </button>
        </div>
      </div>

      <div className={styles.main__product}>
        {visibleProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showFullPrice={showFullPrice}
          />
        ))}
      </div>
    </div>
  );
};
