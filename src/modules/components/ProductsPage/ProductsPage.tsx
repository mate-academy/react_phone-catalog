import './ProductsPage.scss';
import { ProductsFilterBar } from './components/ProductsFilterBar';
import { ProductList } from './components/ProductList';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Loader } from '../../shared/components/ui/Loader';
import { ProductListContext } from '../../shared/context/ProductListContext';
import { PagePagination } from './components/PagePagination';
import type { ProductDetails } from '../../shared/types/ProductDetails';
import { MainHeader } from '../../shared/components/ui/MainHeader';
import { getProductPageTitle } from '../../shared/servises/getProductPageTitle';
import { getCurrentProductList } from '../../shared/servises/getCurrentProductList';
import {
  ProductsDispatch,
  ProductsState,
} from '../../shared/reducer/ProductPageReducer';
import { wait } from '../../shared/servises/handleWait';
import { Modal } from '../../shared/components/Notifications/Modal';
import productsNotFounded from '../../../global-assets/images/product-not-found.png';
import { CartStatusNotif } from '../CartPage/components/CartStatusNotif';
import { Product } from '../../shared/types/Product';
import { TranslationContext } from '../../../i18next/shared/TranslationContext';
import { getText } from '../../shared/servises/getText';
import { categoryList } from '../../shared/variables';
import { SortByAmount } from '../../shared/Enum/Sort';

export const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { productList } = useContext(ProductListContext);
  const { category } = useParams();
  const { notifMessage, additionalText, categoryItem } =
    useContext(TranslationContext);
  const navigate = useNavigate();
  const location = useLocation();
  const productsDispatch = useContext(ProductsDispatch);
  const productsState = useContext(ProductsState);
  const perPage = searchParams.get('perPage') || SortByAmount.ALL;

  const isValidCategory = categoryList.some(path => path === category);

  useEffect(() => {
    productsDispatch({ type: 'setLoader', payload: true });

    wait(2000)
      .then(() => {
        if (!category) {
          navigate('/');
        } else {
          const data = getCurrentProductList(
            category,
            productList,
            'products',
          ) as Product[];

          if (data.length === 0) {
            productsDispatch({
              type: 'setAlarm',
              payload: `${getText(additionalText.noCategoryMessage, category)}`,
            });
          }

          productsDispatch({ type: 'setCurrentProducts', payload: data });

          const detailsData = getCurrentProductList(
            category,
            productList,
            'details',
          ) as ProductDetails[];

          productsDispatch({
            type: 'setCurrentProductsDetails',
            payload: detailsData,
          });
        }
      })
      .catch(() => {
        productsDispatch({
          type: 'setError',
          payload: notifMessage.errorTitle,
        });
      })
      .finally(() => {
        productsDispatch({ type: 'setLoader', payload: false });
      });
  }, [
    additionalText.noCategoryMessage,
    category,
    location.pathname,
    navigate,
    notifMessage.errorTitle,
    productList,
    productsDispatch,
  ]);

  if (!isValidCategory) {
    return <Navigate to="/not-found" replace />;
  }

  if (!category) {
    navigate('/');

    return;
  }

  return (
    <div className="productList">
      {productsState.loader ? (
        <Loader />
      ) : (
        <div className="productList__content">
          <MainHeader
            pageTitle={getProductPageTitle(category, categoryItem)}
            productAmount={productsState.currentProductsDetails.length}
          />
          <ProductsFilterBar />

          {productsState.error ? (
            <Modal type="productsModal" message={productsState.error} />
          ) : productsState.alarm ? (
            <CartStatusNotif
              image={{
                src: productsNotFounded,
                alt: notifMessage.noProducts,
              }}
              message={productsState.alarm}
            />
          ) : (
            <>
              <div className="productList__items">
                <ProductList products={productsState.currentProducts} />
              </div>
              {perPage !== 'all' && (
                <div className="productList__pages">
                  <PagePagination />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
