import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { getProductDetails, getSuggestedProducts } from '../../api/product';
import { useCart } from '../../context/CartContext/CartContext';
import { useFavorites } from '../../context/FavoritesContext/FavoritesContext';
import { colorMap } from '../../utils/colorMap';
import { ProductCard } from '../../components/ProductCard';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setError(null);

    Promise.all([getProductDetails(productId), getSuggestedProducts()])
      .then(([details, suggestedData]) => {
        setProduct(details);
        setSelectedImage(details.images[0]);
        setSuggested(suggestedData);
      })
      .catch(() => setError('Product was not found'))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  if (error || !product) {
    return <div className={styles.error}>{error || 'Product not found'}</div>;
  }

  const getVariantUrl = (newColor: string, newCapacity: string) => {
    const formattedColor = newColor.toLowerCase().replace(/\s+/g, '-');
    const formattedCapacity = newCapacity.toLowerCase();

    return `/product/${product.namespaceId}-${formattedCapacity}-${formattedColor}`;
  };

  const baseProduct: Product = {
    id: Number(product.id),
    category: product.category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: product.capacity,
    color: product.color,
    ram: product.ram,
    year: 2022,
    image: product.images[0],
  };

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);

  return (
    <main className={`container ${styles.pageWrapper}`}>
      {/* Хлібні крихти з іконкою хатки */}
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumbLink}>
          <img src="./img/icons/home.svg" alt="Home" />
        </Link>
        <span className={styles.crumbSeparator}>&gt;</span>
        <Link to={`/${product.category}`} className={styles.crumbLink}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span className={styles.crumbSeparator}>&gt;</span>
        <span className={styles.crumbCurrent}>{product.name}</span>
      </div>

      {/* Кнопка повернення */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className={styles.backBtn}
      >
        &lt; Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      {/* Основний блок товару: 14 колонок Галерея / 10 колонок Панель */}
      <div className="mainGrid">
        <div className="colGallery">
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map(img => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`${styles.thumbBtn} ${selectedImage === img ? styles.activeThumb : ''}`}
                >
                  <img
                    src={`/${img}`}
                    alt={product.name}
                    className={styles.thumbImage}
                  />
                </button>
              ))}
            </div>
            <div className={styles.mainImageWrapper}>
              <img
                src={`/${selectedImage}`}
                alt={product.name}
                className={styles.mainImage}
              />
            </div>
          </div>
        </div>

        <div className="colDetailsPanel">
          <div className={styles.detailsPanel}>
            {/* Вибір кольору */}
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Available colors</span>
              </div>
              <div className={styles.colorsList}>
                {product.colorsAvailable.map(color => {
                  const targetUrl = getVariantUrl(color, product.capacity);
                  const isCurrent = color === product.color;
                  const hexColor = colorMap[color] || '#cccccc';

                  return (
                    <Link
                      key={color}
                      to={targetUrl}
                      className={`${styles.colorCircle} ${isCurrent ? styles.activeColor : ''}`}
                      style={{ backgroundColor: hexColor }}
                      title={color}
                    />
                  );
                })}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Вибір пам'яті */}
            <div className={styles.optionGroup}>
              <div className={styles.optionHeader}>
                <span className={styles.optionLabel}>Select capacity</span>
              </div>
              <div className={styles.capacityList}>
                {product.capacityAvailable.map(cap => {
                  const targetUrl = getVariantUrl(product.color, cap);
                  const isCurrent = cap === product.capacity;

                  return (
                    <Link
                      key={cap}
                      to={targetUrl}
                      className={`${styles.capacityBtn} ${isCurrent ? styles.activeCapacity : ''}`}
                    >
                      {cap}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className={styles.divider} />

            {/* Ціни та кнопки дій */}
            <div className={styles.priceSection}>
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
                  type="button"
                  onClick={() => !inCart && addToCart(baseProduct)}
                  className={`${styles.cartBtn} ${inCart ? styles.inCart : ''}`}
                >
                  {inCart ? 'Added to cart' : 'Add to cart'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(baseProduct)}
                  className={`${styles.favoriteBtn} ${favorite ? styles.activeFav : ''}`}
                  aria-label={
                    favorite ? 'Remove from favorites' : 'Add to favorites'
                  }
                >
                  <img
                    src={
                      favorite
                        ? './img/icons/heart-filled.svg'
                        : './img/icons/heart.svg'
                    }
                    alt="Favorite"
                  />
                </button>
              </div>
            </div>

            {/* Короткі характеристики */}
            <div className={styles.shortSpecs}>
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

      {/* Опис і повні характеристики у сітці */}
      <div className="mainGrid" style={{ marginTop: '56px' }}>
        {/* About (14 колонок на Desktop) */}
        <div className="colGallery">
          <div className={styles.aboutBlock}>
            <h2 className={styles.sectionTitle}>About</h2>
            <div className={styles.divider} />
            {product.description.map(item => (
              <div key={item.title} className={styles.descParagraph}>
                <h3 className={styles.descTitle}>{item.title}</h3>
                {item.text.map((textLine, i) => (
                  <p key={i} className={styles.descText}>
                    {textLine}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Specs (10 колонок на Desktop) */}
        <div className="colDetailsPanel">
          <div className={styles.specsBlock}>
            <h2 className={styles.sectionTitle}>Tech specs</h2>
            <div className={styles.divider} />
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
                <span>Built in memory</span>
                <span>{product.capacity}</span>
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
          </div>
        </div>
      </div>

      {/* Слайдер рекомендованих товарів */}
      {suggested.length > 0 && (
        <section className={styles.suggestedSection}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
          <div className="mainGrid">
            {suggested.map(item => (
              <div key={item.id} className="colProductCard">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
