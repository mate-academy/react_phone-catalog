import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';
import { getProductDetails } from '../../services/products';
import type { ProductDetails } from '../../types';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';

import { YouMayAlsoLike } from './components';
import styles from './ProductDetailsPage.module.scss';

const colorHex: Record<string, string> = {
  midnight: '#252b36',
  yellow: '#f9e45b',
  purple: '#b9a5d3',
  spacegray: '#535150',
  'space gray': '#535150',
  silver: '#e3e4e5',
  gold: '#e8d6b6',
  black: '#202020',
  white: '#f5f5f5',
  blue: '#a7c1d9',
  red: '#d34b52',
  green: '#a8b9a5',
  pink: '#f4c9d5',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { cartItems, favoriteItems, toggleCart, toggleFavorite } = useShop();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const handleOptionChange = (capacity: string, color: string) => {
    if (!product) {
      return;
    }

    const normalizedColor = color.toLowerCase().replace(/\s+/g, '-');

    const newProductId = `${product.namespaceId}-${capacity.toLowerCase()}-${normalizedColor}`;

    navigate(`/product/${newProductId}`);
  };

  useEffect(() => {
    if (!productId) {
      setError('Product not found');
      setLoading(false);

      return;
    }

    setLoading(true);
    setError('');
    setProduct(null);
    setSelectedImage(0);

    getProductDetails(productId)
      .then(data => {
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      })
      .catch(() => {
        setError('Unable to load product details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const isInCart = cartItems.includes(product.id);
  const isFavorite = favoriteItems.includes(product.id);

  return (
    <main className={styles.page}>
      <Breadcrumbs category={product.category} productName={product.name} />

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(`/${product.category}`)}
      >
        ← Back
      </button>

      <h1>{product.name}</h1>

      <div className={styles.productLayout}>
        {product.images.length > 0 && (
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  className={styles.thumbnail}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                >
                  <img src={`/${image}`} alt="" />
                </button>
              ))}
            </div>

            <img
              className={styles.productImage}
              src={`/${product.images[selectedImage]}`}
              alt={product.name}
            />
          </div>
        )}

        <div className={styles.productInfo}>
          <div className={styles.prices}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>

            <span className={styles.priceRegular}>${product.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => {
                if (!isInCart) {
                  toggleCart(product.id);
                }
              }}
              aria-pressed={isInCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={styles.favoriteButton}
              onClick={() => toggleFavorite(product.id)}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
              aria-pressed={isFavorite}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>

          <div className={styles.options}>
            <p>Available colors</p>

            <div className={styles.colorOptions}>
              {product.colorsAvailable.map(color => (
                <button
                  key={color}
                  type="button"
                  className={styles.colorButton}
                  aria-label={`Select ${color} color`}
                  title={color}
                  aria-pressed={product.color === color}
                  onClick={() => {
                    handleOptionChange(product.capacity, color);
                  }}
                >
                  <span
                    className={styles.colorCircle}
                    style={{
                      backgroundColor: colorHex[color] || color,
                    }}
                  />
                </button>
              ))}
            </div>

            <p>Select capacity</p>

            <div className={styles.capacityOptions}>
              {product.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={styles.capacityButton}
                  aria-pressed={product.capacity === capacity}
                  onClick={() => {
                    handleOptionChange(capacity, product.color);
                  }}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.specifications}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{product.screen}</span>
            </div>

            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </div>

            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{product.processor}</span>
            </div>

            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.about}>
        <h2>About</h2>

        {product.description.map(section => (
          <div key={section.title} className={styles.aboutSection}>
            <h3>{section.title}</h3>

            {section.text.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.techSpecs}>
        <h2>Tech specs</h2>

        <div className={styles.techSpecsList}>
          <div className={styles.techSpecRow}>
            <span>Screen</span>
            <span>{product.screen}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Resolution</span>
            <span>{product.resolution}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Processor</span>
            <span>{product.processor}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>RAM</span>
            <span>{product.ram}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Camera</span>
            <span>{product.camera}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Zoom</span>
            <span>{product.zoom}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Cell</span>
            <span>{product.cell.join(', ')}</span>
          </div>
        </div>
      </section>

      <YouMayAlsoLike productId={product.id} category={product.category} />
    </main>
  );
};
