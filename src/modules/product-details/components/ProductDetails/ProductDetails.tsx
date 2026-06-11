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
    <div className={styles.productDetails}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <img src="/img/icons/left.svg" alt="" className={styles.back} />
        Back
      </button>

      <div className={styles.topBar}>
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
                  className={styles.selectImage}
                  onClick={() => setActiveImage(image)}
                >
                  <img
                    src={image}
                    alt={`Product shot ${index + 1}`}
                    className={styles.sliderImage}
                  />
                </button>
              ))
            ) : (
              <p>Images are loading...</p>
            )}
          </div>

          <div className={styles.mainPreview}>
            <img
              className={styles.mainImage}
              src={activeImage || product.images?.[0]}
              alt={product.name}
            />
          </div>
        </div>

        <div className={styles.configColumn}>
          <div className={styles.colorSelector}>
            <p className={styles.paraghTitle}>Available colors</p>

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

          <div className={styles.capacity}>
            <p className={styles.paraghTitle}>Select capacity</p>

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

            <div className={`${styles.actions}`}>
              <button
                type="button"
                onClick={handleCartClick}
                className={`${styles.buyButton} ${isInCart ? styles.isAdded : ''}`}
              >
                {isInCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={`${styles.favButton} ${isInFavorite ? styles.isFav : ''}`}
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

        <span className={styles.productId}>ID: {product.namespaceId}</span>
      </div>

      <div className={styles.main}>
        <section className={styles.about}>
          <h3 className={styles.sectionTitle}>About</h3>

          {product.description?.map((prod, index) => (
            <div key={prod.title || index} className={styles.aboutContainer}>
              <h4 className={styles.aboutTitle}>{prod.title}</h4>
              <p className={styles.aboutText}>{prod.text}</p>
            </div>
          ))}
        </section>

        <section className={styles.characteristic}>
          <h3 className={styles.sectionTitle}>Tech specs</h3>

          <div className={styles.techSpecs}>
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>Screen</p>
              <span className={styles.techSpecDescription}>
                {product.screen}
              </span>
            </div>
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>Resolution</p>
              <span className={styles.techSpecDescription}>
                {product.resolution}
              </span>
            </div>
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>Processor</p>
              <span className={styles.techSpecDescription}>
                {product.processor}
              </span>
            </div>
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>RAM</p>
              <span className={styles.techSpecDescription}>{product.ram}</span>
            </div>
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>Built in memory</p>
              <span className={styles.techSpecDescription}>
                {product.capacity}
              </span>
            </div>
            {'camera' in product && (
              <div className={styles.techSpecRow}>
                <p className={styles.techSpecTitle}>Camera</p>
                <span className={styles.techSpecDescription}>
                  {product.camera}
                </span>
              </div>
            )}
            {'zoom' in product && (
              <div className={styles.techSpecRow}>
                <p className={styles.techSpecTitle}>Zoom</p>
                <span className={styles.techSpecDescription}>
                  {product.zoom}
                </span>
              </div>
            )}
            <div className={styles.techSpecRow}>
              <p className={styles.techSpecTitle}>Cell</p>
              <span className={styles.techSpecDescription}>
                {product.cell?.join(', ') || ''}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
