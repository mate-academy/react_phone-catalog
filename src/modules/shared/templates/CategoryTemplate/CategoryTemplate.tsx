import React from 'react';
import styles from './CategoryTemplate.module.scss';
import { Heading } from '../../molecules/Heading';
import { ProductList } from '../../organisms/ProductList';
import { Product } from '../../../../types/Product';
import { useTranslation } from 'react-i18next';

import { Breadcrumbs } from '../../../Breadcrumbs';
import { CatalogControls } from './components/organisms/CatalogControls';
import { CatalogPagination } from './components/organisms/CatalogPagination';
import { PageMessage } from '../../molecules/PageMessage';

type Props = {
  category: string;
  paginatedProducts: Product[];
  filteredProducts: Product[];
  totalPages: number;
  currentPage: number;
};
export const CategoryTemplate: React.FC<Props> = ({
  category,
  paginatedProducts,
  filteredProducts,
  totalPages,
  currentPage,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <Breadcrumbs showSearch />
      <div className={styles.content}>
        <div className={styles.page__title}>
          <Heading
            title={t(`${category}.title`)}
            subtitle={t('catalog.subtitle.items', {
              count: filteredProducts.length,
            })}
          />
        </div>

        <CatalogControls />

        {filteredProducts.length === 0 ? (
          <PageMessage
            title={t('catalog.noMatching')}
            imgSrc="images/product-not-found.png"
          />
        ) : (
          <>
            <ProductList list={paginatedProducts} />
            <CatalogPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}
      </div>
    </div>
  );
};
