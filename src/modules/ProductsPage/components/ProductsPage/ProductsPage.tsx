import { useCallback, useEffect, useState } from 'react';
import { PathNavigation } from '../../../shared/components/PathNavigation';
import { Product } from '../../../shared/types/types';
import styles from './ProductsPage.module.scss';
import { Category, LoadingStatus } from '../../../shared/types/enums';
import { translateItems, wait } from '../../../shared/functions/functions';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { ProductsDisplay } from '../../../shared/components/ProductsDisplay';

type Props = {
  productCategory: Category;
};

export const ProductsPage: React.FC<Props> = ({ productCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.Loading);
  const [, /*responseStatus*/ setResponseStatus] = useState<number | undefined>(
    undefined,
  );
  const { language, localeTexts } = useLanguage();
  const {
    phonesPath,
    tabletsPath,
    accessoriesPath,
    phonesCategory,
    tabletsCategory,
    accessoriesCategory,
  } = localeTexts;

  const fetchProducts = useCallback(async () => {
    setResponseStatus(undefined);

    try {
      await wait(2000);
      const response = await fetch('api/products.json');

      if (!response.ok) {
        setResponseStatus(response.status);
        throw new Error();
      }

      const loadedProducts = await response.json();

      setProducts(
        translateItems<Product>(loadedProducts, language).filter(
          product => product.category === productCategory,
        ),
      );

      if (loadedProducts.length) {
        setLoadingStatus(LoadingStatus.Success);
      } else {
        setLoadingStatus(LoadingStatus.Error);
      }
    } catch {
      setLoadingStatus(LoadingStatus.Error);
    }
  }, [language, productCategory]);

  useEffect(() => {
    setLoadingStatus(LoadingStatus.Loading);
  }, [productCategory]);

  useEffect(() => {
    if (loadingStatus === LoadingStatus.Loading) {
      fetchProducts();
    }
  }, [fetchProducts, loadingStatus]);

  let path;
  let category;

  switch (productCategory) {
    case Category.Phones:
      path = phonesPath;
      category = phonesCategory;
      break;
    case Category.Tablets:
      path = tabletsPath;
      category = tabletsCategory;
      break;
    case Category.Accessories:
      path = accessoriesPath;
      category = accessoriesCategory;
      break;
    default:
      throw new Error('Product category is not valid!!!');
  }

  return (
    <>
      <PathNavigation path={path} />

      <main className={styles.ProductsPage}>
        <h1 className={styles.Title}>{category}</h1>
        <ProductsDisplay
          products={products}
          productCategory={productCategory}
          className={styles.ProductsDisplay}
        />
      </main>
    </>
  );
};
