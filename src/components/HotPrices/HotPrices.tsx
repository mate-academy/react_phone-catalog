import { useContext, useState } from 'react';
import styles from './HotPrices.module.scss';
import { StateContext } from '../../Store';
import { PhoneCard } from '../PhoneCard';
import { useWindowWidth } from '@react-hook/window-size';

export const HotPrices = () => {
  const state = useContext(StateContext);
  const { products } = state;
  const [curretIndex, setCurrentIndex] = useState(0);
  const screenWidth = useWindowWidth();

  // const isMobile = screenWidth >= 320 && screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1200;
  const isDesctop = screenWidth >= 1200;

  const phones = products
    .filter(product => product.category === 'phones')
    .filter(
      phone =>
        phone.year < 2021 && phone.capacity === '128GB' && phone.price < 1200,
    );

  const handleNextPhone = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === phones.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const handlePrevPhone = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

  let imgWidth = 226;

  if (isTablet) {
    imgWidth = 251;
  }

  if (isDesctop) {
    imgWidth = 286;
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBrand}>
        <h2 className={styles.title}>Hot prices</h2>
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
          className={styles.sliderContent}
          style={{ left: `-${imgWidth * curretIndex}px` }}
        >
          {phones.map(product => (
            <PhoneCard
              key={product.id}
              img={product.image}
              name={product.name}
              price={product.price}
              secondPrice={product.fullPrice}
              screen={product.screen}
              capacity={product.capacity}
              ram={product.ram}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
