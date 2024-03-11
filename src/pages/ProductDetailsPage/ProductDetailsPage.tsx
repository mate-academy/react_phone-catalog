/* eslint-disable max-len */
import { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import cn from 'classnames';

import './index.scss';
import { StateStore } from '../../store/StoreContext';
import { Action } from '../../types/Action';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { getSuggestedProducts } from '../../helpers/getSuggestedProducts';
import { ProductDetails } from '../../types/ProductDetails';
import { getProductById } from '../../api/products';
import { BASE_API_URL } from '../../utils/fetch';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { ICONS } from '../../images';
import { COLOR_HEX } from '../../utils/colorHex';

export const ProductDetailsPage = () => {
  const { pathname } = useLocation();
  const { productId = '' } = useParams();

  const { products, isError, actionHandler } = useContext(StateStore);

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');

  const currentProduct = products.find(item => item.itemId === productId);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const toggleFavoriteHandler = () => {
    if (currentProduct) {
      actionHandler(currentProduct, Action.toggleFavorite);
    }
  };

  const toggleCartHandler = () => {
    if (currentProduct) {
      actionHandler(currentProduct, Action.toggleCart);
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

      {!isLoading && isError && <ErrorMessage />}

      {!isLoading && !isError && (
        <>
          <section className="productDetailsPage__nav">
            <div className="productDetailsPage__nav__top" data-cy="breadCrumbs">
              <Link to="/" className="productDetailsPage__nav__icon">
                <img src={ICONS.home} alt="Home" />
              </Link>
              <img src={ICONS.arrowRightDisabled} alt="Arrow right" />

              <Link
                to={`/${paths[0]}`}
                className="productDetailsPage__nav__link text"
              >
                {paths[0]}
              </Link>
              <img src={ICONS.arrowRightDisabled} alt="Arrow right" />

              <p className="productDetailsPage__nav__path text">
                {paths[1].split('-').join(' ')}
              </p>
            </div>

            <div className="productDetailsPage__nav__bottom">
              <Link
                to=".."
                className="productDetailsPage__nav__link"
                data-cy="backButton"
              >
                <img src={ICONS.arrowLeft} alt="Arrow back" />

                <p className="productDetailsPage__nav__link__text text">Back</p>
              </Link>
            </div>
          </section>

          {product && currentProduct ? (
            <section className="productDetailsPage__content">
              <header className="productDetailsPage__content__header">
                <h1>{product.name}</h1>
              </header>

              <main className="productDetailsPage__content__main">
                <div className="productDetailsPage__content__main__info">
                  <div className="productDetailsPage__content__left-panel">
                    {product.images.map(image => (
                      <button
                        key={image}
                        type="button"
                        className={cn(
                          'button productDetailsPage__content__left-panel__button',
                          {
                            'productDetailsPage__content__left-panel__button--active':
                              image === selectedImage,
                          },
                        )}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={`${BASE_API_URL + image}`}
                          alt="View"
                          className="productDetailsPage__content__left-panel__image"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="productDetailsPage__content__main">
                    <img
                      src={`${BASE_API_URL + selectedImage}`}
                      alt="Main"
                      className="productDetailsPage__content__main__image"
                    />
                  </div>

                  <div className="productDetailsPage__content__info">
                    <section className="productDetailsPage__content__info__colors">
                      <p className="productDetailsPage__content__info__colors__text text">
                        Available colors
                      </p>

                      <div className="productDetailsPage__content__info__colors__available">
                        {product.colorsAvailable.map(color => {
                          const colorPath = pathname.split('-');

                          colorPath.splice(colorPath.length - 1, 1, color);

                          const newPath = colorPath.join('-');

                          return (
                            <Link
                              to={newPath}
                              key={color}
                              className={cn(
                                'productDetailsPage__content__info__colors__link',
                                {
                                  'productDetailsPage__content__info__colors__link--active':
                                    product.color === color,
                                },
                              )}
                            >
                              <div
                                style={{ backgroundColor: COLOR_HEX[color] }}
                                className="productDetailsPage__content__info__colors__color"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    </section>

                    <div className="productDetailsPage__content__info__divider" />
                    <section className="productDetailsPage__content__info__capacity">
                      <p className="productDetailsPage__content__info__capacity__text text">
                        Select capacity
                      </p>

                      <div className="productDetailsPage__content__info__capacity__available">
                        {product.capacityAvailable.map(capacity => {
                          const capacityPath = pathname.split('-');

                          const index = capacityPath.findIndex(el =>
                            el.match(/[1-9]gb/),
                          );

                          capacityPath.splice(index, 1, capacity.toLowerCase());

                          const newPath = capacityPath.join('-');

                          return (
                            <Link
                              to={newPath}
                              key={capacity}
                              className={cn(
                                'productDetailsPage__content__info__capacity__link',
                                {
                                  'productDetailsPage__content__info__capacity__link--active':
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

                    <div className="productDetailsPage__content__info__divider" />

                    <section className="productDetailsPage__content__info__store">
                      <div className="productDetailsPage__content__info__store__price">
                        <h1>{`$${product.priceDiscount}`}</h1>
                        <h1 className="productDetailsPage__content__info__store__price--full">
                          {`$${product.priceRegular}`}
                        </h1>
                      </div>

                      <div className="productDetailsPage__content__info__store__buttons">
                        <button
                          type="button"
                          className={cn(
                            'productDetailsPage__content__info__store__buttons__cart',
                            {
                              'productDetailsPage__content__info__store__buttons__cart--active':
                                currentProduct.addedToCart,
                            },
                          )}
                          onClick={toggleCartHandler}
                        >
                          {currentProduct.addedToCart
                            ? 'Added to cart'
                            : 'Add to cart'}
                        </button>

                        <button
                          data-cy="addToFavorite"
                          type="button"
                          className={cn(
                            'button productDetailsPage__content__info__store__buttons__favorite',
                            {
                              'productDetailsPage__content__info__store__buttons__favorite--active':
                                currentProduct.addedToFavorites,
                            },
                          )}
                          onClick={toggleFavoriteHandler}
                        >
                          <img
                            src={
                              currentProduct.addedToFavorites
                                ? ICONS.favoriteSelected
                                : ICONS.favorite
                            }
                            alt="Favorites"
                            className="productDetailsPage__content__info__store__buttons__icon"
                          />
                        </button>
                      </div>
                    </section>

                    <section className="productDetailsPage__content__info__details">
                      <div className="productDetailsPage__content__info__details__block">
                        <p className="productDetailsPage__content__info__details__name text">
                          Screen
                        </p>
                        <p className="productDetailsPage__content__info__details__value text">
                          {product.screen}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__info__details__block">
                        <p className="productDetailsPage__content__info__details__name text">
                          Resolution
                        </p>
                        <p className="productDetailsPage__content__info__details__value text">
                          {product.capacity}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__info__details__block">
                        <p className="productDetailsPage__content__info__details__name text">
                          Processor
                        </p>
                        <p className="productDetailsPage__content__info__details__value text">
                          {product.processor}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__info__details__block">
                        <p className="productDetailsPage__content__info__details__name text">
                          RAM
                        </p>
                        <p className="productDetailsPage__content__info__details__value text">
                          {product.ram}
                        </p>
                      </div>
                    </section>
                  </div>

                  <div className="productDetailsPage__content__id">
                    <p className="productDetailsPage__content__id__text text">
                      {`ID: ${currentProduct.id}`}
                    </p>
                  </div>
                </div>

                <div className="productDetailsPage__content__main__description">
                  <section
                    className="productDetailsPage__content__main__description__about"
                    data-cy="productDescription"
                  >
                    <div className="productDetailsPage__content__main__description__about__title">
                      <h2>About</h2>

                      <div className="productDetailsPage__content__main__description__divider" />
                    </div>
                    {product.description.map(detail => {
                      const { title, text } = detail;
                      const key = Math.random();

                      return (
                        <div
                          className="productDetailsPage__content__main__description__about__details"
                          key={key}
                        >
                          <h3 className="productDetailsPage__content__main__description__about__details__title">
                            {title}
                          </h3>

                          <div className="productDetailsPage__content__main__description__about__details__description">
                            {text.map(item => (
                              <p
                                className="productDetailsPage__content__main__description__about__details__text"
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

                  <section className="productDetailsPage__content__main__description__specs">
                    <div className="productDetailsPage__content__main__description__specs__title">
                      <h2>Tech specs</h2>

                      <div className="productDetailsPage__content__main__description__divider" />
                    </div>

                    <div className="productDetailsPage__content__main__description__specs__details">
                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Screen
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.screen}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Resolution
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.resolution}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Processor
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.processor}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          RAM
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.ram}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Built in memory
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.capacity}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Camera
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.camera}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Zoom
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
                          {product.zoom}
                        </p>
                      </div>

                      <div className="productDetailsPage__content__main__description__specs__details__params">
                        <p className="productDetailsPage__content__main__description__specs__details__params__name">
                          Cell
                        </p>
                        <p className="productDetailsPage__content__main__description__specs__details__params__value">
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
            // <ProductNotFound category="Phone" />
            <h1>123</h1>
          )}
        </>
      )}
    </div>
  );
};
