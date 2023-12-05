import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './styles/Page.scss';
import {
  useGetProductDetailsQuery,
  useGetProductsQuery,
} from '../helpers/api/productsApi';
import { Product } from '../helpers/types/Product';

import { BackButton } from '../components/BackButton';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductDetails } from '../components/ProductDetails';
import { NoResults } from '../components/NoResults';
import { ProductsSlider } from '../components/ProductsSlider';
import { getSuggestedProducts } from '../helpers/utils/getSortedProducts';

export const ProductDetailsPage = () => {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const { productId } = useParams();
  const { data: productDetails, isLoading, isError } = (
    useGetProductDetailsQuery(productId || '')
  );
  const { data: products } = useGetProductsQuery();

  useEffect(() => {
    if (products && productId) {
      setSuggestedProducts(getSuggestedProducts(products, productId));
    }
  }, [products]);

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
        <h1 className="Page__title">You may also like</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductsSlider products={suggestedProducts} />
        )}
      </section>
    </div>
  );
};
