import styles from './ProductsSlider.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { Product } from '../../../shared/types';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSwipeable } from 'react-swipeable';

type Props = {
  title: string;
  products: Product[] | [];
  discount?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  discount,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsOnPage, setProductsOnPage] = useState(0);

  useEffect(() => {
    const handleSize = () => {
      if (window.innerWidth <= 1199 && window.innerWidth >= 640) {
        setProductsOnPage(2);
      } else if (window.innerWidth >= 1200) {
        setProductsOnPage(4);
      } else {
        setProductsOnPage(1);
      }
    };

    window.addEventListener('resize', handleSize);
    handleSize();

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex =>
      Math.min(prevIndex + 1, Math.ceil(products.length / productsOnPage - 1)),
    );
  };

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
              currentIndex >= Math.ceil(products.length / productsOnPage - 1),
          })}
          onClick={handleNextClick}
          disabled={
            currentIndex >= Math.ceil(products.length / productsOnPage - 1)
          }
        ></button>
      </div>

      <div className={styles.sliderWindow}>
        <div
          className={styles.slidesContainer}
          {...handlerSwipes}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {products.map(product => (
            <div key={product.id} className={styles.card}>
              <ProductCard product={product} discount={discount} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
