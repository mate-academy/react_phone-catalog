import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Loader } from '../components/Loader/Loader';
import { useCart } from '../context/CartContext';
import { ImageGallery } from '../components/ImageGallery';
import { ProductsSlider } from '../components/ProductsSlider';
import { useFavorites } from '../context/FavoritesContext';
import styles from './ProductDetailsPage.module.scss';
import { getColorValue } from './colors';
import { getSuggestedProducts } from './getSuggestedProducts';
import chevronIcon from '../../img/icons/Chevron (Arrow Left).svg';
import { withBase } from '../../utils/withBase';

const CATEGORY_LABELS: Record<ProductDetails['category'], string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categoryItems, setCategoryItems] = useState<ProductDetails[]>([]);
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!productId) {
      setNotFound(true);
      setIsLoading(false);

      return;
    }

    setIsLoading(true);
    setHasError(false);
    setNotFound(false);
    setProduct(null);

    fetch(withBase('api/products.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        return response.json();
      })
      .then((products: Product[]) => {
        setAllProducts(products);

        const summary = products.find(item => item.itemId === productId);

        if (!summary) {
          setNotFound(true);
          setIsLoading(false);

          return;
        }

        return fetch(withBase(`api/${summary.category}.json`))
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to load product details');
            }

            return response.json();
          })
          .then((details: ProductDetails[]) => {
            setCategoryItems(details);

            const found = details.find(item => item.id === productId);

            if (!found) {
              setNotFound(true);
            } else {
              setProduct(found);
            }
          });
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const siblings = useMemo(() => {
    if (!product) {
      return [];
    }

    return categoryItems.filter(
      item => item.namespaceId === product.namespaceId,
    );
  }, [categoryItems, product]);

  const handleColorChange = (color: string) => {
    const match = siblings.find(
      item => item.color === color && item.capacity === product?.capacity,
    );

    if (match) {
      navigate(`/product/${match.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    const match = siblings.find(
      item => item.capacity === capacity && item.color === product?.color,
    );

    if (match) {
      navigate(`/product/${match.id}`);
    }
  };

  // случайные товары той же категории для "You may also like"
  const suggestedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return getSuggestedProducts(allProducts, product.id, product.category);
  }, [allProducts, product]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Loader />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.error}>
            <p>Something went wrong</p>
            <button type="button" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.notFound}>Product was not found</p>
        </div>
      </div>
    );
  }

  const categoryLabel = CATEGORY_LABELS[product.category];
  const summary = allProducts.find(item => item.itemId === product.id);
  const isInCart = summary ? items.some(item => item.id === summary.id) : false;
  const isLiked = summary ? isFavorite(summary.id) : false;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: categoryLabel, to: `/${product.category}` },
            { label: product.name },
          ]}
        />

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <img src={chevronIcon} alt="" className={styles.backIcon} />
          Back
        </button>

        <h1 className={styles.title}>{product.name}</h1>

        <div className={styles.top}>
          <ImageGallery images={product.images} alt={product.name} />

          <div className={styles.options}>
            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Available colors</span>
              <div className={styles.colors}>
                {product.colorsAvailable.map(color => (
                  <button
                    key={color}
                    type="button"
                    className={
                      color === product.color
                        ? `${styles.colorSwatch} ${styles.colorSwatchActive}`
                        : styles.colorSwatch
                    }
                    style={{ backgroundColor: getColorValue(color) }}
                    aria-label={color}
                    aria-pressed={color === product.color}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <span className={styles.optionLabel}>Select capacity</span>
              <div className={styles.capacities}>
                {product.capacityAvailable.map(capacity => (
                  <button
                    key={capacity}
                    type="button"
                    className={
                      capacity === product.capacity
                        ? `${styles.capacityBtn} ${styles.capacityBtnActive}`
                        : styles.capacityBtn
                    }
                    aria-pressed={capacity === product.capacity}
                    onClick={() => handleCapacityChange(capacity)}
                  >
                    {capacity}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.price}>
              <span className={styles.priceCurrent}>
                ${product.priceDiscount}
              </span>
              {product.priceRegular > product.priceDiscount && (
                <span className={styles.priceFull}>
                  ${product.priceRegular}
                </span>
              )}
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={
                  isInCart
                    ? `${styles.addToCart} ${styles.addToCartActive}`
                    : styles.addToCart
                }
                onClick={() => {
                  if (summary) {
                    addToCart(summary);
                  }
                }}
              >
                {isInCart ? 'Added to cart' : 'Add to cart'}
              </button>
              <button
                type="button"
                className={styles.favorite}
                aria-label={
                  isLiked ? 'Remove from favorites' : 'Add to favorites'
                }
                aria-pressed={isLiked}
                onClick={() => {
                  if (summary) {
                    toggleFavorite(summary);
                  }
                }}
              >
                <img
                  src={withBase(
                    isLiked
                      ? 'img/icons/HeartFilled.svg'
                      : 'img/icons/Stroke.svg',
                  )}
                  alt=""
                />
              </button>
            </div>

            <ul className={styles.shortSpecs}>
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
          <div className={styles.about}>
            <h2 className={styles.sectionTitle}>About</h2>

            {product.description.map(block => (
              <div key={block.title} className={styles.aboutBlock}>
                <h3 className={styles.aboutSubtitle}>{block.title}</h3>
                {block.text.map(paragraph => (
                  <p key={paragraph} className={styles.aboutText}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.techSpecs}>
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
              <li>
                <span>Capacity</span>
                <span>{product.capacity}</span>
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
              {product.cell && (
                <li>
                  <span>Cell</span>
                  <span>{product.cell.join(', ')}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {suggestedProducts.length > 0 && (
          <ProductsSlider
            title="You may also like"
            products={suggestedProducts}
          />
        )}
      </div>
    </div>
  );
};
