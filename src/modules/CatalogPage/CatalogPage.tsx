import { FC } from 'react';

import { Title } from '../shared/components/Title';
import { CatalogOptions } from './components/CatalogOptions';
import { Product } from '../../types/Product';
import { CatalogPagination } from './components/CatalogPagination';
import { CatalogProducts } from '../shared/components/CatalogProducts';
import { useCatalog } from './hooks';
import { PageContainer } from '../shared/components/PageContainer';
import { Path } from '../shared/components/Path';

type Props = {
  pathName: string;
  title: string;
  products: Product[];
};

export const CatalogPage: FC<Props> = ({ pathName, title, products }) => {
  const {
    handleSort,
    handlePerPage,
    handlePage,
    sort,
    currentPage,
    itemsPerPage,
    pages,
    visibleProducts,
  } = useCatalog(products);

  return (
    <PageContainer>
      <Path pathName={pathName} />

      {visibleProducts.length > 0 ? (
        <>
          <Title title={title} amountPage={products.length} />
          <CatalogOptions
            sort={sort}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            handlePerPage={handlePerPage}
            handleSort={handleSort}
            handlePage={handlePage}
          />

          <CatalogProducts
            visibleProducts={visibleProducts}
            pathName={pathName}
          />

          <CatalogPagination
            pages={pages}
            handlePage={handlePage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <h1 style={{ color: 'white', fontSize: '24px' }}>
          There are no {title} yet
        </h1>
      )}
    </PageContainer>
  );
};
