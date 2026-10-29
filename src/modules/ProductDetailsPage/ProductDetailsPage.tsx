import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  getProductById,
  getSuggestedProducts,
  loadProducts,
} from '../../api/products';
import { Product, ProductDetails } from '../../types';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { ImageGallery } from './components/ImageGallery';
import { ProductOptions } from './components/ProductOptions';
import { ProductInfo } from './components/ProductInfo';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import styles from './ProductDetailsPage.module.scss';
import { ProductsSlider } from '../shared/components/ProductsSlider';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [cardProduct, setCardProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);

    getProductById(productId)
      .then(setProduct)
      .finally(() => setIsLoading(false));

    loadProducts().then(products =>
      setCardProduct(products.find(p => p.itemId === productId) || null),
    );

    getSuggestedProducts().then(setSuggested);
  }, [productId]);

  return (
    <div className={styles.page}>
      {!isLoading && product && (
        <>
          <div className={styles.top}>
            <Breadcrumbs
              category={product.category}
              productName={product.name}
            />
            <BackButton />
          </div>

          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.main}>
            <ImageGallery
              key={product.id}
              images={product.images}
              name={product.name}
            />

            <div className={styles.details}>
              <ProductOptions product={product} />
              <ProductInfo product={product} cardProduct={cardProduct} />
            </div>
          </div>

          <div className={styles.bottom}>
            <About product={product} />
            <TechSpecs product={product} />
          </div>
          <div className={styles.liked}>
            <ProductsSlider title="You may also like" products={suggested} />
          </div>
        </>
      )}

      {isLoading && <Loader />}

      {!isLoading && !product && <p>Product was not found</p>}
    </div>
  );
};
