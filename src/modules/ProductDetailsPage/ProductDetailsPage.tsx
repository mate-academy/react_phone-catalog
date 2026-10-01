import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getProductDetails,
  getProductVariants,
  getSuggestedProducts,
} from '../../api/productsDetails';
import { ProductDetails } from '../../types/ProductDetails';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader';
import { StatusMessage } from '../../components/StatusMessage';
import { Icon } from '../../components/Icon/Icon';
import { ImageGallery } from './components/ImageGallery';
import { ProductVariantPicker } from './components/ProductVariantPicker';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';
import styles from './ProductDetailsPage.module.scss';
import { getProducts } from '../../api/products';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const categoryTitles: Record<string, string> = {
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [shortProduct, setShortProduct] = useState<Product | null>(null);
  const [variants, setVariants] = useState<ProductDetails[]>([]);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { addToCart, removeFromCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setNotFound(false);

    getProductDetails(productId)
      .then(async data => {
        if (!data) {
          setNotFound(true);

          return;
        }

        setProduct(data);

        const [variantsData, suggestedData, allProducts] = await Promise.all([
          getProductVariants(data.category, data.namespaceId),
          getSuggestedProducts(data.category, data.id),
          getProducts(),
        ]);

        setVariants(variantsData);
        setSuggested(suggestedData);

        const matchedShortProduct = allProducts.find(p => p.itemId === data.id);

        setShortProduct(matchedShortProduct || null);
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const inCart = shortProduct ? isInCart(shortProduct.itemId) : false;
  const favorite = shortProduct ? isFavorite(shortProduct.itemId) : false;

  const handleAddToCart = () => {
    if (!shortProduct) {
      return;
    }

    if (inCart) {
      removeFromCart(shortProduct.itemId);
    } else {
      addToCart(shortProduct);
    }
  };

  const handleToggleFavorite = () => {
    if (shortProduct) {
      toggleFavorite(shortProduct);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <Loader />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="container">
        <StatusMessage message="Product was not found" />
      </div>
    );
  }

  return (
    <div className="container">
      <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
        <Link to="/" className={styles.breadcrumbHome}>
          <Icon name="home" />
        </Link>
        <Icon name="chevronRight" className={styles.breadcrumbSeparator} />
        <Link to={`/${product.category}`} className={styles.breadcrumbLink}>
          {categoryTitles[product.category]}
        </Link>
        <Icon name="chevronRight" className={styles.breadcrumbSeparator} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        <Icon name="chevronLeft" />
        Back
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.topSection}>
        <ImageGallery images={product.images} name={product.name} />

        <div className={styles.info}>
          <ProductVariantPicker product={product} variants={variants} />

          <div className={styles.priceRow}>
            <span className={styles.price}>${product.priceDiscount}</span>
            {product.priceRegular > product.priceDiscount && (
              <span className={styles.fullPrice}>${product.priceRegular}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.addToCartButton} ${inCart ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {inCart ? 'Added to cart' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ''}`}
              onClick={handleToggleFavorite}
              aria-label="Add to favorites"
            >
              <Icon name={favorite ? 'heartFilled' : 'heart'} />
            </button>
          </div>

          <dl className={styles.shortSpecs}>
            <div className={styles.shortSpecsRow}>
              <dt>Screen</dt>
              <dd>{product.screen}</dd>
            </div>
            <div className={styles.shortSpecsRow}>
              <dt>Resolution</dt>
              <dd>{product.resolution}</dd>
            </div>
            <div className={styles.shortSpecsRow}>
              <dt>Processor</dt>
              <dd>{product.processor}</dd>
            </div>
            <div className={styles.shortSpecsRow}>
              <dt>RAM</dt>
              <dd>{product.ram}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.about}>
          <h2 className={styles.sectionTitle}>About</h2>
          <div className={styles.divider} />
          {product.description.map(block => (
            <div key={block.title} className={styles.descriptionBlock}>
              <h3 className={styles.descriptionTitle}>{block.title}</h3>
              {block.text.map(paragraph => (
                <p key={paragraph} className={styles.descriptionText}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.techSpecs}>
          <h2 className={styles.sectionTitle}>Tech specs</h2>
          <div className={styles.divider} />
          <dl className={styles.specsList}>
            <div className={styles.specsRow}>
              <dt>Screen</dt>
              <dd>{product.screen}</dd>
            </div>
            <div className={styles.specsRow}>
              <dt>Resolution</dt>
              <dd>{product.resolution}</dd>
            </div>
            <div className={styles.specsRow}>
              <dt>Processor</dt>
              <dd>{product.processor}</dd>
            </div>
            <div className={styles.specsRow}>
              <dt>RAM</dt>
              <dd>{product.ram}</dd>
            </div>
            {product.camera && (
              <div className={styles.specsRow}>
                <dt>Camera</dt>
                <dd>{product.camera}</dd>
              </div>
            )}
            {product.zoom && (
              <div className={styles.specsRow}>
                <dt>Zoom</dt>
                <dd>{product.zoom}</dd>
              </div>
            )}
            <div className={styles.specsRow}>
              <dt>Cell</dt>
              <dd>{product.cell.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </div>

      <ProductsSlider title="You may also like" products={suggested} />
    </div>
  );
};
