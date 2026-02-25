import React from 'react';
import styles from './CatalogPage.module.scss';
import { useFilter } from '../../hooks/useFilter';
import { Breadcrumbs } from '../Breadcrumbs';
import { CatalogHeader } from '../../../../shared/components/CatalogHeader';
import { SearchPagination } from '../SearchPagination';
import { useLocation } from 'react-router-dom';
import { BREADCRUMB_LABELS } from '../../constants/BREADCRUMB_LABELS';
import { ProductList } from '../ProductList';
import { SortsWidget } from '../SortsWidget';
import { ProductType } from '../../../../shared/types/ProductType';
import { useTranslation } from 'react-i18next';

interface Props {
  items: ProductType[];
  title: string;
  loading?: boolean;
}

export const CatalogPage: React.FC<Props> = ({ items, title, loading }) => {
  const { t } = useTranslation();
  const { items: readyItem, totalItem } = useFilter({ items: items });

  const location = useLocation();
  const catlogTitle = location.pathname.replace('/', '');
  const breadcrumbsLabel = BREADCRUMB_LABELS[catlogTitle] ?? catlogTitle;

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: t(breadcrumbsLabel), to: catlogTitle }]} />

      <CatalogHeader title={title} itemsCount={items.length} />

      <SortsWidget />

      <ProductList items={readyItem} loading={loading} category={catlogTitle} />

      {totalItem !== 0 && <SearchPagination totalItem={totalItem} />}
    </div>
  );
};
