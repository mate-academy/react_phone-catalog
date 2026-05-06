import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../api';
import { Product, ProductDetails } from '../../types';
import { Category, CATEGORIES } from '../../types';
import { ICONS } from '../../constants';
import { useCart } from '../../context';
import { useProducts } from '../../context';
import { getImageUrl } from '../../utils';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);
  const touchStartX = useRef<number>(0);

  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useProducts();

  // Validate category from URL
  const validCategory = CATEGORIES.includes(category as Category)
    ? (category as Category)
    : null;

  useEffect(() => {
    if (!validCategory || !productId) {
      setNotFound(true);

      return;
    }

    setLoading(true);
    setNotFound(false);
    setError(false);
    setActiveImage(0);

    Promise.all([
      getProductDetails(validCategory, productId),
      getProducts(),
      getSuggestedProducts(productId),
    ])
      .then(([detail, allProducts, suggest]) => {
        if (!detail) {
          setNotFound(true);

          return;
        }

        setDetails(detail);
        setSuggested(suggest);

        const match =
          allProducts.find(prod => prod.itemId === productId) ?? null;

        setProduct(match);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId, validCategory]);

  // Navigate to a variant by rebuilding the productId string
  const goToVariant = (color?: string, capacity?: string) => {
    if (!details) {
      return;
    }

    const newColor = color ?? details.color;
    const newCapacity = (capacity ?? details.capacity).toLowerCase();

    // id pattern: {namespaceId}-{capacity}-{color}  e.g. apple-iphone-11-128gb-black
    const newId = `${details.namespaceId}-${newCapacity}-${newColor}`;

    navigate(`/${category}/${newId}`);
  };

  // Touch swipe handlers for image gallery
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!details) {
      return;
    }

    const SWIPE_THRESHOLD = 50;
    const diff = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(diff) < SWIPE_THRESHOLD) {
      return;
    }

    if (diff > 0) {
      // Swipe left - next image
      setActiveImage(prev => (prev + 1) % details.images.length);
    } else {
      // Swipe right - previous image
      setActiveImage(prev =>
        prev === 0 ? details.images.length - 1 : prev - 1,
      );
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (notFound || !details) {
    return (
      <div className={styles.page}>
        <p className={styles.notFound}>Product was not found</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  const inCart = product ? isInCart(product.id) : false;
  const inFav = product ? isFavorite(product.id) : false;

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.main}>
        <div className={styles.gallery}>
          <ul className={styles.thumbnails}>
            {details.images.map((src, i) => (
              <li key={src}>
                <button
                  className={`${styles.thumb} ${i === activeImage ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img
                    src={getImageUrl(src)}
                    alt={`${details.name} view ${i + 1}`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.mainImage}>
            <img
              src={getImageUrl(details.images[activeImage])}
              alt={details.name}
              className={styles.mainImg}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Available colors</p>
            <ul className={styles.colorList}>
              {details.colorsAvailable.map(color => (
                <li key={color}>
                  <button
                    className={`${styles.colorBtn} ${color === details.color ? styles.colorBtnActive : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => goToVariant(color, undefined)}
                    aria-label={color}
                    title={color}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.divider} />

          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Select capacity</p>
            <ul className={styles.capacityList}>
              {details.capacityAvailable.map(cap => (
                <li key={cap}>
                  <button
                    className={`${styles.capacityBtn} ${cap === details.capacity ? styles.capacityBtnActive : ''}`}
                    onClick={() => goToVariant(undefined, cap)}
                  >
                    {cap}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.divider} />

          {/* Price */}
          <div className={styles.priceRow}>
            <span className={styles.priceDiscount}>
              ${details.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${details.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.cartBtn} ${inCart ? styles.cartBtnAdded : ''}`}
              onClick={() => product && !inCart && addToCart(product)}
              disabled={!product}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={`${styles.favBtn} ${inFav ? styles.favBtnActive : ''}`}
              onClick={() => product && toggleFavorite(product)}
              aria-label={inFav ? 'Remove from favorites' : 'Add to favorites'}
              disabled={!product}
            >
              <img
                src={inFav ? ICONS.FAVOURITES_ACTIVE : ICONS.FAVOURITES}
                alt="Favourites"
              />
            </button>
          </div>

          <ul className={styles.shortSpecs}>
            <li>
              <span>Screen</span>
              <span>{details.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{details.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{details.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{details.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.details}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {details.description.map(block => (
            <div key={block.title} className={styles.descBlock}>
              <h3 className={styles.descTitle}>{block.title}</h3>
              {block.text.map(text => (
                <p key={text} className={styles.descText}>
                  {text}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <ul className={styles.specsList}>
            <li>
              <span>Screen</span>
              <span>{details.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{details.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{details.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{details.ram}</span>
            </li>
            <li>
              <span>Capacity</span>
              <span>{details.capacity}</span>
            </li>
            {details.camera && (
              <li>
                <span>Camera</span>
                <span>{details.camera}</span>
              </li>
            )}
            {details.zoom && (
              <li>
                <span>Zoom</span>
                <span>{details.zoom}</span>
              </li>
            )}
            <li>
              <span>Cell</span>
              <span>{details.cell.join(', ')}</span>
            </li>
          </ul>
        </section>
      </div>

      {suggested.length > 0 && (
        <section className={styles.suggestedSection}>
          <ProductsSlider title="You may also like" products={suggested} />
        </section>
      )}
    </div>
  );
};
