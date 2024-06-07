import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/types';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

type Props = {
  title: string;
  products: Product[] | [];
};

export const ProductsSlider: React.FC<Props> = ({ title, products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translatePercentage, setTranslatePercentage] = useState(100);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, Math.floor(products.length / 4)),
    );
  };

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth <= 1199 && window.innerWidth >= 640) {
        setTranslatePercentage(50);
      } else if (window.innerWidth >= 1200) {
        setTranslatePercentage(100);
      } else {
        setTranslatePercentage(35);
      }
    };

    window.addEventListener('resize', handleSize);
    handleSize();

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  const handlerSwipes = useSwipeable({
    onSwipedLeft: () => handleNextClick(),
    onSwipedRight: () => handlePrevClick(),
  });

  return (
    <div className={styles.productsSlider}>
      <div className={styles.topContainer}>
        <h2 className={styles.title}>{title}</h2>

        <button
          className={classNames(styles.scrollBtn, styles.scrollBtnLeft, {
            [styles.disabledBtnLft]: currentIndex === 0,
          })}
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        ></button>
        <button
          className={classNames(styles.scrollBtn, styles.scrollBtnRight, {
            [styles.disabledBtnRight]:
              currentIndex >= Math.floor(products.length / 4),
          })}
          onClick={handleNextClick}
          disabled={currentIndex >= Math.floor(products.length / 4)}
        ></button>
      </div>

      <div className={styles.sliderWindow}>
        <div
          className={styles.slidesContainer}
          {...handlerSwipes}
          style={{
            transform: `translateX(-${currentIndex * translatePercentage}%)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
