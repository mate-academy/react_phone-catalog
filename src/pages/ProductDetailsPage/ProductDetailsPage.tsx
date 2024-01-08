import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import './ProductDetailsPage.scss';
import { BackButton } from '../../components/BackButton/BackButton';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { ProductDetails } from '../../types/ProductDetails';
import { Loader } from '../../components/Loader/Loader';
import {
  ErrorNotification,
} from '../../components/ErrorNotification/ErrorNotification';
import { BASE_URL, PRODUCTS_COLORS } from '../../helpers/constants';
import {
  AddToCartButton,
} from '../../components/AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../../components/AddToFavButton/AddToFavButton';
import { Product } from '../../types/Product';
import { getProductById } from '../../helpers/helpers';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { getProductDetails, getProducts } from '../../api/products';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadError, setIsLoadError] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
          setCurrentImage(response.images[0]);
        })
        .catch(() => {
          setIsLoadError(true);
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
        setIsLoadError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const productInList = product ? getProductById(products, product.id) : null;
  const suggestedProducts = useMemo(() => {
    return products.filter((item) => {
      return (
        item.category === productInList?.category
        && item.capacity === productInList?.capacity
      );
    });
  }, [products, productInList]);

  if (!product) {
    return (
      <>
        {isLoading && <Loader />}
        {!isLoading && <NotFoundPage />}
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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="ProductDetailsPage">
          <BreadCrumbs product={product} />
          <BackButton />

          {isLoadError && <ErrorNotification />}

          {!isLoadError && (
            <>
              <h1 className="ProductDetailsPage__title">{name}</h1>

              <section className="ProductDetailsPage__content">
                <div className="ProductDetailsPage__content-imgs-wrapper">
                  <div className="ProductDetailsPage__images">
                    {images.map((image) => (
                      <button
                        key={image}
                        type="button"
                        className={cn('ProductDetailsPage__images-button', {
                          'image-active': image === currentImage,
                        })}
                        onClick={() => setCurrentImage(image)}
                      >
                        <img
                          src={`${BASE_URL}${image}`}
                          alt={namespaceId}
                          className="ProductDetailsPage__images-item"
                        />
                      </button>
                    ))}
                  </div>

                  <div
                    className="ProductDetailsPage__current-image"
                    key={Math.random()}
                  >
                    <img
                      src={`${BASE_URL}${currentImage}`}
                      alt={namespaceId}
                      className="ProductDetailsPage__current-image-item"
                    />
                  </div>
                </div>

                <div className="ProductDetailsPage__actions">
                  <div className="ProductDetailsPage__options">
                    <p className="ProductDetailsPage__options-title">
                      Available colors
                    </p>

                    <ul className="ProductDetailsPage__options-list">
                      {colorsAvailable.map((colorValue) => (
                        <li
                          key={colorValue}
                          className={cn('ProductDetailsPage__options-color', {
                            'color-option-active': color === colorValue,
                          })}
                        >
                          <Link
                            style={{
                              backgroundColor: PRODUCTS_COLORS[colorValue],
                            }}
                            to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colorValue}`}
                            className="ProductDetailsPage__options-color-link"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ProductDetailsPage__options">
                    <p className="ProductDetailsPage__options-title">
                      Select capacity
                    </p>

                    <ul className="ProductDetailsPage__options-list">
                      {capacityAvailable.map((capValue) => (
                        <li
                          key={capValue}
                          className={cn('ProductDetailsPage__options-cap', {
                            'capacity-option-active': capacity === capValue,
                          })}
                        >
                          <Link
                            to={`/phones/${namespaceId}-${capValue.toLowerCase()}-${color}`}
                            className="ProductDetailsPage__options-cap-link"
                          >
                            {capValue}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ProductDetailsPage__prices">
                    <span className="ProductDetailsPage__prices-now">
                      {`$${priceRegular}`}
                    </span>

                    <span className="ProductDetailsPage__prices-before">
                      {`$${priceDiscount}`}
                    </span>
                  </div>

                  {productInList && (
                    <div className="ProductDetailsPage__buttons">
                      <AddToCartButton product={productInList} />
                      <AddToFavButton product={productInList} />
                    </div>
                  )}

                  <div className="ProductDetailsPage__info">
                    <div className="ProductDetailsPage__info-container">
                      <span className="ProductDetailsPage__info-title">
                        Screen
                      </span>
                      <span className="ProductDetailsPage__info-specification">
                        {screen}
                      </span>
                    </div>

                    <div className="ProductDetailsPage__info-container">
                      <span className="ProductDetailsPage__info-title">
                        Resolution
                      </span>
                      <span className="ProductDetailsPage__info-specification">
                        {resolution}
                      </span>
                    </div>

                    <div className="ProductDetailsPage__info-container">
                      <span className="ProductDetailsPage__info-title">
                        Processor
                      </span>
                      <span className="ProductDetailsPage__info-specification">
                        {processor}
                      </span>
                    </div>

                    <div className="ProductCard__info-container">
                      <span className="ProductDetailsPage__info-title">
                        RAM
                      </span>
                      <span className="ProductDetailsPage__info-specification">
                        {ram}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ProductDetailsPage__id">
                  <p>{`ID: ${productInList?.id}`}</p>
                </div>
              </section>

              <section className="ProductDetailsPage__more">
                <div className="ProductDetailsPage__more-about">
                  <div className="ProductDetailsPage__more-title">
                    <h2 className="ProductDetailsPage__more-title-item">
                      About
                    </h2>
                  </div>

                  {description.map((item) => (
                    <article
                      key={item.title}
                      className="ProductDetailsPage__more-about-article"
                    >
                      <h3
                        className="ProductDetailsPage__more-about-article-title"
                      >
                        {item.title}
                      </h3>

                      <p
                        className="ProductDetailsPage__more-about-article-info"
                        data-cy="productDescription"
                      >
                        {item.text}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="ProductDetailsPage__more-tech">
                  <div className="ProductDetailsPage__more-title">
                    <h2 className="ProductDetailsPage__more-title-item">
                      Tech specs
                    </h2>
                  </div>

                  <div className="ProductDetailsPage__more-tech-content">
                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Screen
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {screen}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Resolution
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {resolution}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Processor
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {processor}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        RAM
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {ram}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Built in memory
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {capacity}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Camera
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {camera}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Zoom
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {zoom}
                      </p>
                    </div>

                    <div className="ProductDetailsPage__more-tech-wrap">
                      <p className="ProductDetailsPage__more-tech-property">
                        Cell
                      </p>
                      <p className="ProductDetailsPage__more-tech-value">
                        {cell.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <ProductSlider
                title="You may also like"
                products={suggestedProducts}
                isLoading={isLoading}
                isLoadError={isLoadError}
              />
            </>
          )}
        </div>
      )}
    </>
  );
};
