import styles from './ProductCard.module.scss';
import { Product } from '../../types/ProductTypes';
import React, { useEffect, useState } from 'react';
import back from '../../assets/icons/arrowLeft.svg';
import backActive from '../../assets/icons/arrowLeftL.svg';
import goto from '../../assets/icons/arrowRight.svg';
import gotoActive from '../../assets/icons/arrowRightL.svg';
import { useSwipeable } from 'react-swipeable';
import { ProductItem } from '../ProductItem/ProductItem';

interface Props {
  title: string;
  products: Product[];
  AdditionalPrice?: boolean;
}

export const ProductSlider: React.FC<Props> = ({
  title,
  products,
  AdditionalPrice = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const updateItemsPerPage = () => {
    if (window.innerWidth <= 480) {
      setItemsPerPage(2);
    } else if (window.innerWidth <= 768) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.addEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 < products.length - (itemsPerPage - 1)) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <div className={styles.product} {...handlers}>
      <div className={styles.product__titleButton}>
        {/*sometext*/}
        <h2 className={styles.category__title}>{title}</h2>
        <div className={styles.button}>
          <button
            className={styles.prevBtn}
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            <img src={currentIndex === 0 ? back : backActive} alt="previous" />
          </button>
          <button
            className={styles.nextBtn}
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            <img
              src={
                currentIndex + itemsPerPage >= products.length
                  ? goto
                  : gotoActive
              }
              alt="previous"
            />
          </button>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.product__cards}>
          {products
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map(product => (
              <ProductItem
                key={product.id}
                product={product}
                AdditionalPrice={AdditionalPrice}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
