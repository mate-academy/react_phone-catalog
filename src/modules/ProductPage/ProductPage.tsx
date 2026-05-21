import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { Product } from '@/types/Product';
import { ProductDetails } from '@/types/ProductDetails';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '@/api/api';
import { specsConfig } from '../shared/components/utils/constants/constants';
import ProductGallery from './ProductGallery';
import { ProductConfigurator } from './ProductConfigurator';
import { BackButton } from '../shared/components/BackButton/BackButton';
import styles from './ProductPage.module.scss';
import { recentlyViewedService } from '../shared/components/utils/RecentlyViewed/RecentlyViewed';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

export const ProductPage: React.FC = () => {
  const { category, productSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const isInitialLoadRef = React.useRef(true);

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (isInitialLoadRef.current) {
      setLoading(true);
      isInitialLoadRef.current = false;
    }

    // 1. Create a flag to track if this specific effect is still valid
    let ignore = false;

    getProductDetails(category)
      .then(products => {
        // 2. If a new request has started, ignore this stale response
        if (ignore) {
          return;
        }

        const foundProduct = products.find(p => p.id === productSlug);

        setProduct(foundProduct || null);
        setSelectedColor(foundProduct?.color || '');
        setSelectedCapacity(foundProduct?.capacity || '');
      })
      .finally(() => {
        // Only stop loading if we aren't ignoring this request
        if (!ignore) {
          setLoading(false);
        }
      });

    getSuggestedProducts()
      .then(data => {
        if (!ignore) {
          setSuggestedProducts(data);
        }
      })
      .catch(error =>
        console.error('Error fetching suggested products:', error),
      );

    // 3. Cleanup function: runs when productSlug changes, invalidating the old request
    return () => {
      ignore = true;
    };
  }, [category, productSlug]); // Note: added 'category' here as it's used inside the effect

  const foundProductFromProducts = useMemo(
    () => products.find(p => p.itemId === productSlug),
    [products, productSlug],
  );

  useEffect(() => {
    if (foundProductFromProducts) {
      recentlyViewedService.add(foundProductFromProducts.itemId);
    }
  }, [foundProductFromProducts]);

  return (
    <>
      {loading && (
        <div className={styles['product-page__loader']}>
          <Loader />
        </div>
      )}
      {!loading && !product && <NotFoundPage />}
      {/* {!loading && !product && (
        <div className={styles['product-not-found']}>
          <h2>Product was not found</h2>
          <NotFoundPage />
        </div>
      )} */}
      {!loading && product && (
        <>
          <PageHeader
            title={product ? product.name : ''}
            variant="productPage"
            extraContent={<BackButton label="Back" />}
          />

          <section className={styles['product-page__hero']}>
            {
              <>
                <ProductGallery photos={product.images} />

                <div className={styles['product-page__container--wrapper']}>
                  <ProductConfigurator
                    product={product}
                    setSelectedColor={setSelectedColor}
                    selectedColor={selectedColor}
                    setSelectedCapacity={setSelectedCapacity}
                    selectedCapacity={selectedCapacity}
                    foundProductFromProducts={foundProductFromProducts}
                  />
                </div>
              </>
            }
          </section>

          <section className={styles['product-page__details']}>
            <div className={styles['product-page__description']}>
              <h3 className={styles['product-page__description-title']}>
                About
              </h3>

              <div className={styles['product-page__description-text']}>
                {product.description.map((block, index) => (
                  <div
                    key={index}
                    className={styles['product-page__description-block']}
                  >
                    <h4
                      className={
                        styles['product-page__description-block-title']
                      }
                    >
                      {block.title}
                    </h4>

                    {block.text.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={
                          styles['product-page__description-block-paragraph']
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className={styles['product-page__specs']}>
              <h3 className={styles['product-page__specs-title']}>
                Tech specs
              </h3>

              <ul className={styles['product-page__specs-list']}>
                {specsConfig.map(({ label, key, optional }) => {
                  const value = product[key];

                  if (optional && !value) {
                    return null;
                  }

                  return (
                    <li
                      key={key}
                      className={styles['product-page__specs-item']}
                    >
                      <span
                        className={styles['product-page__specs-item-label']}
                      >
                        {label}
                      </span>
                      <span
                        className={styles['product-page__specs-item-value']}
                        title={Array.isArray(value) ? value.join(', ') : value}
                      >
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
          <ProductsSlider
            products={suggestedProducts}
            title="You may also like"
            showDiscount
          />
        </>
      )}
    </>
  );
};
