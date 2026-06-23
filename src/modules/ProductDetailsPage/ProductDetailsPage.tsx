import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { EmptyState } from '../shared/components/EmptyState';
import { ErrorState } from '../shared/components/ErrorState';
import { Loader } from '../shared/components/Loader';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../shared/services/api';
import { ProductDetails, ProductSummary } from '../shared/types/catalog';
import {
  formatPrice,
  getCategoryLabel,
  getProductVariant,
} from '../shared/utils/catalog';
import { ProductGallery } from './components/ProductGallery';
import { TechSpecs } from './components/TechSpecs';
import { VariantSelector } from './components/VariantSelector';
import styles from './ProductDetailsPage.module.scss';

interface ProductState {
  product: ProductDetails;
  variants: ProductDetails[];
}

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [productState, setProductState] = useState<ProductState | null>(null);
  const [summary, setSummary] = useState<ProductSummary | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<ProductSummary[]>(
    [],
  );
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getProductDetails(productId), getProducts()])
      .then(async ([details, products]) => {
        if (!details) {
          setProductState(null);
          setSummary(null);
          setSuggestedProducts([]);
          setHasError(false);

          return;
        }

        setProductState(details);
        setSummary(
          products.find(item => item.itemId === details.product.id) ?? null,
        );
        setActiveImage(details.product.images[0]);
        setSuggestedProducts(
          await getSuggestedProducts(
            details.product.category,
            details.product.id,
          ),
        );
        setHasError(false);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (isLoading) {
    return (
      <section className={styles.page}>
        <Loader label="Loading product details..." />
      </section>
    );
  }

  if (hasError) {
    return (
      <section className={styles.page}>
        <ErrorState />
      </section>
    );
  }

  if (!productState) {
    return (
      <section className={styles.page}>
        <EmptyState
          title="Product was not found"
          action={
            <Link to="/" className={styles.homeLink}>
              Back to HomePage
            </Link>
          }
        />
      </section>
    );
  }

  const { product, variants } = productState;
  const inCart = summary ? isInCart(summary.itemId) : false;
  const favorite = summary ? isFavorite(summary.itemId) : false;

  const handleCapacityChange = (capacity: string) => {
    const variant = getProductVariant(variants, capacity, product.color);

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  const handleColorChange = (color: string) => {
    const variant = getProductVariant(variants, product.capacity, color);

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            {
              label: getCategoryLabel(product.category),
              to: `/${product.category}`,
            },
            { label: product.name },
          ]}
        />

        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-arrow-left-long" />
          Back
        </button>
      </div>

      <div className={styles.hero}>
        <ProductGallery
          images={product.images}
          activeImage={activeImage}
          onImageChange={setActiveImage}
        />

        <div className={styles.summary}>
          <h1 className={styles.title}>{product.name}</h1>

          <VariantSelector
            label="Available colors"
            name="color"
            options={product.colorsAvailable}
            selectedValue={product.color}
            type="color"
            onChange={handleColorChange}
          />

          <VariantSelector
            label="Select capacity"
            name="capacity"
            options={product.capacityAvailable}
            selectedValue={product.capacity}
            onChange={handleCapacityChange}
          />

          <div className={styles.prices}>
            <span className={styles.discount}>
              {formatPrice(product.priceDiscount)}
            </span>
            <span className={styles.regular}>
              {formatPrice(product.priceRegular)}
            </span>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cartButton}
              onClick={() => summary && addToCart(summary)}
              disabled={inCart || !summary}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>

            <button
              type="button"
              className={
                favorite ? styles.favoriteButtonActive : styles.favoriteButton
              }
              onClick={() => summary && toggleFavorite(summary.itemId)}
              aria-label={
                favorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <i
                className={
                  favorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                }
              />
            </button>
          </div>

          <TechSpecs product={product} />
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.description}>
            {product.description.map(block => (
              <article key={block.title} className={styles.descriptionBlock}>
                <h3 className={styles.descriptionTitle}>{block.title}</h3>
                {block.text.map(paragraph => (
                  <p key={paragraph} className={styles.paragraph}>
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.block}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <TechSpecs product={product} />
        </section>
      </div>

      <ProductsSlider title="You may also like" products={suggestedProducts} />
    </div>
  );
};
