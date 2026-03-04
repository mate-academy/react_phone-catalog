import React, { useCallback, useEffect, useState } from 'react';
import { CatalogProducts, Product } from '../../types/Types';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, getProducts } from '../../api/products';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ProductGallery } from './ProductGallery';
import { ColorSelector } from './ColorSelector';
import { CapacitySelector } from './CapacitySelector';
import { TechSpecs } from './TechSpecs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { ArrowLeftIcon } from '../../components/ui/ArrowLeftIcon';

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<CatalogProducts[]>(
    [],
  );
  const [, setCatalogProduct] = useState<CatalogProducts | null>(null);

  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    if (!productId || !category) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const [data, allProducts] = await Promise.all([
        getProductById(category, productId),
        getProducts(),
      ]);

      if (!data) {
        throw new Error('No product information found');
      }

      const match = allProducts.find(prod => prod.itemId === productId);

      setCatalogProduct(match ?? null);
      setProduct(data);
      setSelectedImage(data.images[0] || '');

      const shuffledProducts = [...allProducts]
        .sort(() => Math.random() - 0.5)
        .slice(0, 12);

      setSuggestedProducts(shuffledProducts);
    } catch (error) {
      setErrorMessage('Product was not found.');
    } finally {
      setIsLoading(false);
    }
  }, [productId, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className={styles.details}>
      <Breadcrumbs category={category} productName={product?.name} />
      <button onClick={() => navigate(-1)} className={styles.details__back}>
        <ArrowLeftIcon />
        Back
      </button>
      {isLoading && <Loader />}
      {errorMessage && <p>{errorMessage}</p>}
      {!isLoading && !errorMessage && product && (
        <>
          <h2 className={styles.details__title}>{product.name}</h2>
          <div className={styles.details__hero}>
            <ProductGallery
              images={product.images}
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
            />
            <div className={styles.details__info}>
              <ColorSelector product={product} />
              <CapacitySelector product={product} />
              <TechSpecs product={product} />
            </div>
          </div>
          <section className={styles.details__about}>Description</section>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </>
      )}
    </div>
  );
};
