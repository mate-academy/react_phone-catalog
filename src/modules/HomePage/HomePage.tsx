import { useEffect, useState, useRef } from 'react';
import styles from './HomePage.module.scss';
//import ProductsSlider from './components/ProductsSlider/index';
import PicturesSlider from './components/PicturesSlider/index';
import { Product } from './../../../public/api/types/Product';

export const HomePage: React.FC = () => {
  const THRESHOLD = 30;
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  const url = 'api/products.json';

  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const lenOfProducts = products?.length ?? 0;
  const loadProducts = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url, { signal });

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (err) {
      setError((err as Error)?.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lenOfProducts > 0 && !paused) {
      const id = setInterval(
        () => setCurrentIndex(i => (i + 1) % lenOfProducts),
        5000,
      );

      return () => clearInterval(id);
    }

    return;
  }, [lenOfProducts, paused]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [products?.length]);

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  const handleNext = () => {
    if (lenOfProducts > 0) {
      const newIndex =
        currentIndex === lenOfProducts - 1 ? 0 : currentIndex + 1;

      setCurrentIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (lenOfProducts > 0) {
      const newIndex =
        currentIndex === 0 ? lenOfProducts - 1 : currentIndex - 1;

      setCurrentIndex(newIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    setPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (startX.current == null || startY.current == null) {
      return;
    }

    const dx = endX - startX.current;
    const dy = endY - startY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > THRESHOLD) {
      if (dx < 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    //startX.current = null;
    // startY.current = null;
    setPaused(false);
  };

  return (
    <>
      <h1 className="visually-hidden">Product Catalog</h1>
      <div className={styles.homePage}>
        <div className={styles.homePage__content}>
          <div className={styles.homePage__bottom}>
            <div className={styles.homePage__up}>
              <h2 className={styles.homePage__title}>
                <span className={styles['homePage__title-welcome']}>
                  Welcome to Nice Gadgets store!
                </span>
              </h2>
            </div>

            {!loading && !error && Array.isArray(products) && (
              <PicturesSlider
                products={products}
                currentIndex={currentIndex}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handleTouchStart={handleTouchStart}
                handleTouchEnd={handleTouchEnd}
                sliderRef={sliderRef}
              />
            )}

            <div className={styles.homePage__dots}>
              <img
                src="img/dots-2x.png"
                alt="Dots Style"
                className={styles.homePage__dots}
              />
            </div>
          </div>
        </div>
      </div>
      <h3>Brand new models</h3>
      <div className="product-catalog">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
