import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import cn from 'classnames';
import { ProductDetails, Product, Category } from '../../types/Product';
import {
  getProductDetails,
  getSuggestedProducts,
} from '../../utils/fetchClient';
import { Loader } from '../shared/ui/Loader/Loader';
import { ProductCard } from '../shared/components/ProductCard';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { ChevronLeftIcon } from '../shared/ui/Icons/Icons';
import styles from './ProductDetailsPage.module.scss';
import { FavoriteButton } from '../shared/ui/FavoriteButton';

const IMG_BASE = import.meta.env.BASE_URL;
const COLOR_MAP: Record<string, string> = {
  black: '#2c2c2c',
  blue: '#2f6fed',
  coral: '#ff7f66',
  gold: '#e9cfa6',
  graphite: '#4b4b4b',
  green: '#5fa777',
  midnight: '#1b1b2a',
  midnightgreen: '#14342b',
  pink: '#f4c2c2',
  purple: '#7b5ea7',
  red: '#d0312d',
  rosegold: '#e8b4b8',
  'rose gold': '#e8b4b8',
  sierrablue: '#9bb8d3',
  silver: '#d9d9d9',
  skyblue: '#87ceeb',
  'sky blue': '#87ceeb',
  spacegray: '#5f5f5f',
  'space gray': '#5f5f5f',
  spaceblack: '#3b3a3c',
  starlight: '#ece6da',
  white: '#f5f5f5',
  yellow: '#f4d35e',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart, cartItems } = useCart();
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setLoading(true);
    setSelectedImageIndex(0);

    getProductDetails(productId)
      .then(prod => {
        setProduct(prod);
        setSelectedColor(prod.colorsAvailable[0]);
        setSelectedCapacity(prod.capacityAvailable[0]);

        return getSuggestedProducts(prod.category, productId);
      })
      .then(setSuggested)
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <img
          src={`${IMG_BASE}/img/product-not-found.png`}
          alt="Product was not found"
          className={styles.notFoundImage}
        />
        <p className={styles.notFoundText}>Product was not found</p>
      </div>
    );
  }

  const isFavorite = favorites.some(item => item.itemId === product.id);
  const category = product.category;
  const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
  const currentImage = product.images[selectedImageIndex];

  const productAsItem: Product = {
    id: 0,
    category: category as Category,
    itemId: product.id,
    name: product.name,
    fullPrice: product.priceRegular,
    price: product.priceDiscount,
    screen: product.screen,
    capacity: selectedCapacity,
    color: selectedColor,
    ram: product.ram,
    year: 0,
    image: currentImage,
  };

  const isInCart = cartItems.some(item => item.id === productAsItem.itemId);

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link to={`/${category}`} className={styles.breadcrumbLink}>
          {categoryTitle}
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <ChevronLeftIcon />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.overview}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {product.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                className={cn(styles.thumbnail, {
                  [styles.thumbnailActive]: idx === selectedImageIndex,
                })}
                onClick={() => setSelectedImageIndex(idx)}
                aria-label={`Ver imagem ${idx + 1}`}
              >
                <img
                  src={`${IMG_BASE}/${img}`}
                  alt={`${product.name} ${idx + 1}`}
                />
              </button>
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={`${IMG_BASE}/${currentImage}`}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>
              Available colors
              <span className={styles.optionValue}>{selectedColor}</span>
            </p>
            <div className={styles.colors}>
              {product.colorsAvailable.map(color => (
                <label key={color} className={styles.colorOption}>
                  <span className={styles.visuallyHidden}>{color}</span>
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={event => setSelectedColor(event.target.value)}
                    className={styles.colorInput}
                  />
                  <span
                    className={styles.colorSwatch}
                    style={{ backgroundColor: COLOR_MAP[color] || '#cccccc' }}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className={styles.optionGroup}>
            <p className={styles.optionLabel}>Select capacity</p>
            <div className={styles.capacities}>
              {product.capacityAvailable.map(cap => (
                <label
                  key={cap}
                  className={cn(styles.capacityOption, {
                    [styles.capacityOptionActive]: selectedCapacity === cap,
                  })}
                >
                  <input
                    type="radio"
                    name="capacity"
                    value={cap}
                    checked={selectedCapacity === cap}
                    onChange={event => setSelectedCapacity(event.target.value)}
                    className={styles.capacityInput}
                  />
                  {cap}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={cn(styles.addButton, {
                [styles.addButtonActive]: isInCart,
              })}
              onClick={() => addToCart(productAsItem)}
              disabled={isInCart}
            >
              {isInCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <FavoriteButton
              isFavorite={isFavorite}
              onToggle={() => toggleFavorite(productAsItem)}
            />
          </div>

          <ul className={styles.quickSpecs}>
            <li>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{product.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.details}>
        <section className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          {product.description.map(desc => (
            <div key={desc.title} className={styles.aboutBlock}>
              <h3 className={styles.aboutTitle}>{desc.title}</h3>
              {desc.text.map(paragraph => (
                <p key={paragraph} className={styles.aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <ul className={styles.specsList}>
            <li>
              <span>Screen</span>
              <span>{product.screen}</span>
            </li>
            <li>
              <span>Resolution</span>
              <span>{product.resolution}</span>
            </li>
            <li>
              <span>Processor</span>
              <span>{product.processor}</span>
            </li>
            <li>
              <span>RAM</span>
              <span>{product.ram}</span>
            </li>
            {product.camera && (
              <li>
                <span>Camera</span>
                <span>{product.camera}</span>
              </li>
            )}
            {product.zoom && (
              <li>
                <span>Zoom</span>
                <span>{product.zoom}</span>
              </li>
            )}
            <li>
              <span>Cell</span>
              <span>{product.cell.join(', ')}</span>
            </li>
          </ul>
        </section>
      </div>

      {suggested.length > 0 && (
        <section className={styles.suggested}>
          <h2 className={styles.sectionTitle}>You may also like</h2>
          <div className={styles.suggestedGrid}>
            {suggested.map(prod => (
              <ProductCard key={prod.itemId} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
