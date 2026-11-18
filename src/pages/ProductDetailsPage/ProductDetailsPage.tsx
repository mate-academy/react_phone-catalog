import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { ProductDetailsSkeleton } from '../../components/Skeletons';
import styles from './ProductDetailsPage.module.scss';
import { Product } from '../../types/Product';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { useTheme } from '../../context/ThemeContext';
import { getPublicUrl } from '../../utils/getPublicUrl';

const colorMap: Record<string, string> = {
  black: '#1F2020',
  blue: '#4A7DBB',
  coral: '#FF6F61',
  gold: '#F5DDC5',
  graphite: '#54524F',
  green: '#A5C9B7',
  midnight: '#1D2939',
  midnightgreen: '#4E5851',
  pink: '#F5C6D6',
  purple: '#B8A8D9',
  red: '#D82E2E',
  rosegold: '#E6C7B9',
  sierrablue: '#9BB5CE',
  silver: '#E3E4E5',
  skyblue: '#A7C7E7',
  spacegray: '#535150',
  spaceblack: '#333438',
  starlight: '#F5F1E6',
  white: '#F5F5F5',
  yellow: '#F9E17D',
};

const getColorHex = (color: string): string => {
  const normalizedColor = color.toLowerCase().replace(/[\s-]/g, '');

  return colorMap[normalizedColor] ?? '#E2E6E9';
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [allProducts, setAllProducts] = useState<ProductDetails[]>([]);
  const [numericId, setNumericId] = useState<number | null>(null);
  const [catalogProduct, setCatalogProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([
      fetch(getPublicUrl('/api/phones.json')).then(response => response.json()),
      fetch(getPublicUrl('/api/tablets.json')).then(response =>
        response.json(),
      ),
      fetch(getPublicUrl('/api/accessories.json')).then(response =>
        response.json(),
      ),
      fetch(getPublicUrl('/api/products.json')).then(response =>
        response.json(),
      ),
    ])
      .then(
        ([phones, tablets, accessories, catalogProducts]: [
          ProductDetails[],
          ProductDetails[],
          ProductDetails[],
          Product[],
        ]) => {
          const products = [...phones, ...tablets, ...accessories];

          setAllProducts(products);

          const recommendations = catalogProducts
            .filter(item => item.itemId !== productId)
            .map(item => ({ item, random: Math.random() }))
            .sort((a, b) => a.random - b.random)
            .slice(0, 10)
            .map(({ item }) => item);

          setSuggestedProducts(recommendations);

          const foundProduct = products.find(item => item.id === productId);
          const foundCatalogProduct = catalogProducts.find(
            item => item.itemId === productId,
          );

          setProduct(foundProduct || null);
          setNumericId(foundCatalogProduct?.id ?? null);
          setCatalogProduct(foundCatalogProduct || null);

          if (foundProduct) {
            setSelectedImage(foundProduct.images[0]);
          }
        },
      )
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <main className={`${styles.main} ${styles.notFound}`}>
        <img
          className={styles.notFoundImage}
          src={getPublicUrl(
            theme === 'dark'
              ? '/img/product-not-found-dark.png'
              : '/img/product-not-found.png',
          )}
          alt=""
        />

        <h1 className={styles.notFoundTitle}>Product was not found</h1>
      </main>
    );
  }

  const handleColorChange = (color: string) => {
    const newProduct = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === product.capacity &&
        item.color === color,
    );

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const newProduct = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.color === product.color &&
        item.capacity === capacity,
    );

    if (newProduct) {
      navigate(`/product/${newProduct.id}`);
    }
  };

  const isInCart = cartItems.some(
    item => item.product.id === catalogProduct?.id,
  );

  const isInFavorites = catalogProduct ? isFavorite(catalogProduct.id) : false;

  return (
    <main className={styles.main}>
      <Breadcrumbs
        currentPage={product.name}
        category={product.category[0].toUpperCase() + product.category.slice(1)}
        categoryLink={`/${product.category}`}
      />

      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate(-1)}
      >
        <img
          className={styles.backIcon}
          src={getPublicUrl('/img/icon/breadcrumb-chevron.svg')}
          alt=""
        />

        <span>Back</span>
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.productLayout}>
        <span className={styles.productId}>
          {numericId !== null && `ID: ${numericId}`}
        </span>

        <div className={styles.productContent}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map(image => (
                <button
                  key={image}
                  className={`${styles.thumbnailButton} ${
                    selectedImage === image ? styles.thumbnailActive : ''
                  }`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    className={styles.thumbnailImage}
                    src={getPublicUrl(image)}
                    alt={product.name}
                  />
                </button>
              ))}
            </div>

            <div className={styles.mainImageWrapper}>
              <img
                className={styles.mainImage}
                src={getPublicUrl(selectedImage)}
                alt={product.name}
              />
            </div>
          </div>

          <div className={styles.productInfo}>
            <div className={styles.colors}>
              <p className={styles.optionLabel}>Available colors</p>

              <div className={styles.colorList}>
                {[...product.colorsAvailable]
                  .sort((a, b) => a.localeCompare(b))
                  .map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleColorChange(color)}
                      className={`${styles.colorButton} ${
                        product.color === color ? styles.colorButtonActive : ''
                      }`}
                      aria-label={`Choose ${color} color`}
                    >
                      <span
                        className={styles.colorCircle}
                        style={{ backgroundColor: getColorHex(color) }}
                      />
                    </button>
                  ))}
              </div>
            </div>

            <div className={styles.capacities}>
              <p className={styles.optionLabel}>Select capacity</p>

              <div className={styles.capacityList}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    onClick={() => handleCapacityChange(capacity)}
                    className={`${styles.capacityButton} ${
                      product.capacity === capacity
                        ? styles.capacityButtonActive
                        : ''
                    }`}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.purchase}>
              <div className={styles.prices}>
                <span className={styles.priceDiscount}>
                  ${product.priceDiscount}
                </span>

                <span className={styles.priceRegular}>
                  ${product.priceRegular}
                </span>
              </div>

              <div className={styles.actions}>
                <button
                  className={`${styles.addToCart} ${
                    isInCart ? styles.addToCartActive : ''
                  }`}
                  type="button"
                  disabled={!catalogProduct}
                  onClick={() => {
                    if (catalogProduct) {
                      addToCart(catalogProduct);
                    }
                  }}
                >
                  {isInCart ? 'Added' : 'Add to cart'}
                </button>

                <button
                  className={`${styles.addToFavorites} ${
                    isInFavorites ? styles.addToFavoritesActive : ''
                  }`}
                  type="button"
                  disabled={!catalogProduct}
                  aria-label={
                    isInFavorites ? 'Remove from favorites' : 'Add to favorites'
                  }
                  aria-pressed={isInFavorites}
                  onClick={() => {
                    if (catalogProduct) {
                      toggleFavorite(catalogProduct);
                    }
                  }}
                >
                  <img
                    src={getPublicUrl(
                      isInFavorites
                        ? '/img/icon/heart-filled.svg'
                        : theme === 'dark'
                          ? '/img/icon/heart-dark.svg'
                          : '/img/icon/heart.svg',
                    )}
                    alt=""
                  />
                </button>
              </div>
            </div>

            <div className={styles.specs}>
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
      </div>

      <section className={styles.detailsSection}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>

          {product.description.map(section => (
            <div className={styles.descriptionBlock} key={section.title}>
              <h3 className={styles.descriptionTitle}>{section.title}</h3>

              {section.text.map((paragraph, index) => (
                <p className={styles.descriptionText} key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>

          <div className={styles.techSpecsList}>
            {[
              ['Screen', product.screen],
              ['Resolution', product.resolution],
              ['Processor', product.processor],
              ['RAM', product.ram],
              ['Built in memory', product.capacity],
              ['Camera', product.camera],
              ['Zoom', product.zoom],
              ['Cell', product.cell.join(', ')],
            ].map(([label, value]) => (
              <div className={styles.techSpecsRow} key={label}>
                <span className={styles.techSpecsLabel}>{label}</span>
                <span className={styles.techSpecsValue}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {suggestedProducts.length > 0 && (
        <div className={styles.suggestions}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </main>
  );
};
