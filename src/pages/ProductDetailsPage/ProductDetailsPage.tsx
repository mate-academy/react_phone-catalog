import { Suspense } from 'react';
import {
  Await,
  defer,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Error as ErrorElement } from '../../components/Error/Error';
import { Loader } from '../../components/Loader/Loader';
import { ProductDetails } from '../../components/ProductDetail/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { BASE_URL } from '../../helpers/constants';
import { PhoneDetails } from '../../types/PhoneDetails';
import { Product } from '../../types/Product';
import './ProductDetailsPage.scss';

type ProductDetailsPageData = {
  productDetails: PhoneDetails,
  products: Product[];
};

export const ProductDetailsPage = () => {
  const {
    productDetails,
    products,
  } = useLoaderData() as ProductDetailsPageData;

  const { productId } = useParams();

  return (
    <div className="product-details-page">
      <div className="product-details-page__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="product-details-page__back-button">
        <BackButton />
      </div>

      <div className="product-details-page__section">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={productDetails}
            errorElement={<ErrorElement />}
          >
            {(loadedProduct) => (
              <ProductDetails
                product={loadedProduct}
              />
            )}
          </Await>
        </Suspense>
      </div>

      <div className="product-details-page__section">
        <Suspense fallback={<Loader />}>
          <Await
            resolve={products}
            errorElement={<ErrorElement />}
          >
            {(loadedProducts) => {
              const filteredProducts = loadedProducts
                .filter((
                  product: Product,
                ) => product.itemId !== productId);

              return (
                <ProductsSlider
                  title="You may also like"
                  products={filteredProducts}
                />
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

async function loadProductDetails(params: string) {
  const response = await fetch(`${BASE_URL}products/${params}.json`);

  if (!response.ok) {
    throw new Error('Could not fetch product details.');
  }

  const data = response.json();

  return data;
}

async function loadProducts() {
  const response = await fetch(`${BASE_URL}${'products.json'}`);

  if (!response.ok) {
    throw new Error('Could not fetch products.');
  }

  const resData = await response.json();

  return resData as Product[];
}

export async function loader(params: string) {
  return defer({
    productDetails: await loadProductDetails(params),
    products: loadProducts(),
  });
}
