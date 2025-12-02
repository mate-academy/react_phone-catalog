import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CardItem } from '../../types/СardItem';
import { ProductCard } from '../productCard/productCard';
import './catalog.scss';

type CatalogProps<T> = {
  title: string;
  totalLabel?: string;
  items: T[];
  mapToCardItem: (item: T) => CardItem;
};
type SortBy = 'newest' | 'alphabetically' | 'cheapest';

const PER_PAGE_OPTIONS = [4, 8, 16];

const SORT_VALUES: SortBy[] = ['newest', 'alphabetically', 'cheapest'];

export function Catalog<T>({
  title,
  totalLabel,
  items,
  mapToCardItem,
}: CatalogProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  // sort
  const sortParam = searchParams.get('sort') as SortBy | null;
  const sortBy: SortBy = SORT_VALUES.includes(sortParam || ('' as SortBy))
    ? (sortParam as SortBy)
    : 'newest';

  // perPage
  const perPageParam = Number(searchParams.get('perPage'));
  const perPage = PER_PAGE_OPTIONS.includes(perPageParam) ? perPageParam : 16;

  // page
  const pageParam = Number(searchParams.get('page'));
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const updateSearchParams = (patch: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSortChange = (value: SortBy) => {
    updateSearchParams({
      sort: value,
      page: '1',
    });
  };

  const handlePerPageChange = (value: number) => {
    updateSearchParams({
      perPage: String(value),
      page: '1',
    });
  };

  const handlePageChange = (value: number) => {
    updateSearchParams({
      page: String(value),
    });
  };

  const cards = useMemo(() => items.map(mapToCardItem), [items, mapToCardItem]);

  const sortedCards = useMemo(() => {
    const copy = [...cards];

    switch (sortBy) {
      case 'alphabetically':
        copy.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cheapest':
        copy.sort((a, b) => a.price - b.price);
        break;
      case 'newest':
      default:
        // Sorted by addition to JSON
        break;
    }

    return copy;
  }, [cards, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedCards.length / perPage));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * perPage;
  const end = start + perPage;
  const visibleCards = sortedCards.slice(start, end);

  return (
    <section className="catalog">
      <div className="catalog_header">
        <h1 className="catalog__title">{title}</h1>
        {totalLabel && <p className="catalog__models">{totalLabel}</p>}
      </div>

      <div className="catalog__controls">
        <div className="catalog__control">
          <span className="catalog__controlLable">Sort by</span>
          <select
            className="catalog__select catalog__select--sort"
            value={sortBy}
            onChange={e => handleSortChange(e.target.value as SortBy)}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>
        <div className="catalog__control">
          <span className="catalog__controlLable">Items on page</span>
          <select
            className="catalog__select"
            value={perPage}
            onChange={e => handlePerPageChange(Number(e.target.value))}
          >
            {PER_PAGE_OPTIONS.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="catalog__list">
        {visibleCards.map(card => (
          <ProductCard key={card.id} item={card} />
        ))}
      </div>
      <div className="catalog__pagination">
        <button
          className="catalog__arrow"
          disabled={safePage === 1}
          onClick={() => handlePageChange(Math.max(1, safePage - 1))}
        >
          {'<'}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            className={
              'catalog__pageBtn' +
              (p === safePage ? ' catalog__pageBtn--active' : '')
            }
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}

        <button
          className="catalog__arrow"
          disabled={safePage === totalPages}
          onClick={() => handlePageChange(Math.min(totalPages, safePage + 1))}
        >
          {'>'}
        </button>
      </div>
    </section>
  );
}
