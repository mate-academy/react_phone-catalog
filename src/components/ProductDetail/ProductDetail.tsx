import './ProductDetail.scss';
import classNames from 'classnames';
import React, { useEffect, useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../api/products';
import { PhoneDetails } from '../../types/PhoneDetails';
import { ButtonHeart } from '../ButtonHeart';
import { BackButton } from '../BackButton';
import { ProductSlider } from '../ProductSlider';
import { Breadcrumbs } from '../Breadcrumbs';
import { Product } from '../../types/Product';
import { AddToCartButton } from '../AddToCartButton';
import { Loader } from '../Loader';

type Props = {
  productId: string | undefined;
};

const colors = {
  black: '#000',
  white: '#fff',
  green: '#b4ead5',
  yellow: '#ffe77c',
  purple: '#d8d4e0',
  red: '#e3003a',
  spacegray: '#5d5c5a',
  midnightgreen: '#556158',
  gold: '#FCDBC1',
  silver: '#E2E6E9',
  coral: '#ff5733',
  rosegold: '#ffd2ce',
};

export const ProductDetail: React.FC<Props> = memo(({ productId }) => {
  const [product, setProduct] = useState<PhoneDetails | null>(null);
  const [generalInfo, setGeneralInfo] = useState<Product>();
  const [selectedImg, setSelectedImg] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const productDetails = await getProductDetails(productId || '');

        setProduct(productDetails);
        setSelectedImg(productDetails.images[0]);

        const products = await getProducts();

        const productInfo = products
          .find(currentProd => currentProd.itemId === productDetails.id);

        setGeneralInfo(productInfo);
      } catch {
        setError('Product details were not found...');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  const getLinkForColor = (newColor: string) => {
    const array = product?.id.split('-');

    array?.splice(-1, 1, newColor);

    return array?.join('-');
  };

  const getLinkForCapacity = (newCapacity: string) => {
    const array = product?.id.split('-');

    array?.splice(-2, 1, newCapacity.toLowerCase());

    return array?.join('-');
  };

  return (
    <div className="details-page">

      {isLoading && (
        <Loader />
      )}

      <Breadcrumbs
        productName={product?.name}
      />

      <BackButton />

      {(!isLoading && error) && (
        <div className="details-page__error">
          <h1 className="details-page__error-title">{error}</h1>
          <p className="details-page__error-description">
            Something went wrong...
          </p>
        </div>
      )}

      {product && generalInfo && (
        <div className="detail-page__product">
          <section
            className="details-page__section details-page__section--small"
          >
            <h1
              className="details-page__main-title"
            >
              {product.name}
            </h1>
          </section>

          <section
            className="details-page__section"
          >
            <div className="details-page__grid">
              <div className="details-page__photos">
                <div className="details-page__small-photos">
                  {product.images.map((image: string) => (
                    <div
                      key={image}
                      className={classNames(
                        'details-page__small-photo-container',
                        {
                          'details-page__small-photo-container--selected':
                            selectedImg === image,
                        },
                      )}
                      onClick={() => setSelectedImg(image)}
                      aria-hidden
                    >
                      <img
                        alt="product"
                        className="details-page__small-img"
                        src={image}
                      />
                    </div>
                  ))}
                </div>

                <div className="details-page__big-photo-container">
                  <img
                    alt="product"
                    className="details-page__big-img"
                    src={selectedImg}
                  />
                </div>
              </div>

              <div className="details-page__phone-info">
                <div className="details-page__info-container">
                  <div className="details-page__info-text">
                    Available colors
                  </div>

                  <ul className="details-page__phone-colors">
                    {product.colorsAvailable.map(currentColor => (
                      <NavLink
                        to={`/phones/${getLinkForColor(currentColor)}`}
                        className={classNames(
                          'details-page__phone-color',
                          {
                            'details-page__phone-color--selected':
                              currentColor === product.color,
                          },
                        )}
                        style={{
                          backgroundColor:
                            colors[currentColor as keyof typeof colors],
                        }}
                      />
                    ))}
                  </ul>

                </div>
                <div className="details-page__info-container">
                  <div className="details-page__info-text">
                    Select capacity
                  </div>

                  <ul className="details-page__capacity-links">
                    {product.capacityAvailable.map(currentCapacity => (
                      <NavLink
                        to={`/phones/${getLinkForCapacity(currentCapacity)}`}
                        className={classNames(
                          'details-page__capacity-link',
                          {
                            'details-page__capacity-link--selected':
                              currentCapacity === product.capacity,
                          },
                        )}
                      >
                        {currentCapacity}
                      </NavLink>
                    ))}
                  </ul>
                </div>

                <div className="details-page__prices">
                  <div
                    className="details-page__price details-page__price--sale"
                  >
                    {`$${product.priceDiscount}`}
                  </div>

                  <div
                    className="details-page__price details-page__price--full"
                  >
                    {`$${product.priceRegular}`}
                  </div>
                </div>

                <div className="details-page__buttons">
                  <AddToCartButton
                    product={generalInfo}
                  />

                  <ButtonHeart
                    product={generalInfo}
                  />
                </div>

                <ul className="details-page__detail-list">
                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Screen
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.screen}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Resolution
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.resolution}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      Processor
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.processor}
                    </p>
                  </li>

                  <li className="details-page__detail-item">
                    <h3 className="details-page__detail-item-title">
                      RAM
                    </h3>
                    <p className="details-page__detail-item-text">
                      {product.ram}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            className="details-page__section"
            data-cy="productDescription"
          >
            <div className="details-page__grid">
              <div className="details-page__about">
                <h2
                  className="
                  details-page__second-title
                  details-page__second-title--about
                  "
                >
                  About
                </h2>

                <ul
                  className="details-page__about-description"
                >
                  {product.description.map(info => (
                    <li
                      key={info.title}
                      className="details-page__about-description-item"
                    >
                      <h3
                        className="details-page__about-description-title"
                      >
                        {info.title}
                      </h3>

                      <p className="details-page__about-description-text">
                        {info.text}
                      </p>
                    </li>
                  ))}

                </ul>
              </div>
              <div className="details-page__tech">
                <h2
                  className="
                  details-page__second-title
                  details-page__second-title--tech
                  "
                >
                  Tech specs
                </h2>

                <ul className="details-page__tech-list">
                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Screen
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.screen}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Resolution
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.resolution}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Processor
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.processor}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      RAM
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.ram}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Built in memory
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.capacity}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Camera
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.camera}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Zoom
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.zoom}
                    </p>
                  </li>

                  <li className="details-page__tech-item">
                    <h3 className="details-page__tech-item-title">
                      Cell
                    </h3>
                    <p className="details-page__tech-item-text">
                      {product.cell}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section
            className="details-page__section"
          >
            <ProductSlider
              title="You may also like"
            />
          </section>
        </div>
      )}
    </div>

  );
});
