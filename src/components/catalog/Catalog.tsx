import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { ProductList } from '@components/products/';

import { Breadcrumbs, Loader, Title } from '@ui/index';

import { usePagination, useProducts } from '@hooks/index';

import { ICatalog } from '@utils/types/catalog.interface';

import styles from './Catalog.module.scss';
import { CatalogError } from './catalog-error/CatalogError';
import { CatalogDropdowns, CatalogPagination, CatalogTitle } from './index';

export const Catalog: FC<ICatalog> = ({
  text,
  products,
  isDropdown,
  isPagination,
}) => {
  const { loading, error } = useProducts();
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  const productsLength = products.length;
  const initialPerPage = useMemo(() => {
    return Number(searchParams.get('perPage')) || productsLength;
  }, [searchParams, productsLength]);

  const pagination = usePagination({
    products,
    initialPerPage,
  });

  const isPaginationVisible =
    isPagination && productsLength > 0 && pagination.isVisible;
  const isFavouritesEmpty = !isDropdown && !isPagination && !productsLength;

  const localizedEmpty = t('favourites.text');
  const localizedTitle = t(`catalog.title.${text}`);
  const localizedOtherTitle = t(`catalog.other.${text}`);
  const localizedNoItem = t('catalog.noItem', {
    title: localizedOtherTitle,
  });
  const localizedProduct = t('item.item', {
    count: productsLength,
    item: productsLength,
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <CatalogError />;
  }

  if (!productsLength && !isFavouritesEmpty) {
    return (
      <section className={styles.catalog}>
        <Title level={1}>{t(localizedNoItem)}</Title>
      </section>
    );
  }

  return (
    <section className={styles.catalog}>
      <Breadcrumbs text={text} />

      <CatalogTitle
        title={localizedTitle}
        message={isFavouritesEmpty ? localizedEmpty : localizedProduct}
      />

      <div className={styles.wrapper}>
        {isDropdown && (
          <CatalogDropdowns
            initialPerPage={initialPerPage}
            productsLength={productsLength}
            pagination={pagination}
          />
        )}

        <div className={styles.list}>
          {pagination.currentProducts.length > 0 &&
            pagination.currentProducts.map(product => (
              <ProductList key={product.id} product={product} discount />
            ))}
        </div>
      </div>

      {isPaginationVisible && (
        <CatalogPagination
          productsLength={productsLength}
          pagination={pagination}
        />
      )}
    </section>
  );
};
