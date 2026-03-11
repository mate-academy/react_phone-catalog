import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader';
import { ProductsSlider } from '../components/ProductsSlider';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAsync } from '../hooks/useAsync';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../services/api';
import { getAssetUrl } from '../utils/asset';
import styles from './pages.module.scss';

function toVariantId(namespaceId: string, capacity: string, color: string) {
  return `${namespaceId}-${capacity.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}`;
}

function getPhoneColor(color: string) {
  const palette: Record<string, string> = {
    midnight: '#1f2126',
    black: '#1f2126',
    spaceblack: '#1f2126',
    graphite: '#4a4a4a',
    silver: '#d9d9d9',
    white: '#f5f5f5',
    starlight: '#f6e8c9',
    yellow: '#f7d047',
    purple: '#b59dff',
    blue: '#7ea7ff',
    sierrablue: '#b9cde6',
    pink: '#f8b7c4',
    red: '#df3f40',
    green: '#78b85d',
    gold: '#f2d48a',
    rosegold: '#efc7ba',
    coral: '#ff7f6d',
    spacegray: '#535150',
  };

  const key = color.toLowerCase().replace(/[\s-]+/g, '');

  return palette[key] || color.toLowerCase();
}

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const { toggleCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const detailsState = useAsync(
    () => getProductDetails(productId),
    [productId],
  );
  const productsState = useAsync(getProducts, []);
  const suggestedState = useAsync(
    () => getSuggestedProducts(productId),
    [productId],
  );

  useEffect(() => {
    setImageIndex(0);
  }, [productId]);

  const base = useMemo(() => {
    const products = productsState.data || [];

    return products.find(item => item.itemId === productId) || null;
  }, [productId, productsState.data]);

  if (detailsState.loading || productsState.loading) {
    return <Loader />;
  }

  if (detailsState.error || productsState.error) {
    return <p>Something went wrong</p>;
  }

  if (!detailsState.data || !base) {
    return <p>Product was not found</p>;
  }

  const details = detailsState.data;
  const safeImageIndex = Math.min(
    imageIndex,
    Math.max(details.images.length - 1, 0),
  );
  const inCart = isInCart(base.itemId);
  const favorite = isFavorite(base.itemId);
  const favoriteIcon = favorite
    ? getAssetUrl('img/Favourites%20Filled%20(Heart%20Like).png')
    : getAssetUrl('img/Favourites%20(Heart%20Like).png');

  return (
    <div className={styles.page}>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        Back
      </button>

      <Breadcrumbs category={details.category} current={details.name} />

      <h1>{details.name}</h1>

      <div className={styles.detailsGrid}>
        <div className={styles.detailsMedia}>
          <div className={styles.thumbGrid}>
            {details.images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => setImageIndex(index)}
                className={`${styles.thumbButton} ${index === imageIndex ? styles.thumbButtonActive : ''}`}
              >
                <img
                  src={getAssetUrl(image)}
                  alt={`${details.name} ${index + 1}`}
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>
          <img
            src={getAssetUrl(details.images[safeImageIndex])}
            alt={details.name}
            className={styles.mainImage}
          />
        </div>

        <div>
          <div className={styles.sectionBlock}>
            <p>Available colors</p>
            <div className={styles.options}>
              {details.colorsAvailable.map(color => (
                <Link
                  key={color}
                  to={`/product/${toVariantId(details.namespaceId, details.capacity, color)}`}
                  className={`${styles.colorOptionLink} ${color === details.color ? styles.colorOptionLinkActive : ''}`}
                  aria-label={color}
                  title={color}
                >
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: getPhoneColor(color) }}
                  />
                </Link>
              ))}
            </div>
            <hr className={styles.sectionDivider} />
          </div>

          <div className={styles.sectionBlock}>
            <p>Select capacity</p>
            <div className={styles.options}>
              {details.capacityAvailable.map(capacity => (
                <Link
                  key={capacity}
                  to={`/product/${toVariantId(details.namespaceId, capacity, details.color)}`}
                  className={`${styles.optionLink} ${capacity === details.capacity ? styles.optionLinkActive : ''}`}
                >
                  {capacity}
                </Link>
              ))}
            </div>
            <hr className={styles.sectionDivider} />
          </div>

          <p className={styles.priceLine}>
            <strong>${details.priceDiscount}</strong>{' '}
            <span>${details.priceRegular}</span>
          </p>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={`${styles.detailsAddToCartBtn} ${inCart ? styles.detailsAddToCartBtnAdded : ''}`}
              onClick={() => toggleCart(base.itemId)}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              className={`${styles.detailsFavoriteBtn} ${favorite ? styles.detailsFavoriteBtnActive : ''}`}
              type="button"
              onClick={() => toggleFavorite(base.itemId)}
              aria-label="Toggle favorite"
            >
              <img
                src={favoriteIcon}
                alt="Favorites"
                className={styles.detailsFavoriteIcon}
              />
            </button>
          </div>

          <ul className={styles.specs}>
            <li>
              <span className={styles.statsSc}>Screen</span>
              <span className={styles.specValue}>{details.screen}</span>
            </li>
            <li>
              <span className={styles.statsSc}>Resolution</span>
              <span className={styles.specValue}>{details.resolution}</span>
            </li>
            <li>
              <span className={styles.statsSc}>Processor</span>
              <span className={styles.specValue}>{details.processor}</span>
            </li>
            <li>
              <span className={styles.statsSc}>RAM</span>
              <span className={styles.specValue}>{details.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <section className={styles.detailsInfo}>
        <div className={styles.aboutBlock}>
          <h2 className={styles.TAbout}>About</h2>
          <hr className={styles.aboutDivider} />
          {details.description.map(block => (
            <article key={block.title}>
              <h3>{block.title}</h3>
              {block.text.map(line => (
                <p className={styles.LineP} key={line}>
                  {line}
                </p>
              ))}
            </article>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2>Tech specs</h2>
          <ul className={styles.specsList}>
            <li>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{details.screen}</span>
            </li>
            <li>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>{details.resolution}</span>
            </li>
            <li>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>{details.processor}</span>
            </li>
            <li>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{details.ram}</span>
            </li>
            <li>
              <span className={styles.specLabel}>Built in memory</span>
              <span className={styles.specValue}>{details.capacity}</span>
            </li>
            {details.camera && (
              <li>
                <span className={styles.specLabel}>Camera</span>
                <span className={styles.specValue}>{details.camera}</span>
              </li>
            )}
            {details.zoom && (
              <li>
                <span className={styles.specLabel}>Zoom</span>
                <span className={styles.specValue}>{details.zoom}</span>
              </li>
            )}
            {details.cell?.length && (
              <li>
                <span className={styles.specLabel}>Cell</span>
                <span className={styles.specValue}>
                  {details.cell.join(', ')}
                </span>
              </li>
            )}
          </ul>
        </div>
      </section>

      {suggestedState.data && suggestedState.data.length > 0 && (
        <ProductsSlider
          title="You may also like"
          products={suggestedState.data}
          scrollOnCardClick
        />
      )}
    </div>
  );
};
