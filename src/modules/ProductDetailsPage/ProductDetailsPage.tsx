import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getDetailedProducts,
  getProductById,
  getSuggestedProducts,
} from '../../api/productsApi';
import { Product } from '../../api/types';
import { Breadcrumbs, BreadcrumbItem } from '../../shared/Breadcrumbs';
import { Loader } from '../../shared/Loader';
import { ProductImagePicker } from './components/ProductImagePicker';
import { ProductOptions } from './components/ProductOptions';
import { YouMayAlsoLike } from './components/YouMayAlsoLike';
import { useShop } from '../../context/ShopContext';
import {
  getProductPrice,
  formatMemory,
  formatPrice,
} from '../../shared/utils/format';
import styles from './ProductDetailsPage.module.scss';

const MEMORY_PRICE_MULTIPLIERS: Record<string, number> = {
  '64GB': 1,
  '128GB': 1.6,
  '256GB': 2.4,
  '512GB': 3.2,
  '1TB': 4,
  '2TB': 4.8,
};

const COLOR_PRICE_MULTIPLIERS: Record<string, number> = {
  black: 1,
  white: 1,
  red: 1,
  blue: 1,
  green: 1,
  yellow: 1,
  purple: 1,
  pink: 1,
  silver: 1.2,
  gold: 1.5,
  graphite: 1.3,
  midnight: 1.3,
  midnightgreen: 1.3,
  spacegray: 1.3,
  spaceblack: 1.3,
  sierrablue: 1.3,
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useShop();

  const [product, setProduct] = useState<Product | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const [color, setColor] = useState<string | undefined>();
  const [capacity, setCapacity] = useState<string | undefined>();
  const [imageIndex, setImageIndex] = useState(0);
  const [overrideImages, setOverrideImages] = useState<string[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setHasError(false);
    setProduct(undefined);
    setSuggestedProducts([]);

    getProductById(productId ?? '')
      .then(result => {
        if (cancelled) {
          return;
        }

        setProduct(result);
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setHasError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [productId]);

  useEffect(() => {
    if (!product) {
      return undefined;
    }

    let cancelled = false;

    setSuggestionsLoading(true);
    getSuggestedProducts(product)
      .then(items => {
        if (cancelled) {
          return;
        }

        setSuggestedProducts(items);
        setSuggestionsLoading(false);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }

        setSuggestionsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [product]);

  const selectedColor =
    color ?? product?.colorsAvailable?.[0] ?? product?.color;
  const selectedCapacity =
    capacity ?? product?.capacityAvailable?.[0] ?? product?.capacity;
  const selectedImage = overrideImages
    ? (overrideImages[imageIndex] ?? overrideImages[0])
    : (product?.images?.[imageIndex] ?? product?.images?.[0]);

  const handleColorChange = async (nextColor: string) => {
    setColor(nextColor);

    const normalized = nextColor.trim().toLowerCase().replace(/\s+/g, '');
    const images = product?.images ?? [];
    const matchIndex = images.findIndex(
      image =>
        image.split('/').at(3)?.trim().toLowerCase().replace(/\s+/g, '') ===
        normalized,
    );

    if (matchIndex !== -1) {
      setOverrideImages(null);
      setImageIndex(matchIndex);

      return;
    }

    if (!product) {
      return;
    }

    const allProducts = await getDetailedProducts();
    const found = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === selectedCapacity &&
        item.color?.trim().toLowerCase().replace(/\s+/g, '') === normalized,
    );

    if (found?.images?.length) {
      setOverrideImages(found.images);
      setImageIndex(0);
      navigate(`/product/${found.id}`);
    }
  };

  const handleCapacityChange = async (nextCapacity: string) => {
    setCapacity(nextCapacity);

    if (!product) {
      return;
    }

    const normalizedCapacity = nextCapacity.trim();
    const normalizedColor = (selectedColor ?? product.color ?? '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '');

    const allProducts = await getDetailedProducts();
    const found = allProducts.find(
      item =>
        item.namespaceId === product.namespaceId &&
        item.capacity === normalizedCapacity &&
        item.color?.trim().toLowerCase().replace(/\s+/g, '') ===
          normalizedColor,
    );

    if (found) {
      navigate(`/product/${found.id}`);
    }
  };

  const unitPrice = product ? getProductPrice(product) : 0;
  const fullPriceValue =
    product?.fullPrice ?? product?.priceRegular ?? product?.priceDiscount;
  const fullPriceRatio =
    unitPrice > 0 && fullPriceValue ? fullPriceValue / unitPrice : 1;
  const memoryMultiplier =
    MEMORY_PRICE_MULTIPLIERS[selectedCapacity ?? ''] ?? 1;
  const colorMultiplier =
    COLOR_PRICE_MULTIPLIERS[
      (selectedColor ?? '').trim().toLowerCase().replace(/\s+/g, '')
    ] ?? 1;
  const displayPrice = Math.round(
    unitPrice * memoryMultiplier * colorMultiplier,
  );
  const displayFullPrice = Math.round(displayPrice * fullPriceRatio);
  const isAdded = product ? isInCart(product.id) : false;

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Loader count={1} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <p>Something went wrong</p>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.state}>
          <h1>Product was not found</h1>
          <button
            type="button"
            className={styles.reloadButton}
            onClick={() => navigate('/')}
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = `${product.category.charAt(0).toUpperCase()}${product.category.slice(1)}`;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: categoryLabel, path: `/${product.category}` },
    { label: formatMemory(product.name) },
  ];

  return (
    <div className={styles.page}>
      <Breadcrumbs items={breadcrumbItems} />
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <i className="fas fa-arrow-left" /> Back
      </button>
      <div className={styles.details}>
        <ProductImagePicker
          images={overrideImages ?? product.images}
          selectedImage={selectedImage}
          onSelect={setImageIndex}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{formatMemory(product.name)}</h1>
          <div className={styles.prices}>
            {displayPrice > 0 && formatPrice(displayPrice) && (
              <span className={styles.price}>{formatPrice(displayPrice)}</span>
            )}
            {displayFullPrice > 0 && formatPrice(displayFullPrice) && (
              <s className={styles.fullPrice}>
                {formatPrice(displayFullPrice)}
              </s>
            )}
          </div>
          <div className={styles.addToCart}>
            <button
              type="button"
              className={
                isAdded
                  ? `${styles.addToCartButton} ${styles.added}`
                  : styles.addToCartButton
              }
              onClick={() => addToCart(product)}
            >
              {isAdded ? 'Added to cart' : 'Add to cart'}
            </button>
          </div>
          {product.screen && <p className={styles.meta}>{product.screen}</p>}
          <ProductOptions
            product={product}
            color={selectedColor}
            capacity={selectedCapacity}
            onColorChange={handleColorChange}
            onCapacityChange={handleCapacityChange}
          />
          {product.description && product.description.length > 0 && (
            <div className={styles.about}>
              {product.description.map(block => (
                <div key={block.title} className={styles.aboutBlock}>
                  <h2 className={styles.aboutTitle}>{block.title}</h2>
                  {block.text.map((text, index) => (
                    <p key={`${block.title}-${index}`}>{text}</p>
                  ))}
                </div>
              ))}
            </div>
          )}
          {product.screen && (
            <div className={styles.tech}>
              <h2 className={styles.techTitle}>Tech specs</h2>
              <dl>
                {product.screen && (
                  <div key="screen" className={styles.spec}>
                    <dt>Screen</dt>
                    <dd>{product.screen}</dd>
                  </div>
                )}
                {product.resolution && (
                  <div key="resolution" className={styles.spec}>
                    <dt>Resolution</dt>
                    <dd>{product.resolution}</dd>
                  </div>
                )}
                {product.processor && (
                  <div key="processor" className={styles.spec}>
                    <dt>Processor</dt>
                    <dd>{product.processor}</dd>
                  </div>
                )}
                {product.ram && (
                  <div key="ram" className={styles.spec}>
                    <dt>RAM</dt>
                    <dd>{product.ram}</dd>
                  </div>
                )}
                {product.camera && (
                  <div key="camera" className={styles.spec}>
                    <dt>Camera</dt>
                    <dd>{product.camera}</dd>
                  </div>
                )}
                {product.zoom && (
                  <div key="zoom" className={styles.spec}>
                    <dt>Zoom</dt>
                    <dd>{product.zoom}</dd>
                  </div>
                )}
                {product.cell && product.cell.length > 0 && (
                  <div key="cell" className={styles.spec}>
                    <dt>Cell</dt>
                    <dd>{product.cell.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
      <YouMayAlsoLike
        products={suggestedProducts}
        isLoading={suggestionsLoading}
      />
    </div>
  );
};
