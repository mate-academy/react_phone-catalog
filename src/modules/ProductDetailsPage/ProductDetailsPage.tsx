import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BackButton } from '../../components/BackButton';
import { useVariantsByNamespace } from '../../hooks/useVariantsByNamespace';
import { ProductDetailsAside } from './components/ProductAddInfo/ProductDetailsAside';
import { useProductDetails } from '../../hooks/useProductDetails';
import { ProductDescription } from './components/ProductDescription/ProductDescription';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useErrorHandling } from '../../hooks/errorHandling';
import { useProducts } from '../../hooks/useProducts';

export const ProductDetailsPage: React.FC = () => {
  const { productId, category } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { productDetails } = useProductDetails(productId);
  const { variants } = useVariantsByNamespace(productDetails?.namespaceId);
  const { setIsError } = useErrorHandling();
  const { products } = useProducts(() => setIsError(true));

  if (!productDetails) {
    return null;
  }

  const images = Array.isArray(productDetails.images)
    ? productDetails.images.map((img: string) => `/react_phone-catalog/${img}`)
    : [];

  const capCategory = category?.charAt(0).toUpperCase() + category?.slice(1);
  const recommended = [...products]
    .filter(p => p.category === category && p.id !== Number(productDetails.id))
    .slice(0, 10)
    .map(p => ({
      ...p,
      image: `/react_phone-catalog/${p.image}`,
    }));

  return (
    <div className={styles.detailsPage}>
      <div className={styles.breadcrumbRow}>
        <Breadcrumb current="" />
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {capCategory}
        </Link>
        <img
          src="/react_phone-catalog/img/icons/arrow-right.svg"
          alt="Arrow"
          className={styles.breadcrumbArrow}
        />
        <span className={styles.breadcrumbCurrent}>{productDetails.name}</span>
      </div>

      <BackButton />
      <h1 className={styles.title}>{productDetails.name}</h1>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.imageWrapper}>
            <img
              src={images[selectedImageIndex]}
              alt={productDetails.namespaceId}
              className={styles.mainImage}
            />
          </div>

          <div className={styles.previewList}>
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={classNames(styles.previewButton, {
                  [styles.active]: index === selectedImageIndex,
                })}
              >
                <img
                  src={img}
                  alt={`preview-${index}`}
                  className={styles.previewImage}
                />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.infoBlock}>
          <ProductDetailsAside product={productDetails} variants={variants} />
        </div>
      </div>

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
  );
};
