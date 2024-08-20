import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { CatalogContext } from '../CatalogContext';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { addedToCart, handleAddToCartClick } from '../../helper/Cart';
import {
  addedToFavorites,
  handleAddToFavoritesClick,
} from '../../helper/Favorites';
import './Details.scss';
import { useLocation, useParams } from 'react-router-dom';
import { fetchProducts, getProductDetails } from '../../helper/fetchProducts';
import { Loader } from '../Loader';

export type Props = {};

export const Details: React.FC<Props> = ({}) => {
  const [currentImage, setCurrentImage] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [activeCapacity, setActiveCapacity] = useState('');
  const [serverProducts, setServerProducts] = useState<Product[]>([]);

  const {
    cartItems,
    setCartItems,
    favoriteProducts,
    setFavoriteProducts,
    product,
    setProduct,
    setProductNotFound,
    productDetailsLoading,
    setProductDetailsLoading,
    productNotFound,
  } = useContext(CatalogContext);

  const location = useLocation();
  const productCategory = location.pathname.slice(
    1,
    location.pathname.indexOf('/', 1),
  );

  const { productId } = useParams<{ productId?: string }>();

  useEffect(() => {
    setProductNotFound(false);
    if (productId) {
      setProductDetailsLoading(true);
      setTimeout(() => {
        getProductDetails(productId, productCategory)
          .then(productData => {
            if (productData !== null) {
              setProduct(productData);
              setCurrentImage(
                productData.images.length > 0 ? productData.images[0] : '',
              );
              setActiveColor(
                productData.colorsAvailable.length > 0
                  ? productData.colorsAvailable[0]
                  : '',
              );
              setActiveCapacity(
                productData.capacityAvailable.length > 0
                  ? productData.capacityAvailable[0]
                  : '',
              );
            } else {
              setProductNotFound(true);
            }
          })
          .catch()
          .finally(() => {
            setProductDetailsLoading(false);
          });
      }, 500);
    }

    fetchProducts().then(fetchedProducts => setServerProducts(fetchedProducts));
  }, [
    productId,
    productCategory,
    setProduct,
    setProductDetailsLoading,
    setProductNotFound,
  ]);

  const getIndexColor = (idName: string) => {
    return idName.lastIndexOf('-') + 1;
  };

  const getIndexCapacity = (idName: string) => {
    const lastIndex = idName.lastIndexOf('-');

    return idName.slice(0, lastIndex).lastIndexOf('-') + 1;
  };

  const handleSetDifferentProductByCapacity = (
    currentItemId: string,
    differentCapacity: string,
  ) => {
    setProductDetailsLoading(true);

    const foundItem = serverProducts.find(prod => {
      const firstServerItemIdPart = prod.itemId.slice(
        0,
        getIndexCapacity(prod.itemId),
      );

      const firstCurrentItemIdPart = currentItemId.slice(
        0,
        getIndexCapacity(prod.itemId),
      );

      return firstServerItemIdPart === firstCurrentItemIdPart;
    });

    const firstItemIdpart = foundItem?.itemId.slice(
      0,
      getIndexCapacity(foundItem?.itemId),
    );

    const lastItemIdPart = foundItem?.itemId.slice(
      foundItem?.itemId.lastIndexOf('-'),
    );

    const currentItemIdChangedCapacity =
      firstItemIdpart + differentCapacity.toLowerCase() + lastItemIdPart;

    setTimeout(() => {
      getProductDetails(currentItemIdChangedCapacity, productCategory).then(
        prodData => {
          if (prodData) {
            setProduct(prodData);

            setCurrentImage(
              prodData.images.length > 0 ? prodData.images[0] : '',
            );
          } else {
            setProductNotFound(true);
          }
        },
      );
      setProductDetailsLoading(false);
    }, 500);
  };

  const handleSetDifferentProductByColor = (
    currentItemId: string,
    differentColor: string,
  ) => {
    setProductDetailsLoading(true);
    const foundItem = serverProducts.find(prod => {
      const firstServerItemIdPart = prod.itemId.slice(
        0,
        getIndexColor(prod.itemId),
      );
      const firstCurrentItemIdPart = currentItemId.slice(
        0,
        getIndexColor(prod.itemId),
      );

      return firstServerItemIdPart === firstCurrentItemIdPart;
    });
    const firstItemIdpart = foundItem?.itemId.slice(
      0,
      getIndexColor(foundItem?.itemId),
    );

    const currentItemIdChangedColor = firstItemIdpart + differentColor;

    setTimeout(() => {
      getProductDetails(currentItemIdChangedColor, productCategory).then(
        prodData => {
          if (prodData) {
            setProduct(prodData);

            setCurrentImage(
              prodData.images.length > 0 ? prodData.images[0] : '',
            );
          } else {
            setProductNotFound(true);
          }
        },
      );
      setProductDetailsLoading(false);
    }, 500);
  };

  const handleImageClick = (clickedImage: string) => {
    setCurrentImage(clickedImage);
  };

  const handleColorClick = (clickedColor: string) => {
    setActiveColor(clickedColor);
  };

  const handleCapacityClick = (clickedCapacity: string) => {
    setActiveCapacity(clickedCapacity);
  };

  const DISCOUNT = (product?.priceRegular ?? 0) - (product?.priceDiscount ?? 0);

  function normalizeProduct(productData: ProductDetails): Product {
    return {
      itemId: productData.id,
      name: productData.name,
      fullPrice: productData.priceRegular,
      price: productData.priceDiscount,
      image: productData.images[0],
    };
  }

  return (
    <>
      {productDetailsLoading && <Loader />}

      {productNotFound && (
        <p className="details__not-found">Product was not found</p>
      )}

      {!productDetailsLoading && !productNotFound && product !== null && (
        <div className="details">
          <h1 className="details__title title-subtitle">{product?.name}</h1>
          <div className="details__container">
            <div className="details__top">
              <div className="details__main-image">
                <img
                  src={currentImage}
                  alt="product"
                  className="details__main-picture"
                />
              </div>
              <div className="details__images">
                {product?.images.map((image, index) => (
                  <button
                    className={cn('details__image', {
                      'details__image--active': currentImage === image,
                    })}
                    type="button"
                    onClick={() => handleImageClick(image)}
                    key={image}
                  >
                    <img
                      src={product.images[index]}
                      alt={`item ${index}`}
                      className="details__picture"
                    />
                  </button>
                ))}
              </div>
              <div className="details__characteristics">
                <div className="characteristics">
                  <div
                    className="
                     characteristics__section
                     characteristics__section--flex
                 "
                  >
                    <div>
                      <p className="characteristics__title">Avaliable colors</p>
                      <div className="characteristics__elements">
                        {product?.colorsAvailable.map(color => (
                          <button
                            type="button"
                            onClick={() => {
                              handleColorClick(color);
                              handleSetDifferentProductByColor(
                                product?.id,
                                color,
                              );
                            }}
                            className={cn('characteristics__circle', {
                              'characteristics__circle--active':
                                activeColor === color,
                            })}
                            key={color}
                            aria-label={`Select ${color} color`}
                          >
                            <div
                              className={`
                           characteristics__color
                           characteristics__color--${color}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="characteristics__id">{`ID: ${product?.priceRegular}`}</div>
                  </div>
                  <div className="characteristics__section">
                    <p className="characteristics__title">Select capacity</p>
                    <div className="characteristics__elements">
                      {product?.capacityAvailable.map(capacity => (
                        <button
                          type="button"
                          onClick={() => {
                            handleSetDifferentProductByCapacity(
                              product?.id,
                              capacity,
                            );
                            handleCapacityClick(capacity);
                          }}
                          className={cn('characteristics__rectangle', {
                            'characteristics__rectangle--active':
                              activeCapacity === capacity,
                          })}
                          key={capacity}
                          aria-label={`Select ${capacity}`}
                        >
                          {capacity}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {DISCOUNT > 0 ? (
                  <div
                    className="
                   characteristics__price-wrapper
                   item__price-wrapper"
                  >
                    <p
                      className="
                     item__price
                     item__price--current
                     characteristics__price
                     characteristics__price--current
                   "
                    >{`$${product?.priceDiscount}`}</p>
                    <p
                      className="
                     item__price
                     item__price--original
                     characteristics__price
                     characteristics__price--original
                   "
                    >{`$${product?.priceRegular}`}</p>
                  </div>
                ) : (
                  <div
                    className="
                   item__price-wrapper
                   characteristics__price-wrapper
                   "
                  >
                    <p
                      className="
                     item__price
                     item__price--current
                     characteristics__price
                     characteristics__price--current
                   "
                    >{`$${product?.priceRegular}`}</p>
                  </div>
                )}
                <div className="item__bottom characteristics__buttons">
                  <button
                    type="button"
                    onClick={() =>
                      product &&
                      handleAddToCartClick(
                        cartItems,
                        setCartItems,
                        normalizeProduct(product),
                      )
                    }
                    className={cn('item__button', 'characteristics__button', {
                      'item__button--active':
                        product && addedToCart(cartItems, product.id),
                    })}
                  >
                    {`${product && addedToCart(cartItems, product.id) ? 'Added to cart' : 'Add to cart'}`}
                  </button>
                  <button
                    type="button"
                    data-cy="addToFavorite"
                    onClick={() =>
                      product &&
                      handleAddToFavoritesClick(
                        favoriteProducts,
                        setFavoriteProducts,
                        normalizeProduct(product),
                      )
                    }
                    className={cn('item__icon', 'characteristics__icon', {
                      'item__icon--active':
                        product &&
                        addedToFavorites(favoriteProducts, product.id),
                    })}
                  >
                    <div
                      aria-label="add-to-favorites"
                      className={cn(
                        'item__icon-image',
                        'characteristics__icon-image',
                        {
                          'item__icon-image--active':
                            product &&
                            addedToFavorites(favoriteProducts, product?.id),
                        },
                      )}
                    />
                  </button>
                </div>
                <div className="item__description">
                  <div className="item__description-row">
                    <p className="item__description-title">Screen</p>
                    <p className="item__description-value">{product?.screen}</p>
                  </div>
                  <div className="item__description-row">
                    <p className="item__description-title">Capacity</p>
                    <p className="item__description-value">
                      {product?.capacity}
                    </p>
                  </div>
                  <div className="item__description-row">
                    <p className="item__description-title">RAM</p>
                    <p className="item__description-value">{product?.ram}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="details__bottom">
              <div className="details__bottom-about">
                <div className="details__bottom-name">
                  <h1 className="details__bottom-title">About</h1>
                </div>
                <section className="about" data-cy="productDescription">
                  {product?.description.map(part => (
                    <div className="about__paragraph" key={part.title}>
                      <h3 className="about__title">{part.title}</h3>
                      <p className="about__text">{part.text}</p>
                    </div>
                  ))}
                </section>
              </div>
              <div className="details__bottom-tech">
                <div className="details__bottom-name">
                  <h1 className="details__bottom-title">Tech specs</h1>
                </div>
                <section className="tech-specs">
                  <div className="item__description">
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">Screen</p>
                      <p className="item__description-value">
                        {product?.screen}
                      </p>
                    </div>
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">Resolution</p>
                      <p className="item__description-value">
                        {product?.resolution}
                      </p>
                    </div>
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">Processor</p>
                      <p className="item__description-value">
                        {product?.processor}
                      </p>
                    </div>
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">RAM</p>
                      <p className="item__description-value">{product?.ram}</p>
                    </div>
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">Built in memory</p>
                      <p className="item__description-value">
                        {product?.capacity}
                      </p>
                    </div>
                    <div className="item__description-row tech-specs__row">
                      <p className="item__description-title">Camera</p>
                      <p className="item__description-value">
                        {product?.camera}
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
