import { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';
import { BackBtn } from '../BackBtn';
import { ProductGallery } from '../ProductGallery/ProductGallery';
import { useProductDetails } from '../../hooks/useProductDetails';
import { ProductSpecs } from '../ProductSpecs/ProductSpecs';
import { ProductDescription } from '../ProductDescription/ProductDescription';
import { ProductList } from '../ProductList';
import { useRandomProducts } from '../../hooks/useRandomProducts';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import { Loader } from '../Loader';
import { NotFoundProduct } from '../NotFoundProduct';

export const ProductPage = () => {
  const { itemId } = useParams();
  const location = useLocation();

  const pathSegments = location.pathname.split('/');
  const category = location.state?.category || pathSegments[1];

  const { product, loading, error } = useProductDetails(itemId, category);
  const recommendedProducts = useRandomProducts(10);

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (loading && isFirstLoad) {
      setShowLoader(true);
    }

    if (!loading && product && isFirstLoad) {
      timer = setTimeout(() => {
        setIsFirstLoad(false);
        setShowLoader(false);
      }, 300);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [loading, product, isFirstLoad]);

  if (showLoader) {
    return (
      <div className={styles.productPage__loader}>
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return <NotFoundProduct />;
  }

  return (
    <div className={styles.productPage}>
      <Breadcrumbs />
      <BackBtn />
      <h2 className={styles.productPage__title}>{product.name}</h2>
      <div className={styles.productPage__gallery}>
        <ProductGallery images={product.images} />
        <ProductSpecs product={product} />
      </div>
      <div className={styles.productPage__description}>
        <ProductDescription description={product.description} />
        <TechSpecs product={product} />
      </div>
      <ProductList title="You may also like" products={recommendedProducts} />
    </div>
  );
};
