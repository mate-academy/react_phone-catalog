import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { Loader } from './components/Loader';
import { BackButton } from '@components/BackButton';
import { SuggestedProducts } from './components/SuggestedProducts';

import { About } from './components/About';
import { Error } from '@components/Error/Error';
import { MainInfo } from './components/MainInfo';
import { TechSpecs } from './components/TechSpecs';
import { PicturesSlider } from './components/PicturesSlider';

import { ProductDetails } from '@sTypes/ProductDetails';
import { ProductCategory } from '@sTypes/ProductCategory';
import { useDetailsPreload } from '@hooks/useDetailsPreload';
import { useLoweredLocation } from '@hooks/useLoweredLocation';

import styles from './ProductDetailsPage.module.scss';

function getSpecs(product: ProductDetails | undefined): [string, string][] {
  if (!product) {
    return [];
  }

  return [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
    ['Built in memory', product.capacity],
    ['Camera', product.camera],
    ['Zoom', product.zoom],
    ['Cell', product.cell.join(', ')],
  ];
}

export const ProductDetailsPage = () => {
  const { pathname } = useLoweredLocation();
  const [category, productId] = pathname.split('/').slice(-2) as [
    ProductCategory,
    string,
  ];

  const { productsDetails, isLoaded, isLoading, error, reload } =
    useDetailsPreload(category);

  const details = useMemo(() => {
    return productsDetails.find(
      productDetails => productDetails.id === productId,
    );
  }, [productId, productsDetails]);

  const specs = useMemo(() => getSpecs(details), [details]);

  if (isLoaded && !details) {
    return (
      <Navigate to="/404" state={{ page: 'ProductDetailsPage' }} replace />
    );
  }

  return (
    <div className={styles['product-details-page']}>
      <BackButton />

      {isLoading && <Loader />}
      {error && <Error error={error} reload={reload} />}

      {isLoaded && details && (
        <main className={styles['product-details-page__content']}>
          <h2>{details.name}</h2>

          <div className={styles['product-details-page__grid']}>
            <PicturesSlider
              className={styles['product-details-page__pictures-slider']}
              pictures={details.images}
            />

            <MainInfo
              className={styles['product-details-page__main-info']}
              details={details}
              category={category}
            />

            <About
              className={styles['product-details-page__about']}
              description={details.description}
            />

            <TechSpecs
              className={styles['product-details-page__tech-specs']}
              specs={specs}
            />

            <SuggestedProducts
              key={productId}
              className={styles['product-details-page__suggested-products']}
            />
          </div>
        </main>
      )}
    </div>
  );
};
