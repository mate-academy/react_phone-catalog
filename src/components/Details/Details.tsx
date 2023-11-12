import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './details.scss';
import { ProductDetails } from '../../types/ProductDetails';
import { BASE_URL } from '../../utils/httpClient';
import { ImageModal } from '../UX/ImageModal';
import { productColors } from '../../assets/productsColors';
import { AddToCartButton } from '../UI/AddToCartButton';
import { AddToFavButton } from '../UI/AddToFavButton';
import { getSpecs } from '../../services/getSpecs';
import { Specs } from '../Specs';
import { SpecsMode } from '../../types/SpecsMode';

type Props = {
  productDetails: ProductDetails;
};

export const Details: React.FC<Props> = ({ productDetails }) => {
  const { pathname } = useLocation();
  const {
    id,
    namespaceId,
    name,
    capacityAvailable,
    capacity,
    priceRegular,
    priceDiscount,
    colorsAvailable,
    color,
    images,
    description,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
  } = productDetails;

  const [mainImageUrl, setMainImageUrl] = useState(images[0]);
  const [imageModalUrl, setImageModalUrl] = useState<string>('');
  const infoSpecs = useMemo(() => getSpecs({
    screen,
    resolution,
    processor,
    ram,
  }), [productDetails]);

  const techSpecs = useMemo(() => getSpecs({
    screen,
    resolution,
    processor,
    ram,
    capacity,
    camera,
    zoom,
    cell: cell.join(', '),
  }), [productDetails]);

  return (
    <div className="details">
      {imageModalUrl && (
        <ImageModal
          url={imageModalUrl}
          onClose={setImageModalUrl}
        />
      )}

      <h1 className="details__title">{name}</h1>

      <div className="details__container">
        <div className="details__images">
          <div className="details__thumbnails">
            {images.map(image => (
              <div
                key={image}
                role="button"
                tabIndex={0}
                className={classNames(
                  'details__thumbnail',
                  { 'details__thumbnail--active': image === mainImageUrl },
                )}
                onMouseDown={() => setMainImageUrl(image)}
              >
                <img
                  className="details__thumbnail-image"
                  src={`${BASE_URL}${image}`}
                  alt="Thumbnail"
                />
              </div>
            ))}
          </div>

          <div className="details__main-image-container">
            <button
              type="button"
              className="details__modal-opener"
              onClick={() => {
                setImageModalUrl(`${BASE_URL}${mainImageUrl}`);
              }}
            >
              <img
                title="View full size"
                className="details__main-image"
                src={`${BASE_URL}${mainImageUrl}`}
                alt="Main"
              />
            </button>
          </div>
        </div>

        <div className="details__info">
          <div className="details__info-id">{`ID: ${id}`}</div>

          <div className="details__info-main">
            <div className="details__colors">
              <p className="details__info-title">Available colors</p>

              <div className="details__product-options">
                {colorsAvailable.map(currentColor => {
                  const link = [
                    namespaceId,
                    capacity.toLowerCase(),
                    currentColor,
                  ].join('-');
                  const isActive = currentColor === color;

                  return (
                    <Link
                      key={currentColor}
                      title={currentColor}
                      to={`../${link}`}
                      state={{ pathname }}
                      className={classNames(
                        'details__product-color',
                        {
                          'details__product-color--active': isActive,
                        },
                      )}
                      style={{ backgroundColor: productColors[currentColor] }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="details__capacities">
              <p className="details__info-title">Select capacity</p>

              <div className="details__product-options">
                {capacityAvailable.map(currentCapacity => {
                  const link = [
                    namespaceId,
                    currentCapacity.toLowerCase(),
                    color,
                  ].join('-');
                  const isActive = currentCapacity === capacity;

                  return (
                    <Link
                      key={currentCapacity}
                      to={`../${link}`}
                      state={{ pathname }}
                      className={classNames(
                        'details__product-capacity',
                        { 'details__product-capacity--active': isActive },
                      )}
                    >
                      {currentCapacity}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="details__price">
              <span className="details__price-discount">
                {`$${priceDiscount}`}
              </span>

              <span className="details__price-regular">
                {`$${priceRegular}`}
              </span>
            </div>

            <div className="details__info-subcontainer">
              <div className="details__buttons">
                <AddToCartButton id={id} />
                <div className="details__buttons-fav-container">
                  <AddToFavButton id={id} />
                </div>
              </div>
              <Specs
                specs={infoSpecs}
                mode={SpecsMode.Medium}
              />
            </div>
          </div>
        </div>

        <div className="details__about">
          <h2 className="details__section-title">About</h2>

          {description.map(({ title, text }) => (
            <article
              key={title}
              className="details__description"
            >
              <h3 className="details__description-title">
                {title}
              </h3>

              <p className="details__description-body">
                {text}
              </p>
            </article>
          ))}
        </div>

        <div className="details__tech-specs">
          <h2 className="details__section-title">Tech specs</h2>

          <Specs
            specs={techSpecs}
            mode={SpecsMode.Large}
          />
        </div>
      </div>
    </div>
  );
};
