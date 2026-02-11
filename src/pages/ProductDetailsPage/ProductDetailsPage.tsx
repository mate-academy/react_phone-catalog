import React, { useEffect, useReducer, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProductDetailsPage.module.scss';
import { Phone } from '../../types/Phone';
import { Product } from '../../types/Product';
// eslint-disable-next-line max-len
import { ProductDetailsSkeleton } from '../../components/ProductDetailsSkeleton';
import { NotFoundPage } from '../NotFoundPage';
import { getProductColor } from '../../constants/colors';
/* eslint-disable max-len */
import { SuggestedProductsSlider } from '../../components/SuggestedProductsSlider';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { fetchWithDelay } from '../../api/fetchWithDelay';

import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';

type ProductDetailsState = {
  product: Phone | null;
  productInfo: Product | null;
  loading: boolean;
  error: boolean;
  selectedImage: number;
  selectedColor: string;
  selectedCapacity: string;
  isLightboxOpen: boolean;
  isColorChanging: boolean;
  swipeStartX: number | null;
  swipeEndX: number | null;
};

type ProductDetailsAction =
  | { type: 'FETCH_START'; showLoader: boolean }
  | { type: 'FETCH_SUCCESS'; product: Phone; productInfo: Product }
  | { type: 'FETCH_ERROR' }
  | { type: 'FETCH_FINISH' }
  | { type: 'SET_SELECTED_IMAGE'; imageIndex: number }
  | { type: 'OPEN_LIGHTBOX' }
  | { type: 'CLOSE_LIGHTBOX' }
  | { type: 'START_SWIPE'; startX: number }
  | { type: 'MOVE_SWIPE'; endX: number };

const initialState: ProductDetailsState = {
  product: null,
  productInfo: null,
  loading: true,
  error: false,
  selectedImage: 0,
  selectedColor: '',
  selectedCapacity: '',
  isLightboxOpen: false,
  isColorChanging: false,
  swipeStartX: null,
  swipeEndX: null,
};

const productDetailsReducer = (
  state: ProductDetailsState,
  action: ProductDetailsAction,
): ProductDetailsState => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: action.showLoader ? true : state.loading,
        isColorChanging: action.showLoader ? false : true,
        error: false,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        product: action.product,
        productInfo: action.productInfo,
        selectedColor: action.product.color,
        selectedCapacity: action.product.capacity,
        selectedImage: 0,
        error: false,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        error: true,
      };

    case 'FETCH_FINISH':
      return {
        ...state,
        loading: false,
        isColorChanging: false,
      };

    case 'SET_SELECTED_IMAGE':
      return {
        ...state,
        selectedImage: action.imageIndex,
      };

    case 'OPEN_LIGHTBOX':
      return {
        ...state,
        isLightboxOpen: true,
      };

    case 'CLOSE_LIGHTBOX':
      return {
        ...state,
        isLightboxOpen: false,
      };

    case 'START_SWIPE':
      return {
        ...state,
        swipeStartX: action.startX,
        swipeEndX: null,
      };

    case 'MOVE_SWIPE':
      return {
        ...state,
        swipeEndX: action.endX,
      };

    default:
      return state;
  }
};

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [state, dispatch] = useReducer(productDetailsReducer, initialState);
  const {
    product,
    productInfo,
    loading,
    error,
    selectedImage,
    selectedColor,
    selectedCapacity,
    isLightboxOpen,
    isColorChanging,
    swipeStartX,
    swipeEndX,
  } = state;
  const isComponentMountedRef = useRef(true);

  const isProductChange = location.state?.isVariantChange;

  useEffect(() => {
    if (!isProductChange) {
      window.scrollTo(0, 0);
    }

    const fetchProduct = async () => {
      try {
        dispatch({
          type: 'FETCH_START',
          showLoader: isComponentMountedRef.current || !isProductChange,
        });

        const productsResponse = await fetchWithDelay('api/products.json');
        const allProducts: Product[] = await productsResponse.json();
        const productFromList = allProducts.find(p => p.itemId === productId);

        if (!productFromList) {
          dispatch({ type: 'FETCH_ERROR' });

          return;
        }

        const category = productFromList.category;
        const detailsResponse = await fetchWithDelay(`api/${category}.json`);
        const categoryProducts: Phone[] = await detailsResponse.json();
        const detailedProduct = categoryProducts.find(p => p.id === productId);

        if (detailedProduct) {
          dispatch({
            type: 'FETCH_SUCCESS',
            product: detailedProduct,
            productInfo: productFromList,
          });
        } else {
          dispatch({ type: 'FETCH_ERROR' });
        }
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR' });
      } finally {
        dispatch({ type: 'FETCH_FINISH' });
        isComponentMountedRef.current = false;
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, isProductChange]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const newProductId = product.id.replace(`-${product.color}`, `-${color}`);

    navigate(`/product/${newProductId}`, { state: { isVariantChange: true } });
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const currentCapacity = product.capacity.toLowerCase();
    const newCapacity = capacity.toLowerCase();
    const newProductId = product.id.replace(currentCapacity, newCapacity);

    navigate(`/product/${newProductId}`, { state: { isVariantChange: true } });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    dispatch({ type: 'START_SWIPE', startX: e.touches[0].clientX });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    dispatch({ type: 'MOVE_SWIPE', endX: e.touches[0].clientX });
  };

  const handleTouchEnd = () => {
    if (!swipeStartX || !swipeEndX || !product) {
      return;
    }

    const swipeDistance = swipeStartX - swipeEndX;

    if (swipeDistance > 60 && selectedImage < product.images.length - 1) {
      dispatch({ type: 'SET_SELECTED_IMAGE', imageIndex: selectedImage + 1 });
    }

    if (swipeDistance < -60 && selectedImage > 0) {
      dispatch({ type: 'SET_SELECTED_IMAGE', imageIndex: selectedImage - 1 });
    }
  };

  const isFavorite = favorites.find(fav => fav.id === product?.id);
  const isInCart = cartItems.some(item => item.phone.id === product?.id);

  const handleFavoriteClick = () => {
    if (!product) {
      return;
    }

    if (isFavorite) {
      removeFromFavorites(product);
    } else {
      addToFavorites(product);
    }
  };

  const handleAddToCartClick = () => {
    if (!product) {
      return;
    }

    if (isInCart) {
      removeFromCart(product.id);

      return;
    }

    addToCart(product);
  };

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (error || !product) {
    return <NotFoundPage title={t('product.notFound')} />;
  }

  const category = product.category as 'phones' | 'tablets' | 'accessories';

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          <img
            src="img/Home_breadcrumb.svg"
            alt={t('icons.homeAlt')}
            className={styles.homeIcon}
          />
        </Link>
        <img
          src="img/arrow_right_gray.svg"
          alt={t('icons.arrowRightAlt')}
          className={styles.arrow}
        />
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {t(`nav.${category}`)}
        </Link>
        <img
          src="img/arrow_right_gray.svg"
          alt={t('icons.arrowRightAlt')}
          className={styles.arrow}
        />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </div>

      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <img src="img/arrow_left.svg" alt={t('icons.backAlt')} />
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        <div
          className={styles.gallery}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            opacity: isColorChanging ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          <div className={styles.thumbnails}>
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${
                  selectedImage === index ? styles.thumbnailActive : ''
                }`}
                onClick={() =>
                  dispatch({ type: 'SET_SELECTED_IMAGE', imageIndex: index })
                }
                disabled={isColorChanging}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.mainImage}
            onClick={() => dispatch({ type: 'OPEN_LIGHTBOX' })}
            disabled={isColorChanging}
          >
            <img
              key={selectedImage}
              src={product.images[selectedImage]}
              alt={product.name}
            />
          </button>
        </div>

        <Lightbox
          open={isLightboxOpen}
          close={() => dispatch({ type: 'CLOSE_LIGHTBOX' })}
          index={selectedImage}
          slides={product.images.map((image, index) => ({
            src: image,
            alt: `${product.name} ${index + 1}`,
          }))}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          }}
          zoom={{ maxZoomPixelRatio: 2 }}
          plugins={[Fullscreen, Zoom]}
          on={{
            view: ({ index }) =>
              dispatch({ type: 'SET_SELECTED_IMAGE', imageIndex: index }),
          }}
        />

        <div className={styles.options}>
          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>{t('product.availableColors')}</p>
            <p className={styles.productId}>
              {t('product.id', { id: productInfo?.id })}
            </p>
          </div>

          <div className={styles.colors}>
            {product.colorsAvailable.map(color => (
              <button
                key={color}
                className={`${styles.colorButton} ${
                  selectedColor === color ? styles.colorButtonActive : ''
                }`}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: getProductColor(color) }}
              />
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.optionSection}>
            <p className={styles.optionLabel}>{t('product.selectCapacity')}</p>
          </div>

          <div className={styles.capacities}>
            {product.capacityAvailable.map(capacity => (
              <button
                key={capacity}
                className={`${styles.capacityButton} ${
                  selectedCapacity === capacity
                    ? styles.capacityButtonActive
                    : ''
                }`}
                onClick={() => handleCapacityChange(capacity)}
              >
                {capacity}
              </button>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.pricing}>
            <div className={styles.prices}>
              <span className={styles.price}>${product.priceDiscount}</span>
              {product.priceDiscount !== product.priceRegular && (
                <span className={styles.oldPrice}>${product.priceRegular}</span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.addToCart} ${isInCart ? styles.addedToCart : ''}`}
                onClick={handleAddToCartClick}
              >
                {isInCart ? t('common.addedToCart') : t('common.addToCart')}
              </button>
              <button className={styles.favorite} onClick={handleFavoriteClick}>
                <img
                  src={isFavorite ? 'img/heart_active.svg' : 'img/heart.svg'}
                  alt={t('product.favoriteAlt')}
                />
              </button>
            </div>
          </div>

          <div className={styles.specs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.screen')}
              </span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.resolution')}
              </span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>
                {t('product.specs.processor')}
              </span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>{t('product.specs.ram')}</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>{t('product.about')}</h2>
          <div className={styles.divider} />

          {product.description.map((section, index) => (
            <div key={index} className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>
              {section.text.map((paragraph, pIndex) => (
                <p key={pIndex} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>{t('product.techSpecs')}</h2>
          <div className={styles.divider} />

          <div className={styles.techSpecsList}>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.screen')}
              </span>
              <span className={styles.techSpecValue}>{product.screen}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.resolution')}
              </span>
              <span className={styles.techSpecValue}>{product.resolution}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.processor')}
              </span>
              <span className={styles.techSpecValue}>{product.processor}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.ram')}
              </span>
              <span className={styles.techSpecValue}>{product.ram}</span>
            </div>
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.builtInMemory')}
              </span>
              <span className={styles.techSpecValue}>{product.capacity}</span>
            </div>
            {product.camera && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>
                  {t('product.specs.camera')}
                </span>
                <span className={styles.techSpecValue}>{product.camera}</span>
              </div>
            )}
            {product.zoom && (
              <div className={styles.techSpecRow}>
                <span className={styles.techSpecLabel}>
                  {t('product.specs.zoom')}
                </span>
                <span className={styles.techSpecValue}>{product.zoom}</span>
              </div>
            )}
            <div className={styles.techSpecRow}>
              <span className={styles.techSpecLabel}>
                {t('product.specs.cell')}
              </span>
              <span className={styles.techSpecValue}>
                {product.cell.join(', ')}
              </span>
            </div>
          </div>
        </div>
      </div>

      <SuggestedProductsSlider category={category} excludeId={product.id} />
    </div>
  );
};
