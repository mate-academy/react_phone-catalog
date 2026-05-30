/* eslint-disable import/extensions */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@/styles/main.scss';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { BackButton } from '../shared/components/BackButton';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useDetails } from '@/hooks/useDetails';
import { NotFound } from '../shared/components/NotFound';
import { Loader } from '../shared/components/Loader';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import styles from './ProductDetailsPage.module.scss';
import classNames from 'classnames';
import { ProductBrief } from '@/types/ProductBrief';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useColor } from '@/hooks/useColor';
import { About } from './components/About';
import { TechSpecs } from './components/TechSpecs';

interface Props {
  category: string;
}

export const ProductDetailsPage: React.FC<Props> = ({ category }) => {
  const { itemId } = useParams<{ itemId?: string }>();
  const actualItemId = itemId!; // it is guaranteed that the itemId will be present in URL, thus, non-null assertion here

  const [imageIndex, setImageIndex] = useState<number>(0);
  const [imageChanging, setImageChanging] = useState<boolean>(false);
  const [displayedImageIndex, setDisplayedImageIndex] = useState(imageIndex);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(
    null,
  );

  const { products, loading, error, cart, setCart, favorites, setFavorites } =
    useProducts();

  const productInstance = products.find(p => p.itemId === actualItemId);

  const { productDetails, detailsLoading, detailsError } = useDetails(
    category.toLowerCase(),
    actualItemId,
  );

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const prev = () => {
    const newIndex =
      imageIndex === 0 ? productDetails!.images.length - 1 : imageIndex - 1;
    handleImageSelect(newIndex, 'right');
  };

  const next = () => {
    const newIndex =
      imageIndex === productDetails!.images.length - 1 ? 0 : imageIndex + 1;
    handleImageSelect(newIndex, 'left');
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > minSwipeDistance) {
      // Swipe left
      next();
    } else if (touchEndX.current - touchStartX.current > minSwipeDistance) {
      // Swipe right
      prev();
    }
  };

  const hotPriceProducts = useMemo(
    () =>
      products
        .sort(
          (p1: ProductBrief, p2: ProductBrief) =>
            p2.fullPrice - p2.price - (p1.fullPrice - p1.price),
        )
        .slice(0, 12),
    [products],
  );

  const inCart = cart.some(p => p.product.id === productInstance!.id);
  const favorited = favorites.some(p => p.id === productInstance!.id);

  const toggleCart = () => {
    if (inCart) {
      setCart(cart.filter(item => item.product.id !== productInstance!.id));
    } else {
      setCart([...cart, { product: productInstance!, quantity: 1 }]);
    }
  };

  const toggleFavorite = () => {
    setFavorites(
      favorited
        ? favorites.filter(p => p.id !== productInstance!.id)
        : [...favorites, productInstance!],
    );
  };

  const handleImageSelect = (
    index: number,
    direction: 'left' | 'right' | null = null,
  ) => {
    if (index !== imageIndex) {
      setImageChanging(true);
      setSwipeDirection(direction);
      setImageIndex(index);
      setDisplayedImageIndex(index); // Set immediately

      setTimeout(() => {
        setImageChanging(false);
        setSwipeDirection(null);
      }, 300);
    }
  };

  const handleThumbnailClick = (index: number) => {
    handleImageSelect(index, null); // No swipe direction for thumbnail clicks
  };

  useEffect(() => {
    setImageIndex(0);
    setDisplayedImageIndex(0);
    setImageChanging(false);
  }, [actualItemId]);

  useEffect(() => {
    if (!imageChanging) {
      setDisplayedImageIndex(imageIndex);
    }
  }, [imageIndex, imageChanging]);

  const isInitialLoading = loading || detailsLoading;
  const hasError = error || detailsError;
  const productNotFound =
    !isInitialLoading && !productDetails && !productInstance;

  return (
    <main className="container">
      {isInitialLoading && <Loader />}
      {hasError && <ErrorMessage message={detailsError}></ErrorMessage>}
      {productNotFound && (
        <NotFound
          imageUrl="/img/product-not-found.png"
          message="Oops, the product doesn't exist :("
        />
      )}
      {!isInitialLoading && productDetails && productInstance && (
        <>
          <Breadcrumbs links={[category, productDetails.name]}></Breadcrumbs>
          <div className={styles.product_details}>
            <div className={styles.product_details__top}>
              <BackButton href={`/${category.toLowerCase()}`}></BackButton>
              <h2 className={styles.product_details__heading}>
                {productDetails.name}
              </h2>
            </div>
            <div className={styles.product_details__interactive}>
              <div className={styles.product_details__images}>
                <div
                  className={styles['product_details__images--wrapper']}
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  <img
                    key={displayedImageIndex} // Force re-render for animation
                    className={classNames(
                      styles['product_details__images--main'],
                      {
                        [styles['product_details__images--main__push-left']]:
                          imageChanging && swipeDirection === 'left',
                        [styles['product_details__images--main__push-right']]:
                          imageChanging && swipeDirection === 'right',
                        [styles['product_details__images--main__changing']]:
                          imageChanging && swipeDirection === null,
                      },
                    )}
                    src={productDetails.images[displayedImageIndex]}
                    alt={productDetails.name}
                  />
                </div>
                <div className={styles['product_details__images--all']}>
                  {productDetails.images.map((img: string, i: number) => (
                    <img
                      className={classNames(
                        styles['product_details__images--single'],
                        {
                          [styles['product_details__images--single__active']]:
                            i === imageIndex,
                        },
                      )}
                      key={i}
                      src={img}
                      alt={productDetails.name}
                      onClick={() => handleThumbnailClick(i)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.product_details__options}>
                <p
                  className={classNames(
                    'text__small',
                    styles.product_details__id,
                  )}
                >
                  ID: {productInstance.id}
                </p>
                <div className={styles.product_details__select}>
                  <p
                    className={classNames(
                      'text__small',
                      styles['product_details__select--text'],
                    )}
                  >
                    Available colors
                  </p>
                  <div className={styles['product_details__select--options']}>
                    {productDetails.colorsAvailable.map((c: string) => {
                      const otherColorLink = `/${productDetails.category}/${productDetails.namespaceId}-${productDetails.capacity.toLowerCase().replace(/\s/g, '')}-${c.replace(/\s/g, '-')}`;
                      const colorCode = useColor(productDetails.namespaceId, c);
                      return (
                        <Link key={c} to={otherColorLink}>
                          <button
                            style={
                              {
                                '--button-color': colorCode,
                              } as React.CSSProperties
                            }
                            className={classNames(
                              'button__circle',
                              'button__circle--color',
                              { active: c === productDetails.color },
                            )}
                          ></button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <hr className={styles.product_details__separator} />
                <div className={styles.product_details__select}>
                  <p
                    className={classNames(
                      'text__small',
                      styles['product_details__select--text'],
                    )}
                  >
                    Select capacity
                  </p>
                  <div className={styles['product_details__select--options']}>
                    {productDetails.capacityAvailable.map((c: string) => {
                      const otherCapacityLink = `/${productDetails.category}/${productDetails.namespaceId}-${c.toLowerCase().replace(/\s/g, '')}-${productDetails.color.replace(/\s/g, '-')}`;
                      return (
                        <Link key={c} to={otherCapacityLink}>
                          <button
                            className={classNames('button__capacity', {
                              'button__capacity--active':
                                c === productDetails.capacity,
                            })}
                          >
                            {c}
                          </button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <hr className={styles.product_details__separator} />
                <div className={styles.product_details__price}>
                  <h3 className={styles['product_details__price--main']}>
                    ${productDetails.priceDiscount}
                  </h3>
                  <p
                    className={classNames(
                      styles['product_details__price--discount'],
                      'text_small',
                    )}
                  >
                    ${productDetails.priceRegular}
                  </p>
                </div>
                <div className={styles.product_details__buttons}>
                  <button
                    className={classNames('button__primary', {
                      'button__primary--active': inCart,
                    })}
                    onClick={toggleCart}
                  >
                    {inCart ? 'Added' : 'Add to cart'}
                  </button>
                  <button
                    className="button__circle button__circle--favorite"
                    onClick={toggleFavorite}
                  >
                    <i
                      className={classNames('icon', {
                        'icon--heart-empty': !favorited,
                        'icon--heart-filled': favorited,
                      })}
                    ></i>
                  </button>
                </div>
                <div className={styles.product_details__brief_specs}>
                  <div className={styles['product_details__brief_specs--spec']}>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--type'],
                        'text__small',
                      )}
                    >
                      Screen
                    </p>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--value'],
                        'text__small',
                      )}
                    >
                      {productDetails.screen}
                    </p>
                  </div>
                  <div className={styles['product_details__brief_specs--spec']}>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--type'],
                        'text__small',
                      )}
                    >
                      Resolution
                    </p>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--value'],
                        'text__small',
                      )}
                    >
                      {productDetails.resolution}
                    </p>
                  </div>
                  <div className={styles['product_details__brief_specs--spec']}>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--type'],
                        'text__small',
                      )}
                    >
                      Processor
                    </p>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--value'],
                        'text__small',
                      )}
                    >
                      {productDetails.processor}
                    </p>
                  </div>
                  <div className={styles['product_details__brief_specs--spec']}>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--type'],
                        'text__small',
                      )}
                    >
                      RAM
                    </p>
                    <p
                      className={classNames(
                        styles['product_details__brief_specs--value'],
                        'text__small',
                      )}
                    >
                      {productDetails.ram}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.product_details__description}>
              <div className={styles['product_details__description--section']}>
                <h3>About</h3>
                <hr />
                <About sections={productDetails.description} />
              </div>
              <div className={styles['product_details__description--section']}>
                <h3>Tech specs</h3>
                <hr />
                <TechSpecs details={productDetails} />
              </div>
            </div>
            <ProductsSlider
              title={'You may also like'}
              products={hotPriceProducts}
              loading={loading}
              error={error}
            ></ProductsSlider>
          </div>
        </>
      )}
    </main>
  );
};
