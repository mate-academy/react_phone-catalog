/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Loader } from '../../components/Loader';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../helpers/api';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrubs';
import { StorageContext } from '../../components/StorageContext';
import { Product } from '../../types/Product';

type ProductDetailsPageProps = {
  productId: string,
  category: string,
  setFavLength: React.Dispatch<number>,
  setCartLength: React.Dispatch<number>,
};

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  productId,
  category,
  setFavLength,
  setCartLength,
}) => {
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [product, setProduct] = useState<Product>();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [mainImage, setMainImage] = useState(productDetails?.images[0]);
  const [productColor, setProductColor] = useState(productDetails?.color);
  const [productMemory, setProductMemory] = useState(productDetails?.capacity);
  const [shuffledProducts, setShuffledProducts] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    cart,
    fav,
    saveItemToCart,
    saveItemToFav,
    deleteItemFromCart,
    deleteItemFromFav,
    findItemInCart,
    findItemInFav,
    cartSum,
  } = useContext(StorageContext);
  const [isSelectedToFav, setIsSelectedToFav] = useState(false);
  const [isSelectedToCard, setIsSelectedToCard] = useState(false);

  useEffect(() => {
    if (isSelectedToCard !== findItemInCart(productId) && productDetails) {
      return isSelectedToCard
        ? saveItemToCart(productId, productDetails)
        : deleteItemFromCart(productId);
    }

    return cart;
  }, [isSelectedToCard, productId]);

  useEffect(() => {
    setCartLength(cartSum(cart));
  }, [cart.length]);

  useEffect(() => {
    if (isSelectedToFav !== findItemInFav(productId) && product) {
      return isSelectedToFav
        ? saveItemToFav(product)
        : deleteItemFromFav(product);
    }

    return fav;
  }, [isSelectedToFav]);

  useEffect(() => {
    setFavLength(fav.length);
  }, [fav]);

  useEffect(() => {
    if (productDetails) {
      setIsPageLoading(true);
    }

    setMainImage(undefined);
    getProductDetails(productId)
      .then(setProductDetails)
      .catch(() => setProductDetails(undefined))
      .finally(() => setIsPageLoading(false));

    getProducts()
      .then((res: Product[]) => {
        setProduct(res.find(prod => prod.itemId === productId));
      });

    getSuggestedProducts()
      .then(setShuffledProducts);

    setIsSelectedToCard(
      !!findItemInCart(productId),
    );

    setIsSelectedToFav(
      !!findItemInFav(productId),
    );
  }, [productId]);

  const techSpecs = [
    { title: 'Screen', value: productDetails?.screen },
    { title: 'Resolution', value: productDetails?.resolution },
    { title: 'Processor', value: productDetails?.processor },
    { title: 'Ram', value: productDetails?.ram.replace('GB', ' GB') },
    {
      title: 'Built in memory',
      value: productDetails?.capacity.replace('GB', ' GB'),
    },
    { title: 'Camera', value: productDetails?.camera },
    { title: 'Zoom', value: productDetails?.zoom },
    { title: 'Cell', value: productDetails?.cell.join(' ') },
  ];

  return (
    <>
      {isPageLoading
        ? <Loader />
        : (
          <div className="product-details">
            {productDetails
              ? (
                <>
                  <Breadcrumbs
                    productName={productDetails.name}
                  />

                  <div
                    className="back-button"
                    data-cy="backButton"
                    onClick={() => navigate({
                      pathname: '..',
                      search: state.search,
                    })}
                  >
                    <img
                      src="_new/img/arrow-left-black.svg"
                      alt="arrow back"
                      className="back-button-arrow"
                    />
                    <div
                      className="back-button-text"
                    >
                      Back
                    </div>
                  </div>

                  <div className="product-details__title">
                    {productDetails.name}
                  </div>

                  <div
                    className="product-details__image-and-selection-sections"
                  >
                    <div className="product-details__image-section">
                      <div className="product-details__images">
                        {productDetails.images.map((image: string) => (
                          <div
                            key={image}
                            className={classNames(
                              'product-details__image-container',
                              {
                                'product-details__image-container--selected':
                                  mainImage
                                    ? image === mainImage
                                    : image === productDetails.images[0],
                              },
                            )}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              src={`_new/${image}`}
                              alt={image}
                              className="product-details__image"
                            />
                          </div>
                        ))}
                      </div>
                      <img
                        src={`_new/${mainImage || productDetails.images[0]}`}
                        alt={mainImage || productDetails.images[0]}
                        className="product-details__main-image"
                      />
                    </div>

                    <div className="product-details__selection-section">
                      <div
                        className={classNames(
                          'product-details__selector',
                          'product-details__selector--color',
                        )}
                      >
                        <div className="product-details__selector-title">
                          Available colors
                        </div>
                        <div className="product-details__selector-colors">
                          {productDetails.colorsAvailable.map((
                            availableColor: string,
                          ) => {
                            const {
                              colorsAvailable,
                              namespaceId,
                              color,
                              capacity,
                            } = productDetails;

                            return (
                              <div
                                key={availableColor}
                                className={classNames(
                                  'product-details__selector-color-container',
                                  {
                                    // eslint-disable-next-line max-len
                                    'product-details__selector-color-container--selected':
                                    productColor
                                      ? availableColor === productColor
                                      : availableColor === color,
                                  },
                                )}
                                onClick={() => setProductColor(availableColor)}
                              >
                                <Link
                                  to={`../${namespaceId}-${capacity.replace('GB', 'gb')}-${availableColor}`}
                                  state={state}
                                  style={{
                                    backgroundImage:
                                    `url(_new/img/${category.toLocaleLowerCase()}s`
                                    + `/${namespaceId}/${availableColor}/00.jpg)`,
                                  }}
                                  className={classNames(
                                    'product-details__selector-color',
                                    {
                                      'product-details__selector-color--left':
                                      colorsAvailable
                                        .indexOf(availableColor) === 3,
                                    },
                                  )}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div
                        className={classNames(
                          'product-details__selector',
                          'product-details__selector--capacity',
                        )}
                      >
                        <div className="product-details__selector-title">
                          Select capacity
                        </div>
                        <div className="product-details__selector-memories">
                          {productDetails.capacityAvailable.map((
                            availableCapacity: string,
                          ) => (
                            <Link
                              to={`../${productDetails.namespaceId}-${availableCapacity.replace('GB', 'gb')}-${productDetails.color}`}
                              state={state}
                              key={availableCapacity}
                              className={classNames(
                                'product-details__selector-memory',
                                {
                                  'product-details__selector-memory--selected':
                                  productMemory
                                    ? availableCapacity === productMemory
                                    : availableCapacity
                                    === productDetails.capacity,
                                },
                              )}
                              onClick={() => {
                                setProductMemory(availableCapacity);
                              }}
                            >
                              {availableCapacity.replace('GB', ' GB')}
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="product-details__info">
                        <div
                          className="product-details__info-price-and-buttons"
                        >
                          {state
                            ? (
                              <div className="product-details__info-price">
                                <div
                                  className="product-details__info-price-new"
                                >
                                  {`$${productDetails?.priceDiscount}`}
                                </div>

                                <div
                                  className="product-details__info-price-old"
                                >
                                  {`$${productDetails?.priceRegular}`}
                                </div>
                              </div>
                            )
                            : (
                              <div
                                className="product-details__info-price"
                              >
                                <div
                                  className="product-details__info-price-new"
                                >
                                  {`$${productDetails?.priceRegular}`}
                                </div>
                              </div>
                            )}

                          <div className="product-details__info-buttons">
                            <button
                              type="button"
                              onClick={() => {
                                setIsSelectedToCard(!isSelectedToCard);
                              }}
                              className={classNames(
                                'product-details__info-buttons-card',
                                isSelectedToCard
                                  // eslint-disable-next-line max-len
                                  ? 'product-details__info-buttons-card--selected'
                                  // eslint-disable-next-line max-len
                                  : 'product-details__info-buttons-card--not-selected',
                              )}
                            >
                              {isSelectedToCard
                                ? 'Added to card'
                                : 'Add to card'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setIsSelectedToFav(!isSelectedToFav);
                              }}
                              className={classNames(
                                'product-details__info-buttons-fav',
                                isSelectedToFav
                                  // eslint-disable-next-line max-len
                                  ? 'product-details__info-buttons-fav--selected'
                                  // eslint-disable-next-line max-len
                                  : 'product-details__info-buttons-fav--not-selected',
                              )}
                            />
                          </div>
                        </div>

                        <div className="product-details__info-params">
                          {techSpecs.slice(0, 4).map(({ title, value }) => (
                            <div
                              className="product-details__info-param"
                              key={value}
                            >
                              <div
                                className="product-details__info-param-title"
                              >
                                {title}
                              </div>

                              <div
                                className="product-details__info-param-value"
                              >
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="product-details__id">
                      {`ID:${productDetails.priceDiscount}${productDetails.priceRegular}`}
                    </div>
                  </div>

                  <div
                    className="product-details__about-and-techs-specs-sections"
                  >
                    <div
                      className="product-details__about"
                      data-cy="productDescription"
                    >
                      <div
                        className="product-details__about-main-title"
                      >
                        About
                      </div>

                      <div className="product-details__about-body">
                        {productDetails.description.map(({ title, text }) => (
                          <div
                            className="product-details__about-body-desc"
                            key={title}
                          >
                            <div
                              className="product-details__about-body-desc-title"
                            >
                              {title}
                            </div>

                            <div
                              className="product-details__about-body-desc-texts"
                            >
                              {text.map(paragraph => (
                                <div
                                  key={paragraph}
                                  className={classNames(
                                    'product-details__about-body-desc-texts'
                                    + '-paragraph',
                                  )}
                                >
                                  {paragraph}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="product-details__tech-specs"
                    >
                      <div className="product-details__tech-specs-main-title">
                        Tech specs
                      </div>

                      <div className="product-details__tech-specs-container">
                        {techSpecs.map(({ title, value }) => (
                          <div
                            key={value}
                            className="product-details__tech-specs-body"
                          >
                            <div
                              className="product-details__tech-specs-body-title"
                            >
                              {title}
                            </div>

                            <div
                              className="product-details__tech-specs-body-value"
                            >
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <ProductsSlider
                    name="You may also like"
                    goods={shuffledProducts}
                    useDiscount
                    setCartLength={setCartLength}
                    setFavLength={setFavLength}
                  />
                </>
              )
              : (
                <div
                  className="product-details__not-found-product"
                >
                  {`${category} was not found`}
                </div>
              )}
          </div>
        )}
    </>
  );
};
