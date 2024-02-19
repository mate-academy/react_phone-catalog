/* eslint-disable max-len */
import { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom'
import { ProductDetails } from '../../types/ProductDetails';
import { StateStore } from '../../store/StoreContext';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { getProductById } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ICONS } from '../../images/icons/icons';
import classNames from 'classnames';
import { BASE_API_URL } from '../../utils/fetch';
import { COLOR_HEX } from '../../utils/colorHex';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ProductNotFound } from '../../components/ProductNotFound/ProductNotFound';
import './ProductDetailsPage.scss';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(true);
  const { products, handleAction, isError } = useContext(StateStore);
  const [selectedImage, setSelectedImage] = useState('');

  const productFromStorage = products.find(item => item.itemId === productId);

  const paths = pathname.slice(1).split('/');

  const suggestedProducts = getSuggestedProducts(products, productId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const newProduct = await getProductById(productId);

        if (!mounted) {
          return;
        }

        setProduct(newProduct);
      } catch {
        setProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    setMounted(true);

    fetchData();

    return () => {
      setMounted(false);
    };
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const onFavouritesClick = () => {
    if (productFromStorage) {
      handleAction(productFromStorage, 'favourites');
    }
  };

  const onCartClick = () => {
    if (productFromStorage) {
      handleAction(productFromStorage, 'cart');
    }
  };

  return (
    <div
    className="productDetailsPage"
    style={{ justifyContent: isLoading ? 'center' : 'start' }}
  >
      {isLoading && (
        <div className="productDetailsPage__loader">
          <Loader />
        </div>
      )}

      {(!isLoading && isError) && (
        <ErrorMessage />
      )}

      {!isLoading && !isError && (
        <>
          <section className="productDetailsPage__navigation">
            <div
              className="productDetailsPage__navigation--top"
              data-cy="breadCrumbs"
            >
              <Link to="/" className="productDetailsPage__navigation--icon">
                <img
                  src={ICONS.home}
                  alt="Home" />
              </Link>
              <img
                src={ICONS.arrowRightDisabled}
                alt="Arrow right"
              />

              <Link to={`/${paths[0]}`} className="smallText productDetailsPage__navigation--link">
                {paths[0]}
              </Link>
              <img
                src={ICONS.arrowRightDisabled}
                alt="Arrow right"
              />

              <p className="smallText productDetailsPage__navigation--path">
                {paths[1].split('-').join(' ')}
              </p>
            </div>

            <div className="productDetailsPage__navigation--bottom">
              <Link
                to="../"
                className="button productDetailsPage__navigation--link"
                data-cy="backButton"
              >
                <img src={ICONS.arrowLeft} alt="Arrow back" />

                <p className="smallText productDetailsPage__navigation--link--text">
                  Back
                </p>
              </Link>
            </div>
          </section>

          {(product && productFromStorage)
            ? (
              <section className="productDetailsPage__content">
                <header className="productDetailsPage__content__header">
                  <h1>
                    {product.name}
                  </h1>
                </header>

                <main className="productDetailsPage__content__main">
                  <div className="productDetailsPage__content__main__info">
                    <div className="productDetailsPage__content--side-panel">
                      {product.images.map(image => (
                        <button
                          key={image}
                          type="button"
                          className={classNames(
                            'button productDetailsPage__content--side-panel--button', {
                              'productDetailsPage__content--side-panel--button--active': image === selectedImage,
                          })}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={`${BASE_API_URL + image}`}
                            alt="View"
                            className="productDetailsPage__content--side-panel--image"
                          />
                        </button>
                      ))}
                    </div>

                    <div className="productDetailsPage__content--main">
                      <img
                        src={`${BASE_API_URL + selectedImage}`}
                        alt="Main"
                        className="productDetailsPage__content--main--image"
                      />
                    </div>

                    <div className="productDetailsPage__content--info">
                      <section className="productDetailsPage__content--info__colors">
                        <p className="smallText productDetailsPage__content--info__colors--text">
                          Available colors
                        </p>

                        <div className="productDetailsPage__content--info__colors--available">
                          {product.colorsAvailable.map(color => {
                            const colorPath = pathname.split('-');

                            colorPath.splice(colorPath.length - 1, 1, color);

                            const newPath = colorPath.join('-');

                            return (
                              <Link
                                to={newPath}
                                key={color}
                                className={classNames(
                                  'productDetailsPage__content--info__colors--link', {
                                  'productDetailsPage__content--info__colors--link--active': product.color === color,
                                },
                                )}
                              >
                                <div
                                  style={{ backgroundColor: COLOR_HEX[color] }}
                                  className="productDetailsPage__content--info__colors--color"
                                />
                              </Link>
                            );
                          })}
                        </div>
                      </section>

                      <div className="productDetailsPage__content--info__line" />
                      <section className="productDetailsPage__content--info__capacity">
                        <p className="smallText productDetailsPage__content--info__capacity--text">
                          Select capacity
                        </p>

                        <div className="productDetailsPage__content--info__capacity--available">
                          {product.capacityAvailable.map(capacity => {
                            const capacityPath = pathname.split('-');

                            const index = capacityPath.findIndex(el => el.match(/[1-9]gb/));

                            capacityPath.splice(index, 1, capacity.toLowerCase());

                            const newPath = capacityPath.join('-');

                            return (
                              <Link
                                to={newPath}
                                key={capacity}
                                className={classNames(
                                  'productDetailsPage__content--info__capacity--link', {
                                  'productDetailsPage__content--info__capacity--link--active': product.capacity === capacity,
                                })}
                              >
                                {capacity}
                              </Link>
                            );
                          })}
                        </div>
                      </section>

                      <div className="productDetailsPage__content--info__line" />

                      <section className="productDetailsPage__content--info__store">
                        <div className="productDetailsPage__content--info__store--price">
                          <h1 className="productDetailsPage__content--info__store--price--discount">
                            {`$${product.priceDiscount}`}
                          </h1>
                          <h1 className="productDetailsPage__content--info__store--price--full">
                            {`$${product.priceRegular}`}
                          </h1>
                        </div>

                        <div className="productDetailsPage__content--info__store--buttons">
                          <button
                            type="button"
                            className={classNames('button productDetailsPage__content--info__store--buttons--cart', {
                              'productDetailsPage__content--info__store--buttons--cart--active': productFromStorage.addedToCart,
                            })}
                            onClick={onCartClick}
                          >
                            {
                              productFromStorage.addedToCart
                                ? (
                                  'Added to cart'

                                ) : (
                                  'Add to cart'
                                )
                            }
                          </button>

                          <button
                            data-cy="addToFavorite"
                            type="button"
                            className={classNames('button productDetailsPage__content--info__store--buttons--favourite', {
                              'productDetailsPage__content--info__store--buttons--favourite--active': productFromStorage.addedToFavourites,
                            })}
                            onClick={onFavouritesClick}
                          >
                            <img
                              src={
                                productFromStorage.addedToFavourites
                                  ? ICONS.favouritesSelected
                                  : ICONS.favourites
                              }
                              alt="Favourites"
                              className="productDetailsPage__content--info__store--buttons--icon"
                            />
                          </button>
                        </div>
                      </section>

                      <section className="productDetailsPage__content--info__details">
                        <div className="productDetailsPage__content--info__details--block">
                          <p
                            className="smallText productDetailsPage__content--info__details--name"
                          >
                            Screen
                          </p>
                          <p
                            className="smallText productDetailsPage__content--info__details--value"
                          >
                            {product.screen}
                          </p>
                        </div>

                        <div className="productDetailsPage__content--info__details--block">
                          <p
                            className="smallText productDetailsPage__content--info__details--name"
                          >
                            Resolution
                          </p>
                          <p
                            className="smallText productDetailsPage__content--info__details--value"
                          >
                            {product.capacity}
                          </p>
                        </div>

                        <div className="productDetailsPage__content--info__details--block">
                          <p
                            className="smallText productDetailsPage__content--info__details--name"
                          >
                            Processor
                          </p>
                          <p
                            className="smallText productDetailsPage__content--info__details--value"
                          >
                            {product.processor}
                          </p>
                        </div>

                        <div className="productDetailsPage__content--info__details--block">
                          <p
                            className="smallText productDetailsPage__content--info__details--name"
                          >
                            RAM
                          </p>
                          <p
                            className="smallText productDetailsPage__content--info__details--value"
                          >
                            {product.ram}
                          </p>
                        </div>
                      </section>
                    </div>

                    <div className="productDetailsPage__content--id">
                      <p className="smallText productDetailsPage__content--id--text">
                        {`ID: ${productFromStorage.id}`}
                      </p>
                    </div>
                  </div>

                  <div className="productDetailsPage__content__main__description">
                    <section
                      className="productDetailsPage__content__main__description--about"
                      data-cy="productDescription"
                    >
                      <div className="productDetailsPage__content__main__description--about--title">
                        <h2>About</h2>

                        <div className="productDetailsPage__content__main__description--line" />
                      </div>
                      {
                        product.description.map(detail => {
                          const { title, text } = detail;
                          const key = Math.random();

                          return (
                            <div className="productDetailsPage__content__main__description--about--details" key={key}>
                              <h3 className="productDetailsPage__content__main__description--about--details--title">
                                {title}
                              </h3>

                              <div className="productDetailsPage__content__main__description--about--details--description">
                                {
                                  text.map(item => (
                                    <p className="productDetailsPage__content__main__description--about--details--text" key={item}>
                                      {item}
                                    </p>
                                  ))
                                }
                              </div>
                            </div>
                          );
                        })
                      }
                    </section>

                    <section className="productDetailsPage__content__main__description--specs">
                      <div className="productDetailsPage__content__main__description--specs--title">
                        <h2>Tech specs</h2>

                        <div className="productDetailsPage__content__main__description--line" />
                      </div>

                      <div className="productDetailsPage__content__main__description--specs--details">
                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Screen
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.screen}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Resolution
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.resolution}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Processor
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.processor}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            RAM
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.ram}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Built in memory
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.capacity}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Camera
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.camera}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Zoom
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.zoom}
                          </p>
                        </div>

                        <div className="productDetailsPage__content__main__description--specs--details--param">
                          <p className="productDetailsPage__content__main__description--specs--details--param--name">
                            Cell
                          </p>
                          <p className="productDetailsPage__content__main__description--specs--details--param--value">
                            {product.cell.join(', ')}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </main>

                <footer>
                  <ProductsSlider
                    title="You may also like"
                    products={suggestedProducts}
                  />
                </footer>
              </section>
            ) : (
              <ProductNotFound category="Phone" />
            )
          }
        </>
      )}
  </div>
  );
};
