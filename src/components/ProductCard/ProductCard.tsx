import styles from './ProductCard.module.scss';
import { Product } from '../../types/ProductTypes';
import React, { useContext, useEffect, useState } from 'react';
import back from '../../assets/icons/arrowLeft.svg';
import backD from '../../assets/icons/arrowLeftLightD.svg';
import backActive from '../../assets/icons/arrowLeftL.svg';
import backActiveLight from '../../assets/icons/arrowLeftLight.svg';
import goto from '../../assets/icons/arrowRight.svg';
import gotoD from '../../assets/icons/arrowRightLightD.svg';
import gotoActive from '../../assets/icons/arrowRightL.svg';
import gotoActiveLight from '../../assets/icons/arrowRightLight.svg';
import { useSwipeable } from 'react-swipeable';
import { ProductItem } from '../ProductItem/ProductItem';
import { ThemeContext } from '../Themes';

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

  const { theme } = useContext(ThemeContext);
  const isBasicDark = theme === 'dark';

  const getBackIcon = (isDark: boolean, isDisabled: boolean) => {
    if (isDark) {
      return isDisabled ? back : backActive;
    }

    return isDisabled ? backD : backActiveLight;
  };

  const getNextIcon = (isDark: boolean, isDisabled: boolean) => {
    if (isDark) {
      return isDisabled ? goto : gotoActive;
    }

    return isDisabled ? gotoD : gotoActiveLight;
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
            <img
              src={getBackIcon(isBasicDark, currentIndex === 0)}
              alt="previous"
            />
          </button>
          <button
            className={styles.nextBtn}
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= products.length}
          >
            <img
              src={getNextIcon(
                isBasicDark,
                currentIndex + itemsPerPage >= products.length,
              )}
              alt="next"
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
