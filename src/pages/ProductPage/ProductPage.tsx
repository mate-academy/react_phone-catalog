/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getProductFromCategory, getProducts } from '../../api/products';
import { getSelectedProducts } from '../../utils/getSelectedProducts';
import { skeletonProduct } from '../../utils/Skeletons/skeletonProduct';
import { getEnumValue } from '../../utils/getEnumValue';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Category } from '../../types/Category';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductOverview } from './components/ProductOverview';
import { ProductPageDescription } from './components/ProductPageDescription/ProductPageDescription';
import { ProductCarouselSection } from '../../components/ProductCarouselSection';

import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const { id } = useParams<{ id: string }>();

  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const product = useRef<Product>();

  const skeletons: Product[] = Array.from({ length: 5 }, () => skeletonProduct);
  const [similarProducts, setSimilarProducts] = useState<Product[]>(skeletons);

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(products => {
        product.current = products.find(p => p.itemId === id);

        if (product.current) {
          getProductFromCategory(product.current.category)
            .then(response => {
              setProductDetails(response.find(p => p.id === id));
            })
            .catch(e => console.error(e));

          setSimilarProducts(
            getSelectedProducts(products, {
              amount: 12,
              category: getEnumValue(Category, product.current.category),
              random: true,
            }),
          );
        }
      })
      .catch(e => console.error(e))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs />
        <div className="section-title-wrapper">
          <h1>{productDetails?.name}</h1>
        </div>
        {productDetails && product.current && (
          <div className={styles['product-page__product-overview-wrapper']}>
            <ProductOverview
              product={product.current}
              productDetails={productDetails}
            />
          </div>
        )}
        {productDetails && <ProductPageDescription product={productDetails} />}
      </div>
      <ProductCarouselSection
        products={similarProducts}
        isLoading={isLoading}
        sectionTitle={'Similar Products'}
      />
    </section>
  );
};
