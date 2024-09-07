import { useState } from 'react';
import { Category } from '../../types/Category';
import { ProductCard } from '../base/ProductCard/ProductCard.component';
import { ProductSummary } from '../../types/ProductSummary';
import { getPageNumbers } from '../../utils/getPageNumbers';

type Props = {
  category: Category;
  pagination?: boolean;
};

export const ProductGrid: React.FC<Props> = ({ category, pagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsSortedBy, setProductsSortedBy] = useState<ProductSummary[]>(
    [],
  );
  const [perPage, setPerPage] = useState<string>('all');
  const perPageSelect = perPage !== 'all' ? +perPage : productsSortedBy.length;
  const numberPages: number[] = getPageNumbers(
    productsSortedBy.length,
    perPageSelect,
  );
  const currentIndex = numberPages.indexOf(currentPage);
  const fromIndex = currentIndex * perPageSelect;
  const toIndex =
    fromIndex + perPageSelect <= productsSortedBy.length
      ? fromIndex + perPageSelect
      : productsSortedBy.length;

  const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(e.target.value);
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case 'newest':
        setProductsSortedBy(
          category.products.toSorted((a, b) => b.year - a.year),
        );
        break;
      case 'alphabetically':
        setProductsSortedBy(
          category.products.toSorted((a, b) => b.name.localeCompare(a.name)),
        );
        break;
      case 'chepeast':
        setProductsSortedBy(
          category.products.toSorted((a, b) => b.price - a.price),
        );
        break;
    }
  };

  return (
    <>
      {pagination && (
        <article className="productGrid__options">
          <div className="productGrid__options-sort">
            <span>Sort by:</span>
            <select onSelect={handleSortBy} value={productsSortedBy}>
              <option value={'newest'}>Newest</option>
              <option value={'alphabetically'}>Alphabetically</option>
              <option value={'cheapest'}>Cheapest</option>
            </select>
          </div>
          <div className="productGrid__options-perPage">
            <span>Items on page:</span>
            <select onSelect={handlePerPage} value={perPage}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">all</option>
            </select>
          </div>
        </article>
      )}
      <article className="productGrid">
        {productsSortedBy.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showDiscount={false}
          />
        ))}
      </article>

      <p className="lead" data-cy="info">
        Page {currentPage} (items {fromIndex + 1} - {toIndex} of{' '}
        {productsSortedBy.length})
      </p>
    </>
  );
};
