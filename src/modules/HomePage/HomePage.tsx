import { useEffect, useState, useRef, useMemo } from 'react';
import styles from './HomePage.module.scss';
import ProductsSlider from './components/ProductsSlider/index';
import PicturesSlider from './components/PicturesSlider/index';
import { Product } from './../../../public/api/types/Product';

export const HomePage: React.FC = () => {
  const THRESHOLD = 30;
  const [products, setProducts] = useState<Product[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState<boolean>(false);

  const url = 'api/products.json';

  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const startPictureX = useRef<number | null>(null);
  const startPictureY = useRef<number | null>(null);
  const startProductX = useRef<number | null>(null);
  const startProductY = useRef<number | null>(null);
  const sliderPictureRef = useRef<HTMLDivElement | null>(null);
  const sliderProductRef = useRef<HTMLDivElement | null>(null);
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
        () => setCurrentPictureIndex(i => (i + 1) % lenOfProducts),
        5000,
      );

      return () => clearInterval(id);
    }

    return;
  }, [lenOfProducts, paused]);

  useEffect(() => {
    setCurrentPictureIndex(0);
  }, [products?.length]);

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => controller.abort();
  }, []);

  const discount = p => Math.abs(+p.fullPrice - +p.price);

  const hotPrices = useMemo(() => {
    if (!products) {
      return [];
    }

    return products
      .slice()
      .sort((product1, product2) => discount(product2) - discount(product1));
  }, [products]);

  const lenOfHotPricesproducts = hotPrices?.length ?? 0;

  const wrapNext = (index: number, len: number) =>
    len ? (index + 1) % len : 0;

  const wrapPrev = (index: number, len: number) =>
    len ? (index === 0 ? len - 1 : index - 1) : 0;

  const handleNextPicture = () => {
    if (lenOfProducts === 0) {
      return;
    }

    setCurrentPictureIndex(i => wrapNext(i, lenOfProducts));
  };

  const handlePrevPicture = () => {
    if (lenOfProducts === 0) {
      return;
    }

    setCurrentPictureIndex(i => wrapPrev(i, lenOfProducts));
  };

  const handleTouchStartPicture = (
    e: React.TouchEvent<HTMLDivElement>,
  ): void => {
    startPictureX.current = e.touches[0].clientX;
    startPictureY.current = e.touches[0].clientY;
    setPaused(true);
  };

  const handleTouchEndPicture = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (startPictureX.current == null || startPictureY.current == null) {
      return;
    }

    const dx = endX - startPictureX.current;
    const dy = endY - startPictureY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > THRESHOLD) {
      if (dx < 0) {
        handlePrevPicture();
      } else {
        handleNextPicture();
      }
    }

    setPaused(false);
  };

  const handlePrevProduct = () => {
    if (lenOfHotPricesproducts === 0) {
      return;
    }

    if (currentProductIndex <= 0) {
      return;
    }

    setCurrentProductIndex(i => i - 1);
  };

  const handleNextProduct = () => {
    if (lenOfHotPricesproducts === 0) {
      return;
    }

    if (currentProductIndex >= lenOfHotPricesproducts - 1) {
      return;
    }

    setCurrentProductIndex(i => i + 1);
  };

  const handleTouchStartProduct = (
    e: React.TouchEvent<HTMLDivElement>,
  ): void => {
    startProductX.current = e.touches[0].clientX;
    startProductY.current = e.touches[0].clientY;

    setPaused(true);
  };

  const handleTouchEndProduct = (e: React.TouchEvent<HTMLDivElement>): void => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    if (startProductX.current == null || startProductY.current == null) {
      return;
    }

    const dx = endX - startProductX.current;
    const dy = endY - startProductY.current;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > THRESHOLD) {
      if (dx < 0) {
        handlePrevProduct();
      } else {
        handleNextProduct();
      }
    }

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
                currentIndex={currentPictureIndex}
                handlePrev={handlePrevPicture}
                handleNext={handleNextPicture}
                handleTouchStart={handleTouchStartPicture}
                handleTouchEnd={handleTouchEndPicture}
                sliderRef={sliderPictureRef}
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
      {!loading && !error && Array.isArray(products) && (
        <ProductsSlider
          products={hotPrices}
          currentIndex={currentProductIndex}
          handlePrev={handlePrevProduct}
          handleNext={handleNextProduct}
          handleTouchStart={handleTouchStartProduct}
          handleTouchEnd={handleTouchEndProduct}
          sliderRef={sliderProductRef}
        >
          Hot prices
        </ProductsSlider>
      )}
      <div className="product-catalog">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
