import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ErrorMessage } from '../../components/ErrorMessage';
import { Loader } from '../../components/Loader';
import { ProductsList } from '../../components/ProductsList';

import { useShop } from '../../context/ShopContext';

import {
  getCategoryDetails,
  getProducts,
  getSuggestedProducts,
} from '../../services/products';

import { Category } from '../../types/Category';

import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { imagePath } from '../../utils/imagePath';

import styles from './ProductDetailsPage.module.scss';

const colorMap: Record<string, string> = {
  black: '#313237',
  white: '#fafafa',
  yellow: '#f6e7ce',
  green: '#5f7170',
  purple: '#b8afe6',
  red: '#ba0c2f',
  gold: '#f4e2c8',
  silver: '#d6d6d6',
  coral: '#ff7f50',
  pink: '#f6d0d8',
  blue: '#a7c7e7',
  graphite: '#4a4a4a',
  midnight: '#191970',
  starlight: '#f5e8ce',
  'rose gold': '#f3d8d6',
  rosegold: '#f3d8d6',
  'space gray': '#535150',
  spacegray: '#535150',
  'sierra blue': '#9db7d3',
  sierrablue: '#9db7d3',
  'midnight green': '#4e5851',
  midnightgreen: '#4e5851',
  'sky blue': '#b9d9eb',
  skyblue: '#b9d9eb',
};

const getColorValue = (color: string) => {
  return colorMap[color.trim().toLowerCase()] ?? '#d6d6d6';
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { addToCart, isInCart, toggleFavorite, isFavorite } = useShop();

  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const [selectedImage, setSelectedImage] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setError(false);
    setSelectedImage(0);

    const loadProduct = async () => {
      try {
        const products = await getProducts();

        if (isCancelled) {
          return;
        }

        const currentProduct = products.find(item => item.itemId === productId);

        if (!currentProduct) {
          setDetails(null);
          setProduct(null);
          setVariants([]);
          setSuggestions([]);

          return;
        }

        const categoryDetails = await getCategoryDetails(
          currentProduct.category as Category,
        );

        if (isCancelled) {
          return;
        }

        const productDetails =
          categoryDetails.find(item => item.id === productId) || null;

        const suggestedProducts = await getSuggestedProducts(productId);

        if (isCancelled) {
          return;
        }

        setDetails(productDetails);
        setProduct(currentProduct);
        setVariants(categoryDetails);
        setSuggestions(suggestedProducts);
      } catch {
        if (!isCancelled) {
          setError(true);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isCancelled = true;
    };
  }, [productId, reloadKey]);

  const handleReload = () => {
    setReloadKey(value => value + 1);
  };

  const handleBack = () => {
    navigate(`/${product?.category || 'phones'}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage onReload={handleReload} />;
  }

  if (!details || !product) {
    return (
      <div className={styles.page}>
        <h1>Product was not found</h1>

        <Link to="/phones">Back to catalog</Link>
      </div>
    );
  }

  const addedToCart = isInCart(product.itemId);
  const addedToFavorites = isFavorite(product.itemId);

  const findVariant = (color: string, capacity: string) => {
    const variant = variants.find(item => {
      return (
        item.namespaceId === details.namespaceId &&
        item.color.toLowerCase() === color.toLowerCase() &&
        item.capacity.toLowerCase() === capacity.toLowerCase()
      );
    });

    return variant?.id;
  };

  const handleColorChange = (color: string) => {
    const variantId = findVariant(color, details.capacity);

    if (variantId) {
      navigate(`/product/${variantId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const variantId = findVariant(details.color, capacity);

    if (variantId) {
      navigate(`/product/${variantId}`);
    }
  };

  const techSpecs = [
    { label: 'Screen', value: details.screen },
    { label: 'Resolution', value: details.resolution },
    { label: 'Processor', value: details.processor },
    { label: 'RAM', value: details.ram },
    { label: 'Camera', value: details.camera },
    { label: 'Zoom', value: details.zoom },
    { label: 'Cell', value: details.cell?.join(', ') },
  ];

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link to="/" className={styles.homeLink} aria-label="Home">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 10L12 3L21 10V21H14V14H10V21H3V10Z" />
          </svg>
        </Link>

        <span className={styles.breadcrumbArrow} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </span>

        <Link to={`/${product.category}`} className={styles.categoryLink}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>

        <span className={styles.breadcrumbArrow} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18L15 12L9 6" />
          </svg>
        </span>

        <span className={styles.breadcrumbCurrent} aria-current="page">
          {details.name}
        </span>
      </nav>

      <button type="button" className={styles.backButton} onClick={handleBack}>
        ← Back
      </button>

      <h1 className={styles.title}>{details.name}</h1>

      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {details.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`${styles.thumbnail}
                ${selectedImage === index ? styles.selected : ''}`}
                aria-label={`Show product image ${index + 1}`}
                aria-pressed={selectedImage === index}
              >
                <img src={imagePath(image)} alt="" />
              </button>
            ))}
          </div>

          <div className={styles.mainImage}>
            <img
              src={imagePath(details.images[selectedImage] || product.image)}
              alt={details.name}
            />
          </div>
        </div>

        <div className={styles.options}>
          <div className={styles.optionHeader}>
            <p className={styles.optionLabel}>Available colors</p>
            <span className={styles.optionId}>ID: {product.id}</span>
          </div>

          <fieldset className={`${styles.optionGroup} ${styles.colorGroup}`}>
            <legend className={styles.visuallyHidden}>Choose color</legend>

            {details.colorsAvailable.map(color => (
              <label
                key={color}
                className={styles.colorOption}
                title={color}
                aria-label={color}
              >
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={details.color === color}
                  onChange={() => handleColorChange(color)}
                />

                <span
                  className={styles.colorSwatch}
                  style={{ backgroundColor: getColorValue(color) }}
                  aria-hidden="true"
                />
              </label>
            ))}
          </fieldset>

          <div className={styles.divider} />

          <p className={styles.optionLabel}>Select capacity</p>

          <fieldset className={styles.optionGroup}>
            <legend className={styles.visuallyHidden}>Choose capacity</legend>

            {details.capacityAvailable.map(capacity => (
              <label key={capacity} className={styles.capacityOption}>
                <input
                  type="radio"
                  name="capacity"
                  value={capacity}
                  checked={details.capacity === capacity}
                  onChange={() => handleCapacityChange(capacity)}
                />

                <span>{capacity}</span>
              </label>
            ))}
          </fieldset>

          <div className={styles.divider} />

          <div className={styles.prices}>
            <span className={styles.price}>${details.priceDiscount}</span>

            {details.priceDiscount < details.priceRegular && (
              <span className={styles.fullPrice}>${details.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addButton}
              ${addedToCart ? styles.addedButton : ''}`}
              onClick={() => addToCart(product)}
              disabled={addedToCart}
            >
              {addedToCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={styles.favoriteButton}
              onClick={() => toggleFavorite(product)}
              aria-label={
                addedToFavorites ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={addedToFavorites}
            >
              {addedToFavorites ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.shortSpecs}>
            <div>
              <span>Screen</span>
              <strong>{details.screen}</strong>
            </div>

            <div>
              <span>Capacity</span>
              <strong>{details.capacity}</strong>
            </div>

            <div>
              <span>RAM</span>
              <strong>{details.ram}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.information}>
        <section className={styles.about}>
          <h2>About</h2>

          {details.description.map(section => (
            <div key={section.title} className={styles.description}>
              <h3>{section.title}</h3>

              {section.text.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2>Tech specs</h2>

          {techSpecs
            .filter(spec => spec.value)
            .map(spec => (
              <div key={spec.label} className={styles.specRow}>
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </div>
            ))}
        </section>
      </div>

      {suggestions.length > 0 && (
        <section className={styles.suggestions}>
          <h2>You may also like</h2>

          <ProductsList products={suggestions.slice(0, 4)} />
        </section>
      )}
    </div>
  );
};
