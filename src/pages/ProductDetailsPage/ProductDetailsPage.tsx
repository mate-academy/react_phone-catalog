import './ProductDetailsPage.scss';

import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';

import { getPhoneDetails } from '../../api/api';
import { getNumbers } from '../../helpers/getNumbers';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { NotPage } from '../NotPage';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ButtonBack } from '../../components/ButtonBack';
import { ProductsSlider } from '../../components/ProductsSlider';

type Props = {
  phones: Product[];
  addProductToCart: (product: Product) => void,
};

export const ProductDetailsPage: React.FC<Props> = ({
  phones,
  addProductToCart,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const { productId = '' } = useParams();
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photosIndexes = getNumbers(0, details ? details?.images.length - 1 : 0);
  const parentPath = useResolvedPath('../').pathname;
  const onPhotoChange = useCallback(
    (id: number) => setCurrentPhoto(id), [currentPhoto],
  );

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
              <ButtonBack />
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
                    <div className="photos__box">
                      <ul className="photos__list">
                        {photosIndexes.map(photoId => (
                          <li className="photos__item">
                            <button
                              type="button"
                              key={photoId}
                              className={classNames(
                                'photos__button',
                                {
                                  'photos__button--active':
                                    photoId === currentPhoto,
                                },
                              )}
                              onClick={() => onPhotoChange(photoId)}
                            >
                              <img
                                src={`${details?.images[photoId]}`}
                                alt={details?.images[photoId]}
                                className="photos__image"
                              />
                            </button>
                          </li>
                        ))}
                      </ul>

                      <div className="photos__landscape">
                        <img
                          src={`${details?.images[currentPhoto]}`}
                          alt={details?.name}
                          className="photos__image"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="details-page__actions actions">
                    <span className="actions__label">
                      Available colors
                    </span>

                    <ul className="actions__list">
                      {details?.colorsAvailable.map((color) => (
                        <li className="actions__color-item">
                          <Link
                            key={color}
                            to={{
                              pathname: `${parentPath}${details.namespaceId}-${details.capacity.toLocaleLowerCase()}-${color}`,
                            }}
                            className={classNames(
                              'actions__color-link',
                              {
                                'actions__color-link--active': (
                                  details?.color === color
                                ),
                              },
                            )}
                            style={{ backgroundColor: color }}
                          />
                        </li>
                      ))}
                    </ul>

                    <span className="actions__label">
                      Select capacity
                    </span>

                    <ul className="actions__list">
                      {details?.capacityAvailable.map((capacity) => (
                        <li className="actions__capacity-item">
                          <Link
                            key={capacity}
                            to={{
                              pathname: `${parentPath}${details.namespaceId}-${capacity.toLocaleLowerCase()}-${details.color}`,
                            }}
                            className={classNames(
                              'actions__capacity-link',
                              {
                                'actions__capacity-link--active': (
                                  details?.capacity === capacity
                                ),
                              },
                            )}
                          >
                            {capacity}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="actions__price">
                      <span className="actions__price-discount">
                        {`$${details?.priceDiscount}`}
                      </span>

                      <span className="actions__price-regular">
                        {`$${details?.priceRegular}`}
                      </span>
                    </div>

                    <div className="actions__buttons">
                      <button
                        type="button"
                        className="actions__button button"
                      >
                        Add to cart
                      </button>

                      <button
                        type="button"
                        className="
                          actions__button
                          button-square
                          button-square--like
                        "
                      >
                        <img
                          src="img/icons/like.svg"
                          alt="like"
                        />
                      </button>
                    </div>

                    <div className="actions__info">
                      <span className="actions__characteristic">
                        Screen
                      </span>

                      <span className="actions__value">
                        {details?.screen}
                      </span>

                      <span className="actions__characteristic">
                        Resolution
                      </span>

                      <span className="actions__value">
                        {details?.resolution}
                      </span>

                      <span className="actions__characteristic">
                        Processor
                      </span>

                      <span className="actions__value">
                        {details?.processor}
                      </span>

                      <span className="actions__characteristic">
                        RAM
                      </span>

                      <span className="actions__value">
                        {details?.ram}
                      </span>
                    </div>
                  </div>

                  <div className="details-page__about about">
                    <h2 className="about__title">
                      About
                    </h2>

                    <ul className="about__blocks">
                      {details?.description.map(({ title, text }) => (
                        <li
                          key={title}
                          className="about__block"
                        >
                          <h3 className="about__subtitle">
                            {title}
                          </h3>

                          {text.map(pharagraph => (
                            <p className="about__description">
                              {pharagraph}
                            </p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="details-page__specs specs">
                    <h2 className="specs__title">
                      Tech specs
                    </h2>

                    <div className="specs__specs-content">
                      <div className="specs__info">
                        <span className="specs__characteristic">
                          Screen
                        </span>

                        <span className="specs__value">
                          {details?.screen}
                        </span>

                        <span className="specs__characteristic">
                          Resolution
                        </span>

                        <span className="specs__value">
                          {details?.resolution}
                        </span>

                        <span className="specs__characteristic">
                          Processor
                        </span>

                        <span className="specs__value">
                          {details?.processor}
                        </span>

                        <span className="specs__characteristic">
                          RAM
                        </span>

                        <span className="specs__value">
                          {details?.ram}
                        </span>

                        <span className="specs__characteristic">
                          Built in memory
                        </span>

                        <span className="specs__value">
                          {details?.capacity}
                        </span>

                        <span className="specs__characteristic">
                          Camera
                        </span>

                        <span className="specs__value">
                          {details?.camera}
                        </span>

                        <span className="specs__characteristic">
                          Zoom
                        </span>

                        <span className="specs__value">
                          {details?.zoom}
                        </span>

                        <span className="specs__characteristic">
                          Cell
                        </span>

                        <span className="specs__value">
                          {details?.cell}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="details-page__slider">
              <ProductsSlider
                title="You may also like"
                products={phones}
                addProductToCart={addProductToCart}
              />
            </div>
          </div>
        </section>
      )
  );
};
