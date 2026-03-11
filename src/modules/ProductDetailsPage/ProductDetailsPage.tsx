import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styles from './ProductDetailsPage.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Accessory, Phone, Product, Tablet } from '../../types';
import getProducts, {
  getProductById,
  getSuggestedProducts,
} from '../../api/products';
import { ErrorState } from '../shared/ErrorState/ErrorState';
import { Breadcrumbs } from '../shared/Breadcrumbs/Breadcrumbs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { COLOR_MAP } from '../../utils/colors';
import { ProductsSlider } from '../shared/ProductsSlider/ProductsSlider';
import { useSwipe } from '../../hooks/useSwipe';
import { ProductDetailsSkeleton } from '../shared/ProductDetailsSkeleton/ProductDetailsSkeleton';
import { useToast } from '../../context/ToastContext';

export const ProductDetailsPage = () => {
  const [isCartHovered, setIsCartHovered] = useState(false);
  const { addToCart, isInCart, removeFromCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState<Phone | Tablet | Accessory | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [suggestedLoading, setSuggestedLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [productCart, setProductCart] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Product[]>([]);
  const [notFound, setNotFound] = useState(false);

  const { showToast } = useToast();

  const imageCount = product?.images.length ?? 0;
  const { handleTouchStart, handleTouchEnd } = useSwipe({
    onSwipeLeft: () => setActiveImage(i => Math.min(i + 1, imageCount - 1)),
    onSwipeRight: () => setActiveImage(i => Math.max(i - 1, 0)),
  });

  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.pathname.split('/')[1];

  const loadProduct = useCallback(async () => {
    if (!productId || !category) {
      return;
    }

    try {
      setLoading(true);
      setError(false);
      setNotFound(false);
      await new Promise(resolve => setTimeout(resolve, 500));

      const data = await getProductById(productId, category);

      if (!data) {
        setNotFound(true);

        return;
      }

      setProduct(data);
      setSelectedColor(data.color);
      setSelectedCapacity(data.capacity);

      const allProducts = await getProducts();

      const related = allProducts.filter(p =>
        p.itemId.includes(data.namespaceId),
      );

      setVariants(related);

      const found = allProducts.find(p => p.itemId === productId);

      setProductCart(found || null);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [productId, category]);

  const isColorAvailable = (color: string) => {
    return variants.some(
      v => v.color === color && v.capacity === selectedCapacity,
    );
  };

  const isCapacityAvailable = (capacity: string) => {
    return variants.some(
      v => v.capacity === capacity && v.color === selectedColor,
    );
  };

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const suggestedLoaded = useRef(false);

  useEffect(() => {
    if (suggestedLoaded.current) {
      return;
    }

    const loadSuggested = async () => {
      try {
        setSuggestedLoading(true);
        const data = await getSuggestedProducts();

        setSuggested(data);
        suggestedLoaded.current = true;
      } catch {
        setError(true);
      } finally {
        setSuggestedLoading(false);
      }
    };

    loadSuggested();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const handleColorChange = (color: string) => {
    if (!product) {
      return;
    }

    const variant = variants.find(
      v => v.color === color && v.capacity === selectedCapacity,
    );

    if (variant) {
      navigate(`/${variant.category}/${variant.itemId}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (!product) {
      return;
    }

    const variant = variants.find(
      v => v.capacity === capacity && v.color === selectedColor,
    );

    if (variant) {
      navigate(`/${variant.category}/${variant.itemId}`);
    }
  };

  return (
    <div className="container">
      {/* Page states */}
      {loading && <ProductDetailsSkeleton />}
      {!loading && error && <ErrorState onRetry={loadProduct} />}
      {!loading && !error && notFound && (
        <div className={styles.notFound}>
          <img src="img/page-not-found.png" alt="Not found" />
          <p>Product was not found</p>
          <button onClick={() => navigate(-1)}>Go back</button>
        </div>
      )}

      {!loading && !error && product && (
        <div className={styles.page}>
          {/* Header */}
          <Breadcrumbs
            items={[
              { label: 'Home', path: '/' },
              {
                label: category.charAt(0).toUpperCase() + category.slice(1),
                path: `/${category}`,
              },
              { label: product.name },
            ]}
          />

          <button className={styles.btnBack} onClick={() => navigate(-1)}>
            <img src="img/icons/arrow-left.svg" alt="arrow-left" />
            Back
          </button>

          <h1 className={styles.title}>{product.name}</h1>

          {/* Product layout */}
          <div className={styles.item}>
            {/* Gallery */}
            <div className={styles.gallery}>
              <div className={styles.thumbnails}>
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    className={
                      index === activeImage
                        ? styles.thumbnailActive
                        : styles.thumbnail
                    }
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={`${image}`} alt={product.name} />
                  </button>
                ))}
              </div>

              <div
                className={styles.mainImage}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={`${product.images[activeImage]}`}
                  alt={product.name}
                />
              </div>
            </div>

            {/* Options */}
            <div className={styles.options}>
              <div className={styles.colorSection}>
                {/* Section header */}
                <div className={styles.sectionHeader}>
                  <p className={styles.sectionLabel}>Available colors</p>
                  <p className={styles.productId}>ID: {productCart?.id}</p>
                </div>

                {/* Colors */}
                <div className={styles.colors}>
                  {product.colorsAvailable.map(color => {
                    const disabled = !isColorAvailable(color);

                    return (
                      <button
                        key={color}
                        disabled={disabled}
                        className={`${styles.color} ${disabled ? styles.disabled : ''} ${color === selectedColor ? styles.colorActive : ''}`}
                        style={{ backgroundColor: COLOR_MAP[color] || color }}
                        onClick={() => handleColorChange(color)}
                        title={disabled ? 'Not available' : ''}
                      />
                    );
                  })}
                </div>
              </div>

              <div className={styles.line} />

              {/* Capacity */}
              <div className={styles.capacitySection}>
                <p className={styles.sectionLabel}>Select capacity</p>
                <div className={styles.capacity}>
                  {product.capacityAvailable.map(cap => {
                    const disabled = !isCapacityAvailable(cap);

                    return (
                      <button
                        key={cap}
                        disabled={disabled}
                        className={
                          disabled
                            ? styles.capacityDisabled
                            : cap === selectedCapacity
                              ? styles.capacityActive
                              : styles.capacityBtn
                        }
                        onClick={() => handleCapacityChange(cap)}
                      >
                        {cap}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.line} />

              {/* Price */}
              <div className={styles.priceBlock}>
                <p className={styles.price}>${product.priceDiscount}</p>
                <p className={styles.fullPrice}>${product.priceRegular}</p>
              </div>

              {/* Buttons */}
              <div className={styles.buttons}>
                <button
                  className={
                    isInCart(productCart?.id || 0)
                      ? isCartHovered
                        ? styles.btnRemove
                        : styles.btnAdded
                      : styles.btnAddToCart
                  }
                  onMouseEnter={() => setIsCartHovered(true)}
                  onMouseLeave={() => setIsCartHovered(false)}
                  onClick={() => {
                    if (isInCart(productCart?.id || 0)) {
                      removeFromCart(productCart!.id);
                      showToast('Removed from cart');
                    } else {
                      if (productCart) {
                        addToCart(productCart, () =>
                          showToast('Added to cart'),
                        );
                      }
                    }
                  }}
                >
                  {isInCart(productCart?.id || 0)
                    ? isCartHovered
                      ? 'Remove from cart'
                      : 'Added'
                    : 'Add to cart'}
                </button>

                <button
                  className={styles.btnFavorites}
                  onClick={() =>
                    productCart &&
                    toggleFavorite(productCart, added =>
                      showToast(
                        added ? 'Added to favorites' : 'Removed from favorites',
                      ),
                    )
                  }
                >
                  <img
                    src={
                      isFavorite(productCart?.id || 0)
                        ? 'img/icons/heart-filled.svg'
                        : 'img/icons/heart.svg'
                    }
                    alt="Favorites"
                    className={styles.favorites}
                  />
                </button>
              </div>

              {/* Short specs */}
              <div className={styles.specs}>
                <div className={styles.spec}>
                  <span className={styles.specName}>Screen</span>
                  <span className={styles.specValue}>{product.screen}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>Resolution</span>
                  <span className={styles.specValue}>{product.resolution}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>Processor</span>
                  <span className={styles.specValue}>{product.processor}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>RAM</span>
                  <span className={styles.specValue}>{product.ram}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className={styles.about}>
              <h2 className={styles.subtitle}>About</h2>

              <div className={styles.line} />

              {product.description.map(part => (
                <div key={part.title} className={styles.aboutPart}>
                  <h3 className={styles.aboutTitle}>{part.title}</h3>
                  {part.text.map((paragraph, i) => (
                    <p key={i} className={styles.aboutText}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Tech specs */}
            <div className={styles.techSpecs}>
              <h2 className={styles.subtitle}>Tech specs</h2>

              <div className={styles.lineSpecs} />

              <div className={styles.fullSpecs}>
                <div className={styles.spec}>
                  <span className={styles.specName}>Screen</span>
                  <span className={styles.specValue}>{product.screen}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>Resolution</span>
                  <span className={styles.specValue}>{product.resolution}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>Processor</span>
                  <span className={styles.specValue}>{product.processor}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>RAM</span>
                  <span className={styles.specValue}>{product.ram}</span>
                </div>

                <div className={styles.spec}>
                  <span className={styles.specName}>Built in memory</span>
                  <span className={styles.specValue}>{product.capacity}</span>
                </div>

                {product.category !== 'accessories' && 'camera' in product && (
                  <>
                    <div className={styles.spec}>
                      <span className={styles.specName}>Camera</span>
                      <span className={styles.specValue}>{product.camera}</span>
                    </div>

                    <div className={styles.spec}>
                      <span className={styles.specName}>Zoom</span>
                      <span className={styles.specValue}>{product.zoom}</span>
                    </div>
                  </>
                )}

                <div className={styles.spec}>
                  <span className={styles.specName}>Cell</span>
                  <span className={styles.specValue}>
                    {product.cell.toString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!error && (suggested.length > 0 || suggestedLoading) && (
        <div className={styles.alsoLike}>
          <ProductsSlider
            title="You may also like"
            products={suggested}
            loading={suggestedLoading}
          />
        </div>
      )}
    </div>
  );
};
