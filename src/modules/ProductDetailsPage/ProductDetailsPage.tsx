import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { BackButton } from '../../components/BackButton/BackButton';
import { Loader } from '../../components/Loader/Loader';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { buildUrl } from '../shared/utils/buildUrl';
import { useProductDetails } from '../shared/hooks/useProductsDetails';
import 'swiper/css';
import 'swiper/css/navigation';
// eslint-disable-next-line max-len
import { SuggestedProducts } from '../../components/SuggestedProducts/SuggestedProducts';
import { useCart } from '../shared/contexts/CartContext';
import { Product } from '../shared/types/Product';
import { useFavorites } from '../shared/contexts/FavoritesContext';

const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage: React.FC = () => {
  const { isInCart, addToCart } = useCart();
  const { favorites, toggleFavorites } = useFavorites();

  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { product, numericId, isLoading, hasError, notFound, reload } =
    useProductDetails(productId);

  const [selectedImage, setSelectedImage] = useState(0);

  const handleColorSelect = (color: string) => {
    if (!product || color === product.color) {
      return;
    }

    const newItemId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${color}`;

    navigate(`/product/${newItemId}`);
  };

  const handleCapacitySelect = (capacity: string) => {
    if (!product || capacity === product.capacity) {
      return;
    }

    const newItemId = `${product.namespaceId}-${capacity.toLowerCase()}-${product.color}`;

    navigate(`/product/${newItemId}`);
  };

  const handleAddToCart = () => {
    if (!product || numericId === null || isInCart(numericId)) {
      return;
    }

    const shortProduct: Product = {
      id: numericId,
      category: product.category,
      itemId: product.id,
      name: product.name,
      fullPrice: product.priceRegular,
      price: product.priceDiscount,
      screen: product.screen,
      capacity: product.capacity,
      color: product.color,
      ram: product.ram,
      year: 0,
      image: product.images[0],
    };

    addToCart(shortProduct);
  };

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Loader />
        </div>
      </main>
    );
  }

  if (hasError) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <ErrorMessage onReload={reload} />
        </div>
      </main>
    );
  }

  if (notFound || !product || numericId === null) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.notFoundTitle}>Product was not found</h1>
          <div className={styles.imageWrapper}>
            <img
              src="img/product-not-found.png"
              alt="Product was not found"
              className={styles.productNotFound}
            />
          </div>
        </div>
      </main>
    );
  }

  const categoryLabel = categoryLabels[product.category] || product.category;
  const isAddedToCart = isInCart(numericId);
  const isFavorite = favorites.includes(numericId);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: categoryLabel, path: `/${product.category}` },
            { label: product.name },
          ]}
        />

        <BackButton path={`/${product.category}`} />

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{product.name}</h1>
        </div>

        <section className={styles.topSection}>
          <div className={styles.thumbsWrapper}>
            <div className={styles.galleryThumbs}>
              {product.images.map((image, index) => (
                <button
                  key={image}
                  className={`${styles.galleryThumb} ${
                    index === selectedImage
                      ? styles['galleryThumb--active']
                      : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={buildUrl(image)}
                    alt={`${product.name} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className={styles.galleryMain}>
            <img
              src={buildUrl(product.images[selectedImage])}
              alt={product.name}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.optionGroup}>
              <h3 className={styles.optionGroup__title}>Available colors</h3>
              <div className={styles.colorOptions}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={`${styles.colorButton} ${product.color === color ? styles['colorButton--active'] : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
              <hr className={styles.optionGroup__divider} />
            </div>
            <div className={styles.optionGroup}>
              <h3 className={styles.optionGroup__title}>Select capacity</h3>
              <div className={styles.capacityOptions}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    className={`${styles.capacityButton} ${product.capacity === capacity ? styles['capacityButton--active'] : ''}`}
                    onClick={() => handleCapacitySelect(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.price}>
              <span>${product.priceDiscount}</span>
              <span className={styles.priceRegular}>
                ${product.priceRegular}
              </span>
            </div>
            <div className={styles.actions}>
              <button
                className={`${styles.addButton} ${isAddedToCart ? styles['addButton--active'] : ''}`}
                onClick={handleAddToCart}
              >
                {isAddedToCart ? 'Added' : 'Add to cart'}
              </button>
              <button
                className={`${styles.favoriteButton} ${isFavorite ? styles['favoriteButton--active'] : ''}`}
                onClick={() => toggleFavorites(numericId)}
              >
                {isFavorite ? (
                  <img
                    src="img/icons/favorite-filled.png"
                    alt="Added to Favorites"
                    className={styles.favoriteIcon}
                  />
                ) : (
                  <img
                    src="img/icons/favorite.png"
                    alt="Add to Favorites"
                    className={styles.favoriteIcon}
                  />
                )}
              </button>
            </div>
            <div className={styles.description}>
              <div className={styles.item}>
                <span className={styles.property}>Screen</span>
                <strong className={styles.value}>{product.screen}</strong>
              </div>
              <div className={styles.item}>
                <span className={styles.property}>Resolution</span>
                <strong className={styles.value}>{product.resolution}</strong>
              </div>
              <div className={styles.item}>
                <span className={styles.property}>Processor</span>
                <strong className={styles.value}>{product.processor}</strong>
              </div>
              <div className={styles.item}>
                <span className={styles.property}>Ram</span>
                <strong className={styles.value}>{product.ram}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <section className={styles.sectionAbout}>
            <h2 className={styles.sectionTitle}>About</h2>

            <hr className={styles.divider} />

            <article className={styles.aboutItem}>
              <h3 className={styles.subtitle}>And then there was Pro</h3>
              <p className={styles.paragraph}>
                A transformative triple-camera system that adds tons of
                capability without complexity.
                <br />
                <br />
                An unprecedented leap in battery life. And a mind-blowing chip
                that doubles down on machine learning and pushes the boundaries
                of what a smartphone can do. Welcome to the first iPhone
                powerful enough to be called Pro.
              </p>
            </article>

            <article className={styles.aboutItem}>
              <h3 className={styles.subtitle}>Camera</h3>
              <p className={styles.paragraph}>
                Meet the first triple‑camera system to combine cutting‑edge
                technology with the legendary simplicity of iPhone. Capture up
                to four times more scene. Get beautiful images in drastically
                lower light. Shoot the highest‑quality video in a smartphone —
                then edit with the same tools you love for photos. You’ve never
                shot with anything like it.
              </p>
            </article>

            <article className={styles.aboutItem}>
              <h3 className={styles.subtitle}>
                Shoot it. Flip it. Zoom it. Crop it. Cut it. Light it. Tweak it.
                Love it.
              </h3>
              <p className={styles.paragraph}>
                iPhone 11 Pro lets you capture videos that are beautifully true
                to life, with greater detail and smoother motion. Epic
                processing power means it can shoot 4K video with extended
                dynamic range and cinematic video stabilization — all at 60 fps.
                You get more creative control, too, with four times more scene
                and powerful new editing tools to play with.
              </p>
            </article>
          </section>

          <section className={styles.sectionTechSpecs}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>

            <hr className={styles.divider} />

            <div className={styles.techSpec}>
              <div className={styles.techSpecItem}>
                <span className={styles.property}>Screen</span>
                <strong className={styles.value}>{product.screen}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Resolution</span>
                <strong className={styles.value}>{product.resolution}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Processor</span>
                <strong className={styles.value}>{product.processor}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>RAM</span>
                <strong className={styles.value}>{product.ram}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Built in memory</span>
                <strong className={styles.value}>{product.capacity}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Camera</span>
                <strong className={styles.value}>{product.camera}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Zoom</span>
                <strong className={styles.value}>{product.zoom}</strong>
              </div>

              <div className={styles.techSpecItem}>
                <span className={styles.property}>Cell</span>
                <strong className={styles.value}>{product.cell}</strong>
              </div>
            </div>
          </section>
        </section>

        <SuggestedProducts category={product.category} excludeId={numericId} />
      </div>
    </main>
  );
};
