import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './PhonesPage.scss';
import { Path } from '../../components/Path/Path';
import { FilterDropdown } from '../../components/FilterDropdown/FilterDropdown';
import { ProductDetailShort } from '../../types/ProductDetailShort';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import PrevIcon from '../../assets/icons/Chevron (Arrow Left).svg';
import NextIcon from '../../assets/icons/Chevron (Arrow Right).svg';

const SORT_OPTIONS = ['newest', 'alphabet', 'price'];
const ITEMS_PER_PAGE_OPTIONS = ['32', '64', '128'];

interface Props {
  products: ProductDetailShort[];
  category: string;
  title: string;
}

export const PhonesPage: React.FC<Props> = ({ products, category, title }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedSort = searchParams.get('sort');
  const sortBy =
    requestedSort && SORT_OPTIONS.includes(requestedSort)
      ? requestedSort
      : 'newest';
  const requestedItemsPerPage = searchParams.get('perPage');
  const itemsPerPageValue =
    requestedItemsPerPage &&
    ITEMS_PER_PAGE_OPTIONS.includes(requestedItemsPerPage)
      ? requestedItemsPerPage
      : '32';
  const itemsPerPage = Number(itemsPerPageValue);

  const filteredProducts = [...products].filter(
    product => product.category === category,
  );
  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case 'alphabet':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'newest':
      default:
        return b.year - a.year;
    }
  });
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const requestedPage = Number(searchParams.get('page'));
  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? Math.min(requestedPage, Math.max(totalPages, 1))
      : 1;
  const visibleProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  const updateQuery = (updates: Record<string, string>) => {
    setSearchParams(previousParams => {
      const nextParams = new URLSearchParams(previousParams);

      Object.entries(updates).forEach(([key, value]) => {
        nextParams.set(key, value);
      });

      return nextParams;
    });
  };

  useEffect(() => {
    if (searchParams.has('page') && searchParams.get('page') !== String(page)) {
      setSearchParams(previousParams => {
        const nextParams = new URLSearchParams(previousParams);

        nextParams.set('page', String(page));

        return nextParams;
      });
    }
  }, [page, searchParams, setSearchParams]);

  return (
    <div className="PhonesPage grid">
      <Path />
      <h1 className="PhonesPage-title">{title}</h1>
      <span className="PhonesPage-amount">
        {filteredProducts.length + ' models'}
      </span>
      <div className="filter grid--sub">
        <FilterDropdown
          id="sort-by"
          initialValue="newest"
          value={sortBy}
          onChange={value => updateQuery({ sort: value, page: '1' })}
          label="Sort by"
          options={[
            { label: 'Newest', value: 'newest' },
            { label: 'Alphabet', value: 'alphabet' },
            { label: 'Price', value: 'price' },
          ]}
        />
        <FilterDropdown
          id="items-on-page"
          initialValue="16"
          value={itemsPerPageValue}
          onChange={value => updateQuery({ perPage: value, page: '1' })}
          label="Items on page"
          options={[
            { label: '32', value: '32' },
            { label: '64', value: '64' },
            { label: '128', value: '128' },
          ]}
        />
      </div>
      <div className="PhonesPage-catalog grid--sub">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {totalPages > 1 && (
        <nav className="pangination" aria-label="Pagination">
          <div
            aria-disabled={page === 1}
            aria-label="Previous page"
            className="pangination-prev pangination-icon"
            onClick={() => {
              if (page > 1) {
                updateQuery({ page: String(page - 1) });
              }
            }}
            onKeyDown={event => {
              if (page > 1 && ['Enter', ' '].includes(event.key)) {
                event.preventDefault();
                updateQuery({ page: String(page - 1) });
              }
            }}
            role="button"
            tabIndex={page === 1 ? -1 : 0}
          >
            <img src={PrevIcon} alt="<" />
          </div>
          <div className="pangination-pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              pageNumber => (
                <span
                  aria-current={pageNumber === page ? 'page' : undefined}
                  className={`pangination-pages-item${pageNumber === page ? ' is-active' : ''}`}
                  key={pageNumber}
                  onClick={() => updateQuery({ page: String(pageNumber) })}
                  onKeyDown={event => {
                    if (['Enter', ' '].includes(event.key)) {
                      event.preventDefault();
                      updateQuery({ page: String(pageNumber) });
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  {pageNumber}
                </span>
              ),
            )}
          </div>
          <div
            aria-disabled={page === totalPages}
            aria-label="Next page"
            className="pangination-next pangination-icon"
            onClick={() => {
              if (page < totalPages) {
                updateQuery({ page: String(page + 1) });
              }
            }}
            onKeyDown={event => {
              if (page < totalPages && ['Enter', ' '].includes(event.key)) {
                event.preventDefault();
                updateQuery({ page: String(page + 1) });
              }
            }}
            role="button"
            tabIndex={page === totalPages ? -1 : 0}
          >
            <img src={NextIcon} alt=">" />
          </div>
        </nav>
      )}
    </div>
  );
};
