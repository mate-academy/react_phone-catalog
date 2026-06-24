import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  getCategoryProductDetails,
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../shared/api/apiClient';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useAsync } from '../shared/hooks/useAsync';
import { Loader } from '../shared/components/Loader';
import { useCart, useFavorites } from '../shared/context';
import type { ProductCategory } from '../shared/types/product';
import type { ProductDetails } from '../shared/types/productDetails';
import styles from './ProductDetailsPage.module.scss';

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const COLOR_MAP: Record<string, string> = {
  midnight: '#1F2020',
  starlight: '#F2E8D9',
  purple: '#B9A2C7',
  yellow: '#FAE04C',
  green: '#3D6B54',
  blue: '#276787',
  red: '#BF0000',
  black: '#1B1B1B',
  white: '#F5F5F0',
  pink: '#F9C0BB',
  spaceblack: '#403E3D',
  spacegray: '#57595D',
  silver: '#CBCBCB',
  gold: '#F9E4C8',
  graphite: '#54524F',
  sierrablue: '#A7C1D9',
  alpinegreen: '#576856',
  skyblue: '#8AB4C8',
  rosegold: '#E8BCAC',
};

type VariantItem = {
  id: string;
  namespaceId: string;
  color: string;
  capacity: string;
};

type DetailsPayload = {
  product: ProductDetails | null;
  category: ProductCategory | null;
  productCode: number | null;
};

const normalizeVariantValue = (value: string): string =>
  value.toLowerCase().replace(/[\s-]/g, '');

const HEART_PATH =
  'M8 13c-.24 0-.47-.09-.65-.25C5.48 11.13 2 8.09 2 5.25 ' +
  '2 3.46 3.4 2 5.12 2 6.16 2 7.13 2.53 7.7 3.39L8 3.84l.3-.45' +
  'C8.87 2.53 9.84 2 10.88 2 12.6 2 14 3.46 14 5.25c0 2.84-3.48 ' +
  '5.88-5.35 7.5-.18.16-.41.25-.65.25z';

const findVariantId = (
  namespaceId: string,
  color: string,
  capacity: string,
  variants: VariantItem[],
): string | null => {
  const normalizedNamespace = normalizeVariantValue(namespaceId);
  const normalizedColor = normalizeVariantValue(color);
  const normalizedCapacity = normalizeVariantValue(capacity);

  const match = variants.find(
    item =>
      normalizeVariantValue(item.namespaceId) === normalizedNamespace &&
      normalizeVariantValue(item.color) === normalizedColor &&
      normalizeVariantValue(item.capacity) === normalizedCapacity,
  );

  return match?.id ?? null;
};

const smoothScrollToTop = (duration = 700) => {
  const startY = window.scrollY;
  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  if (startY <= 0) {
    return () => {};
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, 0);

    return () => {};
  }

  const startTime = performance.now();
  let frameId = 0;

  root.style.scrollBehavior = 'auto';

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY * (1 - eased));

    if (progress < 1) {
      frameId = window.requestAnimationFrame(tick);
    } else {
      root.style.scrollBehavior = previousScrollBehavior;
    }
  };

  frameId = window.requestAnimationFrame(tick);

  return () => {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
    }

    root.style.scrollBehavior = previousScrollBehavior;
  };
};

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { isInCart, add } = useCart();
  const { isFavorite, toggle } = useFavorites();

  const fetchDetails = useCallback(async (): Promise<DetailsPayload> => {
    if (!productId) {
      return { product: null, category: null, productCode: null };
    }

    const products = await getProducts();
    const base = products.find(p => p.itemId === productId);

    if (!base) {
      return { product: null, category: null, productCode: null };
    }

    try {
      const details = await getProductDetails(base.category, productId);

      return {
        product: details,
        category: base.category,
        productCode: base.id,
      };
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('404')) {
        return { product: null, category: base.category, productCode: null };
      }

      throw err;
    }
  }, [productId]);

  const { data, loading, error, reload } = useAsync(fetchDetails);
  const product = data?.product ?? null;
  const fallbackCategory = data?.category ?? null;
  const productCode = data?.productCode ?? null;

  const fetchSuggested = useCallback(async () => {
    if (!product) {
      return [];
    }

    return getSuggestedProducts(productId, product.category);
  }, [product, productId]);

  const { data: suggested, loading: suggestedLoading } =
    useAsync(fetchSuggested);

  const [activeImage, setActiveImage] = useState('');

  const fetchVariants = useCallback(async (): Promise<VariantItem[]> => {
    if (!product) {
      return [];
    }

    const [products, categoryDetails] = await Promise.all([
      getProducts(),
      getCategoryProductDetails(product.category),
    ]);

    const availableIds = new Set(products.map(item => item.itemId));

    return categoryDetails
      .filter(
        item =>
          item.namespaceId === product.namespaceId && availableIds.has(item.id),
      )
      .map(item => ({
        id: item.id,
        namespaceId: item.namespaceId,
        color: item.color,
        capacity: item.capacity,
      }));
  }, [product]);

  const { data: variants } = useAsync(fetchVariants);

  useEffect(() => {
    return smoothScrollToTop();
  }, [productId]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (loading && !product) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.page}>
        <div className={styles.statusBlock}>
          <h1 className={styles.statusTitle}>Something went wrong</h1>
          <p className={styles.statusText}>{String(error)}</p>
          <div className={styles.statusActions}>
            <button
              type="button"
              className={styles.statusPrimaryBtn}
              onClick={reload}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    const categoryPath = fallbackCategory ? `/${fallbackCategory}` : '/';
    const categoryLabel = fallbackCategory
      ? CATEGORY_LABELS[fallbackCategory]
      : 'Home';

    const handleFallbackBack = () => {
      if (window.history.state?.idx > 0) {
        navigate(-1);
      } else {
        navigate(categoryPath);
      }
    };

    return (
      <div className={styles.page}>
        <div className={styles.statusBlock}>
          <h1 className={styles.statusTitle}>Product was not found</h1>
          <p className={styles.statusText}>
            The requested product does not exist or has no details.
          </p>
          <div className={styles.statusActions}>
            <button
              type="button"
              className={styles.statusPrimaryBtn}
              onClick={handleFallbackBack}
            >
              Go back
            </button>

            <Link to={categoryPath} className={styles.statusSecondaryLink}>
              Go to {categoryLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const category = product.category;

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate(`/${category}`);
    }
  };

  const handleVariantChange = (nextColor: string, nextCapacity: string) => {
    const matchedId = findVariantId(
      product.namespaceId,
      nextColor,
      nextCapacity,
      variants ?? [],
    );

    if (!matchedId || matchedId === productId) {
      return;
    }

    navigate(`/product/${matchedId}`, { replace: true });
  };

  const handleSuggestedOpen = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  return (
    <div className={styles.page}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {CATEGORY_LABELS[category] ?? category}
        </Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <button type="button" className={styles.backBtn} onClick={handleBack}>
        ← Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.hero}>
        <ul className={styles.thumbnails}>
          {product.images.map(img => (
            <li key={img}>
              <button
                type="button"
                className={
                  img === activeImage
                    ? `${styles.thumbBtn} ${styles.thumbBtnActive}`
                    : styles.thumbBtn
                }
                onClick={() => setActiveImage(img)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt={product.name}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.mainImage}>
          <img
            src={`${import.meta.env.BASE_URL}${activeImage || product.images[0]}`}
            alt={product.name}
          />
        </div>

        <div className={styles.details}>
          <div className={styles.selectors}>
            <div className={styles.selectorGroup}>
              <div className={styles.selectorHeader}>
                <p className={styles.selectorLabel}>Available colors</p>
                {productCode && (
                  <p className={styles.productCode}>ID: {productCode}</p>
                )}
              </div>
              <ul className={styles.colorList}>
                {product.colorsAvailable.map(color => (
                  <li key={color}>
                    <input
                      id={`color-${color}`}
                      type="radio"
                      name="product-color"
                      value={color}
                      checked={color === product.color}
                      onChange={() =>
                        handleVariantChange(color, product.capacity)
                      }
                      className={styles.colorInput}
                    />
                    <label
                      htmlFor={`color-${color}`}
                      className={styles.colorBtn}
                      style={{
                        backgroundColor: COLOR_MAP[color] ?? '#ccc',
                      }}
                    >
                      <span className="visually-hidden">{color}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.selectorGroup}>
              <p className={styles.selectorLabel}>Select capacity</p>
              <ul className={styles.capacityList}>
                {product.capacityAvailable.map(cap => (
                  <li key={cap}>
                    <input
                      id={`capacity-${cap}`}
                      type="radio"
                      name="product-capacity"
                      value={cap}
                      checked={cap === product.capacity}
                      onChange={() => handleVariantChange(product.color, cap)}
                      className={styles.capacityInput}
                    />
                    <label
                      htmlFor={`capacity-${cap}`}
                      className={styles.capacityBtn}
                    >
                      {cap}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${product.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={
                inCart
                  ? `${styles.cartButton} ${styles.cartButtonAdded}`
                  : styles.cartButton
              }
              disabled={inCart}
              onClick={() => add(product.id)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={
                favorite
                  ? `${styles.favoriteButton} ${styles.favoriteButtonActive}`
                  : styles.favoriteButton
              }
              aria-label={`Add ${product.name} to favorites`}
              onClick={() => toggle(product.id)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={HEART_PATH}
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.shortSpecRow}>
              <span className={styles.shortSpecLabel}>Screen</span>
              <span className={styles.shortSpecValue}>{product.screen}</span>
            </div>
            <div className={styles.shortSpecRow}>
              <span className={styles.shortSpecLabel}>Resolution</span>
              <span className={styles.shortSpecValue}>
                {product.resolution}
              </span>
            </div>
            <div className={styles.shortSpecRow}>
              <span className={styles.shortSpecLabel}>Processor</span>
              <span className={styles.shortSpecValue}>{product.processor}</span>
            </div>
            <div className={styles.shortSpecRow}>
              <span className={styles.shortSpecLabel}>RAM</span>
              <span className={styles.shortSpecValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoGrid}>
        <section className={styles.about}>
          <h2 className={styles.aboutTitle}>About</h2>
          {product.description.map(section => (
            <div key={section.title} className={styles.aboutSection}>
              <h3 className={styles.aboutSectionTitle}>{section.title}</h3>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2 className={styles.techSpecsTitle}>Tech specs</h2>
          {[
            { label: 'Screen', value: product.screen },
            { label: 'Resolution', value: product.resolution },
            { label: 'Processor', value: product.processor },
            { label: 'RAM', value: product.ram },
            { label: 'Capacity', value: product.capacity },
            ...(product.camera
              ? [{ label: 'Camera', value: product.camera }]
              : []),
            ...(product.zoom ? [{ label: 'Zoom', value: product.zoom }] : []),
            { label: 'Cell', value: product.cell.join(', ') },
          ].map(({ label, value }) => (
            <div key={label} className={styles.specRow}>
              <span className={styles.specLabel}>{label}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </section>
      </div>

      <section className={styles.suggested}>
        {suggestedLoading && !suggested?.length && <Loader />}
        {suggested && (
          <ProductsSlider
            title="You may also like"
            titleId="you-may-like-title"
            products={suggested}
            onProductSelect={handleSuggestedOpen}
          />
        )}
      </section>
    </div>
  );
};
