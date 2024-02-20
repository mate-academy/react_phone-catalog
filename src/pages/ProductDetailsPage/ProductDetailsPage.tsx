/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */

import {
  Link, useLocation,
  useNavigate, useParams,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { ButtonForCard } from '../../components/ButtonForCard';
import { Loader } from '../../components/Loader';
import { getProductDetails } from '../../services/productDetails';
import { useProducts } from '../../store/ProductsContext';
import { ProductDetails } from '../../types/ProductDetails';

import './ProductDetailsPage.scss';
import { RandomProducts } from '../../components/RandomProducts';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import arrow from '../../images/icons/arrow-left.svg';
import { BASE_URL } from '../../utils/constants';

export const ProductDetailsPage = () => {
  const [
    productDetails, setProductDetails,
  ] = useState<ProductDetails | null>(null);

  const [photoIndex, setPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { itemId } = useParams();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const photosList = productDetails !== null
    ? productDetails.images
    : [];

  const descriptionList = productDetails !== null
    ? productDetails.description
    : [];

  const products = useProducts();
  const product = products.find(item => item.itemId === itemId);

  const itemIdArray = itemId?.split('-') || [];
  const isAddProduct = productDetails !== null && !loading && !errorMessage;

  function goBack() {
    navigate({ pathname: '..', search: state?.search });
  }

  useEffect(() => {
    setErrorMessage('');
    setLoading(true);

    if (itemId) {
      getProductDetails(itemId)
        .then(setProductDetails)
        .catch(() => {
          setErrorMessage('Can\'t load a product');
          setTimeout(goBack, 2000);
        })
        .finally(() => setLoading(false));
    }
  }, [itemId]);

  if (loading) {
    return (<Loader />);
  }

  return (
    <div className="product-details">
      {errorMessage && (
        <p className="notification-error">{errorMessage}</p>
      )}

      <Breadcrumbs />

      <div className="product-details__back">
        <Link to={{ pathname: '..', search: state?.search }}>
          <img
            src={arrow}
            alt="arrow-left"
            className="button-icon"
          />
        </Link>

        <Link
          to={{ pathname: '..', search: state?.search }}
          className="product-details__back-text"
        >
          Back
        </Link>
      </div>

      {isAddProduct && (
        <div className="product-details__content">
          <h1 className="title title--pages product-details__title">
            {productDetails.name}
          </h1>

          <section className="product-details__info">
            <div className="product-details__info-block">
              <div className="product-details__photos photo">
                <div className="photo__small">
                  {photosList.map((photo, index) => (
                    <button
                      type="button"
                      onClick={() => {
                        setPhotoIndex(index);
                      }}
                      className={classNames('photo__small-link', {
                        'photo__small-link--is-active': index === photoIndex,
                      })}
                      key={photo}
                    >
                      <img
                        src={`${BASE_URL}/${photo}`}
                        alt="product"
                        className="photo__small-img"
                      />
                    </button>
                  ))}
                </div>

                <div className="photo__large">
                  <img
                    src={`${BASE_URL}/${photosList[photoIndex]}`}
                    alt="product"
                    className="photo__large-img"
                  />
                </div>
              </div>

              <div className="product-details__description">
                <div
                  className="product-details__description-card description-card"
                >
                  <div className="description-card__colors color">
                    <p className="description-card__title">
                      Available colors
                    </p>

                    <ul className="color__list">
                      {productDetails.colorsAvailable.map(color => (
                        <li
                          className={classNames('color__item', {
                            'color__item--is-active': pathname.includes(color),
                          })}
                          key={color}
                        >
                          <Link
                            to={`../${itemIdArray.slice(0, -1).join('-')}-${color}`}
                            className={`color__link color__link--${color}`}
                            title={color}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="description-card__capacity">
                    <p className="description-card__title capacity">
                      Select capacity
                    </p>

                    <ul className="capacity__buttons">
                      {productDetails.capacityAvailable.map(capacity => (
                        <li
                          className={classNames('capacity__item', {
                            'capacity__item--is-active': pathname.includes(capacity.toLowerCase()),
                          })}
                          key={capacity}
                        >
                          <Link
                            to={
                              `../${itemIdArray
                                .slice(0, -2)
                                .join('-')}-${capacity.toLowerCase()}-${itemIdArray[itemIdArray.length - 1]}`
                            }
                            className={classNames(
                              'capacity__link', {
                                'capacity__link--is-active':
                                pathname.includes(capacity.toLowerCase()),
                              },
                            )}
                          >
                            {capacity}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="description-card__price">
                    {productDetails.priceRegular
                      === productDetails.priceDiscount
                      ? (
                        <p>{`$${productDetails.priceRegular} `}</p>
                      ) : (
                        <>
                          <p>{`$${productDetails.priceDiscount} `}</p>
                          <p className="description-card__price--old">
                            {`$${productDetails.priceRegular}`}
                          </p>
                        </>
                      )}

                    <div className="description-card__buttons">
                      {product && <ButtonForCard product={product} />}
                    </div>
                  </div>

                  <div className="description-card__features feature">
                    <div className="feature__block">
                      <p className="feature__name">
                        Screen
                      </p>

                      <p className="feature__inducator">
                        {productDetails.screen}
                      </p>
                    </div>

                    <div className="feature__block">
                      <p className="feature__name">
                        Resolution
                      </p>

                      <p className="feature__inducator">
                        {productDetails.resolution}
                      </p>
                    </div>

                    <div className="feature__block">
                      <p className="feature__name">
                        Proessor
                      </p>

                      <p className="feature__inducator">
                        {productDetails.processor}
                      </p>
                    </div>

                    <div className="feature__block">
                      <p className="feature__name">
                        RAM
                      </p>

                      <p className="feature__inducator">
                        {productDetails.ram}
                      </p>
                    </div>
                  </div>
                </div>

                <p>{`ID:${product?.id}`}</p>
              </div>
            </div>

            <div className="product-details__info-block">
              <div
                data-cy="productDescription"
                className="product-details__about details-about"
              >
                <div className="details-about__content">
                  <h2 className="product-details__info-title">
                    About
                  </h2>

                  {descriptionList.map(item => (
                    <div className="details-about__block" key={item.title}>
                      <h3 className="details-about__block-title">
                        {item.title}
                      </h3>
                      <p className="details-about__block-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-details__tech details-tech">
                <div className="details-tech__content">
                  <h2 className="product-details__info-title">
                    Tech
                  </h2>

                  <div className="details-tech__features">
                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Screen
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.screen}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Resolution
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.resolution}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Proessor
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.processor}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        RAM
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.ram}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Built in memory
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.capacity}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Camera
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.camera}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Zoom
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.zoom}
                      </p>
                    </div>

                    <div className="details-tech__feature-block">
                      <p className="details-tech__feature-name">
                        Cell
                      </p>

                      <p className="details-tech__feature-inducator">
                        {productDetails.cell}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <RandomProducts />
        </div>
      )}
    </div>
  );
};
