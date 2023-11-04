import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { AppContext } from '../../context/AppContext';
import { CartContext } from '../../context/CartContext';
import { FavContext } from '../../context/FavContext';
import { getProductInfo } from '../../helpers/products';
import { PhoneInfo } from '../../types/PhoneInfo';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';
import './ProductDetailsPage.scss';

type PhoneColorsType = {
  black: string,
  coral: string,
  gold: string,
  green: string,
  midnightgreen: string,
  purple: string,
  red: string,
  rosegold: string,
  silver: string,
  spacegray: string,
  white: string,
  yellow: string,
};

const PhoneColors: PhoneColorsType = {
  black: '#202020',
  coral: '#e4664f',
  gold: '#fbd7bd',
  green: '#ade1cd',
  midnightgreen: '#4e5850',
  purple: '#d1cddb',
  red: '#ba0c2f',
  rosegold: '#fddcd7',
  silver: '#ebebe3',
  spacegray: '#5f5f5f',
  white: '#f9f6ef',
  yellow: '#ffe680',
};

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();
  const currentPage = pathname.slice(1).split('/')[0];
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<PhoneInfo>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { cart, handleAddToCart } = useContext(CartContext);
  const { fav, handleAddToFav } = useContext(FavContext);
  const { products, hotPriceProducts } = useContext(AppContext);

  const allImages = useMemo(() => {
    return productDetails?.images || [];
  }, [productDetails]);

  const currentProduct = useMemo(() => {
    return products.find(prod => prod.itemId === productId);
  }, [productId, products]);

  useEffect(() => {
    if (productId) {
      setIsLoading(true);

      getProductInfo(productId)
        .then(setProductDetails)
        .catch(() => { })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [productId]);

  useEffect(() => {
    setSelectedImage(allImages[0]);
  }, [allImages]);

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
  };

  const isAddedToCart = cart
    .find(prod => prod.product.itemId === currentProduct?.itemId);

  const isAddedToFav = fav
    .find(prod => prod.itemId === currentProduct?.itemId);

  const handleAddToCartClick = () => {
    if (currentProduct && isAddedToCart) {
      handleAddToCart(currentProduct);
    }
  };

  const handleAddToFavClick = () => {
    if (currentProduct && isAddedToFav) {
      handleAddToFav(currentProduct);
    }
  };

  return (
    <div className="ProductDetailsPage">
      <div className="container">
        {productDetails && !isLoading && (
          <>
            <div className="ProductDetailsPage__content">
              <div className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__top">
                  <Breadcrumbs
                    page={currentPage}
                    productName={productDetails.name}
                  />
                  <div className="ProductDetailsPage__back-and-title">
                    <BackButton />
                    <h2 className="ProductDetailsPage__product-title">
                      {productDetails.name}
                    </h2>
                  </div>
                </div>

                <ul className="ProductDetailsPage__images">
                  {productDetails.images.map(image => (
                    <li
                      key={image}
                      className={classNames('ProductDetailsPage__item', {
                        'ProductDetailsPage__item--active':
                          selectedImage === image,
                      })}
                    >
                      <Link
                        to={pathname}
                        className="ProductDetailsPage__image-link"
                        onClick={() => handleImageSelect(image)}
                      >
                        <img
                          src={image}
                          alt={image}
                          className="ProductDetailsPage__image"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="ProductDetailsPage__main-image">
                  <img
                    src={`_new/${selectedImage}`}
                    alt={selectedImage}
                    className="ProductDetailsPage__main-image-selected"
                  />
                </div>
                <div className="ProductDetailsPage__main-info">
                  <div className="ProductDetailsPage__product-options">
                    <div className="ProductDetailsPage__colors-and-id">
                      <p className="ProductDetailsPage__colors-text">
                        Available colors
                      </p>
                      <ul className="ProductDetailsPage__colors">
                        {productDetails.colorsAvailable.map(color => (
                          <li
                            key={color}
                            className={classNames('ProductDetailsPage__color', {
                              'ProductDetailsPage__color--selected':
                                productDetails.color === color,
                            })}
                          >
                            <Link
                              to={pathname.replace(productDetails.color, color)}
                              className="ProductDetailsPage__color-link"
                            >
                              <span
                                className="ProductDetailsPage__color-circle"
                                style={{
                                  backgroundColor:
                                    PhoneColors[color as keyof PhoneColorsType],
                                }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ProductDetailsPage__line" />
                    <div className="ProductDetailsPage__capacity-info">
                      <p className="ProductDetailsPage__capacity-text">
                        Select capacity
                      </p>
                      <ul className="ProductDetailsPage__capacity-list">
                        {productDetails.capacityAvailable.map(capacity => (
                          <li
                            key={capacity}
                            className="ProductDetailsPage__capacity-item"
                          >
                            <Link
                              to={pathname.replace(
                                productDetails.capacity.toLowerCase(),
                                capacity.toLowerCase(),
                              )}
                              className={classNames(
                                'ProductDetailsPage__capacity', {
                                  'ProductDetailsPage__capacity--selected':
                                    productDetails.capacity === capacity,
                                },
                              )}
                            >
                              {capacity.replace('GB', ' GB')}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="ProductDetailsPage__line" />
                  </div>
                  <div className="ProductDetailsPage__price-and-buttons">
                    <div className="ProductDetailsPage__prices">
                      <span className="ProductDetailsPage__price-discount">
                        &#36;
                        {productDetails.priceDiscount}
                      </span>
                      <span className="ProductDetailsPage__price-full">
                        &#36;
                        {productDetails.priceRegular}
                      </span>
                    </div>
                    <div className="ProductDetailsPage__actions">
                      <button
                        type="button"
                        className={classNames('button__add-to-cart', {
                          'button__added-to-cart': isAddedToCart,
                        })}
                        onClick={handleAddToCartClick}
                      >
                        {isAddedToCart ? (
                          'Added to cart'
                        ) : (
                          'Add to cart'
                        )}
                      </button>
                      <button
                        type="button"
                        aria-label="Like"
                        data-cy="addToFavorite"
                        className={classNames('button button--like', {
                          'button--like-active': isAddedToFav,
                        })}
                        onClick={handleAddToFavClick}
                      />
                    </div>
                  </div>
                  <div className="ProductDetailsPage__features Feature">
                    <ul className="Feature__list">
                      <li className="Feature__item">
                        <p className="Feature__name">Screen</p>
                        <p className="Feature__value">
                          {productDetails.screen}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Resolution</p>
                        <p className="Feature__value">
                          {productDetails.resolution.replace('х', ' х ')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Processor</p>
                        <p className="Feature__value">
                          {productDetails.processor}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">RAM</p>
                        <p className="Feature__value">
                          {productDetails.ram.replace('GB', ' GB')}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="ProductDetailsPage__section">
                <article className="ProductDetailsPage__section-content About">
                  <div className="ProductDetailsPage__section-top">
                    <h3 className="ProductDetailsPage__section-title">
                      About
                    </h3>
                    <div className="ProductDetailsPage__line" />
                  </div>

                  <div className="Description">
                    <ul className="Description__list">
                      {productDetails.description.map(item => (
                        <li className="Description__item">
                          <h4 className="Description__title">
                            {item.title}
                          </h4>
                          <p className="Description__text">
                            {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>

                <article className="ProductDetailsPage__section-content
                  TechSpecs"
                >
                  <div className="ProductDetailsPage__section-top">
                    <h3 className="ProductDetailsPage__section-title">
                      Tech specs
                    </h3>
                    <div className="ProductDetailsPage__line" />
                  </div>

                  <div className="TechSpecs">
                    <ul className="Feature__list">
                      <li className="Feature__item">
                        <p className="Feature__name">Screen</p>
                        <p className="Feature__value">
                          {productDetails.screen}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Resolution</p>
                        <p className="Feature__value">
                          {productDetails.resolution.replace('х', ' х ')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Processor</p>
                        <p className="Feature__value">
                          {productDetails.processor}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">RAM</p>
                        <p className="Feature__value">
                          {productDetails.ram.replace('GB', ' GB')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Built in memory</p>
                        <p className="Feature__value">
                          {productDetails.capacity.replace('GB', ' GB')}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Camera</p>
                        <p className="Feature__value">
                          {productDetails.camera}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Zoom</p>
                        <p className="Feature__value">
                          {productDetails.zoom}
                        </p>
                      </li>
                      <li className="Feature__item">
                        <p className="Feature__name">Cell</p>
                        <p className="Feature__value">
                          {productDetails.cell.join(', ')}
                        </p>
                      </li>
                    </ul>
                  </div>
                </article>
              </div>

              <div className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__section-slider">
                  <ProductsSlider
                    title="You may also like"
                    products={hotPriceProducts}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
