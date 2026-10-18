import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useShop } from '../../context/ShopContext';
import { getPhoneDetails } from '../../services/products';
import type { ProductDetails } from '../../types';

import styles from './ProductDetailsPage.module.scss';

const colorHex: Record<string, string> = {
  midnight: '#252b36',
  yellow: '#f9e45b',
  purple: '#b9a5d3',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { cartItems, favoriteItems, toggleCart, toggleFavorite } = useShop();

  const [phone, setPhone] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const handleOptionChange = (capacity: string, color: string) => {
    if (!phone) {
      return;
    }

    const newProductId = `${phone.namespaceId}-${capacity.toLowerCase()}-${color}`;

    navigate(`/product/${newProductId}`);
  };

  useEffect(() => {
    if (!productId) {
      setLoading(false);

      return;
    }

    setLoading(true);
    setError('');
    setPhone(null);
    setSelectedImage(0);

    getPhoneDetails(productId)
      .then(data => {
        if (data) {
          setPhone(data);
        } else {
          setError('Phone not found');
        }
      })
      .catch(() => {
        setError('Unable to load phone details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <p>Loading phone details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!phone) {
    return <p>Phone not found</p>;
  }

  const isInCart = cartItems.includes(phone.id);
  const isFavorite = favoriteItems.includes(phone.id);

  return (
    <main className={styles.page}>
      <h1>{phone.name}</h1>

      <div className={styles.productLayout}>
        {phone.images.length > 0 && (
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {phone.images.map((image, index) => (
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
              src={`/${phone.images[selectedImage]}`}
              alt={phone.name}
            />
          </div>
        )}

        <div className={styles.productInfo}>
          <div className={styles.prices}>
            <span className={styles.priceDiscount}>${phone.priceDiscount}</span>

            <span className={styles.priceRegular}>${phone.priceRegular}</span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => toggleCart(phone.id)}
              aria-pressed={isInCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={styles.favoriteButton}
              onClick={() => toggleFavorite(phone.id)}
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
              {phone.colorsAvailable.map(color => (
                <button
                  key={color}
                  type="button"
                  className={styles.colorButton}
                  aria-label={`Select ${color} color`}
                  title={color}
                  aria-pressed={phone.color === color}
                  onClick={() => handleOptionChange(phone.capacity, color)}
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
              {phone.capacityAvailable.map(capacity => (
                <button
                  key={capacity}
                  type="button"
                  className={styles.capacityButton}
                  aria-pressed={phone.capacity === capacity}
                  onClick={() => handleOptionChange(capacity, phone.color)}
                >
                  {capacity}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.specifications}>
            <div className={styles.specRow}>
              <span>Screen</span>
              <span>{phone.screen}</span>
            </div>

            <div className={styles.specRow}>
              <span>Resolution</span>
              <span>{phone.resolution}</span>
            </div>

            <div className={styles.specRow}>
              <span>Processor</span>
              <span>{phone.processor}</span>
            </div>

            <div className={styles.specRow}>
              <span>RAM</span>
              <span>{phone.ram}</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.about}>
        <h2>About</h2>

        {phone.description.map(section => (
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
            <span>{phone.screen}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Resolution</span>
            <span>{phone.resolution}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Processor</span>
            <span>{phone.processor}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>RAM</span>
            <span>{phone.ram}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Camera</span>
            <span>{phone.camera}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Zoom</span>
            <span>{phone.zoom}</span>
          </div>

          <div className={styles.techSpecRow}>
            <span>Cell</span>
            <span>{phone.cell.join(', ')}</span>
          </div>
        </div>
      </section>
    </main>
  );
};
