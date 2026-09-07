import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BackButton } from '../../components/BackButton';
import { ProductDescription } from './components/ProductDescription/ProductDescription';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProductDetails } from '../../hooks/useProductDetails';
import { useErrorHandling } from '../../hooks/errorHandling';
import { useProducts } from '../../hooks/useProducts';
import { Loader } from '../../components/Loader/Loader';
import { useTheme } from '../../hooks/useTheme';
import { ProductMainBlock } from './components/ProductMainBlock';
import { mapDetailsToProduct } from '../../types/ProductFromDetails';
import { Product } from '../../types/Product';

export const capitalize = (str?: string) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

export const ProductDetailsPage: React.FC = () => {
  const { theme } = useTheme();
  const { productId, category } = useParams();
  const { productDetails, isLoading } = useProductDetails(productId, category);
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails) {
    return <div className={styles.errorMessage}>Product not found</div>;
  }

  const productForCart: Product = mapDetailsToProduct(productDetails);

  const capCategory = capitalize(category);
  const recommended = [...products]
    .filter(p => p.category === category && p.id !== Number(productDetails.id))
    .slice(0, 10)
    .map(p => ({
      ...p,
      image: `/react_phone-catalog/${p.image}`,
    }));

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        <div className={styles.breadcrumbRow}>
          <Breadcrumb current="" />
          <Link to={`/${category}`} className={styles.breadcrumbLink}>
            {capCategory}
          </Link>
          <img
            src={`/react_phone-catalog/img/icons/arrow-right-${theme}.svg`}
            alt="Arrow"
          />
          <span className={styles.breadcrumbCurrent}>
            {productDetails.name}
          </span>
        </div>

        <BackButton />
        <h1 className={styles.title}>{productDetails.name}</h1>

        <ProductMainBlock
          productDetails={productDetails}
          productForCart={productForCart}
        />

        <ProductDescription
          description={productDetails.description}
          specs={{
            screen: productDetails.screen,
            resolution: productDetails.resolution,
            processor: productDetails.processor,
            ram: productDetails.ram,
            camera: productDetails.camera,
            zoom: productDetails.zoom,
            cell: productDetails.cell,
          }}
        />

        <ProductsSlider
          products={recommended}
          title="You may also like"
          navigationPrevClass="hot-prices-prev"
          navigationNextClass="hot-prices-next"
          showFullPrice={true}
        />
      </div>
    </div>
  );
};
