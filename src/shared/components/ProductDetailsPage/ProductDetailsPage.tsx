import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductDetailsPage.module.scss';
import { getProductById, getProducts } from '../../api/products';
import { Loader } from '../Loader';
import { Breadcrumbs } from '../Breadcrumbs';
import { BackButton } from '../BackButton';
import { ProductsSlider } from '../ProductsSlider';
import { useCart, useFavorites } from '../../context';

const heartIcon = 'img/icons/Favourites.svg';
const heartFilledIcon = 'img/icons/Favourites Filled.svg';

export interface ProductDetail {
  id: string;
  category: string;
  namespaceId: string;
  name: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: { title: string; text: string[] }[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}

const getImageUrl = (path: string): string => {
  if (!path) {
    return '';
  }

  if (path.startsWith('http') || path.startsWith('data:')) {
    return path;
  }

  return path.replace(/^\//, '');
};

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [category, setCategory] = useState<string>('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite: checkFavorite } = useFavorites();

  const productItem: Product | null = useMemo(() => {
    if (!product) {
      return null;
    }

    return {
      id: Number(product.id) || Date.now(),
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
      image: product.images?.[0] || '',
    };
  }, [product]);

  const isAdded = productItem ? isInCart(productItem.itemId) : false;
  const isFavorite = productItem ? checkFavorite(productItem.itemId) : false;

  const handleAddToCart = () => {
    if (productItem && !isAdded) {
      addToCart(productItem);
    }
  };

  const handleToggleFavorite = () => {
    if (productItem) {
      toggleFavorite(productItem);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line curly
    if (!productId) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      setHasError(false);

      try {
        const allProducts = await getProducts();
        const baseProduct = allProducts.find(p => p.itemId === productId);

        let detectedCategory = baseProduct?.category || '';

        if (!detectedCategory) {
          if (productId.includes('ipad')) {
            detectedCategory = 'tablets';
          } else if (
            productId.includes('watch') ||
            productId.includes('accessories')
          ) {
            detectedCategory = 'accessories';
          } else {
            detectedCategory = 'phones';
          }
        }

        setCategory(detectedCategory);

        let details = (await getProductById(
          detectedCategory,
          productId,
        )) as ProductDetail | null;

        if (!details) {
          const allCategories = ['phones', 'tablets', 'accessories'];

          for (const cat of allCategories) {
            if (cat !== detectedCategory) {
              try {
                const found = (await getProductById(
                  cat,
                  productId,
                )) as ProductDetail | null;

                if (found) {
                  details = found;
                  detectedCategory = cat;
                  break;
                }
              } catch {}
            }
          }
        }

        if (details) {
          setProduct(details);
          setCategory(details.category || detectedCategory);
          setSelectedImage(getImageUrl(details.images?.[0] || ''));

          const randomProducts = [...allProducts]
            .filter(p => p.itemId !== productId)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8);

          setSuggestedProducts(randomProducts);
        } else {
          setProduct(null);
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (hasError || !product) {
    return (
      <div className={styles.container}>
        <Breadcrumbs category={category} />
        <BackButton />
        <div className={styles.notFound}>
          <h2>Product was not found</h2>
        </div>
      </div>
    );
  }

  const handleOptionChange = (newColor: string, newCapacity: string) => {
    const newId = `${product.namespaceId}-${newCapacity.toLowerCase()}-${newColor.toLowerCase().replace(' ', '-')}`;

    navigate(`/product/${newId}`);
  };

  return (
    <div className={styles.container}>
      <Breadcrumbs
        productName={product.name}
        category={product.category || category}
      />
      <BackButton />

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.mainContent}>
        {/* Галерея зображень */}
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {(product.images || []).map((img, index) => (
              <button
                key={index}
                type="button"
                className={`${styles.thumbBtn} ${selectedImage === getImageUrl(img) ? styles.activeThumb : ''}`}
                onClick={() => setSelectedImage(getImageUrl(img))}
              >
                <img
                  src={getImageUrl(img)}
                  alt={`${product.name} preview ${index}`}
                />
              </button>
            ))}
          </div>

          <div className={styles.mainImageWrapper}>
            <img
              src={selectedImage}
              alt={product.name}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.label}>Available colors</span>
              <span className={styles.idText}>ID: 802390</span>
            </div>
            <div className={styles.colorPicker}>
              {(product.colorsAvailable || []).map(color => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorCircle} ${color === product.color ? styles.activeColor : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleOptionChange(color, product.capacity)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.section}>
            <span className={styles.label}>Select capacity</span>
            <div className={styles.capacityPicker}>
              {(product.capacityAvailable || []).map(cap => (
                <button
                  key={cap}
                  type="button"
                  className={`${styles.capacityBtn} ${cap === product.capacity ? styles.activeCapacity : ''}`}
                  onClick={() => handleOptionChange(product.color, cap)}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.priceRow}>
            <span className={styles.priceDiscount}>
              ${product.priceDiscount}
            </span>
            <span className={styles.priceRegular}>${product.priceRegular}</span>
          </div>

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={`${styles.addToCartBtn} ${isAdded ? styles.added : ''}`}
              onClick={handleAddToCart}
              disabled={isAdded}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
              onClick={handleToggleFavorite}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <img
                src={isFavorite ? heartFilledIcon : heartIcon}
                alt="Favorite"
                className={styles.heartIcon}
              />
            </button>
          </div>

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

      <div className={styles.detailsBlock}>
        <div className={styles.aboutSection}>
          <h2 className={styles.blockTitle}>About</h2>
          <div className={styles.divider} />
          {(product.description || []).map((item, idx) => (
            <div key={idx} className={styles.descParagraph}>
              <h3>{item.title}</h3>
              {(item.text || []).map((text, tIdx) => (
                <p key={tIdx}>{text}</p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecsSection}>
          <h2 className={styles.blockTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <div className={styles.fullSpecs}>
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
            <div className={styles.specRow}>
              <span>Built in memory</span>
              <span>{product.capacity}</span>
            </div>
            <div className={styles.specRow}>
              <span>Camera</span>
              <span>{product.camera}</span>
            </div>
            <div className={styles.specRow}>
              <span>Zoom</span>
              <span>{product.zoom}</span>
            </div>
            <div className={styles.specRow}>
              <span>Cell</span>
              <span>{(product.cell || []).join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      {suggestedProducts.length > 0 && (
        <div className={styles.suggestedSection}>
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        </div>
      )}
    </div>
  );
};
