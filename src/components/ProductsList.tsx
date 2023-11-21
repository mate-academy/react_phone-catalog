import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types/Product';
import { BreadCrumbs } from './BreadCrumbs';
import { ProductCard } from './ProductCard';
import { DropDown } from './DropDown';
import { Pagination } from './Pagination';
import { PerPageOptions } from '../types/PerPageOptions';
import { SortByOptions } from '../types/SortByOptions';
import { SearchParamsKeys } from '../types/SearchParamsKeys';
import { PagesWithSearch } from '../types/PagesWithSearch';
import './ProductsList.scss';

type Props = {
  title: string;
  products: Product[];
};

export const ProductsList: React.FC<Props> = ({
  title,
  products,
}) => {
  const [searchParams] = useSearchParams();

  const sortBy = title !== PagesWithSearch.favorites
    ? searchParams.get(SearchParamsKeys.sortBy) || SortByOptions.new
    : 'default';

  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);

  let perPage = searchParams.get(SearchParamsKeys.perPage)
    || PerPageOptions.p8;

  if (perPage === PerPageOptions.all || title === 'Favourites') {
    perPage = '0';
  }

  const pageFromParams = searchParams.get(SearchParamsKeys.page) || '1';
  const [currentPage, setCurrentPage] = useState(+pageFromParams);

  const query = searchParams.get(SearchParamsKeys.query)?.toLowerCase().trim();

  const filteredProducts = query
    ? [...sortedProducts]
      .filter(item => item.name.toLowerCase().includes(query))
    : [...sortedProducts];

  const totalProducts = filteredProducts.length;

  const firstItem = currentPage !== 1 ? (currentPage - 1) * +perPage : 0;

  const lastItem = (currentPage * +perPage) > totalProducts || perPage === '0'
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
                values={Object.values(SortByOptions)}
                sortKey={SearchParamsKeys.sortBy}
              />

              <DropDown
                title="Items on page"
                values={Object.values(PerPageOptions)}
                sortKey={SearchParamsKeys.perPage}
                onPageChange={(page: number) => setCurrentPage(page)}
                startValue={PerPageOptions.p8}
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

          {perPage !== '0' && (
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
