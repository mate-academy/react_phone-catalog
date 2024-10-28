import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ProductsContext } from '../../store/ProductsProvider';
import { getProducts } from '../../api/products';

import { FilterSort } from '../../types/FilterSort';
import { ErrorMessage } from '../../types/ErrorMessage';
import { ProductGeneral, ProductCategory } from '../../types/ProductGeneral';

import {
  getFiltredProducts,
  getPreparedProducts,
} from '../../utils/productsHelper';
import { getProductsPageTitle } from '../../utils/getProductsPageTitle';

import { ProductsFilter } from './components/ProductsFilter';
import { ProductsList } from '../shared/ProductsList';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { Loader } from '../shared/Loader';
import { Error } from '../shared/Error';

import styles from './ProductsPage.module.scss';

function getErrorMessage(
  categoryProducts: string | undefined,
  productsLenght: number,
): ErrorMessage {
  if (productsLenght !== 0 || !categoryProducts) {
    return ErrorMessage.Default;
  }

  switch (categoryProducts) {
    case 'phones':
      return ErrorMessage.NotFoundPhones;
    case 'accessories':
      return ErrorMessage.NotFoundAccessories;
    case 'tablets':
      return ErrorMessage.NotFoundTablets;
  }

  return ErrorMessage.Default;
}

export const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = (searchParams.get('sort') as FilterSort) || FilterSort.Newest;
  const query = searchParams.get('query') || '';

  const [isLoading, setIsLoading] = useState(false);

  const {
    products: allProducts,
    setProducts,
    productsError,
    setProductsError,
  } = useContext(ProductsContext);

  const productsByCategory: ProductGeneral[] = useMemo(
    () =>
      getFiltredProducts(allProducts, product => product.category === category),
    [allProducts, category],
  );

  const [preparedProducts, setPreparedProducts] = useState<ProductGeneral[]>(
    getPreparedProducts(productsByCategory, query, sortBy),
  );

  useEffect(() => {
    setPreparedProducts(getPreparedProducts(productsByCategory, query, sortBy));
  }, [productsByCategory, query, sortBy]);

  const titleText = useMemo(
    () =>
      getProductsPageTitle(
        category as ProductCategory,
        productsByCategory.length,
      ),
    [category, productsByCategory],
  );

  const errorText = useMemo(
    () => getErrorMessage(category, preparedProducts.length),
    [category, preparedProducts],
  );

  // #region error and loading
  const handleReloadProducts = () => {
    setIsLoading(true);

    getProducts()
      .then(productsFromServer => {
        setProducts(productsFromServer);
        setProductsError(false);
      })
      .catch(() => setProductsError(true))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (productsError) {
    return <Error errorMessage={errorText} onReload={handleReloadProducts} />;
  }
  // #endregion

  return (
    <div className={styles.ProductsPage}>
      <h1 style={{ display: 'none' }}>{category} page</h1>

      <Breadcrumbs />

      {preparedProducts.length === 0 ? (
        <Error errorMessage={errorText} />
      ) : (
        <>
          <h2 className={styles.ProductsPage__title}>{titleText}</h2>
          <p className={styles.ProductsPage__countModels}>
            {productsByCategory.length} models
          </p>

          <ProductsFilter />

          <ProductsList products={preparedProducts} />
        </>
      )}
    </div>
  );
};
