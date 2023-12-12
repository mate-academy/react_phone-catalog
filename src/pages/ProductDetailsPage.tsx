import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles/Page.scss';
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from '../helpers/api/productsApi';
import { Product } from '../helpers/types/Product';
import { getSuggestedProducts } from '../helpers/utils/getSortedProducts';

import { BackButton } from '../components/BackButton';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductDetails } from '../components/ProductDetails';
import { NoResults } from '../components/NoResults';
import { ProductsSlider } from '../components/ProductsSlider';

export const ProductDetailsPage = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { productId } = useParams();
  const { data: productDetails, isLoading, isError } = (
    useGetProductDetailsQuery(productId || '')
  );
  const {
    data: products,
    isLoading: isLoadingProducts,
  } = useGetProductsQuery();

  useEffect(() => {
    if (products && productId) {
      setSuggestedProducts(getSuggestedProducts(products, productId));
    }
  }, [products, productId]);

  return (
    <div className="Page">
      <Breadcrumbs />
      <div className="Page__top Page__top--gap--wider">
        <BackButton />

        {!isError && (
          <h1 className="Page__title">{productDetails?.name}</h1>
        )}
      </div>

      {isError && (
        <NoResults categoryName="Current product" />
      )}

      {!isLoading && !isError && productDetails && (
        <ProductDetails productInfo={productDetails} />
      )}

      <section className="
        Page__section
        Page__section--padding-top
        suggested
     ">
        <h1 className="Page__title Page__title--long">You may also like</h1>

        {isLoadingProducts ? (
          <Loader />
        ) : (
          <ProductsSlider products={suggestedProducts} />
        )}
      </section>
    </div>
  );
};
