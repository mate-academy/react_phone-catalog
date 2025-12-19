import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { Product } from '@/types/Product';
import { ProductDetails } from '@/types/ProductDetails';
import { getProductDetails, getProducts } from '@/api/api';
import { specsConfig } from '../shared/components/utils/constants/constants';
import ProductGallery from './ProductGallery';
import { ProductConfigurator } from './ProductConfigurator';
import { SliderComponent } from '../HomePage/components/SliderComponent';
import { BackButton } from '../shared/components/BackButton/BackButton';
import styles from './ProductPage.module.scss';
import { recentlyViewedService } from '../shared/components/utils/RecentlyViewed/RecentlyViewed';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

export const ProductPage: React.FC = () => {
  const { category, productSlug } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');

  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    getProductDetails(category)
      .then(products => {
        const foundProduct = products.find(p => p.id === productSlug);
        setProduct(foundProduct || null);
        setSelectedColor(foundProduct?.color || '');
        setSelectedCapacity(foundProduct?.capacity || '');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productSlug]);

  const shuffle = <T,>(array: T[]): T[] =>
    [...array].sort(() => Math.random() - 0.5);

  const getRandomProducts = (products: Product[]) => {
    const randomCount = Math.floor(Math.random() * 10) + 3;
    return shuffle(products).slice(0, randomCount);
  };

  const suggestedProducts = useMemo(() => {
    if (products.length === 0) return [];
    return getRandomProducts(products);
  }, [products, productSlug]);
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

                <ProductConfigurator
                  product={product}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                  setSelectedCapacity={setSelectedCapacity}
                  selectedCapacity={selectedCapacity}
                  foundProductFromProducts={foundProductFromProducts}
                />
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

                  if (optional && !value) return null;

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
