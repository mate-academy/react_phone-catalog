import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { BreadCrumbs } from './BreadCrumbs';
import { ProductCard } from './ProductCard';
import { DropDown } from './DropDown';
import { Pagination } from './Pagination';
import { PerPageOptions } from '../types/PerPageOptions';
import { SortByOptions } from '../types/SortByOptions';
import './ProductsList.scss';

const SORT_BY_KEY = 'sortBy';
const SORT_OPTIONS = [SortByOptions.new, SortByOptions.az, SortByOptions.cost];

const PAGE_KEY = 'page';
const PER_PAGE_KEY = 'perPage';
const PAGES_OPTIONS = [
  PerPageOptions.all,
  PerPageOptions.p4,
  PerPageOptions.p8,
  PerPageOptions.p16,
];

const SEARCH_KEY = 'query';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({
  title,
  products,
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = title !== 'Favourites'
    ? searchParams.get(SORT_BY_KEY) || SortByOptions.new
    : 'default';

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  const perPage = searchParams.get(PER_PAGE_KEY) || false;
  const pageFromParams = searchParams.get(PAGE_KEY) || '1';
  const [currentPage, setCurrentPage] = useState(+pageFromParams);

  const query = searchParams.get(SEARCH_KEY)?.toLowerCase().trim();

  const filteredProducts = query
    ? [...sortedProducts]
      .filter(item => item.name.toLowerCase().includes(query))
    : [...sortedProducts];

  const totalProducts = filteredProducts.length;

  const firstItem = currentPage !== 1 ? (currentPage - 1) * +perPage : 0;
  const lastItem = (currentPage * +perPage) > totalProducts || !perPage
    ? totalProducts
    : currentPage * +perPage;

  useEffect(() => {
    switch (sortBy) {
      case SortByOptions.new:
        setSortedProducts([...products].sort((a, b) => +b.year - (+a.year)));
        break;

      case SortByOptions.cost:
        setSortedProducts(
          [...products].sort((a, b) => +a.price - (+b.price)),
        );
        break;

      case SortByOptions.az:
        setSortedProducts(
          [...products].sort((a, b) => a.name.localeCompare(b.name)),
        );
        break;

      case 'default':
        setSortedProducts(products);
        break;

      default:
        setSortedProducts(products);
    }
  }, [sortBy, products]);

  return (
    <div className="product-list">
      <div className="product-list__bread-crumbs">
        <BreadCrumbs />
      </div>

      <h1 className="product-list__title">
        {title}
      </h1>

      <div className="product-list__product-count">
        {`${totalProducts} models`}
      </div>

      {!sortedProducts.length && (
        <div className="product-list__no-search-result">
          {`${title} not found`}
        </div>
      )}

      {!totalProducts && !!query && !!sortedProducts.length && (
        <div className="product-list__search-result">
          {`No search results by query - " ${query} "`}
        </div>
      )}

      {!!totalProducts && (
        <>
          {title !== 'Favourites' && (
            <div className="product-list__sorting">
              <DropDown
                title="Sort by"
                values={SORT_OPTIONS}
                sortKey={SORT_BY_KEY}
              />

              <DropDown
                title="Items on page"
                values={PAGES_OPTIONS}
                sortKey={PER_PAGE_KEY}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          )}

          {!!totalProducts && !!query && (
            <div className="product-list__search-result">
              {`Search results by query - " ${query} "`}
            </div>
          )}

          <div className="product-list__products">
            {filteredProducts.slice(firstItem, lastItem).map(product => (
              <div className="product-list__product-card" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {!!perPage && (
            <div className="product-list__pagination">
              <Pagination
                totalProducts={totalProducts}
                perPage={+perPage}
                currentPage={+currentPage}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
