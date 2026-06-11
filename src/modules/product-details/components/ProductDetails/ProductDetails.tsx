import styles from './ProductDetails.module.scss';
import { Phone } from '../../../../types/phone';
import { Tablet } from '../../../../types/tablet';
import { Accessorie } from '../../../../types/accessorie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../../cart-context/CartContext';
import { useFavorite } from '../../../../favorites-context/FavoritesContext';
import { Product } from '../../../../types/product';

type AnyProduct = Phone | Tablet | Accessorie;

type Props = {
  product: AnyProduct;
};

const convertToProduct = (item: AnyProduct): Product => {
  return {
    id: item.id,
    category: item.category,
    itemId: item.id,
    name: item.name,
    fullPrice: item.priceRegular,
    price: item.priceDiscount,
    screen: item.screen,
    capacity: item.capacity,
    color: item.color,
    ram: item.ram,
    year: 'year' in item ? item.year : 0,
    image: item.images[0] || '',
  };
};

export const ProductDetails: React.FC<Props> = ({ product }) => {
  const [activeImage, setActiveImage] = useState<string>('');
  const [activeColor, setActiveColor] = useState<string>('');
  const [activeCapacity, setActiveCapacity] = useState<string>('');

  const navigate = useNavigate();

  const unifiedProduct = convertToProduct(product);

  const colorsList = Array.isArray(product.colorsAvailable)
    ? product.colorsAvailable
    : [product.colorsAvailable];

  const capacityList = Array.isArray(product.capacityAvailable)
    ? product.capacityAvailable
    : [product.capacityAvailable];

  const { addToCart, removeFromCart, cart } = useCart();
  const isInCart = cart.some(item => item.product.id === product.id);

  const handleCartClick = () => {
    if (isInCart) {
      removeFromCart(product.id);
    } else {
      addToCart(unifiedProduct);
    }
  };

  const { addToFavorite, removeFromFavorite, favorite } = useFavorite();
  const isInFavorite = favorite.some(item => item.product.id === product.id);

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      removeFromFavorite(product.id);
    } else {
      addToFavorite(unifiedProduct);
    }
  };

  useEffect(() => {
    if (product?.images?.length) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return <div>Product was not found</div>;
  }

  return (
    <div className={styles.ProductDetails}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        -- Back
      </button>

      <div className={styles.topBar}>
        <span className={styles.productId}>{product.id}</span>
        <h2 className={styles.title}>{product.name}</h2>
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.mediaColumn}>
          <div className={styles.thumbsSlider}>
            {product?.images?.length ? (
              product.images.map((image, index) => (
                <button
                  key={image + index}
                  type="button"
                  onClick={() => setActiveImage(image)}
                >
                  <img src={image} alt={`Product shot ${index + 1}`} />
                </button>
              ))
            ) : (
              <p>Images are loading...</p>
            )}
          </div>

          <div className={styles.mainPreview}>
            <img src={activeImage || product.images?.[0]} alt={product.name} />
          </div>
        </div>

        <div className={styles.configColumn}>
          <div className={styles.colorSelector}>
            <p className={styles.sectionLabel}>Available colors</p>
            <div className={styles.colorsGrid}>
              {colorsList.map((color, index) => {
                const colorInputId = `${product.id}-color-${index}`;
                const isSelected = activeColor === color;

                return (
                  <div key={colorInputId} className={styles.colorWrapper}>
                    <input
                      id={colorInputId}
                      type="radio"
                      name={`product-color-${product.id}`}
                      value={color}
                      checked={isSelected}
                      className={styles.colorInput}
                      onChange={() => setActiveColor(color)}
                    />
                    <label
                      htmlFor={colorInputId}
                      className={`${styles.colorLabel} ${isSelected ? styles.isActive : ''}`}
                      style={{ backgroundColor: color }}
                      title={color}
                    >
                      <span className={styles.visuallyHidden}>{color}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.capacity}>
          <p>Select capacity</p>

          <div className={styles.capacityGrid}>
            {capacityList.map(capacity => {
              const isSelected = activeCapacity === capacity;

              return (
                <button
                  key={capacity}
                  type="button"
                  className={`${styles.capacityButton} ${isSelected ? styles.isActiveButton : ''}`}
                  onClick={() => setActiveCapacity(capacity)}
                >
                  {capacity}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.addToChart}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>
              ${product.priceDiscount || product.priceRegular}
            </span>

            {product.priceDiscount !== product.priceRegular ? (
              <span className={styles.discount}>${product.priceRegular}</span>
            ) : null}
          </div>

          <div
            className={`${styles.actions} ${isInCart ? styles.isAdded : ''}`}
          >
            <button
              type="button"
              onClick={handleCartClick}
              className={styles.buyBtn}
            >
              {isInCart ? 'Added' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={styles.favBtn}
              aria-label="Toggle favorites"
              onClick={handleFavoriteClick}
            >
              <img
                src={
                  isInFavorite
                    ? '/img/icons/favorites-field.svg'
                    : '/img/icons/favorites.svg'
                }
                alt=""
              />
            </button>
          </div>
        </div>

        <div className={styles.specs}>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Screen</p>
            <span className={styles.description}>{product.screen}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Resolution</p>
            <span className={styles.description}>{product.resolution}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Processor</p>
            <span className={styles.description}>{product.processor}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>RAM</p>
            <span className={styles.description}>{product.ram}</span>
          </div>
        </div>
      </div>

      <div className={styles.main}>
        <section className={styles.about}>
          <h3>About</h3>

          {product.description?.map((prod, index) => (
            <div key={prod.title || index}>
              <h4>{prod.title}</h4>
              <p>{prod.text}</p>
            </div>
          ))}
        </section>

        <section className={styles.characteristic}>
          <h3>Tech specs</h3>

          <div className={styles.specRow}>
            <p className={styles.specTitle}>Screen</p>
            <span className={styles.description}>{product.screen}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Resolution</p>
            <span className={styles.description}>{product.resolution}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Processor</p>
            <span className={styles.description}>{product.processor}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>RAM</p>
            <span className={styles.description}>{product.ram}</span>
          </div>
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Built in memory</p>
            <span className={styles.description}>{product.capacity}</span>
          </div>
          {'camera' in product && (
            <div className={styles.specRow}>
              <span>Camera</span>
              <span>{product.camera}</span>
            </div>
          )}
          {'zoom' in product && (
            <div className={styles.specRow}>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </div>
          )}
          <div className={styles.specRow}>
            <p className={styles.specTitle}>Cell</p>
            <span className={styles.description}>
              {product.cell?.join(', ') || ''}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
