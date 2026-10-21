import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductDetails, getSuggestedProducts } from '../../api/products';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Product } from '../../types/Product';
import { getAssetUrl } from '../../utils/assets';
import {
  findVariant,
  getCurrentPrice,
  getProductId,
  getRegularPrice,
} from '../../utils/product';
import styles from './ProductDetailsPage.module.scss';

const COLOR_MAP: Record<string, string> = {
  black: '#1f2022',
  green: '#aee1cd',
  yellow: '#ffe8a3',
  white: '#f9f6f0',
  purple: '#d1cdda',
  red: '#ba0c2f',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  gold: '#f3e5d8',
  silver: '#e2e4e1',
  rosegold: '#e8c5c8',
  coral: '#ff6f61',
};

const getCleanTitle = (name: string, capacity?: string, color?: string) => {
  let cleanName = name;

  if (capacity) {
    cleanName = cleanName.replace(new RegExp(capacity, 'gi'), '');
  }

  if (color) {
    cleanName = cleanName.replace(new RegExp(color, 'gi'), '');
  }

  return cleanName.replace(/\s+/g, ' ').trim();
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      return undefined;
    }

    let isActive = true;

    setIsLoading(true);
    setHasError(false);

    getProductDetails(productId)
      .then(({ product: found, variants: items }) => {
        if (!isActive) {
          return;
        }

        setVariants(items);
        setProduct(found);
        setSelectedImage(found?.images?.[0] || found?.image || '');
      })
      .catch(() => {
        if (!isActive) {
          return;
        }

        setProduct(null);
        setHasError(true);
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      return undefined;
    }

    let isActive = true;

    getSuggestedProducts(productId)
      .then(items => {
        if (isActive) {
          setSuggestedProducts(items);
        }
      })
      .catch(() => {
        if (isActive) {
          setSuggestedProducts([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, [productId]);

  const openVariant = (next: { color?: string; capacity?: string }) => {
    if (!product) {
      return;
    }

    const variant = findVariant(variants, product, next);

    if (variant) {
      navigate(`/product/${getProductId(variant)}`);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return <div className={styles.page}>Failed to load this product.</div>;
  }

  if (!product) {
    return <div className={styles.page}>Product was not found</div>;
  }

  const currentPrice = getCurrentPrice(product);
  const regularPrice = getRegularPrice(product);
  const currentId = getProductId(product);
  const favorite = isFavorite(currentId);
  const inCart = isInCart(currentId);
  const imagesList = product.images?.length
    ? product.images
    : [product.image].filter(Boolean);
  const availableCapacities = product.capacityAvailable?.length
    ? product.capacityAvailable
    : [product.capacity].filter(Boolean);
  const availableColors = product.colorsAvailable?.length
    ? product.colorsAvailable
    : [product.color].filter(Boolean);
  const categoryLabel =
    product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src={getAssetUrl('img/icons/home.svg')} alt="Home" />
        </Link>
        <span>›</span>
        <Link to={`/${product.category}`}>{categoryLabel}</Link>
        <span>›</span>
        <span className={styles.active}>{product.name}</span>
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        ‹ Back
      </button>

      <h1 className={styles.title}>
        {getCleanTitle(product.name, product.capacity, product.color)}
      </h1>

      <div className={styles.mainSection}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {imagesList.map(img => (
              <button
                key={img}
                type="button"
                className={`${styles.thumbBtn} ${selectedImage === img ? styles.activeThumb : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={getAssetUrl(img)} alt="Thumbnail" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageContainer}>
            <img src={getAssetUrl(selectedImage)} alt={product.name} />
          </div>
        </div>

        <div className={styles.productControls}>
          <div className={styles.sectionLabel}>Available colors</div>
          <div className={styles.colorPicker}>
            {availableColors.map(colorName => {
              const hexColor = COLOR_MAP[colorName.toLowerCase()] || colorName;
              const isActive =
                colorName.toLowerCase() === product.color.toLowerCase();

              return (
                <label key={colorName} className={styles.colorOption}>
                  <input
                    type="radio"
                    name="color"
                    value={colorName}
                    className={styles.colorRadio}
                    checked={isActive}
                    aria-label={colorName}
                    onChange={() => openVariant({ color: colorName })}
                  />
                  <span
                    className={styles.colorCircle}
                    style={{ backgroundColor: hexColor }}
                  />
                </label>
              );
            })}
          </div>

          <div className={styles.divider} />

          <div className={styles.sectionLabel}>Select capacity</div>
          <div className={styles.capacityPicker}>
            {availableCapacities.map(cap => (
              <label key={cap} className={styles.capacityOption}>
                <input
                  type="radio"
                  name="capacity"
                  value={cap}
                  className={styles.capacityRadio}
                  checked={cap === product.capacity}
                  onChange={() => openVariant({ capacity: cap })}
                />
                <span className={styles.capacityBtn}>{cap}</span>
              </label>
            ))}
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${currentPrice}</span>
            {regularPrice > currentPrice && (
              <span className={styles.fullPrice}>${regularPrice}</span>
            )}
          </div>

          <div className={styles.actionBtns}>
            <button
              type="button"
              className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
              onClick={() => {
                if (!inCart) {
                  addToCart(product);
                }
              }}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={`${styles.favoriteBtn} ${favorite ? styles.isFavorite : ''}`}
              onClick={() =>
                favorite
                  ? removeFromFavorites(currentId)
                  : addToFavorites(product)
              }
            >
              <img
                src={getAssetUrl(
                  favorite
                    ? 'img/icons/favourites-filled.svg'
                    : 'img/icons/favourites.svg',
                )}
                alt="Favorite"
              />
            </button>
          </div>

          <div className={styles.smallSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {product.resolution || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {product.processor || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.aboutText}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {product.description?.map(desc => (
            <div key={desc.title}>
              <h3>{desc.title}</h3>
              {desc.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )) || <p>No detailed description available.</p>}
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <div className={styles.techSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {product.resolution || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {product.processor || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Built in memory</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.suggestedSection}>
        <h2 className={styles.sectionTitle}>You may also like</h2>
        <div className={styles.suggestedCarousel}>
          {suggestedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
