import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { ProductCart } from '../../../../components/cardItem/ProductCart';
import styles from './ProductSlider.module.scss'
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import classNames from 'classnames';
type Props = {
  type: 'new' | 'hot'|'favourites';
};

export const ProductSlider = (props: Props) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  const { type } = props;

  const products = useAppSelector(state => state.products.products);

  const getBaseModelId = (itemId: string) => {
    if (!itemId) { return ''; }
    const parts = itemId.split('-');

    return parts.slice(0, -2).join('-');
  };


  const allSortedProducts = Array.from(
    new Map(
      (
        type === 'new'
        ? [...products].sort((a, b) => b.year - a.year)
          :[...products].sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price))
      ).map(product => [getBaseModelId(product.itemId), product])
    ).values()
  ).slice(0,16);





  const visibleProducts = allSortedProducts.slice(startIndex,startIndex + visibleCount)

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
    if (startIndex + visibleCount < allSortedProducts.length) {
      setStartIndex(index => index + visibleCount)
    }
  };

  const handlePrev = () => {
    if (startIndex-visibleCount>=0)
    setStartIndex(index=>index-visibleCount)
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slider__title}>
        {type ==='new'? <h2>Brand new
          models</h2>:<h2>Hot prices</h2>}

        <div className={styles.slider__navigate}>
          <IoIosArrowBack className={classNames(styles.slider__button,
          styles['slider__button--left']  ,{[styles['slider__button--disabled']]: startIndex===0,
          })}
          onClick={handlePrev}/>
          <IoIosArrowForward className={classNames(styles.slider__button,{[styles['slider__button--disabled']]:startIndex+visibleCount>=allSortedProducts.length})}
          onClick={handleNext}/>
        </div>
      </div>
      <div className={styles.slider__cardList}>
        <ProductCart products={visibleProducts} types={type} />
      </div>
    </div>)
}
