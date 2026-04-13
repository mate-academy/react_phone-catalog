import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import type { Product } from '@/types/Product';
import type { ProductDetail } from '@/types/ProductDetail';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Loader } from '../shared/components/Loader';
import { ImageSlider } from './components/ImageSlider';
import chevronIcon from '@/assets/icons/icon-chevron.svg';
import favoritesIcon from '@/assets/icons/icon-favorites.svg';
import favoritesSelectedIcon from '@/assets/icons/icon-favorites-selected.svg';
import styles from './ProductDetailsPage.module.scss';

const TECH_SPEC_FIELDS: [string, keyof ProductDetail][] = [
  ['Screen', 'screen'],
  ['Resolution', 'resolution'],
  ['Processor', 'processor'],
  ['RAM', 'ram'],
  ['Built in memory', 'capacity'],
  ['Camera', 'camera'],
  ['Zoom', 'zoom'],
  ['Cell', 'cell'],
];

const COLOR_MAP: Record<string, string> = {
  black: '#1C1C1E',
  blue: '#276787',
  coral: '#FF6B6B',
  gold: '#C8A97E',
  graphite: '#54524F',
  green: '#3E6B4D',
  midnight: '#191C22',
  midnightgreen: '#2D4C3F',
  pink: '#F4C3C2',
  purple: '#9B8EC4',
  red: '#BF0000',
  rosegold: '#B76E79',
  'rose gold': '#B76E79',
  sierrablue: '#6E93A8',
  silver: '#E3E4E5',
  'sky blue': '#A8C5DA',
  spaceblack: '#2A2A2A',
  spacegray: '#57585A',
  'space gray': '#57585A',
  starlight: '#FAF6EF',
  white: '#FAFAFA',
  yellow: '#FFE680',
};

const colorToHex = (name: string): string => COLOR_MAP[name] ?? '#888888';

const CATEGORY_LABELS: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCapacity, setSelectedCapacity] = useState<string>('');
  const [isInCart, setIsInCart] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setDetail(null);

    const controller = new AbortController();

    fetch('/api/products.json', { signal: controller.signal })
      .then(res => res.json())
      .then((data: Product[]) => {
        const foundProduct = data.find(p => p.itemId === productId);

        if (!foundProduct) {
          setError('Product not found');

          return;
        }

        setProduct(foundProduct);

        return fetch(`/api/${foundProduct.category}.json`, {
          signal: controller.signal,
        });
      })
      .then(res => res?.json())
      .then((data: ProductDetail[] | undefined) => {
        if (!data) {
          return;
        }

        const foundDetail = data.find(d => d.id === productId);

        if (foundDetail) {
          setDetail(foundDetail);
          setSelectedColor(foundDetail.color);
          setSelectedCapacity(foundDetail.capacity);
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError('Something went wrong');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const categoryLabel = CATEGORY_LABELS[product.category] ?? product.category;

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: categoryLabel, path: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <button className={styles.back} onClick={() => navigate(-1)}>
        <img
          src={chevronIcon}
          alt=""
          aria-hidden="true"
          className={styles.backChevron}
        />
        <span className={styles.backText}>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.contentGrid}>
        <div className={styles.imageSection}>
          {detail && <ImageSlider images={detail.images} alt={product.name} />}
        </div>
        <div className={styles.details}>
          {detail && (
            <>
              <div className={styles.sectionHeader}>
                <span className={styles.productId}>ID: {detail.id}</span>
                <span className={styles.sectionLabel}>Available colors</span>
              </div>
              <div className={styles.detailsWrapper}>
                <div className={styles.colorsSection}>
                  <div className={styles.colorSwatches}>
                    {detail.colorsAvailable.map(color => (
                      <button
                        key={color}
                        className={classNames(styles.colorSwatch, {
                          [styles.colorSwatchSelected]: color === selectedColor,
                        })}
                        style={
                          {
                            '--swatch-color': colorToHex(color),
                          } as React.CSSProperties
                        }
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select color ${color.replace(/-/g, ' ')}`}
                      />
                    ))}
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.capacitySection}>
                  <span className={styles.sectionLabel}>Select capacity</span>
                  <div className={styles.capacityButtons}>
                    {detail.capacityAvailable.map(cap => (
                      <button
                        key={cap}
                        className={classNames(styles.capacityBtn, {
                          [styles.capacityBtnSelected]:
                            cap === selectedCapacity,
                        })}
                        onClick={() => setSelectedCapacity(cap)}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>

                <hr className={styles.divider} />

                <div className={styles.priceRow}>
                  <span className={styles.price}>${detail.priceDiscount}</span>
                  <span className={styles.priceOld}>
                    ${detail.priceRegular}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button
                    className={classNames(styles.addToCart, {
                      [styles.addToCartAdded]: isInCart,
                    })}
                    onClick={() => setIsInCart(true)}
                  >
                    {isInCart ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    className={classNames(styles.addToFavorites, {
                      [styles.addToFavoritesActive]: isInFavorites,
                    })}
                    onClick={() => setIsInFavorites(v => !v)}
                    aria-label="Add to favourites"
                  >
                    <img
                      src={
                        isInFavorites ? favoritesSelectedIcon : favoritesIcon
                      }
                      alt=""
                      aria-hidden="true"
                    />
                  </button>
                </div>

                <dl className={styles.specs}>
                  {(
                    [
                      ['Screen', detail.screen],
                      ['Resolution', detail.resolution],
                      ['Processor', detail.processor],
                      ['RAM', detail.ram],
                    ] as [string, string][]
                  ).map(([label, value]) => (
                    <div key={label} className={styles.specRow}>
                      <dt className={styles.specLabel}>{label}</dt>
                      <dd className={styles.specValue}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </>
          )}
        </div>
      </div>

      {detail && (
        <div className={styles.bottomSections}>
          <section className={styles.aboutSection}>
            <h2 className={styles.sectionTitle}>About</h2>
            {detail.description.map((item, idx) => (
              <div key={idx} className={styles.descriptionItem}>
                <h3 className={styles.descriptionTitle}>{item.title}</h3>
                {item.text.map((para, pIdx) => (
                  <p key={pIdx} className={styles.descriptionText}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </section>

          <section className={styles.techSpecsSection}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>
            <dl className={styles.techSpecs}>
              {TECH_SPEC_FIELDS.map(([label, key]): [string, string] => {
                const raw = detail[key];
                const value = Array.isArray(raw) ? raw.join(', ') : String(raw);

                return [label, value];
              })
                .filter(([, value]) => Boolean(value))
                .map(([label, value]) => (
                  <div key={label} className={styles.techSpecRow}>
                    <dt className={styles.techSpecLabel}>{label}</dt>
                    <dd className={styles.techSpecValue}>{value}</dd>
                  </div>
                ))}
            </dl>
          </section>
        </div>
      )}
    </div>
  );
};
