import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { ProductsSlider } from '../../components/ProductsSlider';
import { getProductDetails, ProductDetailsResult } from '../../api/products';
import { TranslationKey, useLanguage } from '../../context/LanguageContext';
import { ProductCategory } from '../../types/Product';
import { getPublicPath } from '../../utils/getPublicPath';
import { ProductGallery } from './components/ProductGallery';
import { ProductDetailsSkeleton } from './components/ProductDetailsSkeleton';
import { ProductInformation } from './components/ProductInformation';
import { ProductOptions } from './components/ProductOptions';
import styles from './ProductDetailsPage.module.scss';

const categoryNames: Record<ProductCategory, TranslationKey> = {
  phones: 'nav.phones',
  tablets: 'nav.tablets',
  accessories: 'nav.accessories',
};

export const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const [details, setDetails] = useState<ProductDetailsResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const shouldPreserveProductView = location.state?.preserveScroll === true;

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setHasError(false);

    if (!shouldPreserveProductView) {
      setDetails(null);
    }

    if (!productId) {
      setIsLoading(false);

      return () => {
        isCancelled = true;
      };
    }

    getProductDetails(productId)
      .then(result => {
        if (!isCancelled) {
          setDetails(result);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasError(true);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [productId, reloadKey, shouldPreserveProductView]);

  useEffect(() => {
    if (details && location.state?.category !== details.product.category) {
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, category: details.product.category },
      });
    }
  }, [details, location.pathname, location.state, navigate]);

  if (isLoading && !details) {
    return <ProductDetailsSkeleton />;
  }

  if (hasError) {
    return (
      <div className={`container ${styles.state}`}>
        <p>{t('common.somethingWrong')}</p>
        <button type="button" onClick={() => setReloadKey(key => key + 1)}>
          {t('common.reload')}
        </button>
      </div>
    );
  }

  if (!details) {
    return (
      <div className={`container ${styles.state}`}>
        <h1>{t('product.notFound')}</h1>
      </div>
    );
  }

  const { product, summary, variants } = details;
  const categoryName = t(categoryNames[product.category]);

  const selectVariant = (nextProductId: string) => {
    navigate(`/product/${nextProductId}`, {
      state: {
        ...location.state,
        category: product.category,
        preserveScroll: true,
      },
    });
  };

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs
        currentPage={categoryName}
        categoryPath={`/${product.category}`}
        productName={product.name}
      />

      <button
        type="button"
        className={styles.back}
        onClick={() => navigate(-1)}
        style={
          {
            '--back-icon': `url("${getPublicPath('img/chevron-left.svg')}")`,
          } as React.CSSProperties
        }
      >
        {t('common.back')}
      </button>

      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.hero}>
        <ProductGallery images={product.images} productName={product.name} />
        <ProductOptions
          product={product}
          summary={summary}
          variants={variants}
          onSelectVariant={selectVariant}
        />
      </div>

      <div className={styles.details}>
        <ProductInformation product={product} />
      </div>

      <ProductsSlider
        title={t('product.suggestions')}
        sortBy="suggested"
        excludeProductId={product.id}
      />
    </div>
  );
};
