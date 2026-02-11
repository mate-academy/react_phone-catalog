import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '../../components/Container';
import { Breadcrumbs } from '../shared/components/Breadcrumbs';
import { Button } from '../shared/components/Button';
import { EmptyState } from '../shared/components/EmptyState';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import {
  getProductDetails,
  getProducts,
  getSuggestedProducts,
} from '../shared/api/products';
import { useCart } from '../shared/context/CartContext';
import { useFavorites } from '../shared/context/FavoritesContext';
import { useNotification } from '../shared/context/NotificationContext';
import { Product, ProductDetails } from '../shared/types';
import { OptionsGroup } from './components/OptionsGroup';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';
import { SpecsTable } from './components/SpecsTable';
import styles from './ProductDetailsPage.module.scss';

const buildSpecs = (details: ProductDetails) => [
  { label: 'Screen', value: details.screen },
  { label: 'Resolution', value: details.resolution },
  { label: 'Processor', value: details.processor },
  { label: 'RAM', value: details.ram },
  { label: 'Camera', value: details.camera },
  { label: 'Zoom', value: details.zoom },
  { label: 'Cell', value: details.cell.join(', ') },
];

export const ProductDetailsPage = () => {
  const { productId = '' } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { notify } = useNotification();
  const [details, setDetails] = useState<ProductDetails | null>(null);
  const [product, setProduct] = useState<Product | undefined>();
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const [detailsResponse, productsResponse, suggestedProducts] =
        await Promise.all([
          getProductDetails(productId),
          getProducts(),
          getSuggestedProducts(8),
        ]);

      setDetails(detailsResponse);
      setProduct(
        productsResponse.find(item => item.itemId === detailsResponse.id),
      );
      setSuggested(
        suggestedProducts.filter(item => item.itemId !== detailsResponse.id),
      );
      setSelectedImage(0);
      setSelectedColor(detailsResponse.color);
      setSelectedCapacity(detailsResponse.capacity);
    } catch (e) {
      setError(true);
      setDetails(null);
      setProduct(undefined);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBack = () => navigate(-1);

  const variantId = useMemo(() => {
    if (!details) {
      return productId;
    }

    const normalizedCapacity = selectedCapacity.toLowerCase();

    return `${details.namespaceId}-${normalizedCapacity}-${selectedColor}`;
  }, [details, selectedCapacity, selectedColor, productId]);

  useEffect(() => {
    if (!details) {
      return;
    }

    if (variantId !== productId) {
      navigate(`/product/${variantId}`);
    }
  }, [variantId, productId, navigate, details]);

  const breadcrumbCategory = product?.category || 'products';
  const breadcrumbs = [
    { label: 'Home', to: '/' },
    {
      label:
        breadcrumbCategory.charAt(0).toUpperCase() +
        breadcrumbCategory.slice(1),
      to: breadcrumbCategory === 'products' ? '/' : `/${breadcrumbCategory}`,
    },
    { label: details?.name || 'Product' },
  ];

  const specs = details ? buildSpecs(details) : [];

  const inCart = product ? isInCart(product.itemId) : false;
  const favorite = product ? isFavorite(product.itemId) : false;

  const handleAddToCart = () => {
    if (!product) {
      notify('Failed to add to cart', 'error');

      return;
    }

    if (inCart) {
      notify('Already in cart', 'error');

      return;
    }

    addToCart(product);
    notify('Added to cart', 'success');
  };

  const handleToggleFavorite = () => {
    if (!product) {
      notify('Failed to update favorites', 'error');

      return;
    }

    toggleFavorite(product.itemId);
    notify(
      favorite ? 'Removed from favorites' : 'Added to favorites',
      favorite ? 'error' : 'success',
    );
  };

  return (
    <Container className={styles.page}>
      <Breadcrumbs items={breadcrumbs} />

      <button type="button" className={styles.back} onClick={handleBack}>
        ← Back
      </button>

      {loading && <ProductDetailsSkeleton />}

      {error && (
        <EmptyState
          title="Product was not found"
          description="Try going back to the catalog."
          action={
            <Button variant="primary" onClick={() => navigate('/')}>
              Home
            </Button>
          }
        />
      )}

      {!loading && !error && details && (
        <>
          <div className={styles.header}>
            <h1 className={styles.title}>{details.name}</h1>
          </div>

          <div className={styles.layout}>
            <ProductGallery
              images={details.images}
              selectedIndex={selectedImage}
              onSelect={setSelectedImage}
            />

            <div className={styles.info}>
              <div className={styles.infoSection}>
                <OptionsGroup
                  label="Available colors"
                  options={details.colorsAvailable}
                  value={selectedColor}
                  onChange={setSelectedColor}
                  variant="color"
                />
              </div>

              <div className={styles.infoSection}>
                <OptionsGroup
                  label="Select capacity"
                  options={details.capacityAvailable}
                  value={selectedCapacity}
                  onChange={setSelectedCapacity}
                />
              </div>

              <div className={styles.infoSection}>
                <div className={styles.prices}>
                  <span className={styles.price}>
                    ${details.priceDiscount.toLocaleString()}
                  </span>
                  <span className={styles.full}>
                    ${details.priceRegular.toLocaleString()}
                  </span>
                </div>

                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.cartButton}
                    disabled={!product || inCart}
                    onClick={handleAddToCart}
                  >
                    {inCart ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    type="button"
                    className={styles.favButton}
                    onClick={handleToggleFavorite}
                    data-active={favorite}
                    aria-label="Toggle favorite"
                  >
                    <i className="fa-regular fa-heart" aria-hidden />
                  </button>
                </div>
              </div>

              <SpecsTable specs={specs.slice(0, 3)} />
            </div>
          </div>

          <div className={styles.details}>
            <div className={styles.about}>
              <h3>About</h3>
              {details.description.map(block => (
                <div key={block.title} className={styles.block}>
                  <h4>{block.title}</h4>
                  {block.text.map(paragraph => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ))}
            </div>

            <div className={styles.specs}>
              <h3>Tech specs</h3>
              <SpecsTable specs={specs} />
            </div>
          </div>

          {suggested.length > 0 && (
            <ProductsSlider title="You may also like" products={suggested} />
          )}
        </>
      )}
    </Container>
  );
};
