/* eslint-disable no-console */

import styles from './HomePage.module.scss';
import { PicturesSlider } from 'components/PicturesSlider';
import { CustomSection } from 'components/CustomSection';
import { CategoriesSection } from './components/CategoriesSection';
import { useCallback, useContext, useEffect, useState } from 'react';
import { ProductsContext } from 'store/ProductsContext';
import { getBanners, getProducts } from 'datasources/productsDatasource';
import { AppSpinner } from 'components/AppSpinner';
import { shuffleArray } from 'utils/shuffleArray';
import { Product } from 'types/Product';
import { Banner } from 'types/Banner';

export const HomePage = () => {
  const { setProducts, setFilteredProducts, products } =
    useContext(ProductsContext);

  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);

  const handleGetProducts = useCallback(async () => {
    try {
      const data = await getProducts();

      setProducts(data);
      setFilteredProducts([...data]);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }, [setProducts, setFilteredProducts]);

  const handleGetBanners = async () => {
    try {
      const data = await getBanners();

      setBanners(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleInitialLoad = useCallback(async () => {
    setIsLoading(true);

    try {
      await Promise.all([handleGetProducts(), handleGetBanners()]);
    } catch (error) {
      console.error('Initial load error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [handleGetProducts]);

  useEffect(() => {
    handleInitialLoad();
  }, [handleInitialLoad]);

  if (isLoading || !Array.isArray(products)) {
    return <AppSpinner fullScreen={true} />;
  }

  const productsShuffed = shuffleArray<Product>(products!);
  const productsShuddedSection = shuffleArray<Product>(products!);

  return (
    <div className={styles.container}>
      <div className={styles.container__intro}>
        <h1>Welcome to Nice Gadgets store!</h1>
        <PicturesSlider banners={banners} />
      </div>
      <CustomSection title={'Brand new models'} products={productsShuffed} />
      <CategoriesSection />
      <CustomSection title={'Hot prices'} products={productsShuddedSection} />
    </div>
  );
};
