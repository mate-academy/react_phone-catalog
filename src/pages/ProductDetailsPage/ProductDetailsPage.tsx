import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

import { AppContext } from '../../context/AppContext';
import { CartContext } from '../../context/CartContext';
import { FavContext } from '../../context/FavContext';

import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/BackButton/BackButton';
import { ProductNotFound } from '../../components/ProductNotFound';
import { Loader } from '../../components/Loader';

import { PhoneColorsType } from '../../types/PhoneColorsType';
import { PhoneInfo } from '../../types/PhoneInfo';
import { CartItemType } from '../../types/CartItemType';
import { getProductInfo } from '../../helpers/products';
import { PHONE_COLORS } from '../../constants/constants';
import { BASE_URL } from '../../utils/fetchClient';
import './ProductDetailsPage.scss';

export const ProductDetailsPage: React.FC = () => {
  const { pathname } = useLocation();
  const currentPage = pathname.slice(1).split('/')[0];
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState<PhoneInfo>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        .catch(() => {})
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

  const isAddedToCart = cart.some((item: CartItemType) => {
    return item.product.itemId === productId;
  });
  const isAddedToFav = fav.some(prod => prod.itemId === productId);

  type Direction = 'next' | 'prev';

  const handleImageSwipe = (direction: Direction) => {
    const imageIndex = allImages.findIndex(image => image === selectedImage);

    setSelectedImage(direction === 'next'
      ? allImages[imageIndex + 1] || allImages[0]
      : allImages[imageIndex - 1] || allImages[allImages.length - 1]);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleImageSwipe('next'),
    onSwipedRight: () => handleImageSwipe('prev'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className="ProductDetailsPage">
      <div className="container">
        {isLoading && (<Loader />)}

        {!productDetails && !isLoading && (
          <ProductNotFound />
        )}

        {productDetails && !isLoading && currentProduct && (
          <>
            <div className="ProductDetailsPage__content">
              <section className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__top">
                  <Breadcrumbs
                    page={[
                      currentPage,
                      productDetails.name.replace('GB', ' GB'),
                    ]}
                  />
                  <div className="ProductDetailsPage__back-and-title">
                    <BackButton />
                    <h2 className="ProductDetailsPage__product-title">
                      {productDetails.name.replace('GB', ' GB')}
                    </h2>
                  </div>
                </div>

                <div className="ProductDetailsPage__images">
                  <ul className="ProductDetailsPage__images-list">
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
                            src={`${BASE_URL}/${image}`}
                            alt={image}
                            className="ProductDetailsPage__image"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div {...handlers}>
                    <div className="ProductDetailsPage__main-image">
                      <img
                        src={`${BASE_URL}/${selectedImage}`}
                        alt={selectedImage}
                        className="ProductDetailsPage__main-image-selected"
                      />
                    </div>
                  </div>
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
                                  PHONE_COLORS[color as keyof PhoneColorsType],
                                }}
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="Decorative-line" />

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

                    <div className="Decorative-line" />

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
                        onClick={() => handleAddToCart(currentProduct)}
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
                        className={classNames('button button--fav', {
                          'button--fav-active': isAddedToFav,
                        })}
                        onClick={() => handleAddToFav(currentProduct)}
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
              </section>

              <section className="ProductDetailsPage__section">
                <article className="ProductDetailsPage__section-content About">
                  <div className="ProductDetailsPage__section-top">
                    <h3 className="ProductDetailsPage__section-title">
                      About
                    </h3>
                    <div className="Decorative-line" />
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
                    <div className="Decorative-line" />
                  </div>

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
                </article>
              </section>

              <section className="ProductDetailsPage__section">
                <div className="ProductDetailsPage__section-slider">
                  <ProductsSlider
                    title="You may also like"
                    products={hotPriceProducts}
                  />
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
