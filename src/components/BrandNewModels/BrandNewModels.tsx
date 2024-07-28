import { useContext, useEffect, useState } from 'react';
import styles from './BrandNewModels.module.scss';

import { StateContext } from '../../Store';
import { useWindowWidth } from '@react-hook/window-size';
import { ProductCard } from '../ProductCard';
import { useSwipeable } from 'react-swipeable';
import { Product } from '../../types/Product';

export const BrandNewModel = () => {
  const state = useContext(StateContext);
  const [phones, setPhones] = useState<Product[]>([]);
  const { products } = state;
  const [curretIndex, setCurrentIndex] = useState(0);
  const screenWidth = useWindowWidth();

  const handleNextPhone = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === phones.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const handlePrevPhone = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextPhone(),
    onSwipedRight: () => handlePrevPhone(),
  });

  useEffect(() => {
    const res = products
      .filter(product => product.category === 'phones')
      .filter(phone => phone.year > 2021 && phone.capacity === '128GB');

    setPhones(res);
  }, [products]);

  const isTablet = screenWidth >= 640 && screenWidth < 1200;
  const isDesctop = screenWidth >= 1200;

  let imgWidth = 226;

  if (isTablet) {
    imgWidth = 255;
  }

  if (isDesctop) {
    imgWidth = 286;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBrand}>
        <h2 className={styles.title}>Brand new models</h2>
        <div className={styles.titleButton}>
          {curretIndex === 0 ? (
            <button className={styles.buttonArrow} onClick={handlePrevPhone}>
              <img src="img/arrowLeftLight.svg" alt="Previous" />
            </button>
          ) : (
            <button
              className={styles.buttonArrowActive}
              onClick={handlePrevPhone}
            >
              <img src="img/ArrowLeft.svg" alt="Previous" />
            </button>
          )}
          {curretIndex === phones.length - 1 ? (
            <button className={styles.buttonArrow} onClick={handleNextPhone}>
              <img src="img/arrowRightLight.svg" alt="Next" />
            </button>
          ) : (
            <button
              className={styles.buttonArrowActive}
              onClick={handleNextPhone}
            >
              <img src="img/ArrowRight.svg" alt="Next" />
            </button>
          )}
        </div>
      </div>
      <div className={styles.sliderWrapper}>
        <div
          {...handlers}
          className={styles.sliderContent}
          style={{ left: `-${imgWidth * curretIndex}px` }}
        >
          {phones.map(product => (
            <ProductCard
              key={product.id}
              img={product.image}
              name={product.name}
              price={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
              secondPrice={product.price}
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
