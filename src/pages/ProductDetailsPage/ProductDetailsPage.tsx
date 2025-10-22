import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import useProductDetailsStore from '../../stores/useProductDetailsStore';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import useLanguageStore from '../../stores/useLanguageStore'; // Стор для мови
import { NotFound } from '../NotFound';
import styles from './ProductDetailsPage.module.scss';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { ProductAbout } from './components/ProductAbout';
import { ProductTechSpecs } from './components/ProductTechSpecs';
import { MainControls } from './components/MainControls';
import useAllProductsStore from '../../stores/useAllProductsStore';
import { ProductDetailsSkeleton } from './components/Skeleton';
import { mapDetailedToShortProduct } from '../../utils/productMappers';

export const ProductDetailsPage: React.FC = () => {
  const { currentLanguage, descriptions, loadDescriptionTranslations } =
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
      // Переконайтеся, що namespaceId доступний
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

  // Якщо дані ще завантажуються або є помилка, ми все одно можемо показати хлібні крихти,
  // але назва продукту буде відсутня до завантаження
  // if (isLoading || error || !product) {
  //   // Можна відобразити мінімальні хлібні крихти без назви продукту
  //   return (
  //     <div className="product-details-page">
  //       <Breadcrumbs product={null} />{' '}
  //       {/* Передаємо null або лише базову інформацію */}
  //       {isLoading && <p>Завантаження деталей продукту...</p>}
  //       {error && <p style={{ color: 'red' }}>Помилка завантаження: {error}</p>}
  //       {!product && !isLoading && !error && <p>Продукт не знайдено.</p>}
  //     </div>
  //   );
  // }

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
        <p>Завантаження деталей продукту...</p>
        <ProductDetailsSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <p style={{ color: 'red' }}>Помилка завантаження: {error}</p>
        <NotFound />
      </>
    );
  }

  if (!product) {
    return (
      <>
        {/* Може бути, якщо error не було, але product = null */}
        <p>Продукт не знайдено.</p>;
        <NotFound />
      </>
    );
  }

  const productForActions = cachedShortProduct
    ? cachedShortProduct
    : mapDetailedToShortProduct(product);

  return (
    <div className={styles.product}>
      {/* <ProductDetailsSkeleton /> */}

      <Breadcrumbs product={product} />

      <h2 className={styles['product-name']}>{product.name}</h2>

      <div className={styles['product-content']}>
        <div className={styles['product-image-gallery']}>
          <ImageGallery images={product.images} />
        </div>

        <div className={styles['product-options']}>
          {(product.colorsAvailable?.length > 1 ||
            product.capacityAvailable?.length > 1) && (
            <MainControls product={product} shortProduct={productForActions} />
          )}
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
  );
};
