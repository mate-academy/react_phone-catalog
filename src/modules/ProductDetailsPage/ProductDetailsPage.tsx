/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';

import { Breadcrumbs } from '../shared/Breadcrumbs';
import { BackButton } from '../shared/BackButton';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductOptionsPanel } from './components/ProductOptionsPanel';
import { ProductAboutSection } from './components/ProductAboutSection';
import { ProductTechSpec } from './components/ProductTechSpec';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import { DetailsProduct, Product } from '../../types/productTypes';
import { getProductsFromCategory } from '../../api/getProducts';
import { findProductById } from '../../utils/findProductById';
import { useAppContext } from '../../hooks/useAppContext';
import { randomProducts } from '../ProductsPage/utilis/sortedProducts';
import { Loader } from '../shared/Loader';
import { Error } from '../shared/Error';

export const ProductDetailsPage = () => {
  const [item, setItem] = useState<DetailsProduct | null>(null);
  const [variants, setVariants] = useState<DetailsProduct[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setIsLoading] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[] | null>(
    null,
  );

  const {
    state: { products },
  } = useAppContext();

  const { productId } = useParams();
  const location = useLocation();
  const category = location.state?.category;

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setIsLoading(true);
    setError(null);

    const fetchProductsFromCategory = async () => {
      try {
        const data = await getProductsFromCategory(category, signal);
        const result = findProductById(data, productId);

        if (!result) {
          setError('Product was not found');
          setIsLoading(false);

          return;
        }

        setItem(result);

        const allVariants = data.filter(
          product => product.namespaceId === result.namespaceId,
        );

        setVariants(allVariants);
      } catch (e: unknown) {
        if ((e as Error).name === 'AbortError') {
          return;
        }

        console.error('Error fetching product');
        setError('Something went wrong while loading the product');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductsFromCategory();

    return () => {
      controller.abort();
    };
  }, [productId, category]);

  useEffect(() => {
    const shuffleProducts = randomProducts(products);

    setSuggestedProducts(shuffleProducts);
  }, [products]);

  if (loading) {
    return <Loader />;
  }

  if (!item) {
    return null;
  }

  if (error) {
    return <Error message={error} />;
  }

  const { name, images, description } = item;

  return (
    <main className={styles.main}>
      <Breadcrumbs category={category} name={item.name} />
      <BackButton />
      <div className={styles.tool}>
        <h2 className={styles.title}>{name}</h2>
        <div className={styles.productOverview}>
          <ProductImageGallery images={images} name={name} />
          <ProductOptionsPanel item={item} variants={variants} />
        </div>
      </div>
      <div className={styles.sectionWrapper}>
        <ProductAboutSection description={description} />
        <ProductTechSpec item={item} />
      </div>
      <section>
        <ProductsSlider
          title="You may also like"
          isHot={true}
          isCardDetails={true}
          products={suggestedProducts}
        />
      </section>
    </main>
  );
};
