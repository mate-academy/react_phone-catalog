/* eslint-disable jsx-a11y/control-has-associated-label */
import './ProductDetailsPage.scss';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import {
  getProductDetail,
  getProducts,
  getSuggestedProducts,
} from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { CartContext } from '../../components/CartContext';
import { FavoritesContext } from '../../components/FavoritesContext';

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { favoritesProducts, setFavoritesProducts } =
    useContext(FavoritesContext);

  const [products, setProducts] = useState<Product[]>();

  const [productDetails, setProductDetails] = useState<ProductDetails>();
  const [randomProducts, setRandomProducts] = useState<Product[]>();
  const [currentImage, setCurrentImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isChoosed, setIsChoosed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isNotFounded, setIsNotFounded] = useState(false);

  const selectImage = (value: string) => {
    setCurrentImage(value);
  };

  const addCartButton = () => {
    const product = products?.find(prod => prod.phoneId === productId) || null;

    if (product) {
      setCartProducts(prewArr => {
        const productIndex = prewArr.findIndex(
          pArr => pArr[0].phoneId === productId,
        );

        if (productIndex !== -1) {
          setIsChoosed(false);

          return prewArr.filter(pArr => pArr[0].id !== product.id);
        }

        return [...prewArr, [product, 1]];
      });
    }
  };

  const likeProductCart = () => {
    const product = products?.find(prod => prod.phoneId === productId) || null;

    if (product) {
      setFavoritesProducts(prewArr => {
        const productIndex = prewArr.findIndex(pArr => pArr.id === product.id);

        if (productIndex !== -1) {
          setIsActive(false);

          return prewArr.filter(pArr => pArr.id !== product.id);
        }

        return [...prewArr, product];
      });
    }
  };

  useEffect(() => {
    getProducts().then(serverProducts => {
      setProducts(serverProducts);
    });

    getProductDetail(productId ?? '')
      .then(details => {
        setProductDetails(details);
        setCurrentImage(details.images[0]);
      })
      .catch(() => setIsNotFounded(true))
      .finally(() => setIsLoading(false));

    getSuggestedProducts().then(serverProducts =>
      setRandomProducts(serverProducts),
    );
  }, []);

  useEffect(() => {
    const sss = cartProducts.find(
      cartProduct => cartProduct[0].phoneId === productId,
    );

    if (sss) {
      setIsChoosed(true);
    }
  }, [cartProducts]);

  useEffect(() => {
    const sss = favoritesProducts.find(
      favoriteProduct => favoriteProduct.phoneId === productId,
    );

    if (sss) {
      setIsActive(true);
    }
  }, [favoritesProducts]);

  return (
    <div className="productDetails">
      {isLoading && (
        <div className="phonesPage__loader">
          <Loader />
        </div>
      )}

      {!isLoading && !isNotFounded && (
        <>
          <div data-cy="breadCrumbs" className="productDetails__link">
            <Link to="/home" className="icon icon--home" />
            <div className="icon icon--arrow-right--disabled" />
            <Link to="/phones" className="productDetails__link-text">
              Phones
            </Link>
            <div className="icon icon--arrow-right--disabled" />
            <div className="productDetails__link-text">{`${productDetails?.name} (iMT9G2FS/A)`}</div>
          </div>

          <Link
            to=".."
            relative="path"
            className="productDetails__back"
            data-cy="backButton"
          >
            <div className="icon icon--arrow-left" />
            Back
          </Link>

          <div className="productDetails__title">{`${productDetails?.name} (iMT9G2FS/A)`}</div>

          <div className="productDetails__main-part">
            <div className="productDetails__description">
              <div className="productDetails__gallery">
                <div className="productDetails__pictures-list">
                  {productDetails?.images.map((image, i) => (
                    <button
                      key={image}
                      type="submit"
                      className={classNames('productDetails__picture-block', {
                        'productDetails__picture-block--active':
                          image === currentImage,
                      })}
                      onClick={() => selectImage(image)}
                    >
                      <img
                        className="productDetails__image"
                        src={`${image}`}
                        alt={`${i}`}
                      />
                    </button>
                  ))}
                </div>

                <div className="productDetails__main-picture">
                  <img
                    className="productDetails__image"
                    src={`${currentImage}`}
                    alt={productDetails?.name}
                  />
                </div>
              </div>

              <div className="productDetails__characteristic">
                <div>
                  <div className="productDetails__block">
                    <div className="productDetails__text-block">
                      Available colors
                    </div>

                    <div className="productDetails__elements">
                      {productDetails?.colorsAvailable.map(color => (
                        <div
                          key={color}
                          className={classNames('productDetails__color', {
                            'productDetails__color--active':
                              color === productDetails.color,
                          })}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="productDetails__line" />

                  <div className="productDetails__block">
                    <div className="productDetails__text-block">
                      Select capacity
                    </div>

                    <div className="productDetails__elements">
                      {productDetails?.capacityAvailable.map(capacity => (
                        <div
                          key={capacity}
                          className={classNames('productDetails__capacity', {
                            'productDetails__capacity--active':
                              capacity === productDetails.capacity,
                          })}
                        >
                          {capacity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="productDetails__line" />
                </div>

                <div className="productDetails__price-with-buttons">
                  <div className="productDetails__prices">
                    <div className="productDetails__price-regular">
                      {`$${productDetails?.priceDiscount}`}
                    </div>

                    <div className="productDetails__price-discount">
                      {`$${productDetails?.priceRegular}`}
                    </div>
                  </div>

                  <div className="productDetails__buttons">
                    <button
                      type="submit"
                      className={classNames(
                        'button',
                        'productDetails__add-button',
                        {
                          'button--active': isChoosed,
                        },
                      )}
                      onClick={addCartButton}
                    >
                      {(isChoosed && 'Added to cart') || 'Add to cart'}
                    </button>

                    <button
                      data-cy="addToFavorite"
                      className={classNames(
                        'productDetails__favorites-button',
                        {
                          'productDetails__favorites-button--active': isActive,
                        },
                      )}
                      type="button"
                      onClick={likeProductCart}
                    >
                      <div
                        className={classNames('icon', 'icon--favorites', {
                          'icon--favorites--active': isActive,
                        })}
                      />
                    </button>
                  </div>
                </div>

                <div className="productDetails__text-information">
                  <div className="productDetails__text-blocks">
                    <div className="productDetails__text-element--gray">
                      Screen
                    </div>

                    <div className="productDetails__text-element">
                      {productDetails?.screen}
                    </div>
                  </div>

                  <div className="productDetails__text-blocks">
                    <div className="productDetails__text-element--gray">
                      Resolution
                    </div>

                    <div className="productDetails__text-element">
                      {productDetails?.resolution}
                    </div>
                  </div>

                  <div className="productDetails__text-blocks">
                    <div className="productDetails__text-element--gray">
                      Processor
                    </div>

                    <div className="productDetails__text-element--black">
                      {productDetails?.processor}
                    </div>
                  </div>

                  <div className="productDetails__text-blocks">
                    <div className="productDetails__text-element--gray">
                      RAM
                    </div>

                    <div className="productDetails__text-element--black">
                      {productDetails?.ram}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="productDetails__id-number">ID: 802390</div>
          </div>

          <div className="productDetails__information-part">
            <div
              data-cy="productDescription"
              className="
      productDetails__information-blocks
      productDetails__information-blocks--width
      "
            >
              <div className="productDetails__information-header">About</div>

              <div
                className="
        productDetails__information-line
        productDetails__information-line--big-retreat
      "
              />

              <div className="productDetails__information-description">
                {productDetails?.description.map(des => (
                  <div className="productDetails__information-elements">
                    <div className="productDetails__information-title">
                      {des.title}
                    </div>

                    <div className="productDetails__information-text">
                      {des.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="productDetails__information-blocks">
              <div className="productDetails__information-header">
                Tech specs
              </div>

              <div className="productDetails__information-line" />

              <div className="productDetails__characteristics">
                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Screen
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.screen}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Resolution
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.resolution}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Processor
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.processor}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    RAM
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.ram}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Built in memory
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.capacity}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Camera
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.camera}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Zoom
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.zoom}
                  </div>
                </div>

                <div className="productDetails__characteristics-blocks">
                  <div className="productDetails__characteristics-title">
                    Cell
                  </div>

                  <div className="productDetails__characteristics-text">
                    {productDetails?.cell.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {randomProducts && (
            <div className="productDetails__may-like">
              <ProductsSlider
                title="You may also like"
                products={randomProducts}
              />
            </div>
          )}
        </>
      )}

      {!isLoading && isNotFounded && (
        <div className="productDetails__not-founded">Phone was not found</div>
      )}
    </div>
  );
};
