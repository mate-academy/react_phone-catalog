import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Loader } from '../../components/Loader';
import './ProductDetailsPage.scss';
import { fetchCompleteDetails } from '../../api';
import { ProductDetails } from '../../components/ProductDetails';
import { BackButton } from '../../components/BackButton';
import { ProductNotFound } from './ProductNotFound';

export const ProductDetailsPage = () => {
  const [details, setDetails] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { pathname } = useLocation();
  const { productId } = useParams();

  const directory = pathname.split('/')[1];

  useEffect(() => {
    fetchCompleteDetails(productId || '')
      .then(res => setDetails(res))
      .catch(err => setError(err));
    setLoading(false);
  }, [productId]);

  return (
    <div className="container container--with-min-height">
      {error ? (
        <ProductNotFound directory={directory} />
      ) : (
        <div className="product-details-page">
          <div className="product-details-page__breadcrumbs">
            <Breadcrumbs
              productName={details?.name || productId}
            />
          </div>
          <div className="product-details-page__back-button">
            <BackButton />
          </div>
          {loading && <Loader />}
          {details && (
            <ProductDetails
              {...details}
            />
          )}
        </div>
      )}
    </div>
  );
};
