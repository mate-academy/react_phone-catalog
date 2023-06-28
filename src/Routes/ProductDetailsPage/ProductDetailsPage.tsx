import { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';

import { BackButton } from '../../components/UI/BackButton/BackButton';
import { Breadcrumbs } from '../../components/UI/Breadcrumbs/Breadcrumbs';
import { ProductDetails } from '../../types/productDetails';
import { getProductDetails } from '../../helpers/requests';
import { SpecTable } from '../../components/SpecTable/SpecTable';
import { About } from '../../components/ProductDetailsPage/About/About';
import { Loader } from '../../components/UI/Loader/Loader';
import { Details } from '../../components/ProductDetailsPage/Details/Details';
import './ProductDetailsPage.scss';
import { getProductSpecs } from '../../helpers/object';

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
      return { ...state, isLoading: true };
    case 'selectedProduct/loaded':
      return { ...state, isLoading: false, selectedProduct: action.payload };
    case 'failed':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState: State = {
  selectedProduct: null,
  isLoading: false,
  error: '',
};

export const ProductDetailsPage = () => {
  const [{ selectedProduct, isLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const { productId = '' } = useParams();

  const { name = '', description = [] } = selectedProduct || {};

  useEffect(() => {
    dispatch({ type: 'loading' });
    getProductDetails(productId)
      .then(data => dispatch({ type: 'selectedProduct/loaded', payload: data }))
      .catch(err => dispatch({ type: 'failed', payload: err }));
  }, [productId]);

  return (
    <main key={productId} className="product-details">
      <Breadcrumbs />
      <BackButton />
      {selectedProduct && (
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
        </>
      )}
    </main>
  );
};
