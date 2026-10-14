/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Product, ProductDetails } from '../shared/types/Product';
import {
  getPhones,
  getTablets,
  getAccessories,
  getSuggestedProducts,
} from '../shared/api/products';
import { Loader } from '../shared/components/Loader';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { useLanguage } from '../shared/context/LanguageContext';
import { getPublicPath } from '../shared/utils/pathHelper';
import styles from './ProductDetailsPage.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#1f2020',
  green: '#aee1cd',
  yellow: '#ffe680',
  white: '#f9f6ef',
  purple: '#e5ddea',
  red: '#ba0c2e',
  spacegray: '#535150',
  'space gray': '#535150',
  midnightgreen: '#4e5851',
  'midnight green': '#4e5851',
  gold: '#fad7bd',
  silver: '#ebebe3',
  rosegold: '#e6c7c2',
  'rose gold': '#e6c7c2',
  coral: '#ee7762',
  blue: '#215e7d',
  graphite: '#424146',
  sierrablue: '#93b0c8',
  'sierra blue': '#93b0c8',
  pink: '#faddd7',
  starlight: '#faf7f2',
  midnight: '#192430',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [allCategoryItems, setAllCategoryItems] = useState<ProductDetails[]>(
    [],
  );
  const allCategoryItemsRef = useRef<ProductDetails[]>([]);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      setNotFound(true);
      setLoading(false);

      return;
    }

    const existing = allCategoryItemsRef.current.find(p => p.id === productId);

    if (existing) {
      setDetails(existing);
      setSelectedImage(existing.images[0] || '');
      setNotFound(false);

      return;
    }

    setLoading(true);
    setNotFound(false);

    Promise.all([getPhones(), getTablets(), getAccessories()])
      .then(([phones, tablets, accessories]) => {
        let found = phones.find(p => p.id === productId);
        let categoryItems = phones;

        if (!found) {
          found = tablets.find(p => p.id === productId);
          categoryItems = tablets;
        }

        if (!found) {
          found = accessories.find(p => p.id === productId);
          categoryItems = accessories;
        }

        if (found) {
          allCategoryItemsRef.current = categoryItems;
          setDetails(found);
          setAllCategoryItems(categoryItems);
          setSelectedImage(found.images[0] || '');
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    getSuggestedProducts(productId)
      .then(setSuggested)
      .catch(() => setSuggested([]));
  }, [productId]);

  const productForCart: Product | null = useMemo(() => {
    if (!details) {
      return null;
    }

    return {
      id: Number(details.id.replace(/\D/g, '').slice(0, 8)) || Date.now(),
      category:
        (details.category as 'phones' | 'tablets' | 'accessories') || 'phones',
      itemId: details.id,
      name: details.name,
      fullPrice: details.priceRegular,
      price: details.priceDiscount,
      screen: details.screen,
      capacity: details.capacity,
      color: details.color,
      ram: details.ram,
      year: 2022,
      image: details.images[0] || '',
    };
  }, [details]);

  const inCart = details ? isInCart(details.id) : false;
  const favorite = details ? isFavorite(details.id) : false;

  const handleColorChange = (newColor: string) => {
    if (!details) {
      return;
    }

    // Try to find matching item with same namespaceId & capacity but different color
    const match = allCategoryItems.find(
      item =>
        item.namespaceId === details.namespaceId &&
        item.capacity === details.capacity &&
        item.color.toLowerCase() === newColor.toLowerCase(),
    );

    if (match) {
      navigate(`/product/${match.id}`);
    }
  };

  const handleCapacityChange = (newCapacity: string) => {
    if (!details) {
      return;
    }

    // Try to find matching item with same namespaceId & color but different capacity
    const match = allCategoryItems.find(
      item =>
        item.namespaceId === details.namespaceId &&
        item.color === details.color &&
        item.capacity.toLowerCase() === newCapacity.toLowerCase(),
    );

    if (match) {
      navigate(`/product/${match.id}`);
    }
  };

  if (loading) {
    return (
      <div className="main-container">
        <Loader />
      </div>
    );
  }

  if (notFound || !details) {
    return (
      <div className="main-container">
        <div className={styles.notFound}>
          <h2 className={styles.notFoundTitle}>{t('productNotFound')}</h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.backButton}
          >
            <i className="fas fa-chevron-left" />
            <span>{t('back')}</span>
          </button>
        </div>
      </div>
    );
  }

  const categoryName =
    details.category.charAt(0).toUpperCase() + details.category.slice(1);

  return (
    <div className={styles.page}>
      <div className="main-container">
        <Breadcrumbs
          items={[
            { label: categoryName, path: `/${details.category}` },
            { label: details.name },
          ]}
        />

        <button
          type="button"
          onClick={() => navigate(`/${details.category}`)}
          className={styles.backButton}
          data-cy="backButton"
        >
          <i className="fas fa-chevron-left" />
          <span>{t('back')}</span>
        </button>

        <h1 className={styles.title}>{details.name}</h1>

        <div className={styles.mainGrid}>
          {/* Gallery */}
          <div className={styles.gallerySection}>
            <div className={styles.thumbnails}>
              {details.images.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={classNames(styles.thumbButton, {
                    [styles.active]: selectedImage === img,
                  })}
                  aria-label={`Select photo ${idx + 1}`}
                >
                  <img
                    src={getPublicPath(img)}
                    alt={`${details.name} thumb ${idx + 1}`}
                    className={styles.thumbImage}
                  />
                </button>
              ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                src={getPublicPath(selectedImage || details.images[0])}
                alt={details.name}
                className={styles.mainImage}
              />
            </div>
          </div>

          {/* Product Info & Selectors */}
          <div className={styles.infoSection}>
            <div className={styles.selectorsBlock}>
              {/* Colors */}
              <p className={styles.sectionLabel}>{t('availableColors')}</p>
              <div className={styles.colorOptions}>
                {details.colorsAvailable.map(col => {
                  const hex = COLOR_MAP[col.toLowerCase()] || '#ccc';
                  const isCurrent =
                    details.color.toLowerCase() === col.toLowerCase();

                  return (
                    <label
                      key={col}
                      className={classNames(styles.colorRadio, {
                        [styles.active]: isCurrent,
                      })}
                      title={col}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={col}
                        checked={isCurrent}
                        onChange={() => handleColorChange(col)}
                      />
                      <span
                        className={styles.colorCircle}
                        style={{ backgroundColor: hex }}
                      />
                    </label>
                  );
                })}
              </div>

              <div className={styles.divider} />

              {/* Capacities */}
              <p className={styles.sectionLabel}>{t('selectCapacity')}</p>
              <div className={styles.capacityOptions}>
                {details.capacityAvailable.map(cap => {
                  const isCurrent =
                    details.capacity.toLowerCase() === cap.toLowerCase();

                  return (
                    <label
                      key={cap}
                      className={classNames(styles.capacityRadio, {
                        [styles.active]: isCurrent,
                      })}
                    >
                      <input
                        type="radio"
                        name="capacity"
                        value={cap}
                        checked={isCurrent}
                        onChange={() => handleCapacityChange(cap)}
                      />
                      <span>{cap}</span>
                    </label>
                  );
                })}
              </div>

              <div className={styles.divider} />
            </div>

            {/* Prices */}
            <div className={styles.priceBlock}>
              <span className={styles.price}>${details.priceDiscount}</span>
              {details.priceRegular > details.priceDiscount && (
                <span className={styles.fullPrice}>
                  ${details.priceRegular}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              {productForCart && (
                <button
                  type="button"
                  onClick={() => addToCart(productForCart)}
                  className={classNames(styles.cartButton, {
                    [styles.added]: inCart,
                  })}
                  disabled={inCart}
                >
                  {inCart ? t('addedToCart') : t('addToCart')}
                </button>
              )}

              {productForCart && (
                <button
                  type="button"
                  onClick={() => toggleFavorite(productForCart)}
                  className={classNames(styles.favoriteButton, {
                    [styles.active]: favorite,
                  })}
                  aria-label="Add to favorites"
                >
                  <i className={favorite ? 'fas fa-heart' : 'far fa-heart'} />
                </button>
              )}
            </div>

            {/* Short Tech Specs */}
            <div className={styles.shortSpecs}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('screen')}</span>
                <span className={styles.specVal}>{details.screen}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('resolution')}</span>
                <span className={styles.specVal}>{details.resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('processor')}</span>
                <span className={styles.specVal}>{details.processor}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('ram')}</span>
                <span className={styles.specVal}>{details.ram}</span>
              </div>
            </div>
          </div>
        </div>

        {/* About & Tech Specs */}
        <div className={styles.detailsGrid}>
          {/* About Section */}
          <div data-cy="productDescription">
            <h2 className={styles.sectionHeader}>{t('about')}</h2>
            {details.description.map(sec => (
              <div key={sec.title} className={styles.aboutBlock}>
                <h3 className={styles.aboutSubheader}>{sec.title}</h3>
                {sec.text.map((paragraph, pIdx) => (
                  <p key={pIdx} className={styles.aboutText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Full Tech Specs */}
          <div>
            <h2 className={styles.sectionHeader}>{t('techSpecs')}</h2>
            <div className={styles.techSpecsList}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('screen')}</span>
                <span className={styles.specVal}>{details.screen}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('resolution')}</span>
                <span className={styles.specVal}>{details.resolution}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('processor')}</span>
                <span className={styles.specVal}>{details.processor}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('ram')}</span>
                <span className={styles.specVal}>{details.ram}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>{t('builtinMemory')}</span>
                <span className={styles.specVal}>{details.capacity}</span>
              </div>
              {details.camera && (
                <div className={styles.specRow}>
                  <span className={styles.specKey}>{t('camera')}</span>
                  <span className={styles.specVal}>{details.camera}</span>
                </div>
              )}
              {details.zoom && (
                <div className={styles.specRow}>
                  <span className={styles.specKey}>{t('zoom')}</span>
                  <span className={styles.specVal}>{details.zoom}</span>
                </div>
              )}
              {details.cell && details.cell.length > 0 && (
                <div className={styles.specRow}>
                  <span className={styles.specKey}>{t('cell')}</span>
                  <span className={styles.specVal}>
                    {details.cell.join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* You may also like */}
        {suggested.length > 0 && (
          <ProductsSlider title={t('youMayAlsoLike')} products={suggested} />
        )}
      </div>
    </div>
  );
};
