import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Dropdown } from '../../components/Dropdown';
import { ProductCard } from '../../components/ProductCard';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import { Category } from '../../types/CategoryType';
import { getProducts } from '../../api/api';
import './Catalog.scss';
import { PaginationButtons } from '../../components/Pagination';

const DEFAULT_SORT_BY = 'Newest';
const DEFAULT_PER_PAGE = 16;

type Props = {
  category: Category;
};

export const Catalog: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const initialSortBy =
    (searchParams.get('sortBy') as keyof typeof SortType) || DEFAULT_SORT_BY;
  const initialPerPage =
    parseInt(searchParams.get('perPage') || '') || DEFAULT_PER_PAGE;

  const [sortBy, setSortBy] = useState(initialSortBy);
  const [perPage, setPerPage] = useState(initialPerPage);

  const handleSortBy = useCallback((value: string) => {
    setSortBy(value as keyof typeof SortType);
  }, []);

  const handlePerPage = useCallback((value: string) => {
    setPerPage(parseInt(value));
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts(
      {
        page: currentPage,
        sortBy: SortType[sortBy],
        perPage,
      },
      category,
    );

    if (response.pages < currentPage) {
      setCurrentPage(response.pages);
    }

    setPageCount(response.pages);
    setProducts(response.products);
    setTotalProducts(response.totalProducts);
  };

  useEffect(() => {
    setCurrentPage(1);
    setSortBy('Newest');
    setPerPage(16);
  }, [category]);

  useEffect(() => {
    fetchProducts();

    const newParams: { [key: string]: string } = {};
    if (perPage !== DEFAULT_PER_PAGE) {
      newParams['perPage'] = perPage.toString();
    }
    if (sortBy !== DEFAULT_SORT_BY) {
      newParams['sortBy'] = sortBy;
    }
    setSearchParams(newParams);
  }, [category, currentPage, perPage, sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const title = useMemo(() => {
    return category[0].toUpperCase().concat(category.slice(1));
  }, [category]);

  return (
    <div className="catalog">
      <Breadcrumbs paths={[{ name: title }]} />

      <h1 className="catalog__title">{title}</h1>
      <p className="catalog__count body-text">{totalProducts} models</p>

      <div className="catalog__filters">
        <div className="catalog__filters-filter">
          <p className="catalog__filters-filter-text small-text">Sort by</p>
          <Dropdown
            options={Object.keys(SortType)}
            value={sortBy}
            onChange={handleSortBy}
          />
        </div>

        <div className="catalog__filters-filter catalog__filters-filter--small">
          <p className="catalog__filters-filter-text small-text">
            Items on page
          </p>
          <Dropdown
            options={['16', '32', '64']}
            value={perPage}
            onChange={handlePerPage}
          />
        </div>
      </div>

      <div className="catalog__container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} wide={true} />
        ))}
      </div>

      <PaginationButtons
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        pageCount={pageCount}
      />
    </div>
  );
};
