import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { CartContext } from '../../components/CartContext';
import { FavContext } from '../../components/FavContext';
import { Loader } from '../../components/Loader/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProduct } from '../../helpers/getProduct';
import { getProducts } from '../../helpers/getProducts';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import './ProductDetailsPage.scss';

interface Prices {
  currentPrice: number | null,
  oldPrice: number | null,
}

export const ProductDetailsPage: React.FC = () => {
  const favs = useContext(FavContext);
  const cart = useContext(CartContext);

  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [prices, setPrices] = useState<Prices>({
    currentPrice: null,
    oldPrice: null,
  });
  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [currentImg, setCurrentImg] = useState<string>('');
  const colorOptions = ['beige', 'teal', 'graphite', 'eggwhite'];
  const [selectedColor, setSelectedColor] = useState<string>('');
  const capacityOptions = ['64 GB', '256 GB', '512 GB'];
  const [selectedCapacity, setSelectCapacity] = useState<string>('');

  const inFavs = favs.favs.some(id => id === product?.id);
  const inCart = cart.cart.some(item => item.id === product?.id);

  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (productId) {
        setError(false);

        try {
          setIsLoading(true);
          const productResponse = getProducts().then(data => {
            setProducts(data);

            return data.find(
              (item: Product) => item.id === productId,
            );
          });

          const productDetailsResponse = await getProduct(productId);

          setProduct(
            await productResponse,
          );

          setProductDetails(productDetailsResponse);
          setCurrentImg(productDetailsResponse.images[0]);
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [productId]);

  useEffect(() => {
    const randomResult = [...products].sort(() => Math.random() - 0.5);

    setRandomProducts(randomResult.slice(0, 4));
  }, [products]);

  useEffect(() => {
    if (product) {
      const {
        price,
        discount,
      } = product;

      setPrices({
        currentPrice:
          discount ? price - (price * (discount / 100)) : price,
        oldPrice:
          discount ? price : null,
      });
    }
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {error ? (
        <h1>The product was not found...</h1>
      ) : (
        <>
          <div
            className="
          page__breadcrumbs
          page__breadcrumbs--product-details
        "
          >
            <Breadcrumbs />
          </div>

          <div className="page__back-button">
            <BackButton />
          </div>
          <div className="page__section product-details">
            <h1 className="
            page__title
            page__title--product-details
            product-page__title
          "
            >
              {productDetails?.name}
            </h1>

            <div className="product-details__content">
              <p className="product-details__id small-text">
                ID: 802390
              </p>
              <div className="product-details__thumbnails thumbnails">
                {productDetails?.images.map(imageUrl => (
                  <button
                    key={imageUrl}
                    aria-label="thumbnailBtn"
                    type="button"
                    className="thumbnails__item"
                    onClick={() => setCurrentImg(imageUrl)}
                  >
                    <img
                      className="thumbnails__image"
                      src={imageUrl}
                      alt=""
                    />
                  </button>
                ))}
              </div>
              <div className="product-details__image-container">
                <img
                  className="product-details__image"
                  src={currentImg}
                  alt=""
                />
              </div>
              <div className="product-details__options options">
                <div className="options__item">
                  <p className="options__title small-text">
                    Available colors
                  </p>
                  <div className="options__color-options colors">
                    {colorOptions.map(color => (
                      <button
                        key={`${color}`}
                        aria-label="colorSelBtn"
                        type="button"
                        className={classNames(
                          'color',
                          { 'color--active': color === selectedColor },
                        )}
                        onClick={() => setSelectedColor(color)}
                      >
                        <div className={
                          classNames(
                            'color__option',
                            `color__option--${color}`,
                          )
                        }
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="options__divider" />
                <div className="options__item">
                  <p className="options__title small-text">
                    Select capacity
                  </p>
                  <div className="options__capacity-options capacity">
                    {capacityOptions.map(capacity => (
                      <button
                        key={capacity}
                        aria-label="capacityOption"
                        type="button"
                        className={classNames(
                          'capacity__option',
                          {
                            'capacity__option--selected':
                              selectedCapacity === capacity,
                          },
                        )}
                        onClick={() => setSelectCapacity(capacity)}
                      >
                        {capacity}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="options__divider" />
                <div className="options__item price">
                  <div className="price__item--current">
                    {`$${prices?.currentPrice}`}
                  </div>
                  {prices.oldPrice && (
                    <div className="price__item--old">
                      {`$${prices.oldPrice}`}
                    </div>
                  )}
                </div>
                <div className="options__item buttons">
                  <button
                    aria-label="handleCartBtn"
                    type="button"
                    className={classNames(
                      'buttons__button',
                      'buttons__button--cart',
                      {
                        'buttons__button--cart_added':
                          inCart,
                      },
                    )}
                    onClick={() => {
                      if (product) {
                        cart.handleCart(product);
                      }
                    }}
                  >
                    {`Add${inCart ? 'ed' : ''} to cart`}
                  </button>
                  <button
                    aria-label="addToFavBtn"
                    data-cy="addToFavorite"
                    type="button"
                    className={classNames(
                      'buttons__button',
                      'buttons__button--fav',
                      {
                        'buttons__button--fav_added':
                          inFavs,
                      },
                    )}
                    onClick={() => {
                      if (product) {
                        favs.handleFavs(product.id);
                      }
                    }}
                  />
                </div>

                <div className="options__item features">
                  <div className="features__item">
                    <p className="features__name small-text">
                      Screen
                    </p>
                    <p className="features__value small-text">
                      {productDetails?.display.screenSize || '-'}
                    </p>
                  </div>
                  <div className="features__item">
                    <p className="features__name small-text">
                      Resolution
                    </p>
                    <p className="features__value small-text">
                      {productDetails?.display.screenResolution || '-'}
                    </p>
                  </div>
                  <div className="features__item">
                    <p className="features__name small-text">
                      Processor
                    </p>
                    <p className="features__value small-text">
                      {productDetails?.hardware.cpu || '-'}
                    </p>
                  </div>
                  <div className="features__item">
                    <p className="features__name small-text">
                      RAM
                    </p>
                    <p className="features__value small-text">
                      {productDetails?.storage.ram || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page__section">
            <div className="product-info">
              <div
                className="product-info__about"
                data-cy="productDescription"
              >
                <h2 className="product-info__title">About</h2>
                <div className="product-info__divider" />
                <p className="product-info__description medium-text">
                  {productDetails?.description}
                </p>
              </div>
              <div className="product-info__tech-specs tech-specs">
                <h2 className="tech-specs__title">
                  Tech specs
                </h2>
                <div className="tech-specs__divider" />
                <div className="tech-specs__content">
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Screen
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.display.screenSize || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Resolution
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.display.screenResolution || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Processor
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.hardware.cpu || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      RAM
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.storage.ram || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Built-in memory
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.storage.flash || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Camera
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.camera.primary || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      Wi-Fi
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.connectivity.wifi || '-'}
                    </div>
                  </div>
                  <div className="tech-specs__item medium-text">
                    <div className="tech-specs__name">
                      OS
                    </div>
                    <div className="tech-specs__value">
                      {productDetails?.android.os || '-'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="page__section product-slider">
            {randomProducts.length > 0 && (
              <ProductsSlider
                title="You may also like"
                products={randomProducts}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
