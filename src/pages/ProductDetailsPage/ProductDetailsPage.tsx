import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BackLink } from '../../components/BackLink';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { PageMessage } from '../../components/PageMessage';
import { DetailsSkeleton } from '../../components/DetailsSkeleton';
import { ProductsSlider } from '../../components/ProductsSlider';
import { useProductDetailsData, useTranslation } from '../../hooks';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type {
  ProductCategory,
  ProductDetailsFromServer,
} from '../../types/product';
import { getSuggestedProducts } from '../../utils';
import { isProductCategory } from '../../utils';
import { normalizeProductOption } from '../../utils';
import {
  ProductAbout,
  ProductGallery,
  ProductPurchasePanel,
  ProductTechSpecs,
} from './components';
import styles from './ProductDetailsPage.module.scss';

export const ProductDetailsPage = () => {
  const { category = '', itemId = '' } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const t = useTranslation();

  const cartItems = useAppSelector(state => state.cart.items);
  const favoriteItemIds = useAppSelector(state => state.favorites.itemIds);

  const [activeImage, setActiveImage] = useState('');
  const previousItemId = useRef(itemId);

  const isValidCategory = isProductCategory(category);
  const productCategory: ProductCategory | null = isValidCategory
    ? category
    : null;

  const {
    categoryProductsDetails,
    products,
    loadedCategory,
    isLoading,
    hasError,
  } = useProductDetailsData(productCategory);

  useEffect(() => {
    if (previousItemId.current === itemId) {
      return;
    }

    previousItemId.current = itemId;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [itemId]);

  const product = useMemo(() => {
    if (!isValidCategory || loadedCategory !== category) {
      return null;
    }

    return categoryProductsDetails.find(item => item.id === itemId) || null;
  }, [
    categoryProductsDetails,
    itemId,
    loadedCategory,
    category,
    isValidCategory,
  ]);

  const visibleImage = useMemo(() => {
    if (!product) {
      return '';
    }

    return product.images.includes(activeImage)
      ? activeImage
      : product.images[0];
  }, [product, activeImage]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  const currentProductFromList = useMemo(() => {
    return products.find(item => item.itemId === itemId);
  }, [products, itemId]);

  const categoryProducts = useMemo(() => {
    if (!isValidCategory) {
      return [];
    }

    return products.filter(item => item.category === category);
  }, [products, category, isValidCategory]);

  const latestProductYear = useMemo(() => {
    if (categoryProducts.length === 0) {
      return 0;
    }

    return Math.max(...categoryProducts.map(item => item.year));
  }, [categoryProducts]);

  const isBrandNewProduct = currentProductFromList?.year === latestProductYear;

  const suggestedProducts = useMemo(() => {
    return getSuggestedProducts(categoryProducts, itemId);
  }, [categoryProducts, itemId]);

  const isInCart = product
    ? cartItems.some(item => item.itemId === product.id)
    : false;

  const isFavorite = product ? favoriteItemIds.includes(product.id) : false;

  const getCategoryLabel = (value: ProductCategory) => {
    switch (value) {
      case 'phones':
        return t.header.phones;

      case 'tablets':
        return t.header.tablets;

      case 'accessories':
        return t.header.accessories;

      default:
        return value;
    }
  };

  const getProductVariant = ({
    color,
    capacity,
  }: {
    color: string;
    capacity: string;
  }): ProductDetailsFromServer | null => {
    if (!product) {
      return null;
    }

    const normalizedColor = normalizeProductOption(color);
    const normalizedCapacity = normalizeProductOption(capacity);

    return (
      categoryProductsDetails.find(item => {
        return (
          item.namespaceId === product.namespaceId &&
          normalizeProductOption(item.color) === normalizedColor &&
          normalizeProductOption(item.capacity) === normalizedCapacity
        );
      }) || null
    );
  };

  const handleColorChange = (color: string) => {
    if (!isValidCategory || !product) {
      return;
    }

    const isSameColor =
      normalizeProductOption(color) === normalizeProductOption(product.color);

    if (isSameColor) {
      return;
    }

    const nextProduct = getProductVariant({
      color,
      capacity: product.capacity,
    });

    if (nextProduct) {
      navigate(`/${category}/${nextProduct.id}`);
    }
  };

  const handleCapacityChange = (capacity: string) => {
    if (!isValidCategory || !product) {
      return;
    }

    const isSameCapacity =
      normalizeProductOption(capacity) ===
      normalizeProductOption(product.capacity);

    if (isSameCapacity) {
      return;
    }

    const nextProduct = getProductVariant({
      color: product.color,
      capacity,
    });

    if (nextProduct) {
      navigate(`/${category}/${nextProduct.id}`);
    }
  };

  const handleAddToCart = () => {
    if (!product || isInCart) {
      return;
    }

    dispatch(addToCart(product.id));
  };

  const handleToggleFavorite = () => {
    if (!product) {
      return;
    }

    dispatch(toggleFavorite(product.id));
  };

  if (!isValidCategory) {
    return (
      <div className={styles.page}>
        <PageMessage
          title={t.productDetails.productNotFound}
          text={t.productDetails.categoryDoesNotExist}
          image="img/product-not-found.png"
          actionText={t.common.goHome}
          actionTo="/"
        />
      </div>
    );
  }

  if (isLoading || loadedCategory !== category) {
    return (
      <div className={styles.page}>
        <DetailsSkeleton />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.page}>
        <PageMessage
          title={t.common.somethingWentWrong}
          text={t.productDetails.loadProductError}
          actionText={t.common.reload}
          onAction={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.page}>
        <PageMessage
          title={t.productDetails.productNotFound}
          text={t.productDetails.productDoesNotExist}
          image="img/product-not-found.png"
          actionText={t.productDetails.backToProducts}
          actionTo={`/${category}`}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          {
            label: getCategoryLabel(category),
            path: `/${category}`,
          },
          {
            label: product.name,
          },
        ]}
      />

      <BackLink to={`/${category}`} />

      <h1 className={styles.title}>{product.name}</h1>

      <section className={styles.top}>
        <ProductGallery
          product={product}
          visibleImage={visibleImage}
          onImageChange={setActiveImage}
        />

        <ProductPurchasePanel
          product={product}
          productId={currentProductFromList?.id}
          isBrandNew={isBrandNewProduct}
          isInCart={isInCart}
          isFavorite={isFavorite}
          onColorChange={handleColorChange}
          onCapacityChange={handleCapacityChange}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
      </section>

      <section className={styles.details}>
        <ProductAbout product={product} />

        <ProductTechSpecs product={product} />
      </section>

      {suggestedProducts.length > 0 && (
        <div className={styles.suggested}>
          <ProductsSlider
            title={t.productDetails.youMayAlsoLike}
            products={suggestedProducts}
          />
        </div>
      )}
    </div>
  );
};
