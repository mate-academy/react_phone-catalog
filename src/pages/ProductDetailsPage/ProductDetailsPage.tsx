import './ProductDetailsPage.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPhoneDetails } from '../../api/api';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { NotPage } from '../NotPage';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { DetailsPhotos } from '../../components/DetailsPhotos';
import { DetailsActions } from '../../components/DetailsActions';
import { DetailsAbout } from '../../components/DetailsAbout';
import { DetailsSpecs } from '../../components/DetailsSpecs';

type Props = {
  phones: Product[];
};

export const ProductDetailsPage: React.FC<Props> = ({ phones }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<ProductDetails>();
  const { productId = '' } = useParams();

  const getPhoneDetailsFromServer = async () => {
    setIsLoading(true);

    try {
      if (productId) {
        const phoneDetailsFromServer = await getPhoneDetails(productId);

        setDetails(phoneDetailsFromServer);
      }
    } catch {
      setError('Unable to upload phones details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPhoneDetailsFromServer();
  }, [productId]);

  return (
    (isLoading)
      ? (
        <Loader />
      ) : (
        <section className="page__section details-page">
          <div className="details-page__container">
            <div className="details-page__navigate">
              <Breadcrumbs />
            </div>

            <div className="details-page__button-back">
              <BackButton />
            </div>

            { (error) ? (
              <NotPage />
            ) : (
              <>
                <h1 className="details-page__title">
                  {details?.name}
                </h1>

                <div className="details-page__info">
                  <div className="details-page__photos photos">
                    <DetailsPhotos details={details} />
                  </div>

                  <div className="details-page__actions actions">
                    <DetailsActions details={details} product={phones.find(phone => phone.itemId === details?.id)} />
                  </div>

                  <div className="details-page__about about">
                    <DetailsAbout details={details} />
                  </div>

                  <div className="details-page__specs specs">
                    <DetailsSpecs details={details} />
                  </div>
                </div>
              </>
            )}

            <div className="details-page__slider">
              <ProductsSlider
                title="You may also like"
                products={phones}
              />
            </div>
          </div>
        </section>
      )
  );
};
