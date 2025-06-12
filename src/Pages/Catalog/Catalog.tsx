import { useCallback, useEffect, useMemo, useState } from 'react';
import { Breadcrumbs } from '../../Components/Breadcrumbs';
import { Dropdown } from '../../Components/Dropdown';
import { ProductCard } from '../../Components/ProductCart/ProductCart';
import { ProductType } from '../../types/ProductType';
import { SortType } from '../../types/SortType';
import { Category } from '../../types/CategoryType';
import { getProducts } from '../../Api/api';
import './Catalog.scss';
import { PaginationButtons } from '../../Components/Pagination';

const DEFAULT_SORT_BY = 'Newest';
const DEFAULT_PER_PAGE = 16;
const DEFAULT_PAGE = 1;

type Props = {
  category: Category;
};

export const Catalog: React.FC<Props> = ({ category }) => {
  const getInitialSortBy = (): keyof typeof SortType => {
    return (
      (localStorage.getItem('catalog_sortBy') as keyof typeof SortType) ||
      DEFAULT_SORT_BY
    );
  };

  const getInitialPerPage = (): number => {
    const stored = localStorage.getItem('catalog_perPage');

    return stored ? parseInt(stored, 10) : DEFAULT_PER_PAGE;
  };

  const getInitialPage = (): number => {
    const stored = localStorage.getItem('catalog_page');

    return stored ? parseInt(stored, 10) : DEFAULT_PAGE;
  };

  const [products, setProducts] = useState<ProductType[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(getInitialPage());
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] =
    useState<keyof typeof SortType>(getInitialSortBy());
  const [perPage, setPerPage] = useState<number>(getInitialPerPage());

  useEffect(() => {
    localStorage.setItem('catalog_sortBy', sortBy);
    localStorage.setItem('catalog_perPage', perPage.toString());
    localStorage.setItem('catalog_page', currentPage.toString());
  }, [sortBy, perPage, currentPage]);

  useEffect(() => {
    const storedCategory = localStorage.getItem('catalog_category');

    if (storedCategory !== category) {
      setSortBy(DEFAULT_SORT_BY);
      setPerPage(DEFAULT_PER_PAGE);
      setCurrentPage(DEFAULT_PAGE);

      localStorage.setItem('catalog_category', category);
      localStorage.removeItem('catalog_sortBy');
      localStorage.removeItem('catalog_perPage');
      localStorage.removeItem('catalog_page');
    }
  }, [category]);

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
    fetchProducts();
  }, [category, sortBy, perPage, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const title = useMemo(() => {
    return category[0].toUpperCase() + category.slice(1);
  }, [category]);

  const handleSortBy = useCallback((value: string) => {
    setSortBy(value as keyof typeof SortType);
    setCurrentPage(1);
  }, []);

  const handlePerPage = useCallback((value: string) => {
    setPerPage(parseInt(value));
    setCurrentPage(1);
  }, []);

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
            value={perPage.toString()}
            onChange={handlePerPage}
          />
        </div>
      </div>

      <div className="catalog__container">
        {products.map(product => (
          <ProductCard key={product.id} product={product} wide />
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
