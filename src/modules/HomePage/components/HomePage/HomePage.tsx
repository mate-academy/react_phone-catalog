import { useEffect, useState } from 'react';
import styles from './HomePage.module.scss';
import { Link } from 'react-router-dom';
import { getCategoryProductCount } from '../../../../utils/product';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';
import { Loader } from '../../../shared/components/Loader/Loader';
import { useProductsContext } from '../../../../hook/useProductsContext';

const BANNERS = [
  './img/banner-phones.jpg',
  './img/banner-tablets.jpg',
  './img/banner-accessories.jpg',
];

export const HomePage = () => {
  const { isLoading, products } = useProductsContext();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const startProducts = [...products].sort((product1, product2) => {
    return product2.year - product1.year;
  });

  const startHotProducts = [...products]
    .filter(product => {
      return product.price < product.fullPrice;
    })
    .sort((product1, product2) => {
      return (
        product2.fullPrice -
        product2.price -
        (product1.fullPrice - product1.price)
      );
    });

  const countPhones = getCategoryProductCount(products, 'phones');
  const countTablets = getCategoryProductCount(products, 'tablets');
  const countAccessories = getCategoryProductCount(products, 'accessories');

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setCurrentIndex(prev => (prev === BANNERS.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(intervalId);
  }, [currentIndex]);

  return isLoading ? (
    <Loader />
  ) : (
    <main className={`${styles.main} container`}>
      <h1 className={styles.hidden}>Product Catalog</h1>

      <h2 className={styles.main__title}>Welcome to Nice Gadgets store!</h2>
      <div className={styles.main__slider}>
        <button
          className={styles['main__slider-btn']}
          onClick={() => {
            setCurrentIndex(prev => {
              if (prev <= 0) {
                return BANNERS.length - 1;
              }

              return prev - 1;
            });
          }}
        >
          <img
            src="./img/arrLeft.png"
            alt="Previous slide"
            className={styles['main__slider-btn-icon']}
          />
        </button>

        <div className={styles['main__slider-container']}>
          <div
            className={styles['main__slider-track']}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {BANNERS.map((banner, index) => {
              return (
                <img
                  key={index}
                  src={banner}
                  alt=""
                  className={styles['main__slider-img']}
                />
              );
            })}
          </div>
        </div>

        <button
          className={styles['main__slider-btn']}
          onClick={() => {
            setCurrentIndex(prev => {
              if (prev === BANNERS.length - 1) {
                return 0;
              }

              return prev + 1;
            });
          }}
        >
          <img
            src="./img/arrRight.png"
            alt="Next slide"
            className={styles['main__slider-btn-icon']}
          />
        </button>
      </div>

      <div className={styles.main__dots}>
        {BANNERS.map((_, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${styles.main__dot} ${currentIndex === index ? styles['main__dot--active'] : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>

      <ProductsSlider products={startProducts} title={'Brand new models'} />

      <div className={styles.main__categories}>
        <h2 className={styles['main__categories-title']}>Shop by category</h2>

        <div className={styles.categories}>
          <div className={styles.categories__card}>
            <Link to="/phones" className={styles['categories__card-link']}>
              <div
                className={`${styles['categories__card-image']} ${styles['categories__card-image-phones']}`}
              >
                <img
                  src="./img/category-phones.png"
                  alt=""
                  className={styles['categories__card-img']}
                />
              </div>

              <div className={styles.categories__info}>
                <p className={styles.categories__subtitle}>Mobile phones</p>

                <p
                  className={styles.categories__count}
                >{`${countPhones} models`}</p>
              </div>
            </Link>
          </div>

          <div className={styles.categories__card}>
            <Link to="/tablets" className={styles['categories__card-link']}>
              <div
                className={`${styles['categories__card-image']} ${styles['categories__card-image-tablets']}`}
              >
                <img
                  src="./img/category-tablets.png"
                  alt=""
                  className={styles['categories__card-img']}
                />
              </div>

              <div className={styles.categories__info}>
                <p className={styles.categories__subtitle}>Tablets</p>

                <p
                  className={styles.categories__count}
                >{`${countTablets} models`}</p>
              </div>
            </Link>
          </div>

          <div className={styles.categories__card}>
            <Link to="/accessories" className={styles['categories__card-link']}>
              <div
                className={`${styles['categories__card-image']} ${styles['categories__card-image-accessories']}`}
              >
                <img
                  src="./img/category-accessories.png"
                  alt=""
                  className={styles['categories__card-img']}
                />
              </div>

              <div className={styles.categories__info}>
                <p className={styles.categories__subtitle}>Accessories</p>

                <p
                  className={styles.categories__count}
                >{`${countAccessories} models`}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <ProductsSlider
        products={startHotProducts}
        title={'Hot prices'}
        showFullPrice={true}
      />
    </main>
  );
};
