import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../../api';
import { Product, ProductDetails } from '../../types';
import { Category, CATEGORIES } from '../../types';
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
      .then(([det, allProducts, sugg]) => {
        if (!det) {
          setNotFound(true);

          return;
        }

        setDetails(det);
        setSuggested(sugg);

        const match = allProducts.find(p => p.itemId === productId) ?? null;

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

  const categoryLabel =
    category === 'phones'
      ? 'Phones'
      : category === 'tablets'
        ? 'Tablets'
        : 'Accessories';

  return (
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {categoryLabel}
        </Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{details.name}</span>
      </nav>

      {/* Back button */}
      <button className={styles.back} onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      {/* Main section */}
      <div className={styles.main}>
        {/* Image gallery */}
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
            />
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Colors */}
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Available colors</p>
            <ul className={styles.colorList}>
              {details.colorsAvailable.map(c => (
                <li key={c}>
                  <button
                    className={`${styles.colorBtn} ${c === details.color ? styles.colorBtnActive : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => goToVariant(c, undefined)}
                    aria-label={c}
                    title={c}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.divider} />

          {/* Capacity */}
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

          {/* Actions */}
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
              {inFav ? '♥' : '♡'}
            </button>
          </div>

          {/* Short specs */}
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

      {/* About + Tech Specs */}
      <div className={styles.details}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {details.description.map(block => (
            <div key={block.title} className={styles.descBlock}>
              <h3 className={styles.descTitle}>{block.title}</h3>
              {block.text.map(t => (
                <p key={t} className={styles.descText}>
                  {t}
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

      {/* You may also like */}
      {suggested.length > 0 && (
        <section className={styles.suggestedSection}>
          <ProductsSlider title="You may also like" products={suggested} />
        </section>
      )}
    </div>
  );
};
