/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';

import './ProductDetailsPage.scss';
import {
  getProductDetails,
  getSuggestedProducts,
} from '../../helpers/getProducts';
import { ProductDetails } from '../../types/ProductDetails';
import { AddToCart } from '../../components/AddToCart';
import { AddToFav } from '../../components/AddToFav';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Loader } from '../../components/Loader';
import { convertToCart, convertToFavourite } from '../../helpers/convert';

type ColorPalette = {
  [color: string]: string;
};

const colorMapping: ColorPalette = {
  black: '#000',
  gold: '#FCDBC1',
  rosegold: '#B76E79',
  silver: '#C0C0C0',
  spacegray: '#343D46',
  red: '#FF0000',
  white: '#FFF',
  coral: '#FF7F50',
  yellow: '#FFFF00',
  green: '#90EE90',
  purple: '#E6E6FA',
  midnightgreen: '#5F7170',
};

export const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleProductDetails = async () => {
      if (!productId) {
        return;
      }

      try {
        const res = await getProductDetails(productId);

        setProduct(res);

        setImageSrc(`new/${res.images[0]}`);
      } catch {
        throw new Error();
      } finally {
        setTimeout(() => (
          setIsLoading(false)
        ), 500);
      }
    };

    handleProductDetails();
  }, [productId]);

  useEffect(() => {
    const handleSuggestedProducts = async () => {
      try {
        const res = await getSuggestedProducts();

        setSuggestedProducts(res);
      } catch {
        throw new Error();
      }
    };

    handleSuggestedProducts();
  }, []);

  const handleThumbClick = useCallback((image: string) => (
    setImageSrc(`new/${image}`)
  ), []);

  const handleBackClick = useCallback(() => {
    navigate(-1);
  }, []);

  if (!product) {
    return null;
  }

  const {
    name,
    images,
    colorsAvailable,
    color,
    namespaceId,
    capacity,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    description,
    camera,
    zoom,
    cell,
  } = product;

  return (
    <section className="page__section">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="details">
            <Breadcrumbs phoneName={name} />
            <button
              className="back-btn back-btn--margin"
              type="button"
              onClick={handleBackClick}
              data-cy="backButton"
            >
              Back
            </button>

            <h1 className="details__title title">{name}</h1>
            <article className="details__content">
              <div className="details__card">
                <div className="details__gallery">
                  <div className="details__thumbs">
                    {images.map(image => (
                      <img
                        key={image}
                        src={`new/${image}`}
                        className={classNames('details__thumb', {
                          'details__thumb--active': `new/${image}` === imageSrc,
                        })}
                        alt="Phone thumbnail"
                        onClick={() => handleThumbClick(image)}
                      />
                    ))}
                  </div>

                  <img
                    src={imageSrc}
                    alt="Phone preview"
                    className="details__img"
                  />
                </div>

                <div className="details__actions">
                  <div className="details__colors">
                    <span className="details__select-name">
                      Available colors
                    </span>

                    <ul className="details__color-select">
                      {colorsAvailable.map(value => {
                        const colorValue = colorMapping[value];

                        return (
                          <li
                            key={value}
                            className={classNames('details__color-item', {
                              'details__color-item--active': color === value,
                            })}
                          >
                            <Link
                              to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${value}`}
                              className="details__color-link"
                              style={{
                                backgroundColor: colorValue,
                              }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="details__capacity">
                    <span className="details__select-name">
                      Select capacity
                    </span>

                    <ul className="details__capacity-select">
                      {capacityAvailable.map(value => (
                        <li
                          key={value}
                          className={classNames('details__capacity-item',
                            {
                              'details__capacity-item--active':
                                capacity === value,
                            })}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${value.toLowerCase()}-${color}`}
                            className="details__capacity-link"
                          >
                            {value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="details__price">
                    <span className="details__discount">
                      {`$${priceDiscount}`}
                    </span>

                    <span className="details__fullprice">
                      {`$${priceRegular}`}
                    </span>
                  </div>

                  <div className="details__buttons">
                    <div className="details__add-cart">
                      <AddToCart product={convertToCart(product)} />
                    </div>

                    <div className="details__add-fav">
                      <AddToFav product={convertToFavourite(product)} />
                    </div>
                  </div>

                  <div className="details__short-info">
                    <div className="info info--margin">
                      <span className="info__name">Screen</span>
                      <span className="info__value">{screen}</span>
                    </div>

                    <div className="info info--margin">
                      <span className="info__name">Resolution</span>
                      <span className="info__value">{resolution}</span>
                    </div>

                    <div className="info info--margin">
                      <span className="info__name">Processor</span>
                      <span className="info__value">{processor}</span>
                    </div>

                    <div className="info info--margin">
                      <span className="info__name">RAM</span>
                      <span className="info__value">{ram}</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="details__id">
                {namespaceId}
              </span>
            </article>

            <article className="details__description">
              <div className="details__about" data-cy="productDescription">
                <h2 className="details__subtitle">About</h2>

                {description.map(value => (
                  <div className="details__about-content" key={value.title}>
                    <h3 className="details__about-title">{value.title}</h3>
                    <p className="details__about-text">{value.text}</p>
                  </div>
                ))}
              </div>

              <div className="details__tech">
                <h2 className="details__subtitle">Tech specs</h2>
                <div className="details__tech-info">
                  <div className="info info--margin">
                    <span className="info__name">Screen</span>
                    <span className="info__value">{screen}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Resolution</span>
                    <span className="info__value">{resolution}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Processor</span>
                    <span className="info__value">{processor}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">RAM</span>
                    <span className="info__value">{ram}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Built in memory</span>
                    <span className="info__value">{capacity}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Camera</span>
                    <span className="info__value">{camera}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Zoom</span>
                    <span className="info__value">{zoom}</span>
                  </div>

                  <div className="info info--margin">
                    <span className="info__name">Cell</span>
                    <span className="info__value">
                      {cell.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </article>

            <article className="details__suggest">
              <ProductsSlider
                products={suggestedProducts}
                title="You may also like"
                btnMod="suggest"
              />
            </article>
          </div>
        )}
      </div>
    </section>
  );
};
