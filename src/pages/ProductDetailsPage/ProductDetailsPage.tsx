import { useParams } from 'react-router-dom';

import './product-details.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import { ErrorModal } from '../../components/UX/ErrorModal';
import { NoResults } from '../../components/NoResults';
import { GoBackLink } from '../../components/GoBackLink';
import { Details } from '../../components/Details';
import { Promo } from '../../components/Promo';
import { PromoName } from '../../types/PromoName';
import { useLoadPromoProducts } from '../../customHooks/useLoadPromoProducts';
import { useLoadProductDetails } from '../../customHooks/useLoadProductDetails';
import { NoResultsCaseName } from '../../types/NoResultsCase';

export const ProductDetailsPage = () => {
  const { itemId = '' } = useParams();

  const [
    isLoadingProductDetails,
    productDetails,
    productDetailsErrorMessage,
    setProductDetailsErrorMessage,
  ] = useLoadProductDetails(itemId);

  const [
    { suggested },
    isLoadingPromoProducts,
    hasError,
  ] = useLoadPromoProducts({ suggested: [] });

  return (
    <div className="product-details">
      <div className="product-details__breadcrumbs">
        <Breadcrumbs />
      </div>

      <div className="product-details__go-back">
        <GoBackLink />
      </div>

      {isLoadingProductDetails && <Loader />}

      {productDetailsErrorMessage && (
        <ErrorModal
          errorMessage={productDetailsErrorMessage}
          setErrorMessage={setProductDetailsErrorMessage}
        />
      )}

      {(!isLoadingProductDetails && !productDetails) && (
        <NoResults
          query={`${itemId}`}
          caseName={NoResultsCaseName.ProductDoesntExist}
        />
      )}

      {(!isLoadingProductDetails && productDetails) && (
        <div className="product-details__details">
          <Details productDetails={productDetails} />
        </div>
      )}

      {isLoadingPromoProducts && (
        <Loader />
      )}

      {(!isLoadingPromoProducts && !hasError) && (
        <Promo
          name={PromoName.Suggested}
          products={suggested}
        />
      )}
    </div>
  );
};
