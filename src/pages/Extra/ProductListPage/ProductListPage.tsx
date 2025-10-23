import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumbs from '../../../components/Breadcrumbs';
import Pagination from '../../../components/Pagination';
import ProductCard from '../../../components/ProductCard';
import Sort from '../../../components/Sort';
import { useProductContext } from '../../../context/ProductContext';
import { Product } from '../../../types/Product';
import './ProductListPage.scss';

interface SortOption {
  value: string;
  label: string;
}
interface PaginationOption {
  value: string;
  label: string;
}

const optionsSort: SortOption[] = [
  { value: 'Newest', label: 'Newest' },
  { value: 'low-to-high', label: 'Low to High' },
  { value: 'high-to-low', label: 'High to Low' },
];
const optionsPagination: PaginationOption[] = [
  { value: '16', label: '16' },
  { value: '24', label: '24' },
  { value: '32', label: '32' },
];

interface ProductListPageProps {
  category: string;
  title: string;
}

const ProductListPage: React.FC<ProductListPageProps> = ({
  category,
  title,
}) => {
  const { products } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSort = searchParams.get('sort') ?? 'Newest';
  const initialPerPage = searchParams.get('perPage') ?? '16';
  const initialPage = parseInt(searchParams.get('page') ?? '1', 10);

  const [sortType, setSortType] = useState<string>(initialSort);
  const [productPerPage, setProductPerPage] = useState<string>(initialPerPage);
  const [currentPage, setCurrentPage] = useState<number>(
    isNaN(initialPage) ? 1 : initialPage,
  );
  const perPage = parseInt(productPerPage, 10);
  const startIndex = (currentPage - 1) * perPage;

  const filteredProducts = (products as Product[])
    .filter(product => product.category === category)
    .slice()
    .sort((a, b) => {
      switch (sortType) {
        case 'low-to-high':
          return a.price - b.price;
        case 'high-to-low':
          return b.price - a.price;
        case 'Newest':
        default:
          return (b.year ?? 0) - (a.year ?? 0);
      }
    });

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + perPage,
  );
  const totalPages = Math.ceil(filteredProducts.length / perPage);

  const handlePaginationChange = (selectedOption: PaginationOption | null) => {
    if (selectedOption) {
      setProductPerPage(selectedOption.value);
      setCurrentPage(1);
    }
  };

  const handleSortChange = (selectedOption: SortOption | null) => {
    if (selectedOption) {
      setSortType(selectedOption.value);
    }
  };

  // keep URL in sync with controls
  useEffect(() => {
    const params: Record<string, string> = {};
    if (sortType) params.sort = sortType;
    if (productPerPage) params.perPage = productPerPage;
    if (currentPage) params.page = String(currentPage);
    setSearchParams(params, { replace: true });
  }, [sortType, productPerPage, currentPage, setSearchParams]);

  return (
    <div className="product-list-page">
      <div className="product-list-page--breadcrumbs">
        <Breadcrumbs />
      </div>

      <h1 className="product-list-page__title">{title}</h1>
      <p className="product-list-page__subtitle">
        {filteredProducts.length} models
      </p>

      <div className="product-list-page__sort">
        <Sort
          title="Sort by"
          option={optionsSort}
          onChange={handleSortChange}
          value={sortType}
        />
        <Sort
          title="Items on page"
          option={optionsPagination}
          onChange={handlePaginationChange}
          value={productPerPage}
        />
      </div>

      <div className="product-list-page__card">
        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductListPage;
