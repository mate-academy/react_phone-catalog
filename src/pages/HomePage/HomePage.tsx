import styles from './HomePage.module.scss';
import products from '../../../public/api/products.json';
import phones from '../../../public/api/phones.json';
import tablets from '../../../public/api/tablets.json';
import accessories from '../../../public/api/accessories.json';

import { useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

import { ProductCard } from '../../components/ProductCard';
import { PictureSlider } from '../../components/PictureSlider/PictureSlider';

const newProducts = [...products].sort((a, b) => b.year - a.year);
const hotPrices = [...products].sort(
  (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
);

export const HomePage = () => {
  const [isNewStart, setIsNewStart] = useState(true);
  const [isNewEnd, setIsNewEnd] = useState(false);

  const [isHotStart, setIsHotStart] = useState(true);
  const [isHotEnd, setIsHotEnd] = useState(false);

  const newProductsRef = useRef<HTMLDivElement>(null);
  const hotProductsRef = useRef<HTMLDivElement>(null);

  const newCheckScroll = () => {
    if (!newProductsRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = newProductsRef.current;

    setIsNewStart(scrollLeft === 0);
    setIsNewEnd(scrollLeft + clientWidth >= scrollWidth);
  };

  const newScrollLeft = () => {
    newProductsRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const newScrollRight = () => {
    newProductsRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    newCheckScroll();
  }, []);

  const hotCheckScroll = () => {
    if (!hotProductsRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = hotProductsRef.current;

    setIsHotStart(scrollLeft === 0);
    setIsHotEnd(scrollLeft + clientWidth >= scrollWidth);
  };

  const hotScrollLeft = () => {
    hotProductsRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const hotScrollRight = () => {
    hotProductsRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    hotCheckScroll();
  }, []);

  return (
    <>
      <Header />
      <h1 className={styles.visuallyHidden}>Product Catalog</h1>

      <main className={styles.main}>
        <h2 className={styles.title}>Welcome to Nice Gadgets store!</h2>
        <div className={styles.main__content}>
          <section className={styles.news}>
            <PictureSlider />
          </section>
          <div className={styles.conteiner}>
            <section className={styles['new-models']}>
              <div className={styles['new-models__header']}>
                <h2 className={styles['new-models__section-title']}>
                  Brand new models
                </h2>
                <div className={styles['new-models__buttons']}>
                  <button
                    onClick={newScrollLeft}
                    className={styles['new-models__button']}
                    disabled={isNewStart}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={styles['new-models__icon']}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={newScrollRight}
                    disabled={isNewEnd}
                    className={styles['new-models__button']}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={styles['new-models__icon']}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                ref={newProductsRef}
                onScroll={newCheckScroll}
                className={styles['new-models__products']}
              >
                {newProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={{ ...product, fullPrice: product.price }}
                  />
                ))}
              </div>
            </section>

            <section className={styles.category}>
              <h2 className={styles['section-title']}>Shop by category</h2>

              <div className={styles['category-items']}>
                <div className={styles['category-item']}>
                  <Link to="/phones">
                    <img
                      src="img/phones.png"
                      alt="Phones category"
                      className={styles['category-item__photo']}
                    />
                  </Link>

                  <div className={styles['category-item__info']}>
                    <p className={styles['category-item__info--name']}>
                      Mobile phones
                    </p>
                    <p className={styles['category-item__info--amount']}>
                      {phones.length} models
                    </p>
                  </div>
                </div>

                <div className={styles['category-item']}>
                  <Link to="/tablets">
                    <img
                      src="img/tablets.png"
                      alt="Tablets category"
                      className={styles['category-item__photo']}
                    />
                  </Link>

                  <div className={styles['category-item__info']}>
                    <p className={styles['category-item__info--name']}>
                      Tablets
                    </p>
                    <p className={styles['category-item__info--amount']}>
                      {tablets.length} models
                    </p>
                  </div>
                </div>

                <div className={styles['category-item']}>
                  <Link to="/accessories">
                    <img
                      src="img/accessories.png"
                      alt="Accessories category"
                      className={styles['category-item__photo']}
                    />
                  </Link>

                  <div className={styles['category-item__info']}>
                    <p className={styles['category-item__info--name']}>
                      Accessories
                    </p>
                    <p className={styles['category-item__info--amount']}>
                      {accessories.length} models
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles['hot-prices']}>
              <div className={styles['hot-prices__header']}>
                <h2 className={styles['section-title']}>Hot prices</h2>
                <div className={styles['hot-prices__buttons']}>
                  <button
                    onClick={hotScrollLeft}
                    disabled={isHotStart}
                    className={styles['hot-prices__button']}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={styles['hot-prices__icon']}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={hotScrollRight}
                    disabled={isHotEnd}
                    className={styles['hot-prices__button']}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className={styles['hot-prices__icon']}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                ref={hotProductsRef}
                onScroll={hotCheckScroll}
                className={styles['hot-prices__products']}
              >
                {hotPrices.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};
