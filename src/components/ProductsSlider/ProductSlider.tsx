import { useEffect, useState } from 'react';


import styles from './ProductSlider.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import classNames from 'classnames';
import { ProductCart } from '../cardItem/ProductCart';



export const ProductSlider = ({sortedProducts, title}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);


  if (!sortedProducts) { return }

    const visibleProducts = sortedProducts.slice(startIndex, startIndex + visibleCount)



  useEffect(() => {
    const calculateVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 576) { return 2; }
      if (width < 1024) {return 3;
    }
    return 4;
  };

  const handleResize = () => {
    setVisibleCount(calculateVisibleCount());
  };

  handleResize();
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);

  const handleNext = () => {
    if (startIndex + visibleCount < sortedProducts.length) {
      setStartIndex(index => index + visibleCount)
    }
  };

  const handlePrev = () => {

    if (startIndex - visibleCount >= 0) {
      setStartIndex(index => index - visibleCount)
    }
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slider__title}>
        <h2 className={styles.slider__text}>{title }</h2>


        <div className={styles.slider__navigate}>
          <IoIosArrowBack className={classNames(styles.slider__button,
          styles['slider__button--left']  ,{[styles['slider__button--disabled']]: startIndex===0,
          })}
          onClick={handlePrev}/>
          <IoIosArrowForward className={classNames(styles.slider__button,{[styles['slider__button--disabled']]:startIndex+visibleCount>=sortedProducts.length})}
          onClick={handleNext}/>
        </div>
      </div>
      <div className={styles.slider__cardList}>
        <ProductCart products={visibleProducts}  />
      </div>
    </div>)
}
