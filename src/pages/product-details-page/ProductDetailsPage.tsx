import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Breadcrumb } from '../../components/Breadcrumb';
import { Loader } from '../../components/Loader';
import { ProductsSlider } from '../../components/ProductsSlider';
import { BackButton } from '../../components/BackButton';
import { ProductImageGallery } from '../../components/ProductImageGallery';
import { ProductColors } from '../../components/ProductColors';
import { ProductCapacity } from '../../components/ProductCapacity';
import { ProductActions } from '../../components/ProductActions';
import { ProductDescription } from '../../components/ProductDescription';
import { ProductSpecs } from '../../components/ProductSpecs';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoriteContext';
import { Item } from '../../types/Item';
import { Product } from '../../types/Product';
import { NotFound } from '../../components/NotFound';
import { getItemById, getProducts, getSuggestedProducts } from '../../utils/Api';
import NoProducts from './images/not-found-product.png';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [item, setItem] = useState<Item | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Store category even when product is not found (from referrer or URL pattern)
  const [category, setCategory] = useState<string | null>(null);

  const { addToCart, isInCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const inCart = product ? isInCart(product.id) : false;
  const inFavorites = product ? isFavorite(product.id) : false;

  // Helper to detect category from productId pattern
  const detectCategoryFromProductId = (id: string): string | null => {
    const lowerCaseId = id.toLowerCase();

    if (lowerCaseId.includes('iphone') || lowerCaseId.includes('galaxy') || lowerCaseId.includes('pixel')) {
      return 'phones';
    }

    if (lowerCaseId.includes('ipad') || lowerCaseId.includes('tab')) {
      return 'tablets';
    }

    if (lowerCaseId.includes('watch') || lowerCaseId.includes('band')) {
      return 'accessories';
    }

    return null;
  };

  // Try to get category from location state (passed when navigating from category page)
  useEffect(() => {
    const stateCategory = (location.state as { category?: string })?.category;

    if (stateCategory) {
      setCategory(stateCategory);
    }
  }, [location.state]);

  // Scroll to top when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // Load product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setNotFound(true);
        setIsLoading(false);

        return;
      }

      try {
        setIsLoading(true);
        setNotFound(false);

        const allProducts = await getProducts();
        const foundProduct = allProducts.find(p => p.itemId === productId);

        if (!foundProduct) {
          // Try to detect category from productId for breadcrumb
          const detectedCategory = detectCategoryFromProductId(productId);

          if (detectedCategory && !category) {
            setCategory(detectedCategory);
          }

          setNotFound(true);
          setIsLoading(false);

          return;
        }

        setProduct(foundProduct);
        setCategory(foundProduct.category);

        const detailedItem = await getItemById(productId, foundProduct.category);

        if (!detailedItem) {
          setNotFound(true);
          setIsLoading(false);

          return;
        }

        setItem(detailedItem);

        const suggested = await getSuggestedProducts(foundProduct.id, 12);

        setSuggestedProducts(suggested);

        setIsLoading(false);
      } catch (error) {
        setNotFound(true);
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, category]);

  // Handlers
  const handleAddToCart = () => {
    if (product && !inCart) {
      addToCart(product);
    }
  };

  const handleToggleFavorite = () => {
    if (product) {
      toggleFavorite(product.id);
    }
  };

  const handleColorChange = (color: string) => {
    if (!item) {
      return;
    }

    const newProductId = `${item.namespaceId}-${item.capacity.toLowerCase()}-${color.toLowerCase()}`;

    navigate(`/product/${newProductId}`);
  };

  const handleCapacityChange = (capacity: string) => {
    if (!item) {
      return;
    }

    const newProductId = `${item.namespaceId}-${capacity.toLowerCase()}-${item.color.toLowerCase()}`;

    navigate(`/product/${newProductId}`);
  };

  const getCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Handle go back for not found state
  const handleGoBack = () => {
    // Navigate back, or to category page if we know it, or home as fallback
    if (window.history.length > 2) {
      navigate(-1);
    } else if (category) {
      navigate(`/${category}`);
    } else {
      navigate('/');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !item || !product) {
    const breadcrumbNotFound = category ? [{ label: getCategoryName(category), path: `/${category}` }, { label: t('productNotFound') }] : [{ label: t('productNotFound') }];

    return (
      <div className={styles.page} data-category={category || undefined}>
        <div className={styles.container}>
          <div className={styles.notFoundState}>
            <div className={styles.notFoundState_container}>
              <Breadcrumb items={breadcrumbNotFound} />
              <NotFound variant="product-not-found" title={t('productNotFound')} message={t('productNotFoundMessage')} image={NoProducts} buttonText={t('backToCatalog')} onButtonClick={handleGoBack} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare breadcrumb items
  const breadcrumbItems = [{ label: getCategoryName(product.category), path: `/${product.category}` }, { label: product.name }];

  // Prepare short specs for ProductInfo
  const shortSpecs = [
    { label: t('screen'), value: item.screen },
    { label: t('resolution'), value: item.resolution },
    { label: t('processor'), value: item.processor },
    { label: t('ram'), value: item.ram },
  ];

  return (
    <div className={styles.page} data-category={product.category}>
      <div className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Back button */}
        <div className={styles.backButtonWrapper}>
          <BackButton />
        </div>

        {/* Page title */}
        <h1 className={styles.title}>{product.name}</h1>

        {/* Main content */}
        <div className={styles.mainContent}>
          {/* Images section */}
          <ProductImageGallery images={item.images} productName={product.name} />

          {/* Options section */}
          <div className={styles.optionsSection}>
            {/* Colors - Check if data exists */}
            {item.colorsAvailable && item.colorsAvailable.length > 0 && <ProductColors availableColors={item.colorsAvailable} selectedColor={item.color} onColorChange={handleColorChange} productId={item.id} />}

            {/* Capacity - Check if data exists */}
            {item.capacityAvailable && item.capacityAvailable.length > 0 && <ProductCapacity availableCapacities={item.capacityAvailable} selectedCapacity={item.capacity} onCapacityChange={handleCapacityChange} />}

            {/* Price section */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>${item.priceDiscount}</span>
              {item.priceRegular > item.priceDiscount && <span className={styles.fullPrice}>${item.priceRegular}</span>}
            </div>

            {/* Actions */}
            <ProductActions inCart={inCart} inFavorites={inFavorites} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} />

            {/* Short specs */}
            <div className={styles.shortSpecs}>
              {shortSpecs.map(spec => (
                <div key={spec.label} className={styles.specRow}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {productId && (
            <span className={styles.productId}>
              {t('id')}: {productId}
            </span>
          )}
        </div>

        {/* Details sections */}
        <div className={styles.detailsSections}>
          {/* About */}
          <ProductDescription description={item.description} />

          {/* Tech specs */}
          <ProductSpecs item={item} />
        </div>

        {/* Suggested products */}
        {suggestedProducts.length > 0 && (
          <div className={styles.suggestedSection}>
            <ProductsSlider titleKey="youMayAlsoLike" products={suggestedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};
