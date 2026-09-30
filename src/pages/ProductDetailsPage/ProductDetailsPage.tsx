import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Product } from '../../types/Product';
import styles from './ProductDetailsPage.module.scss';
import { ProductDetails } from '../../types/productsDetails';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { useCart } from '../../Context/CartContext';
import { useFavorites } from '../../Context/FavoritesContext';

interface ProductDetailsPageProps {
  products: ProductDetails[];
  baseProducts?: Product[];
}

const colorMap: Record<string, string> = {
  black: '#212121',
  green: '#4E5C50',
  yellow: '#F9D749',
  white: '#F0F0F0',
  purple: '#B8AFE6',
  red: '#BA0C2F',
  blue: '#215C8C',
  sierrablue: '#9BB5CE',
  graphite: '#414246',
  silver: '#E3E4E5',
  gold: '#FAE7CF',
  midnight: '#191F28',
  starlight: '#F0EDE6',
  pink: '#F8C8D4',
  'sky blue': '#87CEEB',
  'rose gold': '#E6C7C2',
  rosegold: '#E6C7C2',
  'space gray': '#6E6D6A',
  spacegray: '#6E6D6A',
  spaceblack: '#2E2E30',
};

// для очищення слеша на початку шляху
const getCleanPath = (path: string) => (path.startsWith('/') ? path.slice(1) : path);

export const ProductDetailsPage = ({
  products,
  baseProducts = [],
}: ProductDetailsPageProps) => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === productId);

  const baseProduct = baseProducts.find(
    bp =>
      bp.itemId === product?.itemId ||
      bp.itemId === productId ||
      String(bp.id) === productId,
  );

  const { cartItems, addToCart, handleRemove } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  const [selectedImage, setSelectedImage] = useState(0);

  const currentId = String(baseProduct?.id || product?.id || productId);
  const isInCart = cartItems.some(item => String(item.id) === currentId);
  const isInFavorite = favorites.includes(currentId);

  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const recommendedItems = [...baseProducts]
    .filter(bp => bp.itemId !== product?.itemId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const checkScrollPosition = () => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    checkScrollPosition();
    container.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [recommendedItems]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { scrollLeft, clientWidth } = containerRef.current;
      const scrollAmount = clientWidth * 0.75;

      containerRef.current.scrollTo({
        left:
          direction === 'left'
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!product) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          &lt; Back to home
        </Link>
        <div className={styles.notFound}>
         <img
            src="img/product-not-found.png"
            alt="Product not found"
            className={styles.notFoundImage}
         />
          <h2>Product not found</h2>
        </div>
      </div>
    );
  }

  const handleAddToCartClick = () => {
    if (baseProduct) {
      if (isInCart) {
        handleRemove(baseProduct.id);
      } else {
        addToCart(baseProduct.id);
      }
    }
  };

  const handleAddToFavoriteClick = () => {
    if (baseProduct) {
      toggleFavorite(String(baseProduct.id));
    }
  };

  const categoryName = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : 'Catalog';

  return (
    <div className={styles.container}>
      <Breadcrumbs
        items={[
          { label: categoryName, path: `/${product.category}` },
          { label: product.name },
        ]}
      />

      <Link
        to="#"
        onClick={e => {
          e.preventDefault();
          navigate(-1);
        }}
        className={styles.backLink}
      >
        &lt; Back
      </Link>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainPageContainer}>
        <div className={styles.contentGrid}>
          <div className={styles.gallery}>
            <img
              src={getCleanPath(product.images?.[selectedImage] || '')}
              alt={product.name}
              className={styles.mainImage}
            />
            <div className={styles.thumbnails}>
              {product.images?.map((imgUrl: string, index: number) => (
                <img
                  key={imgUrl}
                  src={getCleanPath(imgUrl)}
                  alt={`${product.name} thumbnail ${index}`}
                  onClick={() => setSelectedImage(index)}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.active : ''}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.info}>
            <div className={`${styles.section} ${styles.colorSection}`}>
              <div className={styles.colorHeader}>
                <span className={styles.sectionTitle}>Available colors</span>
                <span className={styles.productId}>
                  ID: {baseProduct?.id ?? '...'}
                </span>
              </div>
              <div className={styles.colorsList}>
                {product.colorsAvailable?.map(colorOption => {
                  const colorId = `${product.namespaceId}-${product.capacity.toLowerCase()}-${colorOption}`;
                  const backgroundColor = colorMap[colorOption] || colorOption;

                  return (
                    <Link
                      key={colorOption}
                      to={`/product/${colorId}`}
                      className={`${styles.colorCircle} ${product.color === colorOption ? styles.activeColor : ''}`}
                      style={{ backgroundColor }}
                      aria-label={colorOption}
                    />
                  );
                })}
              </div>
            </div>

            <div className={`${styles.divider} ${styles.dividerColorMargin}`} />

            <div className={`${styles.section} ${styles.capacitySection}`}>
              <span className={styles.sectionTitle}>Select capacity</span>
              <div className={styles.capacityList}>
                {product.capacityAvailable?.map(cap => {
                  const capacityId = `${product.namespaceId}-${cap.toLowerCase()}-${product.color}`;

                  return (
                    <Link
                      key={cap}
                      to={`/product/${capacityId}`}
                      className={`${styles.capacityButton} ${product.capacity === cap ? styles.activeCapacity : ''}`}
                    >
                      {cap}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div
              className={`${styles.divider} ${styles.dividerCapacityMargin}`}
            />

            <div className={`${styles.section} ${styles.priceSection}`}>
              <div className={styles.priceBlock}>
                <span className={styles.price}>${product.priceDiscount}</span>
                {product.priceRegular > product.priceDiscount && (
                  <span className={styles.fullPrice}>
                    ${product.priceRegular}
                  </span>
                )}
              </div>
            </div>

            <div className={`${styles.section} ${styles.actionsSection}`}>
              <div className={styles.actions}>
                <button
                  className={`${styles.addToCartButton} ${isInCart ? styles.added : ''}`}
                  onClick={handleAddToCartClick}
                >
                  {isInCart ? 'Added to cart' : 'Add to cart'}
                </button>
                <button
                  className={`${styles.favoriteButton} ${isInFavorite ? styles.activeFavorite : ''}`}
                  onClick={handleAddToFavoriteClick}
                  aria-label="Favorites"
                >
                  <img
                    src={
                        isInFavorite
                          ? 'img/icons/Favourites Filled (Heart Like).png'
                          : 'img/icons/Favourites (Heart Like).png'
                      }
                    alt="Favorite icon"
                    className={styles.favoriteIcon}
                  />
                </button>
              </div>
            </div>

            <div className={styles.specs}>
              <p>
                <strong>Screen:</strong> {product.screen}
              </p>
              <p>
                <strong>Resolution:</strong> {product.resolution}
              </p>
              <p>
                <strong>Processor:</strong> {product.processor}
              </p>
              <p>
                <strong>RAM:</strong> {product.ram}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.aboutSection}>
            <h2 className={styles.aboutHeader}>About</h2>
            {product.description?.map(section => (
              <div key={section.title} className={styles.aboutBlock}>
                <h3 className={styles.aboutTitle}>{section.title}</h3>
                {section.text.map((paragraph, index) => (
                  <p key={index} className={styles.aboutText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.specsSection}>
            <h2 className={styles.aboutHeader}>Tech specs</h2>
            <div className={styles.specs}>
              <p>
                <strong>Screen:</strong> {product.screen}
              </p>
              <p>
                <strong>Resolution:</strong> {product.resolution}
              </p>
              <p>
                <strong>Processor:</strong> {product.processor}
              </p>
              <p>
                <strong>RAM:</strong> {product.ram}
              </p>
              <p>
                <strong>Built in memory:</strong> {product.capacity}
              </p>
              <p>
                <strong>Camera:</strong> {product.camera}
              </p>
              <p>
                <strong>Zoom:</strong> {product.zoom}
              </p>
              <p>
                <strong>Cell:</strong> {product.cell?.join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.recommendedSection}>
          <div className={styles.recommendedHeader}>
            <h2 className={styles.recommendedTitle}>You may also like</h2>
            <div className={styles.arrowButtonsGroup}>
              <button
                className={`${styles.arrowButton} ${!canScrollLeft ? styles.disabled : ''}`}
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
              >
                ‹
              </button>
              <button
                className={`${styles.arrowButton} ${!canScrollRight ? styles.disabled : ''}`}
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right"
              >
                ›
              </button>
            </div>
          </div>

          <div className={styles.recommendedSlider} ref={containerRef}>
            {recommendedItems.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
