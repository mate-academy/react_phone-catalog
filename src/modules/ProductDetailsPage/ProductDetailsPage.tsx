import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductDetails } from '../../types/ProductDetails';
import {
  getProductDetails,
  getProductVariants,
  getSuggestedProducts,
  getProductById,
} from '../../api/products';
import { useFetch } from '../../hooks/useFetch';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Loader } from '../shared/components/Loader';
import { Icon } from '../shared/components/Icon';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { EmptyMessage } from '../shared/components/RequestStatus';
import { ColorSelector } from './components/ColorSelector';
import { CapacitySelector } from './components/CapacitySelector';
import { TechSpecs } from './components/TechSpecs';
import { ImageGallery } from './components/ImageGallery';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const {
    data: product,
    loading,
    error,
  } = useFetch<ProductDetails | null>(
    () => getProductDetails(productId as string),
    [productId],
  );

  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [summary, setSummary] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      getProductVariants(product.namespaceId, product.category).then(
        setVariants,
      );
      getProductById(product.id).then(productSummary => {
        setSummary(productSummary);

        if (productSummary) {
          getSuggestedProducts(productSummary).then(setSuggested);
        }
      });
    }
  }, [product]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // selecting a color/capacity on this dataset means navigating to the
  // sibling product that already has that combination
  const goToVariant = (nextColor: string, nextCapacity: string) => {
    const variant =
      variants.find(
        item => item.color === nextColor && item.capacity === nextCapacity,
      ) ??
      variants.find(item => item.color === nextColor) ??
      variants.find(item => item.capacity === nextCapacity);

    if (variant) {
      navigate(`/product/${variant.id}`);
    }
  };

  if (loading && !product) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (error || (!loading && !product)) {
    return (
      <div className="container">
        <EmptyMessage
          message="Product was not found"
          image="img/product-not-found.png"
        />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const inCart = isInCart(product.id);
  const favorite = isFavorite(product.id);
  const hasDiscount = product.priceRegular > product.priceDiscount;

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        category={product.category}
        categoryPath={`/${product.category}`}
        productName={product.name}
      />

      <button
        type="button"
        className={styles.page__back}
        onClick={() => navigate(`/${product.category}`)}
      >
        <Icon name="arrow-left" />
        Back
      </button>

      <h1 className={styles.page__title}>{product.name}</h1>

      <div className={styles.page__top}>
        <div className={styles.page__gallery}>
          <ImageGallery product={product} />
        </div>

        <div className={styles.page__buy}>
          <p className={styles.page__id}>{`ID: ${summary?.numericId ?? ''}`}</p>

          <ColorSelector
            colors={product.colorsAvailable}
            selected={product.color}
            onSelect={nextColor => goToVariant(nextColor, product.capacity)}
          />
          <CapacitySelector
            capacities={product.capacityAvailable}
            selected={product.capacity}
            onSelect={nextCapacity => goToVariant(product.color, nextCapacity)}
          />

          <div className={styles.page__prices}>
            <span className={styles.page__price}>${product.priceDiscount}</span>
            {hasDiscount && (
              <span className={styles.page__fullPrice}>
                ${product.priceRegular}
              </span>
            )}
          </div>

          <div className={styles.page__actions}>
            <button
              type="button"
              className={`${styles.page__addButton} ${
                inCart ? styles['page__addButton--active'] : ''
              }`}
              onClick={() => summary && addToCart(summary)}
            >
              {inCart ? 'Added' : 'Add to cart'}
            </button>

            <button
              type="button"
              aria-label="Add to favorites"
              className={`${styles.page__favButton} ${
                favorite ? styles['page__favButton--active'] : ''
              }`}
              onClick={() => summary && toggleFavorite(summary)}
            >
              <Icon name={favorite ? 'heart-filled' : 'heart'} />
            </button>
          </div>

          <div className={styles.page__miniSpecs}>
            <div>
              <dt>Screen</dt>
              <dd>{product.screen}</dd>
            </div>
            <div>
              <dt>Capacity</dt>
              <dd>{product.capacity}</dd>
            </div>
            <div>
              <dt>RAM</dt>
              <dd>{product.ram}</dd>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.page__info}>
        <section className={styles.page__about}>
          <h2 className={styles.page__sectionTitle}>About</h2>
          {product.description.map(section => (
            <div key={section.title} className={styles.page__aboutBlock}>
              <h3 className={styles.page__aboutSubtitle}>{section.title}</h3>
              {section.text.map(paragraph => (
                <p key={paragraph} className={styles.page__aboutText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>

        <section>
          <h2 className={styles.page__sectionTitle}>Tech specs</h2>
          <TechSpecs product={product} />
        </section>
      </div>

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
