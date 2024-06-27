import styles from './Carousel.module.scss';
import { StateContext } from '../../Store';
import { useWindowWidth } from '@react-hook/window-size';
import { ProductCard } from '../ProductCard';
import { useContext, useState } from 'react';

export const Carousel = (params: { category: string }) => {
  const { category } = params;
  const state = useContext(StateContext);
  const { products } = state;
  const [curretIndex, setCurrentIndex] = useState(0);
  const screenWidth = useWindowWidth();

  const isTablet = screenWidth >= 640 && screenWidth < 1200;
  const isDesctop = screenWidth >= 1200;

  const selectedProducts = [...products];

  if (category === 'phones') {
    selectedProducts.filter(item => item.category === 'phones');
  }

  if (category === 'tablets') {
    selectedProducts.filter(item => item.category === 'tablets');
  }

  if (category === 'accessories') {
    selectedProducts.filter(item => item.category === 'accessories');
  }

  // const phones = products
  //   .filter(product => product.category === 'phones')
  //   .filter(phone => phone.year > 2021 && phone.capacity === '128GB');

  const handleNextPhone = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === selectedProducts.length - 1 ? prevIndex : prevIndex + 1,
    );
  };

  const handlePrevPhone = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? prevIndex : prevIndex - 1));
  };

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
        <h2 className={styles.title}>You may also like</h2>
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
          {curretIndex === selectedProducts.length - 1 ? (
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
          {selectedProducts.map(product => (
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
