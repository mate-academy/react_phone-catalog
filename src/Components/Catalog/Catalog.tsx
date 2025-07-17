import { sortProducts } from '../../utils/productsHelper';
import { Breadcrumbs } from '../BreadCrumbs';
import { Pagination } from '../Pagination/Pagination';
import { ProductCard } from '../ProductCard';
import { ProductFilter } from '../ProductFilter';
import { Product } from '../types/Product';
import { useSearchParams } from 'react-router-dom';
import './Catalog.scss';

type Props = {
  title: string;
  products: Product[];
  showFilter?: boolean;
  showPagination?: boolean;
};

export const Catalog: React.FC<Props> = ({
  title,
  products,
  showFilter = true,
  showPagination = true,
}) => {
  const [queryParams, setQueryParams] = useSearchParams();

  const itemsPerPageParams = queryParams.get('perPage') || 8;
  const itemsPerPage =
    itemsPerPageParams === 'all' ? 'all' : Number(itemsPerPageParams);

  const sortField = queryParams.get('sort') || 'year';
  const currentPage = Number(queryParams.get('page')) || 1;

  const indexOfLastItem =
    itemsPerPage === 'all' ? products.length : currentPage * itemsPerPage;

  const indexOfFirstItem =
    itemsPerPage === 'all' ? 0 : indexOfLastItem - itemsPerPage;

  const params = new URLSearchParams(queryParams);

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set('perPage', e.target.value);
    params.set('page', '1');
    setQueryParams(params);
  };

  const handleSortField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    params.set('sort', e.target.value);
    setQueryParams(params);
  };

  const handlePageChange = (page: number) => {
    params.set('page', String(page));
    setQueryParams(params);
  };

  const prdcts = sortProducts(products, sortField);
  const currentItems =
    itemsPerPage === 'all'
      ? prdcts
      : prdcts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="catalog">
      <div className="catalog__container">
        <Breadcrumbs />
        <h1 className="catalog__title">{title}</h1>

        <p className="catalog__count">{`${products.length} models`}</p>

        {showFilter && (
          <ProductFilter
            itemsPerPage={itemsPerPage}
            handlePerPage={handlePerPage}
            sortField={sortField}
            handleSortField={handleSortField}
          />
        )}

        <div className="catalog__products">
          {currentItems.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              fullPrice={true}
              basePath={`../${product.category}/`}
            />
          ))}
        </div>

        {showPagination && itemsPerPage !== 'all' && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            total={products.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
