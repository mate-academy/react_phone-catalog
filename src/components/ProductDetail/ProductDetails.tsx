import classNames from 'classnames';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL, PRODUCTS_COLORS } from '../../helpers/constants';

import { PhoneDetails } from '../../types/PhoneDetails';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { ButtonFovourite } from '../ButtonFavourite/ButtonFavourite';
import './ProductDetails.scss';

type Props = {
  product: PhoneDetails,
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);

  const {
    name,
    images,
    namespaceId,
    capacity,
    color,
    description,
    priceRegular,
    priceDiscount,
    screen,
    resolution,
    processor,
    ram,
    camera,
    zoom,
    cell,
    colorsAvailable,
    capacityAvailable,
    id,
  } = product;

  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    async function getProduct(productId: string) {
      const response = await fetch(`${BASE_URL}${'products.json'}`);

      const resData = await response.json();

      const productFromData: Product = resData
        .find((item: Product) => item.phoneId === productId);

      setFetchedProduct(productFromData);
    }

    getProduct(id);
  }, [product]);

  useLayoutEffect(() => {
    setMainImage(images[0]);
  }, [product]);

  return (
    <div className="product-details">
      <h1 className="product-details__title">{name}</h1>

      <div className="product-details__section">
        <div className="product-details__images">
          <div className="product-details__images-set">
            {images.map((image) => {
              return (
                <div
                  key={image}
                  role="button"
                  tabIndex={0}
                  onClick={() => setMainImage(image)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Space') {
                      setMainImage(image);
                    }
                  }}
                  className={classNames('product-details__image-container', {
                    'product-details__image-container--active':
                      mainImage === image,
                  })}
                >
                  <img
                    src={`${BASE_URL}${image}`}
                    alt={namespaceId}
                    className="product-details__image"
                  />
                </div>
              );
            })}
          </div>

          <div className="product-details__main-image-container">
            <img
              src={`${BASE_URL}${mainImage}`}
              alt={mainImage}
              className="product-details__main-image"
            />
          </div>
        </div>

        <div className="product-details__info">
          <div className="product-details__options">
            <span
              className="product-details__options-title"
            >
              Available colors
            </span>
            <ul className="product-details__options-list">
              {colorsAvailable.map(colorOption => (
                <li
                  key={colorOption}
                  className={classNames('product-details__color-option', {
                    'product-details__color-option--selected':
                    colorOption === color,
                  })}
                >
                  <Link
                    to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colorOption}`}
                    className="product-details__color-link"
                    style={{ backgroundColor: PRODUCTS_COLORS[colorOption] }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="product-details__options">
            <span
              className="product-details__options-title"
            >
              Select capacity
            </span>
            <ul className="product-details__options-list">
              {capacityAvailable.map(capacityOption => (
                <li
                  key={capacityOption}
                  className={classNames('product-details__capacity-option', {
                    'product-details__capacity-option--selected':
                    capacityOption === capacity,
                  })}
                >
                  <Link
                    to={`/phones/${namespaceId}-${capacityOption.toLowerCase()}-${color}`}
                    className={classNames('product-details__capacity-link', {
                      'product-details__capacity-link--selected':
                      capacityOption === capacity,
                    })}
                  >
                    {capacityOption}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="product-details__prices">
              <span className="product-details__discount-price">
                {`$${priceDiscount}`}
              </span>

              <span className="product-details__start-price">
                {`$${priceRegular}`}
              </span>
            </div>

            <div className="product-details__buttons">
              {fetchedProduct && (
                <AddToCartButton product={fetchedProduct} />
              )}

              {fetchedProduct && (
                <ButtonFovourite product={fetchedProduct} />
              )}
            </div>
          </div>

          <div className="product-details__info-specs">
            <div className="product-details__info-spec">
              <span className="product-details__info-spec-name">Screen</span>
              <span className="product-details__info-spec-value">{screen}</span>
            </div>

            <div className="product-details__info-spec">
              <span className="product-details__info-spec-name">
                Resolution
              </span>
              <span className="product-details__info-spec-value">
                {resolution}
              </span>
            </div>

            <div className="product-details__info-spec">
              <span className="product-details__info-spec-name">Processor</span>
              <span className="product-details__info-spec-value">
                {processor}
              </span>
            </div>

            <div className="product-details__info-spec">
              <span className="product-details__info-spec-name">RAM</span>
              <span className="product-details__info-spec-value">{ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="product-details__section">
        <div
          className="product-details__about"
          data-cy="productDescription"
        >
          <div className="product-details__section-subtitle-container">
            <h2 className="product-details__section-subtitle">About</h2>
          </div>

          <div
            className="product-details__description"
          >
            {description.map(({ title, text }) => (
              <div
                key={title}
              >
                <h3
                  className="product-details__paragraph-title"
                >
                  {title}
                </h3>
                <p
                  className="product-details__paragraph"
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="product-details__tech-specs">
          <div className="product-details__section-subtitle-container">
            <h2 className="product-details__section-subtitle">Tech specs</h2>
          </div>

          <div className="product-details__specs">
            <div className="product-details__spec">
              <span className="product-details__spec-name">Screen</span>
              <span className="product-details__spec-value">{screen}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Resolution</span>
              <span className="product-details__spec-value">{resolution}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Processor</span>
              <span className="product-details__spec-value">{processor}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">RAM</span>
              <span className="product-details__spec-value">{ram}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Camera</span>
              <span className="product-details__spec-value">{camera}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Zoom</span>
              <span className="product-details__spec-value">{zoom}</span>
            </div>

            <div className="product-details__spec">
              <span className="product-details__spec-name">Cell</span>
              <span className="product-details__spec-value">
                {cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
