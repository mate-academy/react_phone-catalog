import styles from './ItemCardPage.module.scss';
import classNames from 'classnames';
import { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ItemCardAction,
  ItemCardContext,
} from '../../contexts/ItemCardContext';
import { ProductsContext } from '../../contexts/ProductsContext';
import { ProductNotFoundPage } from '../ProductNotFoundPage';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { BackButton } from '../../components/BackButton';
import { Loader } from '../../components/Loader';
import { AlsoLike } from '../../components/AlsoLike';
import {
  COLORS_AVAILABLE,
  TIMEOUT_LOADING_DURATION,
} from '../../utils/constants';
import { useTouchSlider } from '../../utils/hooks/useTouchSlider';
import { useCartAndFavourites } from '../../utils/hooks/useCartAndFavorites';
import { useBackNavigation } from '../../utils/hooks/useBackNavigation';
import { useLoading } from '../../utils/hooks/useLoading';
import { ItemCard } from '../../types/ItemCard';

const useSetProductFromContext = (
  products: ItemCard[],
  itemId: string,
  selectedColor: string,
  selectedCapacity: string,
  itemCardDispatch: React.Dispatch<ItemCardAction>,
) => {
  useEffect(() => {
    const filteredProduct = products.find(item => {
      const matchesId = item.id === itemId;
      const matchesColor = !selectedColor || item.color === selectedColor;
      const matchesCapacity =
        !selectedCapacity || item.capacity === selectedCapacity;

      return matchesId && matchesColor && matchesCapacity;
    });

    itemCardDispatch({
      type: 'SET_PRODUCT',
      payload: filteredProduct || null,
    });
  }, [itemId, selectedColor, selectedCapacity, itemCardDispatch, products]);
};

const normalizeColor = (colorValue: string) =>
  colorValue
    .toLowerCase()
    .replace(/[\s-]+/g, '') as keyof typeof COLORS_AVAILABLE;

export const ItemCardPage = () => {
  const { itemCardState, itemCardDispatch } = useContext(ItemCardContext);
  const { products, product, selectedColor, selectedCapacity } = itemCardState;
  const { state: productState } = useContext(ProductsContext);
  const { products: productsForCard } = productState;
  const { pathname } = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isLoading = useLoading(TIMEOUT_LOADING_DURATION);
  const handleBackNavigation = useBackNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
    }
  }, [product]);

  const productForCard = useMemo(
    () => productsForCard.find(item => item.itemId === product?.id),
    [productsForCard, product?.id],
  );

  const { handleAddToCart, handleToggleFavorite, isFavorite } =
    useCartAndFavourites(productForCard || null);

  const pathParts = useMemo(
    () => pathname.split('/').filter(Boolean),
    [pathname],
  );

  const category = pathParts[0];
  const itemId = pathParts[1];

  useSetProductFromContext(
    products,
    itemId,
    selectedColor,
    selectedCapacity,
    itemCardDispatch,
  );

  const availableColors = useMemo(() => {
    if (!product) {
      return [];
    }

    return product.colorsAvailable.map(colorKey => {
      const formattedColorKey = normalizeColor(colorKey);
      const color = COLORS_AVAILABLE[formattedColorKey];
      const isActive = formattedColorKey === normalizeColor(selectedColor);

      return { formattedColorKey, color, isActive };
    });
  }, [product, selectedColor]);

  const handleSelection = useCallback(
    (type: 'color' | 'capacity', value: string) => {
      if (!product) {
        return;
      }

      const updatedProduct = products.find(item => {
        const matchesId = item.namespaceId === product.namespaceId;

        const matchesColor =
          type === 'color'
            ? normalizeColor(item.color) === normalizeColor(value)
            : normalizeColor(item.color) === normalizeColor(selectedColor);

        const matchesCapacity =
          type === 'capacity'
            ? item.capacity === value
            : item.capacity === selectedCapacity;

        return matchesId && matchesColor && matchesCapacity;
      });

      if (updatedProduct) {
        itemCardDispatch({ type: 'SET_PRODUCT', payload: updatedProduct });
        navigate(`/${category}/${updatedProduct.id}`, { replace: true });
      }

      itemCardDispatch({
        type: type === 'color' ? 'SET_SELECTED_COLOR' : 'SET_SELECTED_CAPACITY',
        payload: value,
      });
    },
    [
      products,
      product,
      selectedColor,
      selectedCapacity,
      itemCardDispatch,
      navigate,
      category,
    ],
  );

  const handleSwipeLeft = useCallback(() => {
    if (product && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(prevIndex => prevIndex + 1);
    }
  }, [product, currentImageIndex]);

  const handleSwipeRight = useCallback(() => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prevIndex => prevIndex - 1);
    }
  }, [currentImageIndex]);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlider(
    handleSwipeLeft,
    handleSwipeRight,
  );

  const specs = useMemo(() => {
    if (!product) {
      return {};
    }

    const result: Record<string, string | string[]> = {};

    let description = false;

    for (const key in product) {
      if (description) {
        result[key] = product[key as keyof ItemCard] as string | string[];
      }

      if (key === 'description') {
        description = true;
      }
    }

    return result;
  }, [product]);

  if (isLoading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className={styles['item-card-page']}>
        <div className={styles['item-card-page__container']}>
          <section className={styles['item-card-page__back-button']}>
            <BackButton onClick={handleBackNavigation} />
          </section>

          <section className={styles['item-card-page__product-not-found']}>
            <ProductNotFoundPage />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['item-card-page']}>
      <div className={styles['item-card-page__container']}>
        <section className={styles['item-card-page__breadcrumbs']}>
          <Breadcrumbs filteredProduct={product} />
        </section>

        <section className={styles['item-card-page__back-button']}>
          <BackButton onClick={handleBackNavigation} />
        </section>

        <h1 className={styles['item-card-page__title']}>{product.name}</h1>

        <section className={styles['item-card-page__product-images']}>
          <article className={styles['item-card-page__thumbnails']}>
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={classNames(
                  styles['item-card-page__thumbnails-item'],
                  {
                    [styles['item-card-page__thumbnails-item--active']]:
                      currentImageIndex === index,
                  },
                )}
              >
                <img
                  src={`./${image}`}
                  alt={`Thumbnail ${index + 1}`}
                  className={styles['item-card-page__thumbnails-item-image']}
                />
              </div>
            ))}
          </article>

          <article
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={styles['item-card-page__product-cover']}
          >
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`./${image}`}
                alt={`${product.name} image ${index + 1}`}
                className={classNames(styles['item-card-page__product-image'], {
                  [styles['item-card-page__product-image--visible']]:
                    currentImageIndex === index,
                })}
              />
            ))}
          </article>
        </section>

        <section className={styles['item-card-page__details']}>
          <article className={styles['item-card-page__control-colors']}>
            <h2 className={styles['item-card-page__control-title']}>
              Available colors
            </h2>

            <ul className={styles['item-card-page__control-colors-list']}>
              {availableColors.map(({ formattedColorKey, color, isActive }) => (
                <li
                  key={formattedColorKey}
                  title={color?.name}
                  style={{ backgroundColor: color?.hex || '#ccc' }}
                  onClick={() => handleSelection('color', formattedColorKey)}
                  className={classNames(
                    styles['item-card-page__control-colors-item'],
                    {
                      [styles['item-card-page__control-colors-item--active']]:
                        isActive,
                    },
                  )}
                ></li>
              ))}
            </ul>
          </article>

          <article className={styles['item-card-page__control-capacities']}>
            <h2 className={styles['item-card-page__control-title']}>
              Select capacity
            </h2>

            <ul className={styles['item-card-page__control-capacities-list']}>
              {product.capacityAvailable.map(capacity => (
                <li
                  key={capacity}
                  onClick={() => handleSelection('capacity', capacity)}
                  className={classNames(
                    styles['item-card-page__control-capacities-item'],
                    {
                      [styles[
                        'item-card-page__control-capacities-item--active'
                      ]]: capacity === selectedCapacity,
                    },
                  )}
                >
                  {capacity}
                </li>
              ))}
            </ul>
          </article>

          <article className={styles['item-card-page__product-price']}>
            <span className={styles['item-card-page__price-discount']}>
              {`$${product.priceDiscount}`}
            </span>

            <span className={styles['item-card-page__price-regular']}>
              {`$${product.priceRegular}`}
            </span>
          </article>

          <article className={styles['item-card-page__buttons']}>
            <button
              onClick={handleAddToCart}
              className={styles['item-card-page__add-to-cart']}
            >
              Add to cart
            </button>

            <button
              onClick={handleToggleFavorite}
              className={classNames(
                styles['item-card-page__favourites-button'],
                {
                  [styles['item-card-page__favourites-button--active']]:
                    isFavorite,
                },
              )}
            >
              <img
                src="./icons/favourites.svg"
                alt="Favourites icon"
                className={classNames(
                  styles['item-card-page__favourites-button-icon'],
                  {
                    [styles['item-card-page__favourites-button-icon--active']]:
                      !isFavorite,
                  },
                )}
              />

              <img
                src="./icons/favourites-active.svg"
                alt="Favourites icon"
                className={classNames(
                  styles['item-card-page__favourites-button-icon'],
                  {
                    [styles['item-card-page__favourites-button-icon--active']]:
                      isFavorite,
                  },
                )}
              />
            </button>
          </article>

          <article className={styles['item-card-page__short-specs']}>
            <p className={styles['item-card-page__short-specs-item']}>
              <span
                className={classNames(
                  styles['item-card-page__short-specs-text'],
                  styles['item-card-page__short-specs-text--color'],
                )}
              >
                Screen
              </span>

              <span className={styles['item-card-page__short-specs-text']}>
                {product.screen}
              </span>
            </p>

            <p className={styles['item-card-page__short-specs-item']}>
              <span
                className={classNames(
                  styles['item-card-page__short-specs-text'],
                  styles['item-card-page__short-specs-text--color'],
                )}
              >
                Resolution
              </span>

              <span className={styles['item-card-page__short-specs-text']}>
                {product.resolution}
              </span>
            </p>

            <p className={styles['item-card-page__short-specs-item']}>
              <span
                className={classNames(
                  styles['item-card-page__short-specs-text'],
                  styles['item-card-page__short-specs-text--color'],
                )}
              >
                Processor
              </span>

              <span className={styles['item-card-page__short-specs-text']}>
                {product.processor}
              </span>
            </p>

            <p className={styles['item-card-page__short-specs-item']}>
              <span
                className={classNames(
                  styles['item-card-page__short-specs-text'],
                  styles['item-card-page__short-specs-text--color'],
                )}
              >
                {'Ram'.toUpperCase()}
              </span>

              <span className={styles['item-card-page__short-specs-text']}>
                {product.ram}
              </span>
            </p>
          </article>
        </section>

        <section className={styles['item-card-page__description']}>
          <article className={styles['item-card-page__about']}>
            <h2 className={styles['item-card-page__about-title']}>About</h2>

            {product.description.map(part => (
              <div
                key={part.title}
                className={styles['item-card-page__about-item']}
              >
                <h3 className={styles['item-card-page__about-subtitle']}>
                  {part.title}
                </h3>

                <div className={styles['item-card-page__about-description']}>
                  {part.text.map(item => (
                    <p
                      key={item}
                      className={
                        styles['item-card-page__about-description-part']
                      }
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </article>

          <article className={styles['item-card-page__specs']}>
            <h2 className={styles['item-card-page__specs-title']}>
              Tech specs
            </h2>

            {Object.entries(specs).map(([key, value]) => (
              <p key={key} className={styles['item-card-page__specs-item']}>
                <span className={styles['item-card-page__specs-subtitle']}>
                  {key === 'ram'
                    ? key.toUpperCase()
                    : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>

                <span className={styles['item-card-page__specs-description']}>
                  {Array.isArray(value) ? value.join(', ') : value}
                </span>
              </p>
            ))}
          </article>
        </section>
      </div>

      <div className={styles['item-card-page__also-like']}>
        <AlsoLike />
      </div>
    </div>
  );
};
