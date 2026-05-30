import React, { useEffect, useState } from 'react';
import { BannerSlider } from '../../components/BannerSlider';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ShopByCategory } from '../../components/ShopByCategory';
import { Loader } from '../../components/Loader';
import { NotFound } from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import { getProducts } from '../../utils/Api';
import { getSliderProducts } from '../../components/ProductsSlider/Sliders';
import { Product } from '../../types/Product';
import styles from './HomePage.module.scss';
import errorImage from './images/error.png';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const products = await getProducts();

        setAllProducts(products);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const hotPricesProducts = getSliderProducts(allProducts, 'hotPrices');
  const brandNewProducts = getSliderProducts(allProducts, 'brandNew');

  const handleReload = () => {
    window.location.reload();
  };

  if (hasError && allProducts.length === 0) {
    return (
      <div className={styles.homePage}>
        {/* Welcome title - always show */}
        <section className={styles.welcome}>
          <h1 className={styles.welcomeTitle}>{t('home.welcomeTitle')}</h1>
        </section>

        {/* Banner Slider - still works without API */}
        <BannerSlider autoPlayInterval={5000} />

        {/* Shop by Category - still works without API */}
        <ShopByCategory />

        {/* Error state for products */}
        <div className={styles.errorContainer}>
          <NotFound variant="error" title={t('somethingWentWrong')} message={t('pleaseTryAgain')} image={errorImage} buttonText={t('reload')} onButtonClick={handleReload} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      {/* Welcome title */}
      <section className={styles.welcome}>
        <h1 className={styles.welcomeTitle}>{t('home.welcomeTitle')}</h1>
      </section>

      {/* Banner Slider */}
      <BannerSlider autoPlayInterval={5000} />

      {/* Brand New Models */}
      {isLoading ? (
        <div className={styles.sliderLoading}>
          <Loader />
        </div>
      ) : (
        <ProductsSlider products={brandNewProducts} titleKey="brandNewModels" showDiscount={false} />
      )}

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Hot Prices */}
      {isLoading ? (
        <div className={styles.sliderLoading}>
          <Loader />
        </div>
      ) : (
        <ProductsSlider products={hotPricesProducts} titleKey="hotPrices" showDiscount={true} />
      )}
    </div>
  );
};
