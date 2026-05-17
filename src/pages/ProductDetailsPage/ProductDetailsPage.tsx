import './ProductDetailsPage.scss';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { ProductPage } from '@components/product/ProductPage/ProductPage';
import { BackButton } from '@components/ui/Buttons/Back/BackButton';
import { Breadcrumbs } from '@components/ui/Breadcrumbs/Breadcrumbs';
import { Loader } from '@components/ui/Loader/Loader';
import { RatingsWidget } from '@components/product/Reviews/RatingsWidget';

import { ProductDetails } from '@/types/Product';
import { getProductDetails } from '@api/products';

export const ProductDetailsPage = () => {
  const { t } = useTranslation();
  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showReviews, setShowReviews] = useState(false);
  const [scrollBeforeReviews, setScrollBeforeReviews] = useState<number | null>(
    null,
  );
  const headerRef = useRef<HTMLDivElement | null>(null);

  const currentColorRef = useRef<string | null>(null);

  const fetchProductData = useCallback(
    (idToFetch: string, isBackgroundUpdate = false) => {
      if (!category) return;
      if (!isBackgroundUpdate) setLoading(true);
      setError(false);

      getProductDetails(category, idToFetch)
        .then((data) => {
          setProduct(data);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [category],
  );

  useEffect(() => {
    if (product) {
      currentColorRef.current = product.color
        .toLowerCase()
        .replace(/\s+/g, '-');
    }
  }, [product]);

  useEffect(() => {
    if (!productId) return;

    let isBackgroundUpdate = false;

    if (
      currentColorRef.current &&
      productId.includes(currentColorRef.current)
    ) {
      isBackgroundUpdate = true;
    }

    const timeoutId = setTimeout(() => {
      fetchProductData(productId, isBackgroundUpdate);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [productId, fetchProductData]);

  const handleCapacityUpdate = (newItemId: string) => {
    if (!category) return;
    const newParams = new URLSearchParams(location.search);
    const capacityMatch = newItemId.match(/-(\d+(?:gb|tb))(?:-|$)/i);
    if (capacityMatch) {
      newParams.set('capacity', capacityMatch[1].toUpperCase());
    }

    navigate(
      {
        pathname: `/${category}/${newItemId}`,
        search: newParams.toString(),
      },
      { replace: true },
    );
  };

  const handleCloseReviews = () => {
    setShowReviews(false);
    if (scrollBeforeReviews !== null) {
      const headerOffset = 80;
      setTimeout(() => {
        window.scrollTo({
          top: scrollBeforeReviews - headerOffset,
          behavior: 'smooth',
        });
      }, 0);
    }
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <Loader />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-page">
        <div className="product-not-found">
          <Breadcrumbs />
          <div className="product-not-found__content">
            <h1 className="product-not-found__title">
              {t(
                'product_details.not_found_title',
                'Unfortunately, the product is unknown.',
              )}
            </h1>
            <p className="product-not-found__text">
              {t(
                'product_details.not_found_text',
                "We couldn't find the product you're looking for.",
              )}
            </p>
            <button
              className="product-not-found__button"
              onClick={() => navigate(-1)}
            >
              {t('product_details.back')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="product-details-page"
      ref={headerRef}
    >
      <Breadcrumbs />
      <BackButton />
      <div className="product-header">
        <h1 className="product-title">{product.name}</h1>
        <RatingsWidget
          productId={product.id}
          onSeeAll={() => {
            setScrollBeforeReviews(window.scrollY);
            setShowReviews(true);
          }}
        />
      </div>
      <ProductPage
        key={product.color}
        product={product}
        onCapacityChange={handleCapacityUpdate}
        showReviews={showReviews}
        onCloseReviews={handleCloseReviews}
      />
    </div>
  );
};
