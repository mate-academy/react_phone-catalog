import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useProductDetailsStore from '../../stores/useProductDetailsStore';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useLanguageStore from '../../stores/useLanguageStore';
import { NotFound } from '../NotFound/NotFound';
import styles from './ProductDetailsPage.module.scss';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { MainControls } from './components/MainControls';
import useAllProductsStore from '../../stores/useAllProductsStore';
import { ProductDetailsSkeleton } from './components/Skeleton';
import { mapDetailedToShortProduct } from '../../utils/productMappers';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import { ErrorNotification } from '../../components/ErrorNotification';
import { translateDynamicValue } from '../../utils/constants';

export const ProductDetailsPage: React.FC = () => {
  const { currentLanguage, descriptions, loadDescriptionTranslations, t } =
    useLanguageStore();

  const { category, productId } = useParams<{
    category: string;
    productId: string;
  }>();

  const {
    product,
    isLoading,
    error,
    fetchProductDetails,
    clearProductDetails,
  } = useProductDetailsStore();

  // Отримуємо функції та дані з AllProductsStore
  const { getShortProductById, fetchAllProducts, allProducts } =
    useAllProductsStore();

  // Ефект для запуску fetchAllProducts, якщо дані відсутні
  useEffect(() => {
    // Якщо allProducts ще не завантажено
    if (!allProducts) {
      fetchAllProducts();
    }
  }, [allProducts, fetchAllProducts]); // Залежність від allProducts

  // Отримуємо короткий продукт з кешу (безпечно)
  const cachedShortProduct = useMemo(() => {
    // Тут ми використовуємо productId з URL, який відповідає id
    return productId ? getShortProductById(productId) : undefined;
  }, [productId, getShortProductById]);

  useEffect(() => {
    if (category && productId) {
      fetchProductDetails(category, productId);
    }

    // Очищаємо деталі продукту при виході зі сторінки
    return () => {
      clearProductDetails();
    };
  }, [category, productId, fetchProductDetails, clearProductDetails]);

  // Завантажуємо переклади, якщо мова змінилася і вони ще не завантажені
  useEffect(() => {
    loadDescriptionTranslations(currentLanguage);
  }, [currentLanguage, loadDescriptionTranslations]);

  // Отримання перекладеного опису
  const translatedDescription = useMemo(() => {
    if (!product || !product.namespaceId) {
      return [];
    }

    // Якщо поточна мова не англійська І є завантажені переклади для неї
    if (currentLanguage !== 'en' && descriptions[currentLanguage]) {
      return (
        descriptions[currentLanguage][product.namespaceId] ||
        product.description
      ); // Повертаємо переклад або оригінал
    }

    // За замовчуванням повертаємо оригінальний опис
    return product.description;
  }, [product, currentLanguage, descriptions]);

  const recomendedProducts = useMemo(() => {
    if (!allProducts || !product) {
      return [];
    }

    const currentPrice = product.priceDiscount;

    // Визначаємо діапазон цін: наприклад, ±20% від поточної ціни
    const priceTolerance = 0.2; // 20%
    const minPrice = currentPrice * (1 - priceTolerance);
    const maxPrice = currentPrice * (1 + priceTolerance);

    const recommended = allProducts
      .filter(item => {
        // 1. Ті ж самі продукти з іншим itemId (уникнення дублікатів по id)
        if (item.itemId === product.id) {
          return false;
        }

        // 2. Фільтруємо за категорією
        const isSameCategory = item.category === product.category;

        if (!isSameCategory) {
          return false;
        }

        // 3. Фільтруємо за ціною (в межах ±20%)
        const isSimilarPrice = item.price >= minPrice && item.price <= maxPrice;

        if (!isSimilarPrice) {
          return false;
        }

        return true;
      })
      // Опціонально: Сортуємо, щоб найближчі ціни були першими
      .sort((a, b) => {
        const diffA = Math.abs(a.price - currentPrice);
        const diffB = Math.abs(b.price - currentPrice);

        return diffA - diffB; // Сортування за найменшою різницею цін
      })
      .slice(0, 10); // Обмежуємо до 10 продуктів

    // Якщо схожих за ціною недостатньо (менше 10), додамо просто з тієї ж категорії
    if (recommended.length < 10) {
      const additionalProducts = allProducts
        .filter(
          item =>
            item.category === product.category &&
            item.itemId !== product.id &&
            !recommended.includes(item), // Виключаємо вже додані
        )
        .slice(0, 10 - recommended.length);

      recommended.push(...additionalProducts);
    }

    return recommended.slice(0, 10); // Фінальне обмеження
  }, [allProducts, product]);

  if (!category || !productId) {
    return (
      <>
        <p>Недостатньо інформації для відображення продукту.</p>;
        <NotFound />
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        {/* <p>Завантаження деталей продукту...</p> */}
        <ProductDetailsSkeleton />
      </>
    );
  }

  if (error) {
    console.log('Помилка завантаження:', error);

    return (
      <div className={styles.product}>
        <Breadcrumbs product={{ category: category, name: productId }} />

        <div className={styles['error-wrapper']}>
          <ErrorNotification
            message={error}
            onRetry={() => fetchProductDetails(category, productId)}
          />
        </div>
      </div>
    );
  }

  if (!product) {
    return <NotFound detailsPage={true} />;
  }

  const productForActions = cachedShortProduct
    ? cachedShortProduct
    : mapDetailedToShortProduct(product);

  return (
    <>
      <div className={styles.product}>
        <Breadcrumbs product={product} />

        <h2 className={styles['product-name']}>
          {translateDynamicValue(product.name, currentLanguage)}
        </h2>

        <div className={styles['product-content']}>
          <div className={styles['product-image-gallery']}>
            <ImageGallery images={product.images} />
          </div>

          <div className={styles['product-options-wrapper']}>
            <span className={styles['product-options-id']}>ID: 802390</span>
            <div className={styles['product-options']}>
              {(product.colorsAvailable?.length > 1 ||
                product.capacityAvailable?.length > 1) && (
                <MainControls
                  product={product}
                  shortProduct={productForActions}
                />
              )}
            </div>
          </div>

          <div className={styles['product-about']}>
            <ProductAbout
              product={product}
              translatedDescription={translatedDescription}
            />
          </div>

          <div className={styles['product-tech-specs']}>
            <ProductTechSpecs product={product} />
          </div>
        </div>
      </div>

      <div className={styles['recomended-products-slider']}>
        <ProductSlider
          products={recomendedProducts}
          title={t('you_may_also_like')}
        />
      </div>
    </>
  );
};
