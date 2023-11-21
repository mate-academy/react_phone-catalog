import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import { ICONS } from '../icons';
import { GlobalContext } from '../store/GlobalContext';
import { getProductDetails } from '../helpers/ProductServices';
import { Loader } from '../components/Loader';
import { ProductDetails } from '../type/ProductDetails';
import { BASE_URL, colorsHex } from '../utils/const';
import ProductsSlider from '../components/ProductsSlider/ProductsSlider';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  const {
    products,
    hasError,
    setHasError,
    handleChooseCart,
  } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPhone, setSelectedPhone]
    = useState<ProductDetails | null>(null);
  const generalProduct = productId
    ? products.find(el => el.phoneId === productId)
    : null;
  const [currentImage, setCurrentImage] = useState<string | undefined>('');
  const youMayLike = products.filter(el => el.id !== productId).slice(0, 10);

  useEffect(() => {
    const fetchData = async () => {
      setHasError('');
      setIsLoading(true);
      setCurrentImage('');

      try {
        const loadedProduct = await getProductDetails(productId);

        setSelectedPhone(loadedProduct);
        setIsLoading(false);
      } catch {
        setHasError('Phone was not found');
        setIsLoading(false);
        setTimeout(() => {
          navigate('..');
        }, 2000);
      }
    };

    if (!generalProduct) {
      setHasError('There is no details');
      setTimeout(() => {
        setHasError('');
      }, 2000);
    }

    fetchData();
  }, [pathname]);

  function goBack() {
    navigate(-1);
  }

  function getChangeAvailables(value: string, name: string) {
    const currentProductId = productId;
    const newProductId = currentProductId?.split('-');

    if (name === 'color' && newProductId) {
      newProductId[newProductId.length - 1] = value.toLowerCase();
    }

    if (name === 'memory' && newProductId) {
      newProductId[newProductId.length - 2] = value.toLowerCase();
    }

    return `/phones/${newProductId?.join('-')}`;
  }

  return (
    <div className="container">
      <div className="product-details App__product-details">
        <div className="product-details__nav-wrap">
          <div className="page-navigation">
            <Link to="/" className="page-navigation__link">
              <img src={ICONS.home_icon} alt="to home page" className="icon" />
            </Link>
            <img src={ICONS.arrow} alt="icon" className="icon icon--right" />
            <Link
              to={{ pathname: '..', search: state?.search }}
              className="page-navigation__link"
            >
              <p className="page-navigation__text">
                Phones
              </p>
            </Link>
            <img src={ICONS.arrow} alt="icon" className="icon icon--right" />
            <p
              className="page-navigation__text"
            >
              {selectedPhone?.name}
            </p>
          </div>

          <div className="page-navigation">
            <button
              type="button"
              data-cy="backButton"
              className="button button--direction button--details-page"
              onClick={() => goBack()}
            >
              <img src={ICONS.arrow} alt="icon" className="icon icon--left" />
              <p className="page-navigation__text">Back</p>
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        {!isLoading && hasError && (
          <p><strong>{hasError}</strong></p>
        )}

        {!isLoading && !hasError && (
          <>
            <div className="product-details__body">
              <h1 className="title title--h1">{selectedPhone?.name}</h1>

              <section className="product-details__main">
                <div className="product-details__left-box">
                  {selectedPhone?.images.map(img => (
                    <button
                      type="button"
                      className="button--slide-details"
                      key={img}
                      onClick={() => setCurrentImage(img)}
                    >
                      <img
                        src={`${BASE_URL}${img}`}
                        alt="Small phone banner"
                        className="product-details__small-images"
                      />
                    </button>
                  ))}
                </div>

                <div className="product-details__main-box">
                  <img
                    className="product-details__main-image"
                    src={currentImage
                      ? `${BASE_URL}${currentImage}`
                      : `${BASE_URL}${selectedPhone?.images[0]}`}
                    alt="Main phone banner"
                  />
                </div>

                <div className="product-details__right-box">
                  <div className="product-details__available">
                    <p className="product-details__available-text">
                      Available colors
                    </p>

                    <ul className="product-details__available-list">
                      {selectedPhone?.colorsAvailable.map(color => (
                        <Link
                          to={getChangeAvailables(color, 'color')}
                          className={
                            cn('product-details__available-item--color', {
                              'product-details__available-item--select':
                                selectedPhone.color === color,
                            })
                          }
                          key={color}
                        >
                          <div
                            className="
                              product-details__available-item--bc-color
                            "
                            style={{ backgroundColor: colorsHex[color] }}
                          />
                        </Link>
                      ))}
                    </ul>
                  </div>

                  <div className="product-details__break-line" />

                  <div className="product-details__available">
                    <p className="product-details__available-text">
                      Select capacity
                    </p>

                    <ul className="product-details__available-list">
                      {selectedPhone?.capacityAvailable.map(memory => (
                        <Link
                          to={getChangeAvailables(memory, 'memory')}
                          className={
                            cn('product-details__available-item--memory',
                              'product-details__available--body-text',
                              {
                                'product-details__available-item--active':
                                  selectedPhone.capacity === memory,
                              })
                          }
                          key={memory}
                        >
                          {memory}
                        </Link>
                      ))}
                    </ul>
                  </div>

                  <div className="product-details__break-line" />

                  <div className="product-details__price">
                    <p className="product-details__price--discount">{`$${selectedPhone?.priceDiscount}`}</p>
                    <p className="product-details__price--regular">
                      <s>{`$${selectedPhone?.priceRegular}`}</s>
                    </p>
                  </div>

                  <div className="product-details__btns">
                    <div className="product-details__btns-container">
                      <button
                        type="button"
                        className={cn('button button--big button--details', {
                          'button--selected': generalProduct?.inCart,
                        })}
                        onClick={() => generalProduct && handleChooseCart(
                          generalProduct, 'addCard',
                        )}
                      >
                        <p className="button__text">
                          {generalProduct?.inCart
                            ? 'You`ve added'
                            : 'Added to cart'}
                        </p>
                      </button>

                      <button
                        type="button"
                        className="
                        button button--product-details-favourites button--hover
                      "
                        onClick={() => generalProduct && handleChooseCart(
                          generalProduct, 'favourites',
                        )}
                      >
                        <img
                          alt="favourites"
                          src={
                            generalProduct?.inFavourite
                              ? ICONS.favourites_like
                              : ICONS.favourites
                          }
                          className="icon icon--hover"
                        />
                      </button>
                    </div>
                  </div>

                  <table className="short-specs">
                    <tbody>
                      <tr>
                        <td className="
                        short-specs__name
                        short-specs__name--small-text
                      "
                        >
                          Screen
                        </td>
                        <td className="
                        short-specs__details
                        short-specs__details--small-text
                      "
                        >
                          {selectedPhone?.screen}
                        </td>
                      </tr>
                      <tr>
                        <td className="
                        short-specs__name
                        short-specs__name--small-text
                      "
                        >
                          Resolution
                        </td>
                        <td className="
                        short-specs__details
                        short-specs__details--small-text
                      "
                        >
                          {selectedPhone?.resolution}
                        </td>
                      </tr>
                      <tr>
                        <td className="
                        short-specs__name
                        short-specs__name--small-text
                      "
                        >
                          Processor
                        </td>
                        <td className="
                        short-specs__details
                        short-specs__details--small-text
                      "
                        >
                          {selectedPhone?.processor}
                        </td>
                      </tr>
                      <tr>
                        <td className="short-specs__name">
                          RAM
                        </td>
                        <td className="
                        short-specs__details
                        short-specs__details--small-text
                      "
                        >
                          {selectedPhone?.ram}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="product-details__id">
                  <p
                    className="
                  product-details__text
                  product-details__text--small-text
                  "
                  >
                    ID:802390
                  </p>
                </div>
              </section>

              <section
                className="product-details__description"
                data-cy="productDescription"
              >
                <div
                  className="product-details__about"
                >
                  <h2
                    className="
                      title
                      title--h2
                      product-details__about-title
                    "
                  >
                    About
                  </h2>

                  <div className="product-details__about-description">
                    <div className="product-details__break-line" />

                    {selectedPhone?.description.map(el => (
                      <div
                        className="product-details__about-article"
                        key={el.title}
                      >
                        <h3 className="title title--h2">
                          {el.title}
                        </h3>

                        <p className="product-details__about-text">
                          {el.text.map((paragraph: string) => (
                            <React.Fragment key={paragraph}>
                              {paragraph}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="product-details__specs">
                  <h2 className="
                  title
                  title--h2
                  product-details__specs-title
                "
                  >
                    Specs
                  </h2>

                  <div className="product-details__specs-description">
                    <div className="product-details__break-line" />

                    <table className="short-specs">
                      <tbody>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            Screen
                          </td>
                          <td
                            className="
                              short-specs__details
                              short-specs__details--body-text
                            "
                          >
                            {selectedPhone?.screen}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            Resolution
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text
                          "
                          >
                            {selectedPhone?.resolution}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            Processor
                          </td>
                          <td
                            className="
                              short-specs__details
                              short-specs__details--body-text
                            "
                          >
                            {selectedPhone?.processor}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            RAM
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text
                          "
                          >
                            {selectedPhone?.ram}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            Built in memory
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text
                          "
                          >
                            {generalProduct?.capacity}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text
                          "
                          >
                            Camera
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text
                          "
                          >
                            {selectedPhone?.camera}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                            short-specs__name
                            short-specs__name--body-text"
                          >
                            Zoom
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text"
                          >
                            {selectedPhone?.zoom}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="
                          short-specs__name
                          short-specs__name--body-text"
                          >
                            Cell
                          </td>
                          <td
                            className="
                            short-specs__details
                            short-specs__details--body-text"
                          >
                            {selectedPhone?.cell.map((el, index) => (
                              <React.Fragment key={el}>
                                {index !== selectedPhone.cell.length - 1 ? (
                                  <>
                                    {`${el}, `}
                                  </>
                                ) : (
                                  el
                                )}
                              </React.Fragment>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            <section className="product-details__you-may-like">
              <ProductsSlider
                items={youMayLike}
                sliderTitle="You may also like"
              />
            </section>
          </>
        )}
      </div>
    </div>
  );
};
