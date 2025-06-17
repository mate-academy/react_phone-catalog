import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumb } from '../../components/Breadcrumb';
import { BackButton } from '../../components/BackButton';
// import { useProduct } from '../../hooks/useProduct';
import { useVariantsByNamespace } from '../../hooks/useVariantsByNamespace';
import { ProductDetailsAside } from './components/ProductAddInfo/ProductDetailsAside';
import { usePhoneDetails } from '../../hooks/usePhoneDetails';

export const ProductDetailsPage: React.FC = () => {
  // const { productId } = useParams();
  const { productId, category } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { phoneDetails } = usePhoneDetails(productId);
  const { variants } = useVariantsByNamespace(phoneDetails?.namespaceId);

  if (!phoneDetails) {
    return null;
  }

  const images = Array.isArray(phoneDetails.images)
    ? phoneDetails.images.map((img: string) => `/react_phone-catalog/${img}`)
    : [];

  return (
    <div className={styles.detailsPage}>
      <div className={styles.breadcrumbRow}>
        <Breadcrumb current="" />
        <Link to="/phones" className={styles.breadcrumbLink}>
          Phones
        </Link>
        <img
          src="/react_phone-catalog/img/icons/arrow-right.svg"
          alt="Arrow"
          className={styles.breadcrumbArrow}
        />
        <span className={styles.breadcrumbCurrent}>{phoneDetails.name}</span>
      </div>
      <BackButton />

      <h1 className={styles.title}>{phoneDetails.name}</h1>

      <div className={styles.content}>
        <div className={styles.gallery}>
          <div className={styles.imageWrapper}>
            <img
              src={images[selectedImageIndex]}
              alt={phoneDetails.namespaceId}
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

        <ProductDetailsAside product={phoneDetails} variants={variants} />
      </div>
    </div>
  );
};
