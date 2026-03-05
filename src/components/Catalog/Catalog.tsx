import { useTranslation } from 'react-i18next';
import type { Book } from '@/types/Book';
import { GridContainer } from '../GridContainer/GridContainer';
import { CatalogControls } from './components/CatalogControls';
import { usePagination } from './hooks/usePagination';
import { useCatalogFilters } from './hooks/useCatalogFilters';
import { PaginationBlock } from './components/PaginationBlock';
import { BooksList } from './components/BooksList';

type Props = {
  products: Book[];
  title: string | null;
  isLoading?: boolean;
};

export const Catalog = ({ products, title, isLoading = false }: Props) => {
  const { t } = useTranslation();

  const { sort, itemsPerPage, changeItemsPerPage, changeSort } =
    useCatalogFilters();

  const {
    safePage,
    totalPages,
    visiblePages,
    handleChangeNumber,
    handleChangeArrow,
    isPageTransitioning,
  } = usePagination({ totalItems: products.length, itemsPerPage });

  const currentProducts: Book[] =
    itemsPerPage === 'all' ? products : (
      products.slice(
        (safePage - 1) * Number(itemsPerPage),
        safePage * Number(itemsPerPage),
      )
    );

  const showSkeleton = isLoading || isPageTransitioning;

  return (
    <GridContainer className="overflow-hidden">
      <div className="col-span-full flex flex-col items-start mt-8 mb-8 md:mt-16 md:mb-10">
        <h1 className="text-foreground text-[32px] md:text-[48px] font-manrope font-bold leading-tight tracking-[-0.01em] md:tracking-[-0.02em] mb-2">
          {title}
        </h1>
        <p className="text-muted-foreground text-[14px] font-manrope font-medium">
          {isLoading ? '...' : t('items.count', { count: products.length })}
        </p>
      </div>

      <CatalogControls
        sort={sort}
        itemsPerPage={itemsPerPage}
        onChangeItemsPerPage={changeItemsPerPage}
        onChangeSort={changeSort}
      />

      <div className="col-span-4 md:col-span-12 lg:col-span-24 h-0" />

      <BooksList
        books={currentProducts}
        isLoading={showSkeleton}
        itemsPerPage={itemsPerPage === 'all' ? 16 : itemsPerPage}
      />

      {!isLoading && (
        <PaginationBlock
          safePage={safePage}
          handleChangeArrow={handleChangeArrow}
          visiblePages={visiblePages}
          handleChangeNumber={handleChangeNumber}
          totalPages={totalPages}
        />
      )}
    </GridContainer>
  );
};
