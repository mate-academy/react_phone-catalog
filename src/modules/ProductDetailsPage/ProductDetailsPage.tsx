import React, { useEffect, useState } from 'react';

import styles from './ProductDetailsPage.module.scss';
import { Phone } from '../../shared/types/Phone';
import { Tablet } from '../../shared/types/Tablet';
import { Accessory } from '../../shared/types/Accessory';
import { Loader } from '../../components/Loader';
import { Link, useParams } from 'react-router-dom';
import { ProductsGallery } from '../../components/ProductsGallery';
import { Product } from '../../shared/types/Product';
import classNames from 'classnames';
import { NotFoundPage } from '../NotFoundPage';
import { useGlobalState } from '../../shared/constants/GlobalContext';

type ProductDetails = Phone | Tablet | Accessory;

export const ProductDetailsPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState<ProductDetails[]>();
  const [products, setProducts] = useState<Product[]>();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const productDetails = categoryDetails?.find(
    productToShow => productToShow.id === productId,
  );
  const imagesLinks = productDetails?.images;
  const alternativeModels = categoryDetails?.filter(
    a => a.namespaceId === productDetails?.namespaceId,
  );
  const colorMapping: { [key: string]: string } = {
    black: '#000000',
    gold: '#ffd700',
    yellow: '#ffff00',
    green: '#008000',
    silver: '#c0c0c0',
    red: '#ff0000',
    white: '#ffffff',
    purple: '#800080',
    coral: '#ff7f50',
    blue: '#0000ff',
    pink: '#ffc0cb',

    midnightgreen: '#004953',
    spacegray: '#717378',
    rosegold: '#b76e79',
    midnight: '#2c3e50',
    spaceblack: '#1c1c1c',
    sierrablue: '#5a7d9a',
    graphite: '#53565a',

    'space gray': '#717378',
    'space-gray': '#717378',
    'rose gold': '#b76e79',
    'sky-blue': '#87ceeb',
    starlight: '#f0e6d2',
  };
  const { state, dispatch } = useGlobalState();
  const product = products?.find(prod => prod.itemId === productId);

  const handleAddToCart = () => {
    if (product) {
      if (state.cart.some(cart => cart.itemId === product.itemId)) {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
      } else {
        dispatch({ type: 'ADD_TO_CART', payload: product });
      }
    }
  };

  const handleAddToFavorites = () => {
    if (product) {
      if (
        state.favorites.some(favorite => favorite.itemId === product.itemId)
      ) {
        dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: product });
      } else {
        dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
      }
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(prevIndex =>
        prevIndex === (imagesLinks ?? []).length - 1 ? 0 : prevIndex + 1,
      );
    } else if (direction === 'right') {
      setCurrentIndex(prevIndex =>
        prevIndex === 0 ? (imagesLinks ?? []).length - 1 : prevIndex - 1,
      );
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    target.setAttribute('data-startX', e.touches[0].clientX.toString());
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const startX = parseFloat(target.getAttribute('data-startX') || '0');
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
      handleSwipe('left');
    }

    if (endX - startX > 50) {
      handleSwipe('right');
    }
  };

  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch(`api/products.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: Product[] = await response.json();

      setProducts(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategory = React.useCallback(async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const response = await fetch(`api/${category}.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data: ProductDetails[] = await response.json();

      setCategoryDetails(data);
    } catch (error) {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  useEffect(() => {
    const validateProductId = () => {
      if (!products) {
        return;
      }

      const productIds = products.map(prod => prod.itemId);

      if (!productIds.includes(productId as string)) {
        setHasError(true);
      }
    };

    validateProductId();
  }, [products, productId]);

  const getSuggestedProducts = () => {
    const max = products?.length ?? 0;
    const randomIndexArray: number[] = [];
    const productsMayLike: Product[] = [];

    do {
      const newRandom = Math.floor(Math.random() * max);

      if (!randomIndexArray.includes(newRandom)) {
        randomIndexArray.push(newRandom);
      }
    } while (randomIndexArray.length < 10);

    for (let i = 0; i < randomIndexArray.length; i++) {
      if (products) {
        productsMayLike.push(products[randomIndexArray[i]]);
      }
    }

    return productsMayLike;
  };

  if (hasError) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.ProductDetailsPage}>
      <Loader isLoading={isLoading} hasError={hasError} onReload={() => {}} />

      {!isLoading && !hasError && productDetails && (
        <div className={styles.ProductDetailsPage__wrapper}>
          <h2 className={styles.ProductDetailsPage__title}>
            {productDetails.name}
          </h2>

          <div
            className={styles.ProductDetailsPage__slider}
            onTouchStart={e => handleTouchStart(e)}
            onTouchEnd={e => handleTouchEnd(e)}
          >
            {/* Main Image */}
            <div className={styles.ProductDetailsPage__sliderImage}>
              <img
                src={(imagesLinks ?? [])[currentIndex]}
                alt={`Product Image ${currentIndex + 1}`}
                className={styles.ProductDetailsPage__mainImage}
              />
            </div>

            {/* Image Previews */}
            <div className={styles.ProductDetailsPage__sliderGallery}>
              {(imagesLinks ?? []).map((image, index) => (
                <button
                  key={index}
                  className={`${styles.ProductDetailsPage__previewButton} ${
                    currentIndex === index
                      ? styles.ProductDetailsPage__previewButtonActive
                      : ''
                  }`}
                  onClick={() => handleImageClick(index)}
                >
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className={styles.ProductDetailsPage__previewImage}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.ProductDetailsPage__info}>
            <div className={styles.ProductDetailsPage__colors}>
              <div className={styles.ProductDetailsPage__colorsTop}>
                <p className={styles.ProductDetailsPage__colorsSubtitle}>
                  Available colors
                </p>
                <p className={styles.ProductDetailsPage__id}>{`ID: 00000`}</p>
              </div>

              <div className={styles.ProductDetailsPage__colorsBottom}>
                {productDetails.colorsAvailable.map(color => (
                  <Link
                    to={`/${category}/${alternativeModels?.find(a => a.color === color && a.capacity === productDetails.capacity)?.id}`}
                    key={color}
                    className={classNames(
                      styles.ProductDetailsPage__colorWrapper,
                      color === productDetails.color &&
                        styles.ProductDetailsPage__colorWrapperActive,
                    )}
                  >
                    <div
                      style={{
                        backgroundColor: colorMapping[color] || color,
                      }}
                      className={styles.ProductDetailsPage__color}
                    ></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.ProductDetailsPage__underline}></div>

            <div className={styles.ProductDetailsPage__capacities}>
              <p className={styles.ProductDetailsPage__capacitiesText}>
                Select capacity
              </p>

              <div className={styles.ProductDetailsPage__capacitiesWrapper}>
                {productDetails.capacityAvailable.map(capacity => (
                  <Link
                    to={`/${category}/${alternativeModels?.find(a => a.capacity === capacity && a.color === productDetails.color)?.id}`}
                    key={capacity}
                    className={styles.ProductDetailsPage__capacitiesLink}
                  >
                    <button
                      className={classNames(
                        styles.ProductDetailsPage__capacity,
                        capacity === productDetails.capacity &&
                          styles.ProductDetailsPage__capacityActive,
                      )}
                    >
                      {capacity}
                    </button>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.ProductDetailsPage__underline}></div>

            <div className={styles.ProductDetailsPage__infoBottom}>
              <div className={styles.ProductDetailsPage__prices}>
                <h3
                  className={styles.ProductDetailsPage__price}
                >{`$${productDetails.priceDiscount}`}</h3>
                {productDetails.priceRegular !==
                  productDetails.priceDiscount && (
                  <div className={styles.ProductDetailsPage__fullPrice}>
                    <h3
                      className={styles.ProductDetailsPage__fullPriceText}
                    >{`$${productDetails.priceRegular}`}</h3>
                  </div>
                )}
              </div>

              <div className={styles.ProductDetailsPage__bottomButtons}>
                <button
                  onClick={handleAddToCart}
                  className={classNames(
                    styles.ProductDetailsPage__addCart,
                    state.cart.some(cart => cart.itemId === product?.itemId) &&
                      styles.ProductDetailsPage__addCartSelected,
                  )}
                >
                  {state.cart.some(cart => cart.itemId === product?.itemId)
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>
                <button
                  onClick={handleAddToFavorites}
                  className={classNames(
                    styles.ProductDetailsPage__addFavorite,
                    state.favorites.some(
                      fav => fav.itemId === product?.itemId,
                    ) && styles.ProductDetailsPage__addFavoriteSelected,
                  )}
                ></button>
              </div>

              <div className={styles.ProductDetailsPage__description}>
                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p className={styles.ProductDetailsPage__key}>Screen</p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.screen}
                  </p>
                </div>

                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p className={styles.ProductDetailsPage__key}>Resolution</p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.resolution}
                  </p>
                </div>

                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p className={styles.ProductDetailsPage__key}>Processor</p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.processor}
                  </p>
                </div>

                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p className={styles.ProductDetailsPage__key}>RAM</p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.ram}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.ProductDetailsPage__about}>
            <h3 className={styles.ProductDetailsPage__aboutTitle}>About</h3>

            <div className={styles.ProductDetailsPage__underline}></div>

            {productDetails.description.map(descr => (
              <div
                className={styles.ProductDetailsPage__aboutBlock}
                key={descr.title}
              >
                <h4 className={styles.ProductDetailsPage__aboutSubtitle}>
                  {descr.title}
                </h4>
                <p className={styles.ProductDetailsPage__aboutText}>
                  {descr.text}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.ProductDetailsPage__specs}>
            <h3 className={styles.ProductDetailsPage__specsTitle}>
              Tech specs
            </h3>

            <div className={styles.ProductDetailsPage__underline}></div>

            <div className={styles.ProductDetailsPage__description}>
              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  Screen
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.screen}
                </p>
              </div>

              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  Resolution
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.resolution}
                </p>
              </div>

              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  Processor
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.processor}
                </p>
              </div>

              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  RAM
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.ram}
                </p>
              </div>

              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  Built in memory
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.capacity}
                </p>
              </div>

              {'camera' in productDetails && (
                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p
                    className={classNames(
                      styles.ProductDetailsPage__key,
                      styles.ProductDetailsPage__key500,
                    )}
                  >
                    Camera
                  </p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.camera}
                  </p>
                </div>
              )}

              {'zoom' in productDetails && (
                <div className={styles.ProductDetailsPage__descriptionBlock}>
                  <p
                    className={classNames(
                      styles.ProductDetailsPage__key,
                      styles.ProductDetailsPage__key500,
                    )}
                  >
                    Zoom
                  </p>
                  <p className={styles.ProductDetailsPage__value}>
                    {productDetails.zoom}
                  </p>
                </div>
              )}

              <div className={styles.ProductDetailsPage__descriptionBlock}>
                <p
                  className={classNames(
                    styles.ProductDetailsPage__key,
                    styles.ProductDetailsPage__key500,
                  )}
                >
                  Cell
                </p>
                <p className={styles.ProductDetailsPage__value}>
                  {productDetails.cell.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.ProductDetailsPage__alsoLike}>
            {' '}
            <ProductsGallery
              products={getSuggestedProducts() ?? []}
              title={'You may also like'}
            />
          </div>
        </div>
      )}
    </div>
  );
};
