import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useCart } from '../../context/CartContext';
import { Product, ProductCard } from '../../components/ProductCard';
import styles from './ProductDetailsPage.module.scss';
import { getBaseUrl } from '../../utils/BaseUrl';

interface ProductDetails extends Product {
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  description?: { title: string; text: string[] }[];
  resolution?: string;
  processor?: string;
  zoom?: string;
  cell?: string[];
}

const COLOR_MAP: Record<string, string> = {
  black: '#1f2022',
  green: '#aee1cd',
  yellow: '#ffe8a3',
  white: '#f9f6f0',
  purple: '#d1cdda',
  red: '#ba0c2f',
  spacegray: '#535150',
  midnightgreen: '#4e5851',
  gold: '#f3e5d8',
  silver: '#e2e4e1',
  rosegold: '#e8c5c8',
  coral: '#ff6f61',
};

const getCleanTitle = (name: string, capacity?: string, color?: string) => {
  let cleanName = name;

  if (capacity) {
    const capacityReg = new RegExp(capacity, 'gi');

    cleanName = cleanName.replace(capacityReg, '');
  }

  if (color) {
    const colorReg = new RegExp(color, 'gi');

    cleanName = cleanName.replace(colorReg, '');
  }

  return cleanName.replace(/\s+/g, ' ').trim();
};

export const ProductDetailsPage: React.FC = () => {
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCart, addToCart, removeFromCart } = useCart();

  // Плавная прокрутка наверх при смене товара (для 'You may also like')
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [productId]);

  useEffect(() => {
    setIsLoading(true);

    const fetchCurrentProduct = fetch(`${getBaseUrl()}api/${category}.json`)
      .then(res => res.json())
      .then((data: ProductDetails[]) => {
        const found = data.find(
          item => item.id === productId || item.itemId === productId,
        );

        if (found) {
          setProduct(found);
          const firstImg = found.images?.[0] || found.image || '';

          setSelectedImage(firstImg);
        }
      });

    const fetchSuggested = Promise.all([
      fetch(`${getBaseUrl()}api/phones.json`)
        .then(r => r.json())
        .catch(() => []),
      fetch(`${getBaseUrl()}api/tablets.json`)
        .then(r => r.json())
        .catch(() => []),
      fetch(`${getBaseUrl()}api/accessories.json`)
        .then(r => r.json())
        .catch(() => []),
    ]).then(([phones, tablets, accessories]) => {
      const allProducts: Product[] = [...phones, ...tablets, ...accessories];
      const filtered = allProducts.filter(
        item => item.id !== productId && item.itemId !== productId,
      );
      const randomSuggested = [...filtered]
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

      setSuggestedProducts(randomSuggested);
    });

    Promise.all([fetchCurrentProduct, fetchSuggested])
      // eslint-disable-next-line no-console
      .catch(err => console.error('Failed to load details:', err))
      .finally(() => setIsLoading(false));
  }, [category, productId]);

  if (isLoading) {
    return <div className={styles.page}>Loading details...</div>;
  }

  if (!product) {
    return <div className={styles.page}>Product not found</div>;
  }

  const currentPrice = product.priceDiscount ?? product.price ?? 0;
  const regularPrice = product.priceRegular ?? product.fullPrice ?? 0;

  const currentId = product.itemId || product.id;
  const normalizedProduct = { ...product, id: currentId };

  const favorite = isFavorite(currentId);
  const inCart = isInCart(currentId);
  const imagesList = product.images || (product.image ? [product.image] : []);

  const availableCapacities =
    product.capacityAvailable || (product.capacity ? [product.capacity] : []);
  const availableColors =
    product.colorsAvailable || (product.color ? [product.color] : []);

  const handleCapacityChange = (newCapacity: string) => {
    if (newCapacity === product.capacity) {
      return;
    }

    const currentCapLower = product.capacity.toLowerCase();
    const newCapLower = newCapacity.toLowerCase();
    const newProductId = productId?.replace(currentCapLower, newCapLower);

    if (newProductId && newProductId !== productId) {
      navigate(`/${category}/${newProductId}`);
    }
  };

  const handleColorChange = (newColor: string) => {
    if (newColor === product.color) {
      return;
    }

    const currentColorLower = product.color.toLowerCase();
    const newColorLower = newColor.toLowerCase();
    const newProductId = productId?.replace(currentColorLower, newColorLower);

    if (newProductId && newProductId !== productId) {
      navigate(`/${category}/${newProductId}`);
    }
  };

  // Возврат строго в каталог категории
  const handleBack = () => {
    navigate(`/${category}`);
  };

  return (
    <div className={styles.page}>
      {/* Хлебные крошки */}
      <div className={styles.breadcrumbs}>
        <Link to="/">
          <img src={`${getBaseUrl()}img/icons/home.svg`} alt="Home" />
        </Link>
        <span>›</span>
        <Link to={`/${category}`}>{category}</Link>
        <span>›</span>
        <span className={styles.active}>{product.name}</span>
      </div>

      <button type="button" onClick={handleBack} className={styles.backBtn}>
        ‹ Back
      </button>

      {/* Очищенный заголовок */}
      <h1 className={styles.title}>
        {getCleanTitle(product.name, product.capacity, product.color)}
      </h1>

      <div className={styles.mainSection}>
        {/* ГАЛЕРЕЯ */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {imagesList.map(img => (
              <button
                key={img}
                type="button"
                className={`${styles.thumbBtn} ${selectedImage === img ? styles.activeThumb : ''}`}
                onClick={() => setSelectedImage(img)}
              >
                <img src={`${getBaseUrl()}${img}`} alt="Thumbnail" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageContainer}>
            <img src={`${getBaseUrl()}${selectedImage}`} alt={product.name} />
          </div>
        </div>

        {/* ПАНЕЛЬ ВЫБОРА ЦВЕТА, ОБЪЕМА И ПОКУПКИ */}
        <div className={styles.productControls}>
          {/* ВЫБОР ЦВЕТА */}
          <div className={styles.sectionLabel}>Available colors</div>
          <div className={styles.colorPicker}>
            {availableColors.map(colorName => {
              const hexColor = COLOR_MAP[colorName.toLowerCase()] || colorName;
              const isActive =
                colorName.toLowerCase() === product.color?.toLowerCase();

              return (
                <button
                  key={colorName}
                  type="button"
                  className={`${styles.colorCircle} ${isActive ? styles.activeColor : ''}`}
                  style={{ backgroundColor: hexColor }}
                  onClick={() => handleColorChange(colorName)}
                  title={colorName}
                />
              );
            })}
          </div>

          <div className={styles.divider} />

          {/* ВЫБОР ОБЪЕМА */}
          <div className={styles.sectionLabel}>Select capacity</div>
          <div className={styles.capacityPicker}>
            {availableCapacities.map(cap => (
              <button
                key={cap}
                type="button"
                className={`${styles.capacityBtn} ${
                  cap === product.capacity ? styles.activeCapacity : ''
                }`}
                onClick={() => handleCapacityChange(cap)}
              >
                {cap}
              </button>
            ))}
          </div>

          <div className={styles.divider} />

          {/* ЦЕНА */}
          <div className={styles.priceRow}>
            <span className={styles.price}>${currentPrice}</span>
            {regularPrice > currentPrice && (
              <span className={styles.fullPrice}>${regularPrice}</span>
            )}
          </div>

          {/* КНОПКИ ДЕЙСТВИЯ */}
          <div className={styles.actionBtns}>
            <button
              type="button"
              className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
              onClick={() =>
                inCart
                  ? removeFromCart(currentId)
                  : addToCart(normalizedProduct)
              }
            >
              {inCart ? 'Added' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={`${styles.favoriteBtn} ${favorite ? styles.isFavorite : ''}`}
              onClick={() =>
                favorite
                  ? removeFromFavorites(currentId)
                  : addToFavorites(normalizedProduct)
              }
            >
              <img
                src={`${getBaseUrl()}${
                  favorite
                    ? 'img/icons/favourites-filled.svg'
                    : 'img/icons/favourites.svg'
                }`}
                alt="Favorite"
              />
            </button>
          </div>

          {/* КРАТКИЕ ХАРАКТЕРИСТИКИ */}
          <div className={styles.smallSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {product.resolution || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {product.processor || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ОПИСАНИЕ И ХАРАКТЕРИСТИКИ */}
      <div className={styles.bottomSection}>
        <div className={styles.aboutText}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {product.description?.map(desc => (
            <div key={desc.title}>
              <h3>{desc.title}</h3>
              {desc.text.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )) || <p>No detailed description available.</p>}
        </div>

        <div>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <div className={styles.techSpecs}>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Screen</span>
              <span className={styles.specValue}>{product.screen}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Resolution</span>
              <span className={styles.specValue}>
                {product.resolution || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Processor</span>
              <span className={styles.specValue}>
                {product.processor || 'N/A'}
              </span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>RAM</span>
              <span className={styles.specValue}>{product.ram}</span>
            </div>
            <div className={styles.specRow}>
              <span className={styles.specLabel}>Built in memory</span>
              <span className={styles.specValue}>{product.capacity}</span>
            </div>
          </div>
        </div>
      </div>

      {/* КАРУСЕЛЬ YOU MAY ALSO LIKE */}
      <div className={styles.suggestedSection}>
        <h2 className={styles.sectionTitle}>You may also like</h2>
        <div className={styles.suggestedCarousel}>
          {suggestedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
