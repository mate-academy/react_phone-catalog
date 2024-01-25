import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { ProductDetails } from '../type/ProductDetails';
import { getProduct, getProductDetails, DETAILS_API_URL } from '../helpers/fetchClient';
import { PRODUCTS_COLORS, getProductById } from '../utils/utils';
import '../style/ProductDetailsPage.scss';
import cn from 'classnames';
import { Product } from '../type/Product';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { AddToCartButton } from '../components/AddToCartButton/AddToCartButton';
import { AddToFavButton } from '../components/AddToFavButton/AddToFavButton';
import { Loader } from '../components/Loader/Loader';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductDetails>();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const productInList = product ? getProductById(products, product.id) : null;

  const suggestedProducts = useMemo(() => {
    return products.filter(item => {
      return item.category === productInList?.category
        && item.capacity === productInList?.capacity;
    });
  }, [products, productInList]);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
          if (response?.images && response.images.length > 0) {
            setCurrentImage(response.images[0]);
          }
        })
        .catch((_error) => {
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    getProduct()
      .then(setProducts)
      .catch(() => {
      })
      .finally(() => {
        setTimeout(() => {
        }, 500);
      });
  }, []);

  return (
    <>
      <div className="details__top">
        <div className="breadcrum">
          <Breadcrumbs />
        </div>
        <Link
          to="/"
          className="cart__button--back-text"
        >
          <div
            className="cart__button--back"
            aria-hidden
            data-cy="backButton"
          >
            <div className="cart__button--back-icon" />
            <span className="cart__button--back-text">Back</span>
          </div>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <h1 className="details__product-name">{product?.name}</h1>
          <div className="details__container">
            <div className="details__switcher">
              <div className="details__images">
                {product?.images.map(image => (
                  <button
                    key={image}
                    type="button"
                    className={cn('details__images-button', {
                      'image-active': image === currentImage,
                    })}
                    onClick={() => setCurrentImage(image)}
                  >
                    <img
                      src={`${DETAILS_API_URL}/${image}`}
                      alt={product?.name}
                      className="details__images-item"
                    />
                  </button>
                ))}
              </div>

              <div
                className="details__current-image"
                key={Math.random()}
              >
                <img
                  src={`${DETAILS_API_URL}/${currentImage}`}
                  alt={product?.namespaceId}
                  className={`details__current-image-item ${currentImage && 'animate-image'}`}
                />
              </div>
            </div>

            <div className="details__colors-and-id">
              <p className="details__colors-text">
                Available colors
              </p>
              <div className="details__color-switcher">
                {product?.colorsAvailable.map(colorValue => (
                  <li
                    key={colorValue}
                    className={cn('details__options-color', {
                      'color-active': product?.color === colorValue,
                    })}
                  >
                    <Link
                      style={{
                        backgroundColor: PRODUCTS_COLORS[colorValue],

                      }}
                      to={`/phones/${product?.namespaceId}-${product?.capacity.toLowerCase()}-${colorValue}`}
                      className="details__options-color-link"
                    />
                  </li>
                ))}
              </div>

              <div className="details__decorate" />

              <div className="details__capacity">
                <p className="details__capacity-title">Select capacity</p>
                <div className="details__capacity-switcher">
                  {product?.capacityAvailable.map(capValue => (
                    <li
                      key={capValue}
                      className={cn(
                        'details__options-cap', {
                          'capacity-active': product?.capacity === capValue,
                        },
                      )}
                    >
                      <Link
                        to={`/phones/${product.namespaceId}-${capValue.toLowerCase()}-${product.color}`}
                        className="details__options-cap-link"
                      >
                        {capValue}
                      </Link>
                    </li>
                  ))}
                </div>
              </div>

              <div className="details__decorate" />

              <div className="details__cost">
                <div className="details__cost--discount">
                  {`$${product?.priceDiscount}`}
                </div>

                <div className="details__cost--real">
                  {`$${product?.priceRegular}`}
                </div>
              </div>

              {productInList && (
                <div className="details__buttons">
                  <AddToCartButton product={productInList} />
                  <AddToFavButton product={productInList} />
                </div>
              )}

              <div className="details__criteria">
                <div className="details__criteria--container">
                  <div
                    className="details__criteria--big"
                  >
                    Screen
                  </div>
                  <div
                    className="details__criteria--small"
                  >
                    {product?.screen}
                  </div>
                </div>

                <div className="details__criteria--container">
                  <div
                    className="details__criteria--big"
                  >
                    Resolution
                  </div>
                  <div
                    className="details__criteria--small"
                  >
                    {product?.resolution}
                  </div>
                </div>

                <div className="details__criteria--container">
                  <div
                    className="details__criteria--big"
                  >
                    Processor
                  </div>
                  <div
                    className="details__criteria--small"
                  >
                    {product?.processor}
                  </div>
                </div>
                <div className="details__criteria--container">
                  <div
                    className="details__criteria--big"
                  >
                    Ram
                  </div>
                  <div
                    className="details__criteria--small"
                  >
                    {product?.ram}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="details__description">
            <div className="details__description-about">
              <h1 className="details__description-title">About</h1>
              <div className="details__decorate" />
              {product?.description.map(p => (
                <div className="fff">
                  <h3 className="details__description__title--about">
                    {p.title}
                  </h3>

                  <p className="details__description__text">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="details__description-tech">
              <h1 className="details__description-title">Tech specs</h1>
              <div className="details__decorate" />

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Screen
                </p>

                <p className="details__description-tech--title-small">
                  {product?.screen}
                </p>
              </div>

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Resolution
                </p>

                <p className="details__description-tech--title-small">
                  {product?.resolution}
                </p>
              </div>

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Processor
                </p>

                <p className="details__description-tech--title-small">
                  {product?.processor}
                </p>
              </div>

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  RAM
                </p>

                <p className="details__description-tech--title-small">
                  {product?.ram}
                </p>
              </div>

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Built in memory
                </p>

                <p className="details__description-tech--title-small">
                  {product?.capacity}
                </p>
              </div>

              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Camera
                </p>

                <p className="details__description-tech--title-small">
                  {product?.camera}
                </p>
              </div>
              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Zoom
                </p>

                <p className="details__description-tech--title-small">
                  {product?.zoom}
                </p>
              </div>
              <div className="details__description-tech--container">
                <p className="details__description-tech--title-tech">
                  Cell
                </p>

                <p className="details__description-tech--title">
                  {product?.cell.map((value, index) => (
                    <span
                      key={product.id}
                      className="details__description-tech--title-small"
                    >
                      {`${value}${index === product.cell.length - 1 ? '' : ','} `}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <ProductSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </>
  );
};
