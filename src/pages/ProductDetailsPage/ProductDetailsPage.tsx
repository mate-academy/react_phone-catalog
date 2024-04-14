/* eslint-disable max-len */
import './ProductDetailsPage.scss';
import cn from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/productDetails';
import { ProductState } from '../../store/storeContext';
import { getSuggestedProducts } from '../../helpers/helpers';
import {
  // getProductById,
  getProductsByCategory as productsByCategory,
} from '../../apiHelper/product';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ICONS } from '../../images/icons/Icons';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { COLOR_HEX } from '../../utils/colorHex';
import { ProductNotFound } from '../../components/ProductNotFound/ProductNotFound';
// import { BASE_API_URL } from '../../utils/fetch';

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(true);
  const { products, handleAction, hasError } = useContext(ProductState);
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  const productFromStorage = products.find(item => item.itemId === productId);

  const paths = pathname.slice(1).split('/');
  const category = paths[0];
  const suggestedProducts = getSuggestedProducts(products, productId, category);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const newProducts = await productsByCategory(category);

        const locatedProduct =
          newProducts.find(item => item.id === productId) || null;

        if (!mounted) {
          return;
        }

        setProduct(locatedProduct);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="productDetailsPage__container">
        {isLoading && (
          <div className="productDetailsPage__loader">
            <Loader />
          </div>
        )}
        {!isLoading && hasError && <ErrorMessage />}
        {!isLoading && !hasError && (
          <>
            <section className="productDetailsPage__navigation">
              <div
                className="productDetailsPage__navigation--top"
                data-cy="breadCrumbs"
              >
                <Link to="/" className="productDetailsPage__navigation--icon">
                  <img src={ICONS.home} alt="Home" />
                </Link>
                <img src={ICONS.arrowRightDisabled} alt="Arrow right" />
                <Link
                  to={`/${paths[0]}`}
                  className="smallText productDetailsPage__navigation--link"
                >
                  {paths[0]}
                </Link>
                <img src={ICONS.arrowRightDisabled} alt="Arrow right" />
                <p className="smallText productDetailsPage__navigation--path">
                  {paths[1].split('-').join(' ')}
                </p>
              </div>
              <div className="productDetailsPage__navigation--bottom">
                <Link
                  to="."
                  onClick={() => navigate(-1)}
                  className="productDetailsPage__navigation--link"
                  data-cy="backButton"
                >
                  <img src={ICONS.arrowLeft} alt="Arrow back" />
                  <p className="smallText productDetailsPage__navigation--link--text">
                    Back
                  </p>
                </Link>
              </div>
            </section>
            {product && productFromStorage ? (
              <section className="productDetailsPage__content">
                <header className="productDetailsPage__content__header">
                  {product.name}
                </header>
                <main className="productDetailsPage__content__main">
                  <div className="productDetailsPage__content__main__info">
                    <div className="productDetailsPage__content--side-panel">
                      {product.images.map(image => (
                        <button
                          key={image}
                          type="button"
                          className={cn(
                            'button productDetailsPage__content--side-panel--button',
                            {
                              'productDetailsPage__content--side-panel--button--active':
                                image === selectedImage,
                            },
                          )}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={`${image}`}
                            alt="View"
                            className="productDetailsPage__content--side-panel--image"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="productDetailsPage__content--main">
                      <img
                        src={`${selectedImage}`}
                        alt="Main"
                        className="productDetailsPage__content--main--image"
                      />
                    </div>
                    <div className="productDetailsPage__content--side-panel--mobile">
                      {product.images.map(image => (
                        <button
                          key={image}
                          type="button"
                          className={cn(
                            'button productDetailsPage__content--side-panel--button',
                            {
                              'productDetailsPage__content--side-panel--button--active':
                                image === selectedImage,
                            },
                          )}
                          onClick={() => setSelectedImage(image)}
                        >
                          <img
                            src={`${image}`}
                            alt="View"
                            className="productDetailsPage__content--side-panel--image"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="productDetailsPage__content--info">
                      <div className="productDetailsPage__content--info__colors--container">
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
                                  className={cn(
                                    'productDetailsPage__content--info__colors--link',
                                    {
                                      'productDetailsPage__content--info__colors--link--active':
                                        product.color === color,
                                    },
                                  )}
                                >
                                  <div
                                    style={{
                                      backgroundColor: COLOR_HEX[color],
                                    }}
                                    className="productDetailsPage__content--info__colors--color"
                                  />
                                </Link>
                              );
                            })}
                          </div>
                        </section>
                        <div className="productDetailsPage__content--id--mobile">
                          <p className="smallText productDetailsPage__content--id--text">
                            {`ID: ${productFromStorage.id}`}
                          </p>
                        </div>
                      </div>
                      <div className="productDetailsPage__content--info__line" />
                      <section className="productDetailsPage__content--info__capacity">
                        <p className="smallText productDetailsPage__content--info__capacity--text">
                          Select capacity
                        </p>
                        <div className="productDetailsPage__content--info__capacity--available">
                          {product.capacityAvailable.map(capacity => {
                            const capacityPath = pathname.split('-');
                            const index = capacityPath.findIndex(el =>
                              el.match(/[1-9]gb/),
                            );

                            capacityPath.splice(
                              index,
                              1,
                              capacity.toLowerCase(),
                            );
                            const newPath = capacityPath.join('-');

                            return (
                              <Link
                                to={newPath}
                                key={capacity}
                                className={cn(
                                  'productDetailsPage__content--info__capacity--link',
                                  {
                                    'productDetailsPage__content--info__capacity--link--active':
                                      product.capacity === capacity,
                                  },
                                )}
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
                          <div className="productDetailsPage__content--info__store--price--discount">
                            {`$${product.priceDiscount}`}
                          </div>
                          <div className="productDetailsPage__content--info__store--price--full">
                            {`$${product.priceRegular}`}
                          </div>
                        </div>
                        <div className="productDetailsPage__content--info__store--buttons">
                          <button
                            type="button"
                            className={cn(
                              'productDetailsPage__content--info__store--buttons--cart',
                              {
                                'productDetailsPage__content--info__store--buttons--cart--active':
                                  productFromStorage.addedToCart,
                              },
                            )}
                            onClick={onCartClick}
                          >
                            {productFromStorage.addedToCart
                              ? 'Added to cart'
                              : 'Add to cart'}
                          </button>
                          <button
                            data-cy="addToFavorite"
                            type="button"
                            className={cn(
                              'button productDetailsPage__content--info__store--buttons--favourite',
                              {
                                'productDetailsPage__content--info__store--buttons--favourite--active':
                                  productFromStorage.addedToFavourites,
                              },
                            )}
                            onClick={onFavouritesClick}
                          >
                            <img
                              src={
                                productFromStorage.addedToFavourites
                                  ? ICONS.favouriteFilled
                                  : ICONS.favourite
                              }
                              alt="Favourites"
                              className="productDetailsPage__content--info__store--buttons--icon"
                            />
                          </button>
                        </div>
                      </section>
                      <section className="productDetailsPage__content--info__details">
                        <div className="productDetailsPage__content--info__details--block">
                          <p className="smallText productDetailsPage__content--info__details--name">
                            Screen
                          </p>
                          <p className="smallText productDetailsPage__content--info__details--value">
                            {product.screen}
                          </p>
                        </div>
                        <div className="productDetailsPage__content--info__details--block">
                          <p className="smallText productDetailsPage__content--info__details--name">
                            Resolution
                          </p>
                          <p className="smallText productDetailsPage__content--info__details--value">
                            {product.capacity}
                          </p>
                        </div>
                        <div className="productDetailsPage__content--info__details--block">
                          <p className="smallText productDetailsPage__content--info__details--name">
                            Processor
                          </p>
                          <p className="smallText productDetailsPage__content--info__details--value">
                            {product.processor}
                          </p>
                        </div>
                        <div className="productDetailsPage__content--info__details--block">
                          <p className="smallText productDetailsPage__content--info__details--name">
                            RAM
                          </p>
                          <p className="smallText productDetailsPage__content--info__details--value">
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
                      {product.description.map(detail => {
                        const { title, text } = detail;
                        const key = Math.random();

                        return (
                          <div
                            className="productDetailsPage__content__main__description--about--details"
                            key={key}
                          >
                            <h3 className="productDetailsPage__content__main__description--about--details--title">
                              {title}
                            </h3>
                            <div className="productDetailsPage__content__main__description--about--details--description">
                              {text.map(item => (
                                <p
                                  className="productDetailsPage__content__main__description--about--details--text"
                                  key={item}
                                >
                                  {item}
                                </p>
                              ))}
                            </div>
                          </div>
                        );
                      })}
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
              <ProductNotFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};
