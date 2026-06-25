import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductDetails, Product, Category } from '../../types/index';
import { Loader } from '../../components/Loader/index';
import { Breadcrumbs } from '../../components/Breadcrumbs/index';
import { ProductCard } from '../../components/ProductCard/index';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import phonesData from '../../../public/api/phones.json';
import tabletsData from '../../../public/api/tablets.json';
import accessoriesData from '../../../public/api/accessories.json';
import productsData from '../../../public/api/products.json';
import styles from './ProductDetailsPage.module.scss';

const ALL_DETAILS: ProductDetails[] = [
  ...(phonesData as ProductDetails[]),
  ...(tabletsData as ProductDetails[]),
  ...(accessoriesData as ProductDetails[]),
];
const ALL_PRODUCTS = productsData as Product[];

const COLOR_HEX: Record<string, string> = {
  black: '#1f1f1f',
  white: '#f5f5f5',
  gold: '#f5d07a',
  silver: '#c0c0c0',
  spacegray: '#717378',
  midnight: '#1b1b1d',
  starlight: '#f2ece4',
  blue: '#4a90d9',
  green: '#4caf50',
  yellow: '#ffd600',
  red: '#e53935',
  purple: '#9c27b0',
  coral: '#ff6b6b',
  rosegold: '#e8b4a0',
  graphite: '#41424c',
  sierrablue: '#a0b4c8',
  alpinegreen: '#576856',
  deepviolet: '#574f6f',
};

const CATEGORY_LABEL: Record<Category, string> = {
  phones: 'Mobile phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const IconBack: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M10 12L6 8l4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface IconHeartProps {
  filled: boolean;
}
const IconHeart: React.FC<IconHeartProps> = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 14s-6-3.84-6-8a4 4 0 0 1 6-3.46A4 4 0 0 1 14 6c0 4.16-6 8-6 8Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill={filled ? 'currentColor' : 'none'}
    />
  </svg>
);

type SpecEntry = [string, string];

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setActiveImg(0);

    const timerId = setTimeout(() => {
      const found = ALL_DETAILS.find(p => p.id === productId) ?? null;

      if (found) {
        setProduct(found);
      } else {
        setNotFound(true);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timerId);
  }, [productId]);

  const summaryProduct = useMemo(
    () => ALL_PRODUCTS.find(p => p.itemId === productId),
    [productId],
  );

  const suggested = useMemo<Product[]>(() => {
    if (!product) {
      return [];
    }

    return ALL_PRODUCTS.filter(
      p => p.category === product.category && p.itemId !== product.id,
    )
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
  }, [product]);

  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const inCart = summaryProduct ? isInCart(summaryProduct.id) : false;
  const fav = summaryProduct ? isFavorite(summaryProduct.id) : false;

  const changeVariant = (type: 'color' | 'capacity', value: string): void => {
    if (!product) {
      return;
    }

    const cap =
      type === 'capacity'
        ? value.toLowerCase()
        : product.capacity.toLowerCase();
    const col =
      type === 'color'
        ? value.replace(/\s+/g, '')
        : product.color.replace(/\s+/g, '');
    const newId = `${product.namespaceId}-${cap}-${col}`;
    const exists = ALL_DETAILS.find(p => p.id === newId);

    if (exists) {
      navigate(`/${product.category}/${exists.id}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.main}>
        <Loader />
      </div>
    );
  }

  if (notFound) {
    return (
      <main className={styles.main}>
        <p className={styles.notFound}>Product was not found</p>
      </main>
    );
  }

  if (!product) {
    return null;
  }

  const catLabel = CATEGORY_LABEL[product.category as Category];

  const quickSpecs: SpecEntry[] = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
  ];

  const techSpecs: SpecEntry[] = [
    ['Screen', product.screen],
    ['Resolution', product.resolution],
    ['Processor', product.processor],
    ['RAM', product.ram],
    ['Built in memory', product.capacity],
    ['Camera', product.camera],
    ['Zoom', product.zoom],
    ['Cell', product.cell.join(', ')],
  ];

  return (
    <main className={styles.main}>
      <Breadcrumbs
        crumbs={[
          { label: catLabel, path: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <button className={styles.back} onClick={() => navigate(-1)}>
        <IconBack />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.gallery}>
        <div className={styles.thumbs}>
          {product.images.map((img: string, i: number) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`}
              onClick={() => setActiveImg(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={img} alt={`${product.name} view ${i + 1}`} />
            </button>
          ))}
        </div>

        <div className={styles.mainImg}>
          <img src={product.images[activeImg]} alt={product.name} />
        </div>

        <div className={styles.options}>
          <div className={styles.optionGroup}>
            <div className={styles.optionHeader}>
              <span className={styles.optionLabel}>Available colors</span>
              <span className={styles.optionId}>
                ID: {product.id.slice(-6).toUpperCase()}
              </span>
            </div>
            <div className={styles.colorPicker}>
              {product.colorsAvailable.map((c: string) => (
                <button
                  key={c}
                  className={[
                    styles.colorBtn,
                    c === product.color ? styles.colorBtnActive : '',
                  ].join(' ')}
                  style={{ background: COLOR_HEX[c] ?? c }}
                  title={c}
                  onClick={() => changeVariant('color', c)}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.optionGroup}>
            <span className={styles.optionLabel}>Select capacity</span>
            <div className={styles.capacityPicker}>
              {product.capacityAvailable.map((cap: string) => (
                <button
                  key={cap}
                  className={[
                    styles.capBtn,
                    cap === product.capacity ? styles.capBtnActive : '',
                  ].join(' ')}
                  onClick={() => changeVariant('capacity', cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.prices}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              className={[styles.addBtn, inCart ? styles.addBtnAdded : ''].join(
                ' ',
              )}
              onClick={() => {
                if (summaryProduct) {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  inCart
                    ? removeFromCart(summaryProduct.id)
                    : addToCart(summaryProduct);
                }
              }}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={[styles.favBtn, fav ? styles.favBtnActive : ''].join(
                ' ',
              )}
              onClick={() => {
                if (summaryProduct) {
                  toggleFavorite(summaryProduct);
                }
              }}
              aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
            >
              <IconHeart filled={fav} />
            </button>
          </div>

          <dl className={styles.quickSpecs}>
            {quickSpecs.map(([k, v]: SpecEntry) => (
              <div key={k} className={styles.specRow}>
                <dt className={styles.specLabel}>{k}</dt>
                <dd className={styles.specValue}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {product.description.map(
            (section: { title: string; text: string[] }) => (
              <div key={section.title} className={styles.descSection}>
                <h3 className={styles.descTitle}>{section.title}</h3>
                {section.text.map((t: string, i: number) => (
                  <p key={i} className={styles.descText}>
                    {t}
                  </p>
                ))}
              </div>
            ),
          )}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <dl className={styles.specsList}>
            {techSpecs.map(([k, v]: SpecEntry) => (
              <div key={k} className={styles.specRow}>
                <dt className={styles.specLabel}>{k}</dt>
                <dd className={styles.specValue}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {suggested.length > 0 && (
        <section className={styles.suggested}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
          <div className={styles.suggestedTrack}>
            {suggested.map((p: Product) => (
              <div
                key={p.id}
                className={styles.suggestedItem}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
