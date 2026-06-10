/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './ProductDetailsPage.module.scss';
import { useFavorites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import { Loader } from '../../components/Loader/Loader';

interface Product {
  id: string;
  category: string;
  name: string;
  capacity: string;
  screen: string;
  itemId?: string;
  image?: string;
  namespaceId?: string;
  capacityAvailable?: string[];
  priceRegular?: number;
  priceDiscount?: number;
  price?: number;
  fullPrice?: number;
  colorsAvailable?: string[];
  color?: string;
  images?: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  zoom?: string;
  cell?: string[];
}

const VALID_CATEGORIES = ['phones', 'tablets', 'accessories'] as const;

type ValidCategory = (typeof VALID_CATEGORIES)[number];

export const ProductDetailsPage: React.FC = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const { itemId, category } = useParams<{
    itemId: string;
    category: string;
  }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.firstElementChild as HTMLElement;
      const step = firstCard
        ? firstCard.offsetWidth +
          parseInt(window.getComputedStyle(container).gap || '16')
        : 292;

      const start = container.scrollLeft;
      const change = direction === 'left' ? -step : step;
      const duration = 400;
      let startTime: number | null = null;

      const animateScroll = (currentTime: number) => {
        if (!startTime) {
          startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        container.scrollLeft = start + change * ease;

        if (timeElapsed < duration) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  useEffect(() => {
    const isValidCategory = VALID_CATEGORIES.includes(
      category as ValidCategory,
    );

    if (!itemId || !category || !isValidCategory) {
      navigate('/not-found');

      return;
    }

    setLoading(true);
    setError(false);

    const controller = new AbortController();

    Promise.all([
      fetch('/api/products.json', { signal: controller.signal }),
      fetch(`/api/${category}.json`, { signal: controller.signal }),
    ])
      .then(async ([allRes, categoryRes]) => {
        if (!allRes.ok || !categoryRes.ok) {
          throw new Error('Failed to fetch');
        }

        const [allProductsData, categoryData]: [Product[], Product[]] =
          await Promise.all([allRes.json(), categoryRes.json()]);

        setAllProducts(allProductsData);
        setCategoryProducts(categoryData);

        const foundProduct = categoryData.find(
          p => String(p.id) === itemId || String(p.itemId) === itemId,
        );

        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.images?.[0] || '');
        } else {
          setError(true);
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(true);
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 500),
      );

    return () => controller.abort();
  }, [itemId, category, navigate]);

  const colors = useMemo(
    () =>
      product?.colorsAvailable ||
      ([product?.color].filter(Boolean) as string[]),
    [product],
  );

  const capacities = useMemo(
    () =>
      product?.capacityAvailable ||
      ([product?.capacity].filter(Boolean) as string[]),
    [product],
  );

  const variants = useMemo(() => {
    if (!product?.namespaceId) {
      return [];
    }

    return categoryProducts.filter(p => p.namespaceId === product.namespaceId);
  }, [categoryProducts, product]);

  const recommended = useMemo(() => {
    if (!product || !allProducts.length) {
      return [];
    }

    const currentId = product.id;

    return allProducts
      .filter(
        p =>
          String(p.id) !== String(currentId) &&
          String(p.itemId) !== String(currentId),
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);
  }, [allProducts, product]);

  const isAddedToFav = useMemo(() => {
    if (!product) {
      return false;
    }

    return isFavorite(product.id) || (itemId ? isFavorite(itemId) : false);
  }, [product, itemId, isFavorite]);

  const isAddedToCart = useMemo(() => {
    if (!product) {
      return false;
    }

    const currentId = itemId || product.id;

    return cartItems.some(item => String(item.id) == String(currentId));
  }, [product, itemId, cartItems]);

  const handleFavouriteClick = () => {
    const idToToggle = itemId || product?.id;

    if (idToToggle && product) {
      toggleFavorite(idToToggle, product.name);
    }
  };

  const handleAddToCartClick = () => {
    const idToAdd = itemId || product?.id;

    if (idToAdd && product) {
      if (isAddedToCart) {
        removeFromCart(String(idToAdd), product.name);
      } else {
        addToCart(String(idToAdd), product.name);
      }
    }
  };

  if (error) {
    return <h2>Something went wrong...</h2>;
  }

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return <h2>Product was not found</h2>;
  }

  return (
    <div className={styles.productDetailsPage}>
      <>
        <nav className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbsLink}>
            <img src="img/Home.png" alt="home" />
          </Link>

          <span className={styles.breadcrumbsSeparator}></span>

          <Link to={`/${category}`} className={styles.breadcrumbsLink}>
            {category}
          </Link>

          <span className={styles.breadcrumbsSeparator}></span>

          <span className={styles.breadcrumbsCurrent}>{product.name}</span>
        </nav>

        <button onClick={() => navigate(-1)} className={styles.backButton}>
          Back
        </button>

        <h1 className={styles.productTitle}>{product.name}</h1>

        <div className={styles.productMainGrid}>
          <div className={styles.gallery}>
            <div className={styles.galleryMain}>
              <img src={selectedImage} alt={product.name} />
            </div>

            <div className={styles.galleryThumbnails}>
              {product.images?.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`${styles.galleryThumb} ${
                    selectedImage === imgUrl ? styles.galleryThumbActive : ''
                  }`}
                  onClick={() => setSelectedImage(imgUrl)}
                >
                  <img src={imgUrl} alt={`preview ${index}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <div className={styles.selectors}>
              <p className={styles.selectorsLabel}>Available colors</p>

              <div className={styles.colorList}>
                {colors.map(color => {
                  if (!color) {
                    return null;
                  }

                  const variant = variants.find(
                    v =>
                      v.color?.toLowerCase() === color.toLowerCase() &&
                      v.capacity === product.capacity,
                  );

                  const isActive =
                    color.toLowerCase() === product.color?.toLowerCase();

                  const targetId = variant
                    ? variant.id || variant.itemId || ''
                    : '';

                  return (
                    <button
                      key={color}
                      onClick={() =>
                        targetId && navigate(`/${category}/${targetId}`)
                      }
                      className={`${styles.colorBtn} ${
                        isActive ? styles.colorBtnActive : ''
                      }`}
                      data-color={color.toLowerCase()}
                      disabled={!variant}
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.selectors}>
              <p className={styles.selectorsLabel}>Select capacity</p>

              <div className={styles.capacityList}>
                {capacities.map(cap => {
                  const variant = variants.find(
                    v => v.capacity === cap && v.color === product.color,
                  );

                  const targetId = variant
                    ? variant.id || variant.itemId || ''
                    : '';

                  return (
                    <button
                      key={cap}
                      onClick={() =>
                        targetId && navigate(`/${category}/${targetId}`)
                      }
                      className={`${styles.capacityBtn} ${
                        cap === product.capacity ? styles.capacityBtnActive : ''
                      }`}
                      disabled={!variant}
                    >
                      {cap}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.priceNew}>
                ${product.priceDiscount || product.priceRegular}
              </span>

              {product.priceRegular &&
                product.priceDiscount &&
                product.priceDiscount !== product.priceRegular && (
                <span className={styles.priceOld}>
                    ${product.priceRegular}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={`${styles.addToCart} ${isAddedToCart ? styles.addToCartActive : ''}`}
                onClick={handleAddToCartClick}
              >
                {isAddedToCart ? 'Added to cart' : 'Add to cart'}
              </button>

              <button
                type="button"
                className={`${styles.favoriteBtn} ${
                  isAddedToFav ? styles.favoriteBtnActive : ''
                }`}
                onClick={handleFavouriteClick}
              ></button>
            </div>

            <div className={styles.specsPreview}>
              <div className={styles.specsRow}>
                <span>Screen</span>
                <span>{product.screen}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Processor</span>
                <span>{product.processor}</span>
              </div>

              <div className={styles.specsRow}>
                <span>RAM</span>
                <span>{product.ram}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.productDetailsBottom}>
          <div className={styles.about}>
            <h2 className={styles.aboutTitle}>About</h2>

            {product.description?.map((section, idx) => (
              <div key={idx} className={styles.aboutSection}>
                <h3 className={styles.aboutSubtitle}>{section.title}</h3>

                {section.text.map((p, i) => (
                  <p key={i} className={styles.aboutText}>
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecs}>
            <h2 className={styles.techSpecsTitle}>Tech specs</h2>

            <div className={styles.specsTable}>
              <div className={styles.specsRow}>
                <span>Screen</span>
                <span>{product.screen}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Resolution</span>
                <span>{product.resolution}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Processor</span>
                <span>{product.processor}</span>
              </div>

              <div className={styles.specsRow}>
                <span>RAM</span>
                <span>{product.ram}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Built in memory</span>
                <span>{product.capacity}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Camera</span>
                <span>{product.camera}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Zoom</span>
                <span>{product.zoom}</span>
              </div>

              <div className={styles.specsRow}>
                <span>Cell</span>
                <span>{product.cell?.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.recommended}>
          <div className={styles.recommendedHeader}>
            <h2 className={styles.recommendedTitle}>You may also like</h2>

            <div className={styles.recommendedButtons}>
              <button
                className={`${styles.navButton} ${styles.navButtonLeft}`}
                onClick={() => handleScroll('left')}
              ></button>

              <button
                className={`${styles.navButton} ${styles.navButtonRight}`}
                onClick={() => handleScroll('right')}
              ></button>
            </div>
          </div>

          <div className={styles.recommendedGrid} ref={scrollContainerRef}>
            {recommended.map(item => (
              <ProductCard
                key={item.id}
                itemId={item.itemId || item.id}
                category={item.category}
                image={item.image || item.images?.[0] || ''}
                title={item.name}
                price={
                  item.price || item.priceDiscount || item.priceRegular || 0
                }
                fullPrice={item.fullPrice || item.priceRegular || 0}
                screen={item.screen}
                capacity={item.capacity}
                ram={item.ram || ''}
              />
            ))}
          </div>
        </div>
      </>
    </div>
  );
};
