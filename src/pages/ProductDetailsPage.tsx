/* eslint-disable object-curly-newline */
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainContext } from '../context/MainContext';
import { fetchProductDetails } from '../helpers/fetchData';
import { ProductDetails as Details } from '../types/ProductDetails';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductDetails } from '../components/ProductDetails';
import { ProductsSlider } from '../components/ProductsSlider';
import { NotFoundPage } from './NotFoundPage';

export const ProductDetailsPage = () => {
  const {
    setIsMenuOpen,
    setIsHeaderSearchVisible,
    setIsLoaderActive,
    setDocumentTitle,
    phones,
  } = useContext(MainContext);
  const [productDetails, setProductDetails] = useState<Details | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    setDocumentTitle('Product Details Page');
    setIsHeaderSearchVisible(false);
    setIsLoaderActive(true);
    setIsMenuOpen(false);

    if (!productId) {
      return;
    }

    fetchProductDetails(productId)
      .then((data) => setProductDetails(data))
      .finally(() => setIsLoaderActive(false));

    window.scrollTo(0, 0);
  }, [productId]);

  const getSuggestedProducts = useMemo(() => {
    return phones.slice(0, 8);
  }, [phones]);

  return (
    <>
      {productDetails ? (
        <>
          <Breadcrumbs />
          <ProductDetails item={productDetails} />
          <ProductsSlider
            title="You may also like"
            items={getSuggestedProducts}
          />
        </>
      ) : (
        <NotFoundPage title="Phone was not found" />
      )}
    </>
  );
};
