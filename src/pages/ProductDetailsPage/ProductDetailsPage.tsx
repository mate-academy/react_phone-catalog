import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { ProductDetails, Product } from '../../types/Product';
import { buildImageUrl, getProductDetails } from '../../api/api';
import { useProducts } from '../../context/ProductsContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useLanguage, useT } from '../../context/LanguageContext';
import { TranslationKey } from '../../i18n/translations';
import { translateDescriptionTitle } from '../../i18n/descriptionTitles';
import { translateDescriptionParagraph } from '../../i18n/descriptionParagraphs';
import { Loader } from '../../components/Loader';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#1f1f1f',
  spaceblack: '#1d1d1f',
  graphite: '#2d2d2d',
  midnightgreen: '#4a5d4f',
  midnight: '#1f2632',
  silver: '#e3e4e5',
  gold: '#f7e7ce',
  rosegold: '#ecc7c0',
  white: '#f5f5f7',
  red: '#a4282d',
  blue: '#a8c8ec',
  pink: '#f0c4cc',
  green: '#aac5b1',
  yellow: '#f4dd5c',
  purple: '#a791c3',
  spacegray: '#5d5e5f',
  coral: '#ff7755',
  rosegold2: '#e7bcc1',
  starlight: '#f0e9da',
};

const colorToHex = (c: string) => {
  const key = c.replace(/\s+/g, '').toLowerCase();
  return COLOR_MAP[key] ?? '#cccccc';
};

const buildItemId = (
  current: ProductDetails,
  color?: string,
  capacity?: string,
) => {
  const parts = [current.namespaceId];
  parts.push((capacity ?? current.capacity).toLowerCase());
  parts.push((color ?? current.color).replace(/\s+/g, '-').toLowerCase());
  return parts.join('-');
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { isInCart, add } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const t = useT();
  const { locale } = useLanguage();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    setActiveImage(0);
    getProductDetails(productId)
      .then(setDetails)
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setDetails(null);
      })
      .finally(() => setLoading(false));
  }, [productId]);

  const productInList = useMemo<Product | null>(
    () => products.find(p => p.itemId === productId) ?? null,
    [products, productId],
  );

  const suggestions = useMemo(() => {
    if (!details) return [];
    const pool = products.filter(p => p.itemId !== productId);
    return [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, [products, productId, details]);

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>{t('product.notFound')}</p>
        <Link to="/" className={styles.backLink}>
          {t('product.backToHome')}
        </Link>
      </div>
    );
  }

  const categoryPath = `/${details.category}`;
  const categoryLabelKey: TranslationKey =
    details.category === 'phones'
      ? 'nav.phones'
      : details.category === 'tablets'
        ? 'nav.tablets'
        : 'nav.accessories';
  const inCart = productInList ? isInCart(productInList.id) : false;
  const fav = productInList ? isFavorite(productInList.id) : false;

  const handleAdd = () => {
    if (productInList && !inCart) add(productInList);
  };
  const handleFav = () => {
    if (productInList) toggleFavorite(productInList);
  };

  const switchTo = (color?: string, capacity?: string) => {
    const id = buildItemId(details, color, capacity);
    if (id === details.id) return;
    navigate(`/product/${id}`);
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs
        crumbs={[
          { label: t(categoryLabelKey), to: categoryPath },
          { label: details.name },
        ]}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(categoryPath)}
      >
        ‹ {t('common.back')}
      </button>

      <h1 className={styles.h1}>{details.name}</h1>

      <div className={styles.layout}>
        <div className={styles.thumbs}>
          {details.images.map((img, i) => (
            <button
              key={img}
              type="button"
              className={classNames(styles.thumb, {
                [styles.thumbActive]: i === activeImage,
              })}
              onClick={() => setActiveImage(i)}
            >
              <img src={buildImageUrl(img)} alt="" />
            </button>
          ))}
        </div>

        <div className={styles.mainImage}>
          <img
            src={buildImageUrl(details.images[activeImage])}
            alt={details.name}
          />
        </div>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <h3 className={styles.optionTitle}>{t('product.availableColors')}</h3>
            <div className={styles.colors}>
              {details.colorsAvailable.map(c => (
                <button
                  key={c}
                  type="button"
                  className={classNames(styles.colorBtn, {
                    [styles.colorBtnActive]: c === details.color,
                  })}
                  onClick={() => switchTo(c, undefined)}
                  aria-label={c}
                >
                  <span
                    className={styles.colorSwatch}
                    style={{ background: colorToHex(c) }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.optionGroup}>
            <h3 className={styles.optionTitle}>{t('product.selectCapacity')}</h3>
            <div className={styles.capacities}>
              {details.capacityAvailable.map(cap => (
                <button
                  key={cap}
                  type="button"
                  className={classNames(styles.capacityBtn, {
                    [styles.capacityBtnActive]: cap === details.capacity,
                  })}
                  onClick={() => switchTo(undefined, cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.price}>
            <span className={styles.priceCurrent}>
              ${details.priceDiscount}
            </span>
            {details.priceRegular > details.priceDiscount && (
              <span className={styles.priceOld}>${details.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={classNames(styles.addBtn, {
                [styles.addBtnAdded]: inCart,
              })}
              onClick={handleAdd}
              disabled={!productInList}
            >
              {inCart ? t('product.addedToCart') : t('product.addToCart')}
            </button>
            <button
              type="button"
              className={classNames(styles.favBtn, {
                [styles.favBtnActive]: fav,
              })}
              onClick={handleFav}
              disabled={!productInList}
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                <path
                  d="M8 14s-5-3-5-8a3 3 0 0 1 5-2 3 3 0 0 1 5 2c0 5-5 8-5 8z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                  fill={fav ? 'currentColor' : 'none'}
                />
              </svg>
            </button>
          </div>

          <ul className={styles.miniSpecs}>
            <li>
              <span>{t('product.screen')}</span>
              <span>{details.screen}</span>
            </li>
            <li>
              <span>{t('product.resolution')}</span>
              <span>{details.resolution}</span>
            </li>
            <li>
              <span>{t('product.processor')}</span>
              <span>{details.processor}</span>
            </li>
            <li>
              <span>{t('product.ram')}</span>
              <span>{details.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <section className={styles.section}>
        <h2 className={styles.h2}>{t('product.about')}</h2>
        {details.description.map(d => (
          <article key={d.title} className={styles.about}>
            <h3 className={styles.aboutTitle}>
              {translateDescriptionTitle(d.title, locale)}
            </h3>
            {d.text.map((paragraph, i) => (
              <p key={i} className={styles.aboutText}>
                {translateDescriptionParagraph(paragraph, locale)}
              </p>
            ))}
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.h2}>{t('product.techSpecs')}</h2>
        <ul className={styles.specs}>
          <li>
            <span>{t('product.screen')}</span>
            <span>{details.screen}</span>
          </li>
          <li>
            <span>{t('product.resolution')}</span>
            <span>{details.resolution}</span>
          </li>
          <li>
            <span>{t('product.processor')}</span>
            <span>{details.processor}</span>
          </li>
          <li>
            <span>{t('product.ram')}</span>
            <span>{details.ram}</span>
          </li>
          <li>
            <span>{t('product.builtInMemory')}</span>
            <span>{details.capacity}</span>
          </li>
          {details.camera && (
            <li>
              <span>{t('product.camera')}</span>
              <span>{details.camera}</span>
            </li>
          )}
          {details.zoom && (
            <li>
              <span>{t('product.zoom')}</span>
              <span>{details.zoom}</span>
            </li>
          )}
          {details.cell?.length > 0 && (
            <li>
              <span>{t('product.cell')}</span>
              <span>{details.cell.join(', ')}</span>
            </li>
          )}
        </ul>
      </section>

      {suggestions.length > 0 && (
        <ProductsSlider
          title={t('product.youMayAlsoLike')}
          products={suggestions}
        />
      )}
    </div>
  );
};
