import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Loader } from '../../components/Loader';
import { Like } from '../../components/Like';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import { getPhoneInfo } from '../../functions/getProductInfo';

import { PhoneInfo } from '../../types/PhoneInfo';

import { colors } from '../../services/colors';

export const PhoneDetailsPage = () => {
  const [phone, setPhone] = useState<PhoneInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentCapacity, setCurrentCapacity] = useState('');
  const [currentColor, setCurrentColor] = useState('');

  const { productId } = useParams();

  useEffect(() => {
    const specs = productId?.split('-');

    setCurrentCapacity(specs?.at(-2)?.toUpperCase() || '');
    setCurrentColor(specs?.at(-1) || '');
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);

    getPhoneInfo(productId || '')
      .then(currentPhone => {
        setPhone(currentPhone);
        setCurrentImage(currentPhone.images[0]);
      })
      .catch(() => {
        throw new Error('Loading product info error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  const handleCurrentImage = (image: string) => () => {
    setCurrentImage(image);
  };

  const link = `/phones/${productId?.split('-').slice(0, -2).join('-')}`;

  return (
    isLoading ? (
      <Loader />
    ) : (
      <div className="product-details page__details">
        <Breadcrumbs name={phone?.name || ''} />

        <BackButton />

        <h1 className="product-details__title">
          {phone?.name}
        </h1>

        <div className="product-details__interaction-block">
          <div className="product-details__images">
            {phone?.images.map(image => (
              <button
                type="button"
                className="product-details__image-button"
                key={image}
                onClick={handleCurrentImage(image)}
              >
                <img
                  src={`./${image}`}
                  alt={image}
                  className="product-details__image-icon"
                />
              </button>
            ))}
          </div>

          <div className="product-details__current-image">
            <img
              src={`./${currentImage}`}
              alt={phone?.name}
              className="product-details__phone-image"
            />
          </div>

          <div className="product-details__interaction">
            <div className="product-details__select-container">
              <p className="product-details__name">
                Available colors
              </p>

              <ul className="product-details__select-buttons">
                {phone?.colorsAvailable.map(color => (
                  <li
                    key={color}
                    className={classNames(
                      'product-details__color',
                      {
                        'product-details__color--active': (
                          color === currentColor
                        ),
                      },
                    )}
                  >
                    <Link
                      to={`${link}-${currentCapacity.toLowerCase()}-${color}`}
                      className="product-details__color-border"
                      style={{ backgroundColor: colors[color] }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-details__line" />

            <div className="product-details__select-container">
              <p className="product-details__name">
                Select capacity
              </p>

              <div className="product-details__select-buttons">
                {phone?.capacityAvailable.map(capacity => (
                  <Link
                    to={`${link}-${capacity.toLowerCase()}-${currentColor}`}
                    className={classNames(
                      'product-details__capacity',
                      {
                        'product-details__capacity--active': (
                          capacity === currentCapacity
                        ),
                      },
                    )}
                    key={capacity}
                  >
                    {capacity}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className="product-details__line product-details__line--bigger"
            />

            <div className="product-details__price-block">
              <p className="product-details__price">
                {`$${Math.round((phone?.priceDiscount || 0) / 10) * 10 - 1} `}

                <span className="product-details__regular-price">
                  {`$${Math.round((phone?.priceRegular || 0) / 10) * 10 - 1}`}
                </span>
              </p>

              <div className="product-details__buttons">
                <button
                  type="button"
                  className="product-details__cart-button"
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="product-details__favourites-button"
                >
                  <div
                    className="product-card__favourites-icon"
                  />
                </button>
              </div>
            </div>

            <div className="product-details__info">
              <div className="product-details__info-row">
                <p className="product-details__info-name">
                  Screen
                </p>

                <p className="product-details__info-value">
                  {phone?.screen}
                </p>
              </div>

              <div className="product-details__info-row">
                <p className="product-details__info-name">
                  Resolution
                </p>

                <p className="product-details__info-value">
                  {phone?.resolution}
                </p>
              </div>

              <div className="product-details__info-row">
                <p className="product-details__info-name">
                  Processor
                </p>

                <p className="product-details__info-value">
                  {phone?.processor}
                </p>
              </div>

              <div className="product-details__info-row">
                <p className="product-details__info-name">
                  RAM
                </p>

                <p className="product-details__info-value">
                  {phone?.ram}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__text-block">
          <div
            className="product-details__description"
            data-cy="productDescription"
          >
            <h3 className="product-details__text-subtitle">
              About
            </h3>

            <div
              className="product-details__line product-details__line--bigger"
            />

            {phone?.description.map(description => (
              <div
                className="product-details__description-block"
                key={description.title}
              >
                <p className="product-details__description-title">
                  {description.title}
                </p>

                <p className="product-details__description-text">
                  {description.text}
                </p>
              </div>
            ))}
          </div>

          <div className="product-details__specs">
            <h3 className="product-details__text-subtitle">
              Tech specs
            </h3>

            <div className="product-details__line" />

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Screen
              </p>

              <p className="product-details__specs-value">
                {phone?.screen}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Resolution
              </p>

              <p className="product-details__specs-value">
                {phone?.resolution}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Processor
              </p>

              <p className="product-details__specs-value">
                {phone?.processor}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                RAM
              </p>

              <p className="product-details__specs-value">
                {phone?.ram}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Built in memory
              </p>

              <p className="product-details__specs-value">
                {phone?.capacity}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Camera
              </p>

              <p className="product-details__specs-value">
                {phone?.camera}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Zoom
              </p>

              <p className="product-details__specs-value">
                {phone?.zoom}
              </p>
            </div>

            <div className="product-details__specs-row">
              <p className="product-details__specs-name">
                Cell
              </p>

              <p className="product-details__specs-value">
                {phone?.cell}
              </p>
            </div>
          </div>
        </div>

        <Like />
      </div>
    )
  );
};
