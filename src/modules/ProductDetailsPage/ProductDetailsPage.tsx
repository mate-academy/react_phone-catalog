import React, { useEffect, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useParams } from 'react-router-dom';
import { Loader } from '../../shared/components/Loader/Loader';
import {
  getProductDetailsById,
  getSuggestedProducts,
} from '../../services/productsService';
import { Product, ProductDetails } from '../../types';
import { ProductsList } from '../../shared/components/ProductList/ProductsList';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    async function loadSuggested() {
      const items = await getSuggestedProducts(4);

      setSuggested(items);
    }

    loadSuggested();
  }, []);

  useEffect(() => {
    if (!productId) {
      return;
    }

    async function loadData() {
      try {
        const result = await getProductDetailsById(productId);

        setProduct(result);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImg(product.images[0]);
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return <h1 className={styles.message}>Product not found</h1>;
  }

  const specs = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell.join(', ') },
  ];

  return (
    <div className="container">
      <div className={`grid-24 ${styles.page}`}>
        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.topSection}>
          <div className={styles.leftPart}>
            <div className={styles.gallery}>
              {product.images.map(img => (
                <img
                  key={img}
                  className={`${styles.galleryImage} ${
                    selectedImg === img ? styles.activeThumb : ''
                  }`}
                  src={`/${img}`}
                  alt={product.name}
                  onClick={() => setSelectedImg(img)}
                />
              ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                className={styles.mainImage}
                src={`/${selectedImg}`}
                alt={product.name}
              />
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Available colors</p>
              <div className={styles.colors}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    className={`${styles.colorCircle} ${styles[color]}`}
                  />
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionTitle}>Select capacity</p>
              <div className={styles.capacity}>
                {product.capacityAvailable.map(cap => (
                  <button
                    key={cap}
                    className={`${styles.capacityBtn} ${
                      selectedCapacity === cap ? styles.activeCapacity : ''
                    }`}
                    onClick={() => setSelectedCapacity(cap)}
                  >
                    {cap}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.priceBlock}>
              <span className={styles.priceNew}>{product.priceRegular}</span>
              <span className={styles.priceOld}>{product.priceDiscount}</span>
            </div>

            <div className={styles.buttons}>
              <button className={styles.addToCart}>Add to cart</button>
              <button className={styles.favoriteButton}>favorite</button>
            </div>

            <div className={styles.detailsShort}>
              {specs.slice(0, 4).map(s => (
                <div key={s.label} className={styles.detailRow}>
                  <span className={styles.detailLabel}>{s.label}</span>
                  <span className={styles.detailValue}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.aboutBlock}>
            <h2 className={styles.bottomTitle}>About</h2>

            {product.description.map(section => (
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

            {specs.map(spec => (
              <div key={spec.label} className={styles.techRow}>
                <span className={styles.techLabel}>{spec.label}</span>
                <span className={styles.techValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.recommendedSection}>
          <h2 className={styles.recommendedTitle}>You may also like</h2>

          <div className="grid-24">
            <ProductsList products={suggested} />
          </div>
        </div>
      </div>
    </div>
  );
};
