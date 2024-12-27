import { useMemo } from 'react';
import { PathNavigation } from '../../../shared/components/PathNavigation';
import { Product } from '../../../shared/types/types';
import styles from './ProductsPage.module.scss';
import { Category, LoadingStatus } from '../../../shared/types/enums';
// eslint-disable-next-line max-len
import { useLanguage } from '../../../shared/components/Contexts/LanguageContext';
import { ProductsDisplay } from '../../../shared/components/ProductsDisplay';
import { ProductsDisplaySkeleton } from '../ProductsDisplaySkeleton';
import React from 'react';
import { useDataLoader } from '../../../shared/hooks/useDataLoader';
import { productsFile } from '../../../shared/consts/apiFiles';

type Props = {
  productCategory: Category;
};

export const ProductsPage: React.FC<Props> = ({ productCategory }) => {
  const [products, loadingStatus, responseStatus, reload] =
    useDataLoader<Product>(productsFile);

  const {
    phonesPath,
    tabletsPath,
    accessoriesPath,
    phonesCategory,
    tabletsCategory,
    accessoriesCategory,
  } = useLanguage().localeTexts;

  const handleReloadClick = () => {
    reload();
  };

  const filteredProducts = useMemo(
    () => products.filter(product => product.category === productCategory),
    [products, productCategory],
  );

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

  const displayProducts =
    loadingStatus === LoadingStatus.Success ||
    loadingStatus === LoadingStatus.NoData;

  return (
    <>
      <PathNavigation path={path} />

      <main className={styles.ProductsPage}>
        <h1 className={styles.Title}>{category}</h1>

        {displayProducts ? (
          <ProductsDisplay
            products={filteredProducts}
            productCategory={productCategory}
            className={styles.ProductsDisplay}
          />
        ) : (
          <ProductsDisplaySkeleton
            loadingStatus={loadingStatus}
            onReloadClick={handleReloadClick}
            responseStatus={responseStatus}
            className={styles.ProductsDisplay}
          />
        )}
      </main>
    </>
  );
};
