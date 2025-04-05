import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProductById,
  getProductsByCategory,
  getProductsByNamespaceId,
} from '../../helpers/productHelper';
import { ProductDetailed } from '../../types/ProductDetailed';
import { Gallery } from './components/Gallery/Gallery';
import productDetailsPageStyles from './ProductDetailsPage.module.scss';
import { NotFoundProductPage } from '../NotFoundProductPage/NotFoundProductPage';
import { Loader } from '../../components/Loader';
import { Controls } from './components/Controls';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';
import { GoBack } from '../../components/GoBack';
import { YouMayAlsoLike } from './components/YouMayAlsoLike';
import { getData } from '../../utils/fetchClient';
import { Product } from '../../types/Product';
import { set } from 'lodash';

export const ProductDetailsPage = () => {
  const { itemId, category } = useParams();
  const [selectedProduct, setSelectedProduct] = useState<ProductDetailed>();
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFoundProduct, setIsNotFoundProduct] = useState(false);
  const [modelVariants, setModelVariants] = useState<ProductDetailed[]>([]);
  const navigate = useNavigate();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!category || !selectedProduct?.namespaceId) {
      return;
    }

    getProductsByNamespaceId(category, selectedProduct?.namespaceId)
      .then(setModelVariants)
      .catch(() => {
        navigate('..');
      });
  }, [category, selectedProduct?.namespaceId, navigate]);

  useEffect(() => {
    if (!itemId || !category) {
      return;
    }

    setIsLoading(true);
    getProductById(category, itemId)
      .then(product => {
        if (!product) {
          throw new Error('Product not found');
        }

        setSelectedProduct(product);
        setIsNotFoundProduct(false);
      })
      .catch(() => setIsNotFoundProduct(true))
      .finally(() => setIsLoading(false));
  }, [category, itemId]);

  useEffect(() => {
    if (!category) {
      return;
    }

    getProductsByCategory(category).then(setCategoryProducts);
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  if (isNotFoundProduct || !selectedProduct) {
    return <NotFoundProductPage />;
  }

  return (
    <div className={productDetailsPageStyles.details}>
      <GoBack />
      <h1 className={productDetailsPageStyles.details__title}>
        {selectedProduct.name}
      </h1>
      <div className={productDetailsPageStyles.details__container}>
        <Gallery images={selectedProduct.images} />
        <Controls
          className={productDetailsPageStyles.details__controls}
          modelVariants={modelVariants}
          selectedProduct={selectedProduct}
        />
        <About
          className={productDetailsPageStyles.details__about}
          description={selectedProduct.description}
        />
        <TechSpecs
          className={productDetailsPageStyles.details__techSpecs}
          selectedProduct={selectedProduct}
        />
        <YouMayAlsoLike
          className={productDetailsPageStyles.details__youMayAlsoLike}
          products={categoryProducts}
        />
      </div>
    </div>
  );
};
