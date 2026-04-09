import { useEffect, useState, useMemo, useCallback } from 'react';
import styles from './HomePage.module.scss';
import ProductsSlider from './components/ProductsSlider/index';
import PicturesSlider from './components/PicturesSlider/index';
import { Link } from 'react-router-dom';
import { productsCount } from '../../utils/products';
import { useProducts } from '../../hooks/useProducts';

const TYPES = {
  PHONE: 'phones',
  TABLET: 'tablets',
  ACCESSORY: 'accessories',
};

export const HomePage: React.FC = () => {
  const { products, loading, error } = useProducts();

  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentNewProductIndex, setCurrentNewProductIndex] = useState(0);

  const newestProducts = Array.isArray(products)
    ? [...products].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, 8)
    : [];
  const lenOfProducts = products?.length ?? 0;

  useEffect(() => {
    if (lenOfProducts > 0) {
      const id = setInterval(
        () => setCurrentPictureIndex(i => (i + 1) % lenOfProducts),
        5000,
      );

      return () => clearInterval(id);
    }

    return;
  }, [lenOfProducts]);

  useEffect(() => {
    if (!loading && !error) {
      setCurrentPictureIndex(0);
      setCurrentNewProductIndex(0);
      setCurrentProductIndex(0);
    }
  }, [products?.length, loading, error]);

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

  const handlePrevNewProduct = () => {
    setCurrentNewProductIndex(i => Math.max(0, i - 1));
  };

  const handleNextNewProduct = () => {
    setCurrentNewProductIndex(i =>
      Math.min(i + 1, Math.max(0, newestProducts.length - 1)),
    );
  };

  const getProductsCount = useCallback(
    (type: string): number => productsCount(products, type),
    [products],
  );

  return (
    <>
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
              />
            )}
          </div>
        </div>
      </div>
      <section
        id="brand-new-models"
        aria-label="Brand new models"
        className={styles.section}
      >
        {!loading && !error && Array.isArray(products) && (
          <ProductsSlider
            products={newestProducts}
            currentIndex={currentNewProductIndex}
            handlePrev={handlePrevNewProduct}
            handleNext={handleNextNewProduct}
            skipDiscount="true"
          >
            Brand new models
          </ProductsSlider>
        )}
      </section>

      <section
        id="shop-by-category"
        aria-label="Shop by category"
        className={styles.section}
      >
        <h3>Shop by category</h3>
        {!loading && !error && Array.isArray(products) && (
          <div className={styles.homePage__shopByCategory}>
            <Link to="/phones" className={`${styles.homePage__categoryCard}`}>
              <div
                className={`${styles.homePage__categoryImg} ${styles['homePage__categoryImg--phones']}`}
              ></div>
              <div className={styles.homePage__categoryTitle}>
                Mobile phones
              </div>
              <div className={styles.homePage__categoryTotal}>
                {getProductsCount(TYPES.PHONE)} models
              </div>
            </Link>
            <Link to="/tablets" className={styles.homePage__categoryCard}>
              <div
                className={`${styles.homePage__categoryImg} ${styles['homePage__categoryImg--tablets']}`}
              ></div>
              <div className={styles.homePage__categoryTitle}>Tablets</div>
              <div className={styles.homePage__categoryTotal}>
                {getProductsCount(TYPES.TABLET)} models
              </div>
            </Link>
            <Link to="/accessories" className={styles.homePage__categoryCard}>
              <div
                className={`${styles.homePage__categoryImg} ${styles['homePage__categoryImg--accessories']}`}
              ></div>
              <div className={styles.homePage__categoryTitle}>Accessories</div>
              <div className={styles.homePage__categoryTotal}>
                {getProductsCount(TYPES.ACCESSORY)} models
              </div>
            </Link>
          </div>
        )}
      </section>
      <section id="hot-prices" aria-label="Hot prices">
        {!loading && !error && Array.isArray(products) && (
          <ProductsSlider
            products={hotPrices}
            currentIndex={currentProductIndex}
            handlePrev={handlePrevProduct}
            handleNext={handleNextProduct}
          >
            Hot prices
          </ProductsSlider>
        )}
      </section>
      <div className="product-?errors">
        {loading && <div>Loading...</div>}
        {error && <div role="alert">Error: {error}</div>}
        {products && products.length === 0 && <div>No products found.</div>}
      </div>
    </>
  );
};
