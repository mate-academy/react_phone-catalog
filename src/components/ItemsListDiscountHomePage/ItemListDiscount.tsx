import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import styles from './DiscountItemList.module.scss';
import { ItemsProduct } from '../ItemsProduct';

export const DiscountItemList = () => {
  const products = useAppSelector(state => state.products.items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 640) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(4);
      }
    };

    // Update items per page on component mount and window resize
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(prevIndex => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(prevIndex => prevIndex - itemsPerPage);
    }
  };

  const currentItems = products.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <>
      <div className={styles.newModels_title}>
        <h2>Hot prices</h2>
        <div className={styles.newModels_title__buttons}>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <img
              src={
                currentIndex === 0
                  ? '../../img/icons/Chevron-left-dis.svg'
                  : '../../img/icons/Chevron-left.svg'
              }
              alt="left"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            <img
              src={
                currentIndex + itemsPerPage >= products.length
                  ? '../../img/icons/Chevron-right-dis.svg'
                  : '../../img/icons/Chevron-right.svg'
              }
              alt="right"
            />
          </button>
        </div>
      </div>

      <div className={styles.itemsList}>
        {currentItems.map(product => (
          <ItemsProduct product={product} discount={true} key={product.id} />
        ))}
      </div>
    </>
  );
};
