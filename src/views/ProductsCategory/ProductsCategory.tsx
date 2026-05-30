import s from './ProductsCategory.module.scss';
import { Breadcrumbs } from '../../modules/shared/Breadcrumbs/Breadcrumbs';
import { ProductsList } from '../../modules/shared/ProductsList/ProductsList';
import { Pagination } from '../../modules/shared/Pagination/Pagination';
import { Product } from '../../utils/types/Product';

type Props = {
  title: string;
  products: Product[];
  totalProducts?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  filters?: React.ReactNode;
  subtitleLabel?: string;
};

export const ProductsCategory: React.FC<Props> = ({
  title,
  products,
  totalProducts = products.length,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  filters,
  subtitleLabel = 'models',
}) => {
  const showPagination = totalPages > 1;

  return (
    <section className={s.page}>
      <Breadcrumbs />
      <div className={s.container}>
        <h2 className={s.title}>{title}</h2>
        <span>
          {totalProducts} {subtitleLabel}
        </span>
      </div>
      {filters && <section className={s.filters}>{filters}</section>}

      {products.length ? (
        <>
          <ProductsList products={products} />
          {showPagination && onPageChange && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </>
      ) : (
        <div className={s.emptyMessageWrapper}>
          <h3 className={s.emptyMessage}>There are no products yet</h3>
        </div>
      )}
    </section>
  );
};
