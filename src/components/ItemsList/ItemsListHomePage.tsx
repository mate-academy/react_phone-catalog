import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { ItemsProduct } from '../ItemsProduct';
import styles from './ItemsList.module.scss';

export const ItemsList = () => {
  const products = useAppSelector(state => state.products.items);
  const newestProducts = products.filter(product => product.year === 2022);
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
    if (currentIndex + itemsPerPage < newestProducts.length) {
      setCurrentIndex(prevIndex => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(prevIndex => prevIndex - itemsPerPage);
    }
  };

  const currentItems = newestProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <>
      <div className={styles.newModels_title}>
        <h2>Brand new models</h2>
        <div className={styles.newModels_title__buttons}>
          <button onClick={handlePrev} disabled={currentIndex === 0}>
            <img
              src={
                currentIndex === 0
                  ? 'img/icons/Chevron-left-dis.svg'
                  : 'img/icons/Chevron-left.svg'
              }
              alt="left"
            />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= newestProducts.length}
          >
            <img
              src={
                currentIndex + itemsPerPage >= newestProducts.length
                  ? 'img/icons/Chevron-right-dis.svg'
                  : 'img/icons/Chevron-right.svg'
              }
              alt="right"
            />
          </button>
        </div>
      </div>

      <div className={styles.itemsList}>
        {currentItems.map(product => (
          <ItemsProduct product={product} discount={false} key={product.id} />
        ))}
      </div>
    </>
  );
};
