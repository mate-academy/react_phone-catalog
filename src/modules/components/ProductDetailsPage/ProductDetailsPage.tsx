/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable prettier/prettier */

//#region IMPORTS
import { useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useProducts } from '@/modules/shared/utils/context/ProductsContext';
import { CategoryType, ProductType } from '@/modules/shared/utils/types';

import { ProductCardDetailsSkeleton } from './components/ProductCardDetails/ProductCardDetailsSkeleton';
import { ErrorMessage } from '@/modules/shared/components/ErrorMessage';
import { Breadcrumbs } from '@/modules/shared/components/Breadcrumbs';
import { BackButton } from '@/modules/shared/components/ui/BackButton';

import { ProductCardDetails } from './components/ProductCardDetails';
import { ProductsSlider } from '../HomePage/components/ProductsSlider';

import styles from './ProductDetailsPage.module.scss';
import { getPageTitles } from '@/modules/shared/utils/constants';
//#endregion IMPORTS

//#region STYLES
const { productDetailsPage, backBtnWrapper } = styles;
//#endregion STYLES

//#region HELPERS
const getSuggestedProducts = (
  products: ProductType[],
  currentProductId?: string,
) => {
  const filtered = products.filter(item =>
    item.itemId !== currentProductId);

  const shuffled = [...filtered].sort(() =>
    0.5 - Math.random());

  return shuffled.slice(0, 15);
};
//#endregion

export const ProductDetailsPage = () => {
  //#region HOOKS
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const { productId } = useParams();
  //#endregion

  //#region API_DATA_FETCHING
  const {
    loadCategoryDetails,
    getProductDetailById,
    getProductsByCategory,
    isLoading,
    isError,
  } = useProducts();

  const currentCategory = pathname.split('/')[1] as CategoryType;
  const productDetails = productId ? getProductDetailById(productId) : undefined;
  const categoryProducts = getProductsByCategory(currentCategory);

  const pageTitles = useMemo(() => getPageTitles(t), [t]);
  const currentPageTitle = pageTitles[currentCategory];
  //#endregion

  //#region EFFECTS
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails?.namespaceId]);

  useEffect(() => {
    loadCategoryDetails(currentCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, i18n.language]);
  //#endregion

  //#region DATA_PROCESSING
  const recommendedProducts = useMemo(() => {
    return getSuggestedProducts(categoryProducts, productId);
  }, [categoryProducts, productId]);
  //#endregion

  //#region RENDER_FLAGS
  const isNotFound = !isLoading && !isError && !productDetails;
  const showDetails = !isLoading && !isError && !!productDetails;
  //#endregion

  //#region RENDER
  return (
    <div className={productDetailsPage}>
      <Breadcrumbs
        pageTitle={currentPageTitle}
        pagePath={currentCategory}
        productName={productDetails?.name}
      />

      <div className={backBtnWrapper}>
        <BackButton />
      </div>

      {/* Стан завантаження*/}
      {isLoading && <ProductCardDetailsSkeleton />}

      {/* Стан помилки */}
      {(isError || isNotFound) && (
        <ErrorMessage message={t('productDetailsPage.errorMessage')} />
      )}

      {/* Стан успіху -> показуємо товар та слайдер */}
      {showDetails && (
        <>
          <ProductCardDetails product={productDetails} />

          <ProductsSlider
            title={t('productDetailsPage.sliderTitle')}
            products={recommendedProducts}
          />
        </>
      )}
    </div>
  );
  //#endregion RENDER
};
