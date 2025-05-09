import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDetailedProductById,
  getDetailedProductsByCategory,
  getProductsByCategory,
  getDetailedProductsByNamespaceId,
  getProductById,
} from '../../services/products';
import { ProductDetailed } from '../../types/ProductDetailed';
import { Gallery } from './components/Gallery/Gallery';
import productDetailsPageStyles from './ProductDetailsPage.module.scss';
import { NotFoundProductPage } from '../NotFoundProductPage/NotFoundProductPage'; // eslint-disable-line max-len
import { Controls } from './components/Controls';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import { GoBack } from '../../components/GoBack';
import { Product } from '../../types/Product';
import { SectionSlider } from '../../components/SectionSlider';
import { useBreadcrumbs } from '../../context/BreadcrumbsContext';
import { useError } from '../../context/ErrorContext';
import { useLoading } from '../../context/LoadingContext';
import { handleError } from '../../utils/handleError';

export const ProductDetailsPage = () => {
  const { itemId, category } = useParams();
  const [selectedProduct, setSelectedProduct] =
    useState<ProductDetailed | null>(null);
  const [isNotFoundProduct, setIsNotFoundProduct] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const [modelVariants, setModelVariants] = useState<ProductDetailed[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const { setProductName } = useBreadcrumbs();
  const { setError } = useError();
  const [basicProduct, setBasicProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadProductData = async () => {
      if (!itemId || !category) {
        return;
      }

      startLoading();

      const productFromServer = getProductById(itemId).then(setBasicProduct);

      const suggestionPromise = getProductsByCategory(category)
        .then(setCategoryProducts)
        .catch(err => {
          setError(handleError(err, 'Failed to load suggestion products'));
        });

      try {
        const allProducts = await getDetailedProductsByCategory(category);
        const product = await getDetailedProductById(
          category,
          itemId,
          allProducts,
        );

        setSelectedProduct(product);
        setProductName(product.name);
        setIsNotFoundProduct(false);

        const namespaceIdPromise = getDetailedProductsByNamespaceId(
          category,
          product.namespaceId,
          allProducts,
        )
          .then(products => {
            if (!products.length) {
              throw new Error(
                `Could not load model variants for namespaceId: ${product.namespaceId}. Please try again later.`,
              );
            }

            setModelVariants(products);
          })
          .catch(err => {
            setError(handleError(err, 'Failed to model variants'));
            setModelVariants([product]);
          });

        await Promise.all([
          namespaceIdPromise,
          suggestionPromise,
          productFromServer,
        ]);
      } catch (error) {
        setIsNotFoundProduct(true);
        setProductName(null);
        setError(handleError(error, 'Failed to load products'));
      } finally {
        stopLoading();
      }
    };

    loadProductData();
  }, [category, itemId, setError, setProductName, startLoading, stopLoading]);

  useEffect(() => {
    if (!category) {
      return;
    }

    getProductsByCategory(category).then(setCategoryProducts);
  }, [category]);

  if (isNotFoundProduct || !selectedProduct || !category) {
    return <NotFoundProductPage />;
  }

  return (
    <div className={productDetailsPageStyles.details}>
      <GoBack />
      <h1 className={productDetailsPageStyles.details__title}>
        {selectedProduct.name}
      </h1>
      <div className={productDetailsPageStyles.details__container}>
        <Gallery
          images={selectedProduct.images}
          mediaStyles={productDetailsPageStyles}
        />
        <Controls
          className={productDetailsPageStyles.details__controls}
          modelVariants={modelVariants}
          selectedProduct={selectedProduct}
          category={category}
          numericId={basicProduct?.id || null}
        />
        <About
          className={productDetailsPageStyles.details__about}
          description={selectedProduct.description}
        />
        <TechSpecs
          className={productDetailsPageStyles.details__techSpecs}
          selectedProduct={selectedProduct}
        />
        <SectionSlider
          products={categoryProducts}
          title="You may also like"
          className={productDetailsPageStyles.details__youMayAlsoLike}
        />
      </div>
    </div>
  );
};
