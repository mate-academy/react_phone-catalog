import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { useShopContext } from '../../context/ShopContext';
import { ProductsSlider } from '../../components/ProductsSlider';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { type Product } from '../../components/ProductCard';
import styles from './ProductDetailsPage.module.scss';
import React from 'react';

interface DetailedProduct extends Product {
  namespaceId: string;
  colorsAvailable: string[];
  capacityAvailable: string[];
  description: { title: string; text: string[] }[];
  resolution: string;
  processor: string;
  camera: string;
  zoom: string;
  cell: string[];
  color: string;
}

const COLOR_HEX: Record<string, string> = {
  black: '#1F2020',
  white: '#F9F6EF',
  yellow: '#FFE681',
  green: '#AEE1CD',
  midnightgreen: '#4E5851',
  spacegray: '#535150',
  silver: '#EBEBE3',
  gold: '#FAD7BD',
  rosegold: '#B76E79',
  purple: '#D1CDDA',
  red: '#BA0C2E',
  coral: '#EE7762',
};

const FAVORITE_PATH =
  'M14.6667 4.79336C14.6667 7.0267 11.96 9.87336 8 ' +
  '13.3334C4.04 9.87336 1.33333 7.0267 1.33333 4.79336C1.33333 ' +
  '2.92003 2.80667 1.44003 4.66667 1.44003C5.74667 1.44003 ' +
  '6.78667 1.95336 7.42667 2.7667L8 3.47336L8.57333 ' +
  '2.7667C9.21333 1.95336 10.2533 1.44003 11.3333 1.44003C13.1933 ' +
  '1.44003 14.6667 2.92003 14.6667 4.79336Z';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.split('/')[1];

  const [allProducts, setAllProducts] = useState<DetailedProduct[]>([]);
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');

  const { cartItems, favorites, addToCart, toggleFavorite } = useShopContext();

  const colorsListRef = useRef<HTMLDivElement>(null);
  const capacityListRef = useRef<HTMLDivElement>(null);
  const [colorStyle, setColorStyle] = useState({ left: 0, opacity: 0 });
  const [capacityStyle, setCapacityStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`/api/${category}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        return res.json();
      })
      .then((data: DetailedProduct[]) => {
        setAllProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category]);

  useEffect(() => {
    if (allProducts.length > 0) {
      const foundProduct = allProducts.find(p => p.id === productId);

      if (foundProduct) {
        setProduct(foundProduct);
        setMainImage(foundProduct.images[0]);
        setSuggestedProducts(
          allProducts.filter(p => p.id !== productId).slice(0, 8),
        );

        setTimeout(() => {
          if (colorsListRef.current) {
            const activeColorEl = colorsListRef.current.querySelector(
              '[data-active="true"]',
            ) as HTMLElement;

            if (activeColorEl) {
              setColorStyle({ left: activeColorEl.offsetLeft, opacity: 1 });
            }
          }

          if (capacityListRef.current) {
            const activeCapEl = capacityListRef.current.querySelector(
              '[data-active="true"]',
            ) as HTMLElement;

            if (activeCapEl) {
              setCapacityStyle({
                left: activeCapEl.offsetLeft,
                width: activeCapEl.offsetWidth,
                opacity: 1,
              });
            }
          }
        }, 10);
      } else {
        setError(true);
      }
    }
  }, [productId, allProducts]);

  if (loading) {
    return <div className={styles.centerMessage}>Loading product...</div>;
  }

  if (error || !product) {
    return <div className={styles.centerMessage}>Product not found</div>;
  }

  const isAdded = cartItems.some(item => item.id === product.id);
  const isFavorite = favorites.some(item => item.id === product.id);

  return (
    <div className={styles.page}>
      <div className={styles.navigation}>
        <Breadcrumbs productName={product.name} />

        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
      </div>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={cn(styles.thumbnailBtn, {
                  [styles.activeThumbnail]: mainImage === img,
                })}
                onClick={() => setMainImage(img)}
              >
                <img src={`/${img}`} alt={`${product.name} thumbnail ${idx}`} />
              </button>
            ))}
          </div>
          <div className={styles.mainImageContainer}>
            <img
              key={mainImage}
              src={`/${mainImage}`}
              alt={product.name}
              className={cn(styles.mainImage, styles.animatedImage)}
            />
          </div>
        </div>

        <div className={styles.actionsPanel}>
          <div className={styles.colorsBlock}>
            <span className={styles.optionLabel}>Available colors</span>
            <div className={styles.optionsList} ref={colorsListRef}>
              <div
                className={styles.colorHighlight}
                style={{
                  transform: `translateX(${colorStyle.left}px)`,
                  opacity: colorStyle.opacity,
                }}
              />
              {product.colorsAvailable.map(col => {
                const isActive = col === product.color;
                const variantId =
                  allProducts.find(
                    p =>
                      p.namespaceId === product.namespaceId &&
                      p.capacity === product.capacity &&
                      p.color === col,
                  )?.id ||
                  `${product.namespaceId}-${product.capacity.toLowerCase()}-${col.toLowerCase()}`;

                return (
                  <Link
                    key={col}
                    to={`/${category}/${variantId}`}
                    className={cn(styles.colorCircleWrapper, {
                      [styles.activeColorText]: isActive,
                    })}
                    data-active={isActive}
                  >
                    <div
                      className={styles.colorCircle}
                      style={{ backgroundColor: COLOR_HEX[col] || col }}
                      title={col}
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.capacityBlock}>
            <span className={styles.optionLabel}>Select capacity</span>
            <div className={styles.optionsList} ref={capacityListRef}>
              <div
                className={styles.capacityHighlight}
                style={{
                  transform: `translateX(${capacityStyle.left}px)`,
                  width: `${capacityStyle.width}px`,
                  opacity: capacityStyle.opacity,
                }}
              />
              {product.capacityAvailable.map(cap => {
                const isActive = cap === product.capacity;
                const variantId =
                  allProducts.find(
                    p =>
                      p.namespaceId === product.namespaceId &&
                      p.color === product.color &&
                      p.capacity === cap,
                  )?.id ||
                  `${product.namespaceId}-${cap.toLowerCase()}-${product.color.toLowerCase()}`;

                return (
                  <Link
                    key={cap}
                    to={`/${category}/${variantId}`}
                    className={cn(styles.capacityBox, {
                      [styles.activeCapacityText]: isActive,
                    })}
                    data-active={isActive}
                  >
                    {cap}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceContainer}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular !== product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.buyButtons}>
            <button
              className={cn(styles.addToCartBtn, { [styles.added]: isAdded })}
              onClick={() => !isAdded && addToCart(product)}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>
            <button
              className={cn(styles.favoriteBtn, {
                [styles.isFavorite]: isFavorite,
              })}
              onClick={() => toggleFavorite(product)}
            >
              {isFavorite ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="var(--c-red)"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={FAVORITE_PATH}
                    stroke="var(--c-red)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d={FAVORITE_PATH}
                    stroke="var(--c-primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specName}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Resolution</span>
              <span className={styles.specValue}>{product.resolution}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>Processor</span>
              <span className={styles.specValue}>{product.processor}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specName}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.aboutBlock}>
          <h3>About</h3>
          <div className={styles.divider} style={{ marginBottom: '24px' }} />
          {product.description.map((desc, idx) => (
            <div key={idx} className={styles.descItem}>
              <h4>{desc.title}</h4>
              {desc.text.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecsBlock}>
          <h3>Tech specs</h3>
          <div className={styles.divider} style={{ marginBottom: '24px' }} />
          <div className={styles.specRow}>
            <span className={styles.specName}>Screen</span>
            <span className={styles.specValue}>{product.screen}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Resolution</span>
            <span className={styles.specValue}>{product.resolution}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Processor</span>
            <span className={styles.specValue}>{product.processor}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>RAM</span>
            <span className={styles.specValue}>{product.ram}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Built in memory</span>
            <span className={styles.specValue}>{product.capacity}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Camera</span>
            <span className={styles.specValue}>{product.camera}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Zoom</span>
            <span className={styles.specValue}>{product.zoom}</span>
          </div>
          <div className={styles.specRow}>
            <span className={styles.specName}>Cell</span>
            <span className={styles.specValue}>{product.cell.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={styles.recommended}>
        <ProductsSlider
          title="You may also like"
          products={suggestedProducts}
        />
      </div>
    </div>
  );
};
