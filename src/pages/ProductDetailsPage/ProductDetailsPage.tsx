import './ProductDetailsPage.scss';
import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import {
  BASE_URL,
  getProductDetails,
  getSuggestedProducts,
} from '../../api/api';

import { GlobalContext } from '../../store';
import { Product } from '../../types/Product';
import { PRODUCT_COLORS } from '../../types/ProductColors';

import { NotFoundPage } from '../NotFoundPage';
import { Loader } from '../../components/Loader';
import { BackButton } from '../../components/BackButton/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductSlider } from '../../components/ProductSlider';
import { AddToFavButton } from '../../components/AddToFavButton';
import { AddToCartButton } from '../../components/AddToCartButton';

export const getProductById = (products: Product[], id: string) => {
  return products.find(product => product.itemId === id);
};

export const ProductDetailsPage = () => {
  const { products, isLoading, dispatch } = useContext(GlobalContext);
  const { itemId } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoadError, setIsLoadError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (itemId) {
      dispatch({ type: 'START_LOADER' });
      getProductDetails(itemId)
        .then((response) => {
          setProduct(response);
          setCurrentImage(response.images[0]);
        })
        .catch(() => {
          setIsLoadError(true);
        })
        .finally(() => {
          dispatch({ type: 'STOP_LOADER' });
        });
    }
  }, [dispatch, itemId]);

  const productInList = product ? getProductById(products, product.id) : null;

  if (!product) {
    return (
      <>
        {!isLoading && isLoadError && <NotFoundPage />}
      </>
    );
  }

  const {
    name,
    images,
    namespaceId,
    color,
    colorsAvailable,
    capacity,
    capacityAvailable,
    description,
    priceDiscount,
    priceRegular,
    screen,
    camera,
    resolution,
    processor,
    ram,
    zoom,
    cell,
  } = product;

  const suggestedProducts = getSuggestedProducts(products, color, capacity);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="product-page">
          <Breadcrumbs />
          <BackButton />

          {!isLoadError && (
            <>
              <h1 className="product-page__title">{name}</h1>

              <section className="product-page__content">
                <div className="product-page__images-wrapper">
                  <div className="product-page__images">
                    {images.map(image => (
                      <button
                        key={image}
                        type="button"
                        className={classNames('product-page__images-button', {
                          'image-active': image === currentImage,
                        })}
                        onClick={() => setCurrentImage(image)}
                      >
                        <img
                          alt={namespaceId}
                          src={`${BASE_URL}/${image}`}
                          className="product-page__images-item"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="product-page__current-image">
                    <img
                      alt={namespaceId}
                      src={`${BASE_URL}/${currentImage}`}
                      className="product-page__current-image-item"
                    />
                  </div>
                </div>

                <div className="product-page__description">
                  <div className="product-page__options">
                    <p className="product-page__options-title">
                      Available colors
                    </p>
                    <ul className="product-page__options-list">
                      {colorsAvailable.map(colorValue => (
                        <li
                          key={colorValue}
                          className={classNames('product-page__options-color', {
                            'color-option-active': color === colorValue,
                          })}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colorValue}`}
                            style={{
                              backgroundColor: PRODUCT_COLORS[colorValue],
                            }}
                            className="product-page__options-color-link"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-page__options">
                    <p className="product-page__options-title">
                      Select capacity
                    </p>
                    <ul className="product-page__options-list">
                      {capacityAvailable.map(value => (
                        <li
                          key={value}
                          className={classNames(
                            'product-page__options-cap', {
                              'capacity-option-active': capacity === value,
                            },
                          )}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${value.toLowerCase()}-${color}`}
                            className="product-page__options-cap-link"
                          >
                            {value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="product-page__prices">
                    <span className="product-page__prices-new">
                      {`$${priceRegular}`}
                    </span>
                    <span className="product-page__prices-old">
                      {`$${priceDiscount}`}
                    </span>
                  </div>

                  {productInList && (
                    <div className="product-page__buttons">
                      <AddToCartButton product={productInList} />
                      <AddToFavButton product={productInList} />
                    </div>
                  )}

                  <div className="product-page__info">
                    <div className="product-card__info">
                      <div className="product-card__info-container">
                        <span className="product-card__info-title">Screen</span>
                        <span className="product-card__info-value">
                          {screen}
                        </span>
                      </div>

                      <div className="product-card__info-container">
                        <span className="product-card__info-title">
                          Resolution
                        </span>
                        <span className="product-card__info-value">
                          {resolution}
                        </span>
                      </div>

                      <div className="product-card__info-container">
                        <span className="product-card__info-title">
                          Processor
                        </span>
                        <span className="product-card__info-value">
                          {processor}
                        </span>
                      </div>

                      <div className="product-card__info-container">
                        <span className="product-card__info-title">RAM</span>
                        <span className="product-card__info-value">{ram}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-page__id">
                  <p>{`ID: ${productInList?.id}`}</p>
                </div>
              </section>

              <section className="product-page__more">
                <div className="product-page__more-about">
                  <h2 className="product-page__more-title">About</h2>

                  {description.map(item => {
                    const { title, text } = item;

                    return (
                      <article
                        key={title}
                        className="product-page__more-about-article"
                      >
                        <h3 className="product-page__more-about-article-title">
                          {title}
                        </h3>

                        {text.map(paragraph => (
                          <p
                            key={paragraph}
                            data-cy="productDescription"
                            className="product-page__more-about-article-info"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </article>
                    );
                  })}
                </div>

                <div className="product-page__more-tech">
                  <h2 className="product-page__more-title">Tech specs</h2>

                  <div className="product-page__more-tech-content">
                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">Screen</p>
                      <p className="product-page__more-tech-value">
                        {screen}
                      </p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">
                        Resolution
                      </p>
                      <p className="product-page__more-tech-value">
                        {resolution}
                      </p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">
                        Processor
                      </p>
                      <p className="product-page__more-tech-value">
                        {processor}
                      </p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">RAM</p>
                      <p className="product-page__more-tech-value">{ram}</p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">
                        Built in memory
                      </p>
                      <p className="product-page__more-tech-value">
                        {capacity}
                      </p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">
                        Camera
                      </p>
                      <p className="product-page__more-tech-value">
                        {camera}
                      </p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">Zoom</p>
                      <p className="product-page__more-tech-value">{zoom}</p>
                    </div>

                    <div className="product-page__more-tech-wrap">
                      <p className="product-page__more-tech-property">Cell</p>
                      <p className="product-page__more-tech-value">
                        {cell.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              <ProductSlider
                title="You may also like"
                products={suggestedProducts}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
