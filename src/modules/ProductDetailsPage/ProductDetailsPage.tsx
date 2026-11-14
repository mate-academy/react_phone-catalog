import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackLink } from '../shared/components/BackLink/BackLink';
import { Breadcrumbs } from '../shared/components/Breadcrumbs/Breadcrumbs';
import { Loader } from '../shared/components/Loader/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useStore } from '../shared/context/StoreContext';
import {
  getProductDetails,
  getSuggestedProducts,
} from '../shared/services/api';
import { Product, ProductDetails } from '../shared/types/Product';
import styles from './ProductDetailsPage.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#1f2020',
  spacegray: '#535150',
  'space gray': '#535150',
  silver: '#ebebe3',
  gold: '#f9e5c9',
  rosegold: '#e8c5c4',
  'rose gold': '#e8c5c4',
  green: '#aee1cd',
  midnightgreen: '#4e5851',
  'midnight green': '#4e5851',
  yellow: '#ffe680',
  white: '#f9f6ef',
  purple: '#e5ddea',
  red: '#ba0c2e',
  coral: '#ee7762',
  pink: '#faddd7',
  blue: '#215e7d',
  graphite: '#42413d',
  sierrablue: '#9bb5ce',
  'sierra blue': '#9bb5ce',
  midnight: '#19222c',
  starlight: '#f0e9e2',
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart, toggleFavorite, isFavorite } = useStore();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    setHasError(false);

    getProductDetails(productId)
      .then((data) => {
        if (!data) {
          setHasError(true);
          return;
        }

        setDetails(data.details);
        setProduct(data.product);
        setSelectedImage(data.details.images[0] || '');

        return getSuggestedProducts(productId).then(setSuggested);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleOptionChange = (newColor: string, newCapacity: string) => {
    if (!details) return;

    const formattedColor = newColor.toLowerCase().replace(/\s+/g, '-');
    const formattedCapacity = newCapacity.toLowerCase();
    const nextId = [
      details.namespaceId,
      formattedCapacity,
      formattedColor,
    ].join('-');

    navigate(`/product/${nextId}`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || !details || details.images.length <= 1) return;

    const diff = touchStartX - e.changedTouches[0].clientX;
    const currentIndex = details.images.indexOf(selectedImage);

    if (diff > 50 && currentIndex < details.images.length - 1) {
      setSelectedImage(details.images[currentIndex + 1]);
    } else if (diff < -50 && currentIndex > 0) {
      setSelectedImage(details.images[currentIndex - 1]);
    }

    setTouchStartX(null);
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (hasError || !details || !product) {
    return (
      <div className={styles.page}>
        <BackLink />
        <img
          src={`${import.meta.env.BASE_URL}img/product-not-found.png`}
          alt="Product was not found"
          style={{
            maxWidth: '320px',
            width: '100%',
            margin: '24px auto 0',
            display: 'block',
          }}
        />
        <p className={styles.page__notFound}>Product was not found</p>
      </div>
    );
  }

  const inCart = isInCart(product.itemId);
  const favorited = isFavorite(product.itemId);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label:
              details.category.charAt(0).toUpperCase() +
              details.category.slice(1),
            path: `/${details.category}`,
          },
          { label: details.name },
        ]}
      />

      <div className={styles.page__back}>
        <BackLink />
      </div>

      <h1 className={styles.page__title}>{details.name}</h1>

      <div className={styles.page__mainGrid}>
        <div className={styles.gallery}>
          <div className={styles.gallery__previews}>
            {details.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`${styles.gallery__previewBtn} ${
                  selectedImage === img
                    ? styles['gallery__previewBtn--active']
                    : ''
                }`}
                aria-label={`Thumbnail ${idx + 1}`}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${img}`}
                  alt={`${details.name} preview ${idx + 1}`}
                  className={styles.gallery__previewImg}
                />
              </button>
            ))}
          </div>

          <div
            className={styles.gallery__mainBox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={`${import.meta.env.BASE_URL}${selectedImage}`}
              alt={details.name}
              className={styles.gallery__mainImg}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.actions__section}>
            <div className={styles.actions__headerRow}>
              <span className={styles.actions__label}>Available colors</span>
              <span className={styles.actions__id}>ID: 802390</span>
            </div>
            <div className={styles.actions__colors}>
              {details.colorsAvailable.map((col) => {
                const isSelected =
                  col.toLowerCase() === details.color.toLowerCase();
                const hex = COLOR_MAP[col.toLowerCase()] || '#cccccc';

                return (
                  <label
                    key={col}
                    className={`${styles.actions__colorCircle} ${
                      isSelected ? styles['actions__colorCircle--active'] : ''
                    }`}
                    style={{ backgroundColor: hex }}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={col}
                      checked={isSelected}
                      onChange={() => handleOptionChange(col, details.capacity)}
                      className={styles.actions__radioHidden}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.actions__divider} />

          <div className={styles.actions__section}>
            <span className={styles.actions__label}>Select capacity</span>
            <div className={styles.actions__capacities}>
              {details.capacityAvailable.map((cap) => {
                const isSelected =
                  cap.toLowerCase() === details.capacity.toLowerCase();

                return (
                  <label
                    key={cap}
                    className={`${styles.actions__capacityBtn} ${
                      isSelected ? styles['actions__capacityBtn--active'] : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="capacity"
                      value={cap}
                      checked={isSelected}
                      onChange={() => handleOptionChange(details.color, cap)}
                      className={styles.actions__radioHidden}
                    />
                    {cap}
                  </label>
                );
              })}
            </div>
          </div>

          <div className={styles.actions__divider} />

          <div className={styles.actions__prices}>
            <span className={styles.actions__price}>
              ${details.priceDiscount}
            </span>
            <span className={styles.actions__fullPrice}>
              ${details.priceRegular}
            </span>
          </div>

          <div className={styles.actions__ctaRow}>
            <button
              type="button"
              disabled={inCart}
              onClick={() => addToCart(product)}
              className={`${styles.actions__addBtn} ${
                inCart ? styles['actions__addBtn--added'] : ''
              }`}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product)}
              className={`${styles.actions__favBtn} ${
                favorited ? styles['actions__favBtn--active'] : ''
              }`}
              aria-label="Toggle favorite"
            >
              {favorited ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.actions__specs}>
            <div className={styles.actions__specRow}>
              <span className={styles.actions__specName}>Screen</span>
              <span className={styles.actions__specVal}>{details.screen}</span>
            </div>
            <div className={styles.actions__specRow}>
              <span className={styles.actions__specName}>Resolution</span>
              <span className={styles.actions__specVal}>
                {details.resolution}
              </span>
            </div>
            <div className={styles.actions__specRow}>
              <span className={styles.actions__specName}>Processor</span>
              <span className={styles.actions__specVal}>
                {details.processor}
              </span>
            </div>
            <div className={styles.actions__specRow}>
              <span className={styles.actions__specName}>RAM</span>
              <span className={styles.actions__specVal}>{details.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.page__detailsGrid}>
        <section className={styles.about}>
          <h2 className={styles.page__subtitle}>About</h2>
          <div className={styles.page__subDivider} />
          {details.description.map((block, idx) => (
            <article key={idx} className={styles.about__block}>
              <h3 className={styles.about__blockTitle}>{block.title}</h3>
              {block.text.map((paragraph, pIdx) => (
                <p key={pIdx} className={styles.about__text}>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section className={styles.specs}>
          <h2 className={styles.page__subtitle}>Tech specs</h2>
          <div className={styles.page__subDivider} />
          <dl className={styles.specs__list}>
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>Screen</dt>
              <dd className={styles.specs__desc}>{details.screen}</dd>
            </div>
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>Resolution</dt>
              <dd className={styles.specs__desc}>{details.resolution}</dd>
            </div>
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>Processor</dt>
              <dd className={styles.specs__desc}>{details.processor}</dd>
            </div>
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>RAM</dt>
              <dd className={styles.specs__desc}>{details.ram}</dd>
            </div>
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>Built in memory</dt>
              <dd className={styles.specs__desc}>{details.capacity}</dd>
            </div>
            {details.camera && (
              <div className={styles.specs__row}>
                <dt className={styles.specs__term}>Camera</dt>
                <dd className={styles.specs__desc}>{details.camera}</dd>
              </div>
            )}
            {details.zoom && (
              <div className={styles.specs__row}>
                <dt className={styles.specs__term}>Zoom</dt>
                <dd className={styles.specs__desc}>{details.zoom}</dd>
              </div>
            )}
            <div className={styles.specs__row}>
              <dt className={styles.specs__term}>Cell</dt>
              <dd className={styles.specs__desc}>{details.cell.join(', ')}</dd>
            </div>
          </dl>
        </section>
      </div>

      {suggested.length > 0 && (
        <div className={styles.page__slider}>
          <ProductsSlider
            title="You may also like"
            products={suggested}
            showFullPrice={true}
          />
        </div>
      )}
    </div>
  );
};
