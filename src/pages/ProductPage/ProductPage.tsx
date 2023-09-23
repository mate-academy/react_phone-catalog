import React, { useEffect, useState } from 'react';
import './ProductPage.scss';
import { useLocation } from 'react-router-dom';

import { getProduct } from '../../api/fetchClient';
import { ProductDetails } from '../../types/ProductDetails';
import { Loader } from '../../components/Loader/Loader';
import { getColorsData } from '../../helpers/getColorsData';
import { getCapacityData } from '../../helpers/getCapacityData';
import { BreadcrumbsData } from '../../types/breadcrumbsData';
import { PickerOption } from '../../types/PickerOption';
import {
  ProductPageContent,
} from '../../components/ProductPageContent/ProductPageContent';
import { ErrorPage } from '../ErrorPage/ErrorPage';

type ProductData = {
  colorData: PickerOption[],
  capacityData: PickerOption[],
  breadcrumbsData: BreadcrumbsData,
};

export const ProductPage: React.FC = () => {
  const { pathname } = useLocation();
  const apiUrl = pathname.slice(1).split('/')[1];
  const productCategoryUrl = pathname.slice(1).split('/')[0];
  const productCategoryName = productCategoryUrl.slice(0, 1).toUpperCase()
    + productCategoryUrl.slice(1);
  const productType = productCategoryName
    .slice(0, productCategoryName.length - 1);

  function getBreadcrumbsData(p: ProductDetails): BreadcrumbsData {
    return {
      category: {
        name: productCategoryName,
        url: productCategoryUrl,
      },
      product: {
        name: p.name,
        url: p.id,
      },
    };
  }

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [productData, setProductData] = useState<ProductData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getProduct(apiUrl)
      .then(productFromServer => {
        setProduct(productFromServer);
        const colorData = getColorsData(productFromServer.colorsAvailable);
        const capacityData = getCapacityData(
          productFromServer.capacityAvailable,
        );
        const breadcrumbsData = getBreadcrumbsData(productFromServer);

        const newProductData = {
          colorData,
          capacityData,
          breadcrumbsData,
        };

        setProductData(newProductData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pathname]);

  return (
    <>
      {isLoading && <Loader />}
      {isError && !isLoading && (
        <ErrorPage productType={productType} />
      )}
      {!isLoading && !isError && product && productData && (
        <ProductPageContent
          productData={productData}
          product={product}
        />
      )}
    </>
  );
};
