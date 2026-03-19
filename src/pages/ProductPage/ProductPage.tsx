import React, { useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../components/Breadcrumb';
import { ProductsByCategory } from '../../components/ProductsByCategory';
import { CenteredContent } from '../../components/CenteredContent';
import { Loader } from '../../components/Loader';
import { ErrorDisplay } from '../../components/ErrorDisplay';
import { NotFound } from '../../components/NotFound';
import { useProducts } from '../../hooks/useProducts';
import { useTranslate } from '../../hooks/useTranslate';
import { getProductsByCategory } from '../../utils/getProductsByCategory';
import { IMG_NOT_FOUND, TITLE_NOT_FOUND } from '../../constants/notFound';
import { SEARCH_PARAMS } from '../../constants/Products/byCategory';
import { isValidCategory } from '../../utils/isValidCategory';
import { Category, CategoryTitle } from '../../types/ProductCategory';
import { filterByQuery } from '../../utils/filterByQuery';

export const ProductPage: React.FC = () => {
  const { category } = useParams();
  const { productsList, isLoading, isError } = useProducts();
  const [searchParams] = useSearchParams();
  const t = useTranslate();

  const query = searchParams.get(SEARCH_PARAMS.query);

  const currentCategory = category?.toLowerCase();

  const title = t(`categories.${currentCategory}`);

  const productsByCategory = useMemo(() => {
    if (!currentCategory) {
      return [];
    }

    return getProductsByCategory(productsList, currentCategory as Category);
  }, [productsList, currentCategory]);

  const filteredProducts = useMemo(
    () => filterByQuery(productsByCategory, query, product => product.name),
    [productsByCategory, query],
  );

  const hasCategoryProducts = productsByCategory.length > 0;
  const hasFilteredProducts = filteredProducts.length > 0;
  const hasQuery = Boolean(query?.trim());

  const showError = !isLoading && isError;

  const showNoQueryMatches =
    hasCategoryProducts && hasQuery && !hasFilteredProducts;

  if (isLoading) {
    return (
      <CenteredContent>
        <Loader />
      </CenteredContent>
    );
  }

  if (showError) {
    return (
      <CenteredContent>
        <ErrorDisplay
          errorMessage={t('error.message')}
          buttonText={t('error.button-message')}
        />
      </CenteredContent>
    );
  }

  if (!isValidCategory(currentCategory as Category)) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.page} text={t(TITLE_NOT_FOUND.page)} />
      </CenteredContent>
    );
  }

  if (!hasCategoryProducts) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.product} />
      </CenteredContent>
    );
  }

  if (showNoQueryMatches) {
    return (
      <CenteredContent>
        <NotFound img={IMG_NOT_FOUND.product} text={TITLE_NOT_FOUND.query} />
      </CenteredContent>
    );
  }

  return (
    <>
      <div className="breadcrumbSection">
        <Breadcrumb />
      </div>

      <div className="pageSection">
        <ProductsByCategory
          title={title as CategoryTitle}
          products={filteredProducts}
        />
      </div>
    </>
  );
};
