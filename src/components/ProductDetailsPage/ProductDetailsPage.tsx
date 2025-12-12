import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductById, getSuggestedProducts } from '../../utils/serviceData';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { ProductDetails } from '../../types/ProductDetails';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectIsFavorite, toggleFavorites } from '../../features/favorites';
import {
  addToCart,
  removeFromCart,
  selectIsAddedToCart,
} from '../../features/cart';
import { Product } from '../../types/Product';

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

export const ProductDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductDetails[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedCapacity, setSelectedCapacity] = useState<string>();

  const isFav = useAppSelector(state =>
    selectIsFavorite(state, product?.id || ''),
  );
  const isAddedToCart = useAppSelector(state =>
    selectIsAddedToCart(state, product?.id || ''),
  );

  const loadData = useCallback(async () => {
    if (!productId) {
      return;
    }

    setIsError(false);
    setIsLoading(true);

    try {
      const foundProduct = await getProductById(productId);

      if (foundProduct) {
        setProduct(foundProduct);

        setSelectedImage(foundProduct.images[0]);

        const suggested = await getSuggestedProducts(foundProduct.id);

        setSuggestedProducts(suggested);
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

  const getProductsForRedux = (details: ProductDetails | null): Product => {
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
      year: 2023,
      image: details?.images[0] || '',
    };
  };

  const handleToggleFavorites = () => {
    dispatch(toggleFavorites(getProductsForRedux(product)));
  };

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(getProductsForRedux(product)));
    } else if (isAddedToCart) {
      dispatch(removeFromCart(getProductsForRedux(product).itemId));
    }
  };

  const handleTechSpecsChange = (newColor: string, newCapacity: string) => {
    const baseId =
      product?.namespaceId || product?.id.split('-').slice(0, -2).join('-');

    const normalizedColor = newColor.replace(/ /g, '-').toLowerCase();
    const normalizedCapacity = newCapacity.toLowerCase();

    const newId = `${baseId}-${normalizedCapacity}-${normalizedColor}`;

    navigate(`/${product?.category}/${newId}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage onRetry={loadData} />;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h1 className="product-not-found__title">{t('product-not-found')}</h1>
        <img
          src="/img/product-not-found.png"
          alt="product-not-found"
          className="product-not-found__image"
        />
      </div>
    );
  }

  return (
    <div className="container">
      <div className="product-details">
        <div className="product-details__breadcrumbs">
          <Link to="/">
            <div className="home-icon"></div>
          </Link>

          <div className="arrow-icon"></div>

          <Link
            to={`/${product.category}`}
            className="product-details__breadcrumbs-link"
          >
            {t(`${product.category}`)}
          </Link>

          <div className="arrow-icon"></div>

          <span className="product-details__breadcrumbs-text">
            {product.name}
          </span>
        </div>

        <div className="product-details__back-btn" onClick={() => navigate(-1)}>
          <div className="product-details__back-btn-icon"></div>
          <p className="product-details__back-btn-text">{t('back')}</p>
        </div>

        <h1 className="product-details__title">{product.name}</h1>

        <div className="product-details__top">
          <div className="product-details__gallery">
            <div className="product-details__main-image">
              <img
                src={`./${selectedImage}`}
                alt={product.name}
                className="product-details__main-image-img"
              />
            </div>

            <div className="product-details__thumbnails">
              {product.images.map(img => (
                <div
                  key={img}
                  className={cn('product-details__thumbnail', {
                    'is-active': selectedImage === img,
                  })}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={`./${img}`}
                    alt="thumbnail"
                    className="product-details__thumbnail-image"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="product-details__options">
            <div className="product-details__selector">
              <div className="product-details__label">
                {t('available-colors')}
              </div>
              <div className="product-details__colors-list">
                {product.colorsAvailable.map(color => (
                  // eslint-disable-next-line jsx-a11y/label-has-associated-control
                  <label
                    key={color}
                    className={cn('product-details__color-btn', {
                      'is-active': color === selectedColor,
                    })}
                    style={{ backgroundColor: colorMap[color] || color }}
                    title={color}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={color}
                      checked={color === selectedColor}
                      onChange={() => {
                        if (selectedCapacity) {
                          handleTechSpecsChange(color, selectedCapacity);
                        }
                      }}
                      className="product-details__radio-input"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="product-details__selector">
              <div className="product-details__label">
                {t('select-capacity')}
              </div>
              <div className="product-details__capacity-list">
                {product.capacityAvailable.map(cap => (
                  <label
                    key={cap}
                    className={cn('product-details__capacity-btn', {
                      'is-active': cap === selectedCapacity,
                    })}
                  >
                    <input
                      type="radio"
                      name="capacity"
                      value={cap}
                      checked={cap === selectedCapacity}
                      onChange={() => {
                        if (selectedColor) {
                          handleTechSpecsChange(selectedColor, cap);
                        }
                      }}
                      className="product-details__radio-input"
                    />
                    {cap}
                  </label>
                ))}
              </div>
            </div>

            <div className="product-details__price-block">
              <span className="product-details__price-discount">
                ${product.priceDiscount}
              </span>
              <span className="product-details__price-regular">
                ${product.priceRegular}
              </span>
            </div>

            <div className="product-details__actions">
              <button
                className={cn('product-details__actions-btn-add', {
                  'product-details__actions-btn-add--active': isAddedToCart,
                })}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? t('to-cart-succes') : t('to-cart')}
              </button>

              <button
                className={cn('product-details__actions-btn-fav', {
                  'product-details__actions-btn-fav--active': isFav,
                })}
                onClick={handleToggleFavorites}
              />
            </div>

            <div className="product-details__specs-short">
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  {t('screen')}
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  {t('resolution')}
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  {t('processor')}
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details__specs-short-spec-row">
                <span className="product-details__specs-short-spec-name">
                  {t('RAM')}
                </span>
                <span className="product-details__specs-short-spec-value">
                  {product.ram}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-details__bottom">
          <div className="product-details__about">
            <h2 className="section-title">{t('about')}</h2>
            {product.description.map((section, i) => (
              <div key={i} className="product-details__about-section">
                <h3 className="product-details__about-title">
                  {section.title}
                </h3>
                <div className="product-details__about-description">
                  {section.text.map((desc, j) => (
                    <p
                      key={j}
                      className="product-details__about-description-text"
                    >
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="product-details__tech-specs">
            <h2 className="section-title">{t('tech-specs')}</h2>
            <div className="product-details__tech-specs-spec-list">
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('screen')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.screen}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('resolution')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.resolution}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('processor')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.processor}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('RAM')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.ram}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('memory')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.capacity}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('camera')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.camera}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('zoom')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.zoom}
                </span>
              </div>
              <div className="product-details__tech-specs-spec-row">
                <span className="product-details__tech-specs-spec-name">
                  {t('cell')}
                </span>
                <span className="product-details__tech-specs-spec-value">
                  {product.cell.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ProductsSlider
          products={suggestedProducts}
          title={t('you-may-also-like')}
        />
      </div>
    </div>
  );
};
