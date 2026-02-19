/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { getProductDetails, getProducts } from '../../api/products';
import { Product, DescriptionPart } from '../../types/Product';
import { isCategory } from '../../types/categories';
import { useCart } from '../../context/CartContext';
import { useFavourites } from '../../context/FavouritesContext';
import ProductCarousel from '../../componenst/ProductCarousel/ProductCarousel';
import styles from './ProductDetails.module.scss';

const base = import.meta.env.BASE_URL ?? '/';
const resolveUrl = (path: string) => {
  if (path.startsWith('http')) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base.endsWith('/') ? base : `${base}/`}${cleanPath}`;
};

const ProductDetails: React.FC = () => {
  const { category: rawCategory, productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = isCategory(rawCategory) ? rawCategory : undefined;
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    useFavourites();

  const initialProduct = (location.state as any)?.product as
    | Product
    | undefined;
  const [item, setItem] = useState<Product | null>(initialProduct ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId || !category) {
      return;
    }

    let mounted = true;

    // ВМИКАЄМО ЛОАДЕР ТІЛЬКИ ЯКЩО ТОВАРУ ЩЕ НЕМАЄ (перше завантаження)
    if (!item) {
      setLoading(true);
    }

    setError(null);

    getProductDetails(productId, category)
      .then(res => {
        if (!mounted) {
          return;
        }

        if (!res) {
          setError('Product was not found');
        } else {
          setItem(res);
          sessionStorage.setItem('productName', res.name);
          // Оновлюємо картинку для нового кольору
          if (res.images && res.images.length > 0) {
            setSelectedImage(res.images[0]);
          }
        }
      })
      .catch(e => {
        if (!mounted) {
          return;
        }

        setError(e?.message || 'Failed to load product');
      })
      .finally(() => {
        if (!mounted) {
          return;
        }

        setLoading(false);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, category]); // item не додаємо в залежності, щоб не було нескінченного циклу

  // Завантажити рекомендовані товари для слайдера
  useEffect(() => {
    if (!category) {
      return;
    }

    let mounted = true;

    getProducts(category)
      .then(products => {
        if (!mounted) {
          return;
        }

        // Отримати 6 випадкових товарів, окрім поточного
        const recommended = products
          .filter(p => p.id !== productId)
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);

        setRecommendedProducts(recommended);
      })
      .catch(() => {
        // Якщо сталася помилка при завантаженні, просто не показувати слайдер
        setRecommendedProducts([]);
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, productId]);

  if (loading) {
    return <div className={styles.loader}>Loading product…</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const mainImage = selectedImage || item.images?.[0] || '';
  const thumbnails = item.images || [];
  const desc = (item as any).description;
  const colorsAvailable = (item as any).colorsAvailable || [];
  const capacitiesAvailable = (item as any).capacityAvailable || [];
  const currentColor = (item as any).color || '';
  const capacity = (item as any).capacity || '';
  const namespaceId = (item as any).namespaceId || '';

  const getColorProductId = (color: string): string => {
    if (!namespaceId || !capacity) {
      return '';
    }

    const capacityId = capacity.toLowerCase().replace(/gb/gi, 'gb');

    return `${namespaceId}-${capacityId}-${color.toLowerCase()}`;
  };

  const getCapacityProductId = (capacityValue: string): string => {
    if (!namespaceId || !currentColor) {
      return '';
    }

    const capacityId = capacityValue.toLowerCase().replace(/gb/gi, 'gb');

    return `${namespaceId}-${capacityId}-${currentColor.toLowerCase()}`;
  };

  const handleColorClick = (color: string) => {
    navigate(`/product/${category}/${getColorProductId(color)}`, {
      preventScrollReset: true,
    });
  };

  const handleCapacityClick = (capacityValue: string) => {
    navigate(`/product/${category}/${getCapacityProductId(capacityValue)}`, {
      preventScrollReset: true,
    });
  };

  const colorMap: { [key: string]: string } = {
    black: '#242625',
    white: '#fef8f3',
    red: '#c41935',
    green: '#b3e2ce',
    blue: '#2196F3',
    yellow: '#fee786',
    purple: '#d3cfdc',
    pink: '#E91E63',
    gold: '#fddfc7',
    silver: '#C0C0C0',
    spacegray: '#2e3034',
    'space gray': '#A0A0A0',
    'rose gold': '#B76E79',
    rosegold: '#f2cac3',
    gray: '#808080',
    'midnight green': '#004225',
    midnightgreen: '#004225',
    coral: '#FF7F50',
    graphite: '#595959',
    'sierra blue': '#6BA3D0',
    sierrablue: '#6BA3D0',
  };

  const renderDescription = (parts: DescriptionPart[] | undefined) => {
    if (!parts || !Array.isArray(parts)) {
      return null;
    }

    return (
      <div>
        {parts.map((part, i) => (
          <div key={i}>
            {part.title && <h3>{part.title}</h3>}
            {part.text && Array.isArray(part.text) && (
              <>
                {part.text.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.productDetails}>
      {/* Блок 1: Title */}
      <div className={styles.titleBlock}>
        <h1 className={styles.titleBlock__title}>{item.name}</h1>
      </div>

      {/* Блок 2: Product Container */}
      <div className={styles.productContainer}>
        {/* Блок 2.1: Main Image */}
        <div className={styles.mainImageBlock}>
          {mainImage && (
            <img
              src={mainImage}
              alt={item.name}
              className={styles.mainImageBlock__image}
            />
          )}
        </div>

        {/* Блок 2.2: Thumbnails */}
        {thumbnails.length > 1 && (
          <div className={styles.thumbnailsBlock}>
            {thumbnails.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnailsBlock__item} ${
                  selectedImage === image
                    ? styles['thumbnailsBlock__item--active']
                    : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${item.name} ${index}`} />
              </div>
            ))}
          </div>
        )}

        {/* Блок 2.3: Product Info */}
        <div className={styles.infoBlock}>
          {/* Блок 2.3.1: Color Selection */}
          <div className={styles.colorSelection}>
            <div className={styles.colorSelection__label}>Available colors</div>
            <div className={styles.colorSelection__options}>
              {colorsAvailable.map((color: string) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorClick(color)}
                  className={`${styles.colorSelection__option} ${
                    currentColor === color
                      ? styles['colorSelection__option--active']
                      : ''
                  }`}
                  style={{
                    backgroundColor: colorMap[color.toLowerCase()] || '#ccc',
                  }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Блок 2.3.2: Capacity/Version Selection */}
          <div className={styles.capacitySelection}>
            <div className={styles.capacitySelection__label}>
              Select capacity
            </div>
            <div className={styles.capacitySelection__options}>
              {capacitiesAvailable.map((capacityValue: string) => (
                <button
                  key={capacityValue}
                  type="button"
                  onClick={() => handleCapacityClick(capacityValue)}
                  className={`${styles.capacitySelection__option} ${
                    capacity === capacityValue
                      ? styles['capacitySelection__option--active']
                      : ''
                  }`}
                >
                  {capacityValue}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Блок 2.3.3: Price */}
          <div className={styles.priceBlock}>
            {(item as any).priceDiscount !== undefined &&
            (item as any).priceDiscount !== null ? (
              <>
                <span className={styles.priceBlock__discount}>
                  ${(item as any).priceDiscount}
                </span>
                {(item as any).priceRegular ? (
                  <span className={styles.priceBlock__regular}>
                    ${(item as any).priceRegular}
                  </span>
                ) : null}
              </>
            ) : (
              <span className={styles.priceBlock__discount}>
                {(item as any).priceRegular ?? (item as any).price ?? '—'}
              </span>
            )}
          </div>

          {/* Блок 2.3.4: Action Buttons */}
          <div className={styles.buttonsBlock}>
            {isInCart(item.id) ? (
              <button
                type="button"
                className={styles.buttonsBlock__cart}
                onClick={() => removeFromCart(item.id)}
                aria-pressed={true}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                type="button"
                className={styles.buttonsBlock__cart}
                onClick={() => addToCart(item)}
                aria-pressed={false}
              >
                Add to Cart
              </button>
            )}
            {isInFavourites(item.id) ? (
              <button
                type="button"
                className={styles.buttonsBlock__favourite}
                onClick={() => removeFromFavourites(item.id)}
                aria-pressed={true}
              >
                <img
                  src={resolveUrl('icons/Favourites Filled (Heart Like).svg')}
                  alt="Remove from Favourites"
                />
              </button>
            ) : (
              <button
                type="button"
                className={styles.buttonsBlock__favourite}
                onClick={() => addToFavourites(item)}
                aria-pressed={false}
              >
                <img
                  src={resolveUrl('icons/Favourites (Heart Like).svg')}
                  alt="Add to Favourites"
                />
              </button>
            )}
          </div>

          {/* Блок 2.3.5: Mini Specs */}
          <div className={styles.miniSpecs}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>
                {(item as any).screen ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {(item as any).resolution ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {(item as any).processor ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>
                {(item as any).ram ?? '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Блок 3: Description */}
      <div className={styles.descriptionBlock}>
        {/* Блок 3.1: About */}
        <section className={styles.aboutSection}>
          <h2 className={styles.aboutSection__title}>About</h2>
          <div className={styles.aboutSection__content}>
            {renderDescription(desc)}
          </div>
        </section>

        {/* Блок 3.2: Tech Specs */}
        <section className={styles.techSpecsSection}>
          <h2 className={styles.techSpecsSection__title}>Tech Specs</h2>
          <div className={styles.techSpecsSection__content}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>
                {(item as any).screen ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {(item as any).resolution ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {(item as any).processor ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>
                {(item as any).ram ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Camera</span>
              <span className={styles.specValue}>
                {(item as any).camera ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Zoom</span>
              <span className={styles.specValue}>
                {(item as any).zoom ?? '—'}
              </span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Cell</span>
              <span className={styles.specValue}>
                {Array.isArray((item as any).cell)
                  ? (item as any).cell.join(', ')
                  : ((item as any).cell ?? '—')}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Блок 4: You May Also Like */}
      {recommendedProducts.length > 0 && (
        <ProductCarousel
          title="You may also like"
          products={recommendedProducts}
        />
      )}
    </div>
  );
};

export default ProductDetails;
