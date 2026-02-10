import React, { useCallback, useEffect, useState, TouchEvent } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductItem } from '../../types/ProductItem';
import { getProductById, getSuggestedProducts } from '../../utils/serviceData';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import classNames from 'classnames';
import { Carousel } from '../Carousel';
import { Product } from '../../types/Product';
import { TechSpecsRow } from '../TechSpecsRow';
import { Breadcrumbs } from '../Breadcrumbs';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 25;

  const isInFavorite = useAppSelector(state =>
    selectIsFavorite(state, product?.id || ''),
  );

  const isAddedToCart = useAppSelector(state =>
    selectIsAddedToCart(state, product?.id || ''),
  );

  const colorMap: Record<string, string> = {
    black: '#000000',
    green: '#394C38',
    blue: '#9FB3C6',
    yellow: '#FCEBD3',
    white: '#F0F0F0',
    purple: '#E6DFEB',
    red: '#BF0013',
    pink: '#FADDD7',
    gold: '#F6E7CE',
    silver: '#D8D9DA',
    grey: '#535150',
    'space-gray': '#4E4D4A',
    spacegray: '#4E4D4A',
    'space gray': '#4E4D4A',
    midnightgreen: '#4E5851',
    midnight: '#191F26',
    starlight: '#FBF7F4',
    roseGold: '#E6C7C2',
    coral: '#FF7F50',
    deeppurple: '#493C4D',
    'deep purple': '#493C4D',
    'deep-purple': '#493C4D',
    'space-black': '#282829',
    spaceblack: '#282829',
    'space black': '#282829',
    alpinegreen: '#3E4942',
    'alpine-green': '#3E4942',
    'alpine green': '#3E4942',
    sierrablue: '#9BB5CE',
    'sierra blue': '#9BB5CE',
    'sierra-blue': '#9BB5CE',
  };

  const transformToProduct = (details: ProductItem | null): Product => {
    return {
      id: 0,
      itemId: details?.id || '',
      category: details?.category as 'phones' | 'tablets' | 'accessories',
      name: details?.name || '',
      fullPrice: details?.priceRegular || 0,
      price: details?.priceDiscount || 0,
      screen: details?.screen || '',
      capacity: details?.capacity || '',
      color: details?.color || '',
      ram: details?.ram || '',
      year: 2026,
      image: details?.images?.[0] ? `/${details.images[0]}` : '',
    };
  };

  const loadData = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsError(false);
    setIsLoading(true);

    try {
      const foundedProduct = await getProductById(productId);

      if (foundedProduct) {
        setProduct(foundedProduct);

        setCurrentIndex(0);

        const suggested = await getSuggestedProducts(foundedProduct.id);

        setSuggestedProducts(
          suggested.map(suggest => transformToProduct(suggest)),
        );
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.color);
      setSelectedCapacity(product.capacity);
    }
  }, [product]);

  const handleTechSpecsChange = (newColor: string, newCapacity: string) => {
    const baseId =
      product?.namespaceId || product?.id.split('-').slice(0, -2).join('-');

    const normalizedColor = newColor.replace(/ /g, '-').toLowerCase();
    const normalizedCapacity = newCapacity.toLowerCase();

    const newId = `${baseId}-${normalizedCapacity}-${normalizedColor}`;

    navigate(`/${product?.category}/${newId}`);
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(transformToProduct(product)));
    } else if (isAddedToCart) {
      dispatch(removeFromCart(transformToProduct(product).itemId));
    }
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorites(transformToProduct(product)));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    const validCategories = ['phones', 'tablets', 'accessories'];

    const safeCategory = category || '';

    return (
      <div className={styles.productNotFound}>
        <h1 className={styles.productNotFound__title}>Product Not Found...</h1>
        <img
          src="./img/product-not-found.png"
          alt="Product not Found"
          className={styles.productNotFound__image}
        />

        {validCategories.includes(safeCategory) ? (
          <Link
            to={`/${safeCategory}`}
            className={styles.productNotFound__button}
          >
            <span>
              Back to{' '}
              {safeCategory.charAt(0).toUpperCase() + safeCategory.slice(1)}
            </span>
          </Link>
        ) : (
          <Link to="/" className={styles.productNotFound__button}>
            <span>Back to Home</span>
          </Link>
        )}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  const specsList = [
    { label: 'Screen', value: product.screen },
    { label: 'Resolution', value: product.resolution },
    { label: 'Processor', value: product.processor },
    { label: 'RAM', value: product.ram },
    { label: 'Built in memory', value: product.capacity },
    { label: 'Camera', value: product.camera },
    { label: 'Zoom', value: product.zoom },
    { label: 'Cell', value: product.cell },
  ];

  const nextImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1,
    );
  };

  const onTouchStart = (event: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: TouchEvent) => {
    setTouchEnd(event.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    }

    if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.product__breadcrumbs}>
        <Breadcrumbs category={category} productId={productId} />
      </div>
      <div className={styles.product__back__wrapper}>
        <button className={styles.product__back} onClick={() => navigate(-1)}>
          Back
        </button>
      </div>

      <div className={styles.product__title}>
        <h2>{product.name}</h2>
      </div>
      <div className={styles.product__top}>
        <div className={styles.product__image}>
          <div className={styles.product__image__secondary}>
            {product.images.map((image, index) => {
              return (
                <div
                  key={image}
                  className={classNames(styles.product__imageItem, {
                    [styles['product__imageItem--active']]:
                      currentIndex === index,
                  })}
                  onClick={() => setCurrentIndex(index)}
                >
                  <img
                    src={`/${image}`}
                    alt={`${product.name} image №${index + 1}`}
                  />
                </div>
              );
            })}
          </div>

          <div
            className={styles.product__image__main}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={`/${product.images[currentIndex]}`}
              alt={`selected image of ${product.name}`}
            />
          </div>
        </div>
        <div className={styles.product__info}>
          <div className={styles.product__colors}>
            <span className={styles.product__colors__title}>
              Available colors
            </span>

            <div className={styles.product__colors__wrapper}>
              {product.colorsAvailable.map(color => {
                return (
                  <label
                    key={color}
                    className={classNames(styles.product__colorItem, {
                      [styles['product__colorItem--active']]:
                        color === product.color,
                    })}
                    style={
                      {
                        '--color-bg': colorMap[color] || color,
                      } as React.CSSProperties
                    }
                    title={color}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      aria-label={color}
                      className={styles.product__input}
                      checked={color === selectedColor}
                      onChange={() => {
                        if (selectedCapacity) {
                          handleTechSpecsChange(color, selectedCapacity);
                        }
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.product__capacity}>
            <span className={styles.product__colors__title}>
              Select capacity
            </span>

            <div className={styles.product__capacity__buttons}>
              {product.capacityAvailable.map(capacity => {
                return (
                  <label
                    key={capacity}
                    className={classNames(styles.product__capacityItem, {
                      [styles['product__capacityItem--active']]:
                        capacity === product.capacity,
                    })}
                  >
                    <span>{capacity}</span>
                    <input
                      type="radio"
                      name="capacity"
                      value={capacity}
                      aria-label={capacity}
                      className={styles.product__input}
                      checked={capacity === selectedCapacity}
                      onChange={() => {
                        if (selectedColor) {
                          handleTechSpecsChange(selectedColor, capacity);
                        }
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>
          <div className={styles.product__price}>
            <h2 className={styles.product__price__discount}>
              {`$${product.priceDiscount}`}
            </h2>

            <h2 className={styles.product__price__regular}>
              {`$${product.priceRegular}`}
            </h2>
          </div>
          <div className={styles.product__buttons}>
            <button
              className={classNames(styles.product__buttons__addToCart, {
                [styles['product__buttons__addToCart--active']]: isAddedToCart,
              })}
              onClick={handleAddToCart}
            >
              {isAddedToCart ? 'Added to Cart' : 'Add to cart'}
            </button>
            <button
              className={classNames(styles.product__buttons__addToFavourites, {
                [styles['product__buttons__addToFavourites--active']]:
                  isInFavorite,
              })}
              onClick={handleToggleFavorite}
            ></button>
          </div>
          <div className={styles.product__specs}>
            {specsList.slice(0, 4).map(spec => {
              return (
                <TechSpecsRow
                  key={spec.label}
                  label={spec.label}
                  value={spec.value}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.product__bottom}>
        <div className={styles.product__about}>
          <h2 className={styles.product__about__text}>About</h2>
          {product.description.map(desc => {
            return (
              <div
                key={desc.title}
                className={styles.product__about__description}
              >
                <h2 className={styles.product__about__title}>{desc.title}</h2>
                {desc.text.map(paragraph => (
                  <h3 key={paragraph} className={styles.product__about__value}>
                    {paragraph}
                  </h3>
                ))}
              </div>
            );
          })}
        </div>
        <div className={styles.product__techSpecs}>
          <h2 className={styles.product__techSpecs__title}>Tech specs</h2>

          {specsList.map(spec => {
            return (
              <TechSpecsRow
                key={spec.label}
                label={spec.label}
                value={spec.value}
              />
            );
          })}
        </div>
      </div>

      <div className={styles.product__suggestedProducts}>
        <Carousel title="You may also like" items={suggestedProducts} />
      </div>
    </div>
  );
};
