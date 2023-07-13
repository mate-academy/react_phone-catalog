import { useEffect, useMemo, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton, Breadcrumbs, Loader } from '@components/UI';
import { About, Details } from '@components/ProductDetailsPage';
import { SpecTable } from '@components/SpecTable';
import { ProductDetails } from '@typings/productDetails';
import { getProductDetails } from '@helpers/requests';
import { getProductSpecs } from '@helpers/object';
import { FullPageLoader } from '@components/FullPageLoader';
import NotFoundPage from '@routes/NotFoundPage/NotFoundPage';
import './ProductDetailsPage.scss';
import { getRandomProducts } from '@helpers/filters';
import { useProducts } from '@contexts/productsContext';
import { ProductCardSlider } from '@components/ProductCardSlider';
import { scrollToTop } from '@helpers/dom';

type State = {
  selectedProduct: ProductDetails | null;
  isLoading: boolean;
  error: string;
};

type Action =
  | { type: 'loading' }
  | { type: 'selectedProduct/loaded'; payload: ProductDetails }
  | { type: 'failed'; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true, error: '' };
    case 'selectedProduct/loaded':
      return { ...state, isLoading: false, selectedProduct: action.payload };
    case 'failed':
      if (action.payload === '404') {
        return { ...state, isLoading: false, error: 'Phone was not found' };
      }

      return {
        ...state,
        isLoading: false,
        error: 'Something went wrong, try again later',
      };
    default:
      return state;
  }
};

const initialState: State = {
  selectedProduct: null,
  isLoading: false,
  error: '',
};

const ProductDetailsPage = () => {
  const [{ selectedProduct, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { productId = '' } = useParams();

  const { products } = useProducts();
  const mayAlsoLikeProducts = useMemo(
    () => getRandomProducts(products.phones),
    [selectedProduct],
  );

  const { name = '', description = [] } = selectedProduct || {};

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    dispatch({ type: 'loading' });
    getProductDetails(productId, signal)
      .then(data => dispatch({ type: 'selectedProduct/loaded', payload: data }))
      .catch(err => dispatch({ type: 'failed', payload: err.message }));

    scrollToTop();

    return () => controller.abort();
  }, [productId]);

  if (error) {
    return <NotFoundPage title={error} />;
  }

  return (
    <div className="product-details">
      <Breadcrumbs />
      <BackButton />

      {selectedProduct ? (
        <>
          <h1 className="product-details__name">
            {name}
            {isLoading && <Loader width={25} />}
          </h1>

          <section className="product-details__info">
            <Details selectedProduct={selectedProduct} />

            <p className="product-details__id">{`ID: ${productId}`}</p>
          </section>

          <section className="product-details__info">
            <About description={description} />

            <div className="product-details__specs">
              <h2 className="product-details__title">Tech Specs</h2>
              <SpecTable
                style={{ fontSize: 14, fontWeight: 500 }}
                specifications={getProductSpecs(selectedProduct)}
              />
            </div>
          </section>

          <section className="product-details__slider">
            <ProductCardSlider
              title="You may also like"
              products={mayAlsoLikeProducts}
            />
          </section>
        </>
      ) : (
        <FullPageLoader />
      )}
    </div>
  );
};

export default ProductDetailsPage;
