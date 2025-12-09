import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from '../shared/components/PageHeader/PageHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '@/types/Product';
import styles from './ProductPage.module.scss';
import ProductGallery from './ProductGallery';
import { getProductDetails, getProducts } from '@/api/api';
import { ProductDetails } from '@/types/ProductDetails';
import ProductConfigurator from './ProductConfigurator';
import { specsConfig } from '../shared/components/utils/constants/constants';
import SliderComponent from '../HomePage/components/SliderComponent';
import BackButton from '../shared/components/BackButton/BackButton';

const ProductPage: React.FC = () => {
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
    window.scrollTo(0, 0);
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

  const foundProductFromProducts = products.find(p => p.itemId === productSlug);
  if (!product) return null;
  return (
    <>
      <PageHeader
        title={product ? product.name : ''}
        variant="productPage"
        extraContent={<BackButton label="Back" />}
      />

      {/* FIXED: productPage__hero */}
      <section className={styles.productPage__hero}>
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
      <section className={styles.productPage__details}>
        <div className={styles.productPage__description}>
          <h3 className={styles.productPage__descriptionTitle}>About</h3>

          <div className={styles.productPage__descriptionText}>
            {product.description.map((block, index) => (
              <div key={index} className={styles.productPage__descriptionBlock}>
                <h4 className={styles.productPage__descriptionBlockTitle}>
                  {block.title}
                </h4>

                {block.text.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className={styles.productPage__descriptionBlockParagraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.productPage__specs}>
          <h3 className={styles.productPage__specsTitle}>Tech specs</h3>

          <ul className={styles.productPage__specsList}>
            {specsConfig.map(({ label, key, optional }) => {
              const value = product[key];

              if (optional && !value) return null;

              return (
                <li key={key} className={styles.productPage__specsItem}>
                  <span className={styles.productPage__specsItemLabel}>
                    {label}
                  </span>
                  <span className={styles.productPage__specsItemValue}>
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <SliderComponent
        products={suggestedProducts}
        title="You may also like"
        showDiscount
      />
    </>
  );
};

export default ProductPage;
