/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable no-console */
import { Link, useParams } from 'react-router-dom';
import './ProductDetails.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getProducts, getSuggestedProducts } from '../../api/fetchData';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import { BackButton } from '../BackButton/BackButton';
import { ProductDetail } from '../../types/ProductDetail';
import { PRODUCTS_COLORS } from '../../types/ColorType';

import { Product } from '../../types/Products';
import { ButtonAddCard } from '../ButtonAddCard/ButtonAddCard';
import { ButtonAddFavorite } from '../ButtonAddFavorite/ButtonAddFavorite';
import { ProductSlider } from '../sliders/ProductSlider/ProductSlider';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetail>();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImg, setCurrentImg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (productId) {
      getSuggestedProducts(productId)
        .then((response) => {
          setProductDetails(response);
          setCurrentImg(response.images[0]);
        })
        .catch(() => {
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then(setProducts)
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const {
    id,
    name,
    images,
    description,
    colorsAvailable,
    namespaceId,
    capacity,
    color,
    capacityAvailable,
    priceDiscount,
    priceRegular,
    resolution,
    screen,
    processor,
    ram,
    zoom,
    cell,
    camera,
  } = productDetails || {};

  const findProductById = products.find(currentProduct => currentProduct.phoneId === id);

  return (
    <section className="details">
      <div className="container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <BreadCrumbs />
            <BackButton />

            {!isError ? (
              <>
                <h1 className="details__title">{name}</h1>
                <div className="details__top">
                  <div className="details__photos">
                    <div className="details__photos-list">
                      {images && images.map((image: string) => (
                        <button
                          className={classNames('details__photos-btn', {
                            'details__photos-btn--active': image === currentImg,
                          })}
                          type="button"
                          key={image}
                          onClick={() => setCurrentImg(image)}
                        >
                          <img
                            src={`${BASE_URL}${image}`}
                            alt="roduct-img"
                            className="details__photos-img"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="details__photos-current">
                      {currentImg && (
                        <img
                          src={`${BASE_URL}${currentImg}`}
                          alt="currentImg"
                          className="details__photos-current-img"
                        />
                      )}

                    </div>
                  </div>

                  <div className="details__options">
                    <div className="details__options-list">

                      <div className="details__colors">
                        <p className="details__colors-title">
                          Available colors
                        </p>
                        <div className="details__colors-list">
                          {colorsAvailable?.map((colorValue) => (
                            <div
                              className={classNames('details__colors-item', {
                                'details__colors-item--active': colorValue === color,
                              })}
                              key={colorValue}
                            >
                              <Link
                                className="details__colors-item-link"
                                to={`/phones/${namespaceId}-${capacity?.toLowerCase()}-${colorValue}`}
                                style={{ background: PRODUCTS_COLORS[colorValue] }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <span className="details__options-line" />

                      <div className="details__capacity">
                        <p className="details__capacity-title">Select capacity</p>
                        <div className="details__capacity-list">
                          {capacityAvailable?.map(capacityValue => (
                            <div
                              key={capacityValue}
                              className={classNames('details__capacity-item', {
                                'details__capacity-item-active': capacityValue === capacity,
                              })}
                            >
                              <Link
                                className={classNames('details__capacity-link', {
                                  'details__capacity-link-active': capacityValue === capacity,
                                })}
                                to={`/phones/${namespaceId}-${capacityValue.toLowerCase()}-${color}`}
                              >
                                {capacityValue}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>

                      <span className="details__options-line" />

                      <div className="details__price">
                        <div className="details__price-discount">
                          {`$${priceDiscount}`}
                          <span className="details__price-regular">
                            {`$${priceRegular}`}
                          </span>
                        </div>
                      </div>

                      {findProductById && (
                        <div className="details__btn">
                          <ButtonAddCard product={findProductById} />
                          <ButtonAddFavorite product={findProductById} />
                        </div>
                      )}

                      <div className="details__info">
                        <div className="details__info-container">
                          <div className="details__info-title">Screen</div>
                          <div className="details__info-value">{screen}</div>
                        </div>
                        <div className="details__info-container">
                          <div className="details__info-title">Resolution</div>
                          <div className="details__info-value">{resolution}</div>
                        </div>
                        <div className="details__info-container">
                          <div className="details__info-title">Processor</div>
                          <div className="details__info-value">{processor}</div>
                        </div>
                        <div className="details__info-container">
                          <div className="details__info-title">RAM</div>
                          <div className="details__info-value">{ram}</div>
                        </div>
                      </div>
                    </div>
                    <div className="details__id">{`ID: ${findProductById?.id}`}</div>
                  </div>
                </div>
                <div className="details__bottom">

                  <div className="details__about">
                    <h3 className="details__about-title">About</h3>

                    <span className="details__about-line" />

                    <div className="details__about-list">
                      {description?.map(desc => (

                        <div className="details__about-item" key={desc.title}>
                          <div className="details__about-item-title">
                            {desc.title}
                          </div>
                          <p className="details__about-item-description">
                            {desc.text}
                          </p>
                        </div>

                      ))}
                    </div>
                  </div>

                  <div className="details__tech">
                    <div className="details__tech-title">Tech specs</div>

                    <span className="details__about-line" />

                    <div className="details__tech-list">
                      <div className="details__tech-item">
                        <div className="details__tech-name">Screen</div>
                        <div className="details__tech-value">{screen}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Resolution</div>
                        <div className="details__tech-value">{resolution}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Processor</div>
                        <div className="details__tech-value">{processor}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">RAM</div>
                        <div className="details__tech-value">{ram}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Built in memory</div>
                        <div className="details__tech-value">{capacity}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Camera</div>
                        <div className="details__tech-value">{camera}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Zoom</div>
                        <div className="details__tech-value">{zoom}</div>
                      </div>
                      <div className="details__tech-item">
                        <div className="details__tech-name">Cell</div>
                        <div className="details__tech-value">{cell?.join(', ')}</div>
                      </div>
                    </div>
                  </div>

                </div>
                {!isLoading && (
                  <ProductSlider products={products} title="You may also like" />
                )}
              </>
            ) : (
              <ErrorMessage />
            )}
          </>
        )}

      </div>
    </section>

  );
};
