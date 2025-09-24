/* eslint-disable max-len */
import React, { useContext, useMemo } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { ProductsContext } from '../../ProductsProvider';
import { useParams } from 'react-router-dom';
import { Loader } from './';
import { Breadcrumbs } from '../Breadcrumbs';
import { ProductCard } from './ProductCard';
import { BackButton } from './BackButton';
import { NotFoundProduct } from '../NotFoundProduct';
import { LikeSlider } from './LikeSlider';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { phones, tablets, accessories, isLoading, errorMessage } = useContext(ProductsContext);

  const gadget = useMemo(() => {
    return (
      phones.find(currentPhone => currentPhone.id === productId) ||
      tablets.find(currentTablet => currentTablet.id === productId) ||
      accessories.find(currentAccessory => currentAccessory.id === productId)
    );
  }, [phones, tablets, accessories, productId]);

  const handleReload = () => {
    window.location.reload();
  };

  if (!gadget) {
    return <NotFoundProduct />;
  }

  return (
    <div className={styles.container}>
      {gadget && (
        <div className={styles.breadcrumbs}>
          <Breadcrumbs categoryTitle={gadget.category} gadgetTitle={gadget.name} />
        </div>
      )}

      {gadget && (
        <div className={styles.back}>
          <BackButton />
        </div>
      )}

      {isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {errorMessage && (
        <div className={styles.errorcontent}>
          <h2 className={styles.error}>Something went wrong</h2>
          <button className={styles.reload} onClick={handleReload}>
            Reload
          </button>
        </div>
      )}

      {!errorMessage && !isLoading && gadget && (
        <div className={styles.productcard}>
          <ProductCard key={gadget.id} gadget={gadget} />
          <LikeSlider />
        </div>
      )}
    </div>
  );
};
