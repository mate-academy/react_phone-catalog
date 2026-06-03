import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader';
import { ProductCard } from '../../components/ProductCard';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import {
  fetchProductDetails,
  getSuggestedProducts,
} from '../../services/products';
import styles from './ProductDetailsPage.module.scss';
import type { Product } from '../../types';

const categoryNames: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

const colorMap: Record<string, string> = {
  black: '#1f2020',
  blue: '#215e7c',
  coral: '#ee7762',
  gold: '#f4e8ce',
  graphite: '#5c5b57',
  green: '#aee1cd',
  midnight: '#171e27',
  midnightgreen: '#4e5851',
  pink: '#f8d7df',
  purple: '#c8bad8',
  red: '#ba0c2f',
  rosegold: '#f6d8c7',
  silver: '#f5f5f0',
  sierrablue: '#a7c1d9',
  skyblue: '#cfe2f3',
  spaceblack: '#302d33',
  spacegray: '#4f4f4f',
  starlight: '#f8f3e8',
  white: '#f9f6ef',
  yellow: '#f7e27a',
};

const getColorValue = (color: string) =>
  colorMap[color.toLowerCase().replace(/\s+/g, '')] ?? color;

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [currentImage, setCurrentImage] = useState('');
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(false);
    fetchProductDetails(productId)
      .then(item => {
        if (!item) {
          setProduct(null);

          return;
        }

        setProduct(item);
        setCurrentImage(item.images?.[0] ?? item.image ?? '');
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [productId]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    getSuggestedProducts(productId).then(setSuggested);
  }, [productId]);

  const productExists = Boolean(product);
  const productCategory = product?.category
    ? categoryNames[product.category]
    : null;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className={styles.message}>
        Something went wrong while loading the product.
      </div>
    );
  }

  if (!productExists) {
    return (
      <div className={styles.message}>
        <p>Product was not found</p>
        <button type="button" onClick={() => navigate('/')}>
          Back to home
        </button>
      </div>
    );
  }

  const price =
    product.price ?? product.priceDiscount ?? product.priceRegular ?? 0;
  const oldPrice = product.fullPrice ?? product.priceRegular ?? 0;
  const routeCategory = product.category;
  const selectedColor = product.color ?? product.colorsAvailable?.[0] ?? '';
  const selectedCapacity =
    product.capacity ?? product.capacityAvailable?.[0] ?? '';
  const cartProductId = (product.itemId || product.id).toString();
  const isProductInCart = isInCart(cartProductId);
  const isProductFavorite = isFavorite(cartProductId);

  const getConfigurationId = (capacity: string, color: string) => {
    const capacitySlug = capacity.toLowerCase();
    const colorSlug = color.toLowerCase().replace(/\s+/g, '-');

    return `${product.namespaceId ?? product.id}-${capacitySlug}-${colorSlug}`;
  };

  const updateConfiguration = (capacity: string, color: string) => {
    const nextProductId = getConfigurationId(capacity, color);

    navigate(`/product/${nextProductId}`);
  };

  const toggleCart = () => {
    if (isProductInCart) {
      removeFromCart(cartProductId);

      return;
    }

    addToCart(product);
  };

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumbs}>
        <button
          type="button"
          className={`${styles.link} ${styles.homeLink}`}
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <i className="fa-solid fa-house" aria-hidden="true" />
        </button>
        <span className={styles.separator}>›</span>
        <button
          type="button"
          className={styles.link}
          onClick={() => navigate(`/${routeCategory}`)}
        >
          {productCategory}
        </button>
        <span className={styles.separator}>›</span>
        <span className={styles.current}>{product.name}</span>
      </div>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(`/${routeCategory}`)}
      >
        ← Back
      </button>
      <section className={styles.details}>
        <div className={styles.imageColumn}>
          <img
            src={currentImage}
            alt={product.name}
            className={styles.mainImage}
          />
          <div className={styles.thumbs}>
            {product.images?.map(image => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentImage(image)}
                className={image === currentImage ? styles.activeThumb : ''}
              >
                <img src={image} alt={product.name} />
              </button>
            ))}
          </div>
        </div>
        <div className={styles.infoColumn}>
          <h1>{product.name}</h1>
          <div className={styles.selectors}>
            {product.colorsAvailable && (
              <div>
                <h3>Available colors</h3>
                <div className={styles.colorOptions}>
                  {product.colorsAvailable.map(color => (
                    <button
                      key={color}
                      type="button"
                      className={`${styles.colorOption} ${
                        selectedColor === color ? styles.colorOptionActive : ''
                      }`}
                      onClick={() =>
                        updateConfiguration(selectedCapacity, color)
                      }
                      aria-label={`Select ${color} color`}
                    >
                      <span
                        style={{ backgroundColor: getColorValue(color) }}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.capacityAvailable && (
              <div>
                <h3>Select capacity</h3>
                <div className={styles.capacityOptions}>
                  {product.capacityAvailable.map(capacity => (
                    <button
                      key={capacity}
                      type="button"
                      className={`${styles.capacityOption} ${
                        selectedCapacity === capacity
                          ? styles.capacityOptionActive
                          : ''
                      }`}
                      onClick={() =>
                        updateConfiguration(capacity, selectedColor)
                      }
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.priceBlock}>
            <strong>€{price}</strong>
            {oldPrice > price && <span>€{oldPrice}</span>}
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.cartButton} ${
                isProductInCart ? styles.cartButtonActive : ''
              }`}
              onClick={toggleCart}
            >
              {isProductInCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={`${styles.favoriteButton} ${
                isProductFavorite ? styles.favoriteButtonActive : ''
              }`}
              onClick={() => toggleFavorite(cartProductId)}
              aria-label={
                isProductFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <i
                className={
                  isProductFavorite
                    ? 'fa-solid fa-heart'
                    : 'fa-regular fa-heart'
                }
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </section>
      <section className={styles.about}>
        <h2>About</h2>
        {product.description?.map(block => (
          <div key={block.title} className={styles.block}>
            <h3>{block.title}</h3>
            {block.text.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>
      <section className={styles.specs}>
        <h2>Tech specs</h2>
        <div className={styles.specsGrid}>
          {product.screen && (
            <div>
              <strong>Screen</strong>
              <span>{product.screen}</span>
            </div>
          )}
          {product.resolution && (
            <div>
              <strong>Resolution</strong>
              <span>{product.resolution}</span>
            </div>
          )}
          {product.processor && (
            <div>
              <strong>Processor</strong>
              <span>{product.processor}</span>
            </div>
          )}
          {product.ram && (
            <div>
              <strong>RAM</strong>
              <span>{product.ram}</span>
            </div>
          )}
          {product.camera && (
            <div>
              <strong>Camera</strong>
              <span>{product.camera}</span>
            </div>
          )}
          {product.zoom && (
            <div>
              <strong>Zoom</strong>
              <span>{product.zoom}</span>
            </div>
          )}
        </div>
      </section>
      {suggested.length > 0 && (
        <section className={styles.suggested}>
          <h2>You may also like</h2>
          <div className={styles.suggestedList}>
            {suggested.map(item => (
              <ProductCard key={item.itemId || item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
