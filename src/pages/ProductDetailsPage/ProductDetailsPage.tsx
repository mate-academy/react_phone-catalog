import { Link, useParams } from 'react-router-dom';
import {
  useContext, useEffect, useMemo, useState,
} from 'react';
import classNames from 'classnames';
import { GlobalContext } from '../../components/Context/GlobalContext';
import { Loader } from '../../components/Loader/Loader';
import { BreadCrumbs } from '../../components/BreadCrumbs/BreadCrumbs';
import { API_URL, getProductDetails, getProducts } from '../../utils/api';
import { ProductDetails } from '../../types/ProductDetails';
import { Error } from '../../types/Error';
import './ProductDetailsPage.scss';
import { BackButton } from '../../components/BackButton/BackButton';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
// import { ProductButtons } from '../../components/ProductButtons/ProductButtons';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Product } from '../../types/Product';
import { PRODUCTS_COLORS } from '../../helpers/constants';
import { ProductButtons } from '../../components/ProductButtons/ProductButtons';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const {
    setErrorMessage,
  } = useContext(GlobalContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      getProductDetails(productId)
        .then((response) => {
          setProduct(response);
          setCurrentImage(response.images[0]);
        })
        .catch(() => {
          setErrorMessage(Error.loadingProducts);
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
        setErrorMessage(Error.loadingProducts);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  const productInList = product
    ? [...products].find(prod => prod.phoneId === productId)
    : null;

  const suggestedProducts = useMemo(() => {
    return products.filter(item => {
      return (
        item.category === productInList?.category
        && item.capacity === productInList.capacity
      );
    });
  }, [products, productInList]);

  const handleImageSelect = (image: string) => {
    setCurrentImage(image);
  };

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
    <div className="details-page">
      {isLoading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="details-page__breadcrumbs">
            <BreadCrumbs
              page="phones"
              productName={name}
            />
          </div>

          <div className="details-page__back">
            <BackButton />
          </div>

          <h1 className="details-page__title">
            {name}
          </h1>

          <div className="details-page__gallery">
            <div className="details-page__images">
              {images.map(image => {
                return (
                  <button
                    key={image}
                    type="button"
                    className="details-page__image"
                    onClick={() => handleImageSelect(image)}
                  >
                    <img
                      src={`${API_URL}${image}`}
                      alt={image}
                      className="details-page__image--item"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="details-page__selected">
            <img src={`${API_URL}${currentImage}`} alt="Selected" className="details-page__selected--image" />
          </div>

          <div className="details-page__options">
            <div className="details-page__colors">
              <p className="details-page__colors-title">
                Available colors
              </p>
              <ul className="details-page__colors-list">
                {colorsAvailable.map(colorValue => (
                  <li
                    key={colorValue}
                    className={classNames(
                      'details-page__colors-color', {
                        'details-page__colors-color--active':
                        color === colorValue,
                      },
                    )}
                  >
                    <Link
                      style={{
                        backgroundColor: PRODUCTS_COLORS[colorValue],
                      }}
                      to={`/phones/${namespaceId}-${capacity.toLowerCase()}-${colorValue.toLowerCase()}`}
                      className="details-page__colors-color--link"
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="details-page__capacity">
              <p className="details-page__capacity-title">
                Select capacity
              </p>
              <ul className="details-page__capacity-list">
                {capacityAvailable.map(capacityValue => (
                  <li
                    key={capacityValue}
                    className={classNames(
                      'details-page__capacity-value', {
                        'details-page__capacity-value--active':
                          capacity === capacityValue,
                      },
                    )}
                  >
                    <Link
                      to={`/phones/${namespaceId}-${capacityValue.toLowerCase()}-${color.toLowerCase()}`}
                      className={classNames(
                        'details-page__capacity-value--link', {
                          'details-page__capacity-value--link-selected':
                          capacity === capacityValue,
                        },
                      )}
                    >
                      {capacityValue}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="details-page__checkout">
              <div className="details-page__checkout-price">
                <span className="details-page__checkout-price--discount">
                  $
                  {priceDiscount}
                </span>
                <span className="details-page__checkout-price--fullPrice">
                  $
                  {priceRegular}
                </span>
              </div>

              {productInList && (
                <div className="details-page__checkout-buttons">
                  <ProductButtons product={productInList} />
                </div>
              )}
              <ul className="details-page__checkout-features">
                <li className="details-page__checkout-features--item">
                  <span
                    className="details-page__checkout-features--name"
                  >
                    Screen size:
                  </span>
                  <span
                    className="details-page__checkout-features--value"
                  >
                    {screen}
                  </span>
                </li>

                <li className="details-page__checkout-features--item">
                  <span
                    className="details-page__checkout-features--name"
                  >
                    Resolution:
                  </span>
                  <span
                    className="details-page__checkout-features--value"
                  >
                    {resolution}
                  </span>
                </li>

                <li className="details-page__checkout-features--item">
                  <span
                    className="details-page__checkout-features--name"
                  >
                    Processor:
                  </span>
                  <span
                    className="details-page__checkout-features--value"
                  >
                    {processor}
                  </span>
                </li>

                <li className="details-page__checkout-features--item">
                  <span
                    className="details-page__checkout-features--name"
                  >
                    RAM:
                  </span>
                  <span
                    className="details-page__checkout-features--value"
                  >
                    {ram}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <section className="details-page__description">
            <div data-cy="productDescription" className="details-page__about">
              <h2 className="details-page__about-title">About</h2>
              <div className="details-page__about-text">
                {description.map(item => (
                  <article
                    key={item.title}
                    className="details-page__about-article"
                  >
                    <h3 className="details-page__about-title">
                      {item.title}
                    </h3>

                    <p className="details-page__about-info">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
            <div className="details-page__specs">
              <h2 className="details-page__specs-title">Tech specs</h2>
              <ul className="details-page__specs-features">
                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Screen:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {screen}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Resolution:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {resolution}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Processor:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {processor}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    RAM:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {ram}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Built in memory:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {capacity}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Camera:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {camera}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Zoom:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {zoom}
                  </span>
                </li>

                <li className="details-page__specs-features-item">
                  <span
                    className="details-page__specs-features--name"
                  >
                    Cell:
                  </span>
                  <span
                    className="details-page__specs-features--value"
                  >
                    {cell}
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section className="details-page__offer">
            <ProductSlider
              title="You may also like"
              products={suggestedProducts}
            />
          </section>
        </>
      )}
    </div>
  );
};
