import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader/Loader';
import {
  getProductDetailsById,
  getProductsByItemId,
  getSuggestedProducts,
} from '../../services/productsService';
import { Product, ProductDetails } from '../../types';
import { ProductButtons } from '../../shared/components/ProductButtons';
import { ProductsSlider } from '../../shared/components/ProductsSlider';

export const ProductDetailsPage: React.FC = () => {
  const { itemId } = useParams();

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const [genericProduct, setGenericProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    async function loadGeneric() {
      if (!itemId) {
        return;
      }

      const item = await getProductsByItemId(itemId);

      setGenericProduct(item);
    }

    loadGeneric();
  }, [itemId]);

  useEffect(() => {
    async function loadSuggested() {
      const items = await getSuggestedProducts(4);

      setSuggested(items);
    }

    loadSuggested();
  }, []);

  useEffect(() => {
    if (!itemId) {
      return;
    }

    async function loadData() {
      try {
        const result = await getProductDetailsById(itemId);

        setProductDetails(result);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [itemId]);

  useEffect(() => {
    if (productDetails) {
      setSelectedImg(productDetails.images[0]);
    }
  }, [productDetails]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productDetails) {
    return <h1 className={styles.message}>Product not found</h1>;
  }

  const specs = [
    { label: 'Screen', value: productDetails.screen },
    { label: 'Resolution', value: productDetails.resolution },
    { label: 'Processor', value: productDetails.processor },
    { label: 'RAM', value: productDetails.ram },
    { label: 'Camera', value: productDetails.camera },
    { label: 'Zoom', value: productDetails.zoom },
    { label: 'Cell', value: productDetails.cell.join(', ') },
  ];

  return (
    <div className="container">
      <div className={`grid-24 ${styles.page}`}>
        <h1 className={`col-24 ${styles.title}`}>{productDetails.name}</h1>

        <div className={styles.gallery}>
          {productDetails.images.map(img => (
            <img
              key={img}
              className={`${styles.galleryImage} ${selectedImg === img ? styles.activeThumb : ''}`}
              src={`/${img}`}
              alt={productDetails.name}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>

        <div className={styles.mainImageWrapper}>
          <img
            className={styles.mainImage}
            src={`/${selectedImg}`}
            alt={productDetails.name}
          />
        </div>

        <div className={styles.infoBlock}>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Available colors</p>

            <div className={styles.colors}>
              {productDetails.colorsAvailable.map(color => (
                <button
                  key={color}
                  className={`${styles.colorCircle} ${styles[color]}`}
                />
              ))}
            </div>
          </div>

          <hr className={styles.dividerAbout} />

          <div className={styles.section}>
            <p className={styles.sectionTitle}>Select capacity</p>

            <div className={styles.capacity}>
              {productDetails.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  className={`${styles.capacityBtn} ${selectedCapacity === cap ? styles.activeCapacity : ''}`}
                  onClick={() => setSelectedCapacity(cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <hr className={styles.dividerAbout} />

          <div className={styles.priceBlock}>
            <span className={styles.priceNew}>
              {productDetails.priceRegular}
            </span>
            <span className={styles.priceOld}>
              {productDetails.priceDiscount}
            </span>
          </div>

          {genericProduct && <ProductButtons product={genericProduct} />}

          <div className={styles.detailsShort}>
            {specs.slice(0, 4).map(s => (
              <div key={s.label} className={styles.detailRow}>
                <span className={styles.detailLabel}>{s.label}</span>
                <span className={styles.detailValue}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.aboutBlock}>
          <h2 className={styles.bottomTitle}>About</h2>

          <hr className={styles.dividerAbout} />

          {productDetails.description.map(section => (
            <div key={section.title}>
              <h3 className={styles.aboutSectionTitle}>{section.title}</h3>
              {section.text.map((paragraph, index) => (
                <p key={index} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecsBlock}>
          <h2 className={styles.bottomTitle}>Tech specs</h2>

          <hr className={styles.dividerTech} />

          {specs.map(spec => (
            <div key={spec.label} className={styles.techRow}>
              <span className={styles.techLabel}>{spec.label}</span>
              <span className={styles.techValue}>{spec.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.recommendedSection}>
          <ProductsSlider title="You may also like" products={suggested} />
        </div>
      </div>
    </div>
  );
};
