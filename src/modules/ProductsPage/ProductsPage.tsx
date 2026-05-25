import './ProductsPage.scss';
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../../components/shared/ProductCard';
import { Product } from '../../types/Product';
import { Loader } from '../../components/shared/Loader';
import { Pagination } from './components/Pagination';
import { Breadcrumbs } from '../../components/shared/Breadcrumbs/Breadcrumbs';
import { useFavorite } from '../../context/FavoriteContext';

interface Props {
  category: string;
  products: Product[];
  loading: boolean;
  error: string;
}

export const ProductsPage: React.FC<Props> = ({
  category,
  products,
  loading,
  error,
}) => {
  const { favoriteItems } = useFavorite();
  const actualProducts = category === 'favorite' ? favoriteItems : products;

  const categoryNormalized =
    category.charAt(0).toUpperCase() + category.slice(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [sortBy, setSortBy] = useState('newest');
  const [isGridLoading, setIsGridLoading] = useState(false);

  const sortedProducts = [...actualProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.year - a.year;
      case 'oldest':
        return a.year - b.year;
      case 'cheapest':
        return a.price - b.price;
      case 'expensive':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  function handleItemsPerPage(event: React.ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(+event.target.value);
    setCurrentPage(1);
  }
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentProducts = sortedProducts.slice(firstItemIndex, lastItemIndex);

  useEffect(() => {
    setIsGridLoading(true);

    const timer = setTimeout(() => {
      setIsGridLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [category, itemsPerPage, currentPage, sortBy]);

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="page">
          <div className="page__content">
            <Breadcrumbs categoryName={category} />
            <h1 className="page__header">{categoryNormalized}</h1>
            <p className="page__amount">{actualProducts.length} models</p>

            {category !== 'favorite' ? (
              <div className="page__dropdowns">
                <div className="page__dropdown--container">
                  <label htmlFor="sort" className="page__dropdown--label">
                    Sort by
                  </label>
                  <select
                    className="page__dropdown--select"
                    name="sort"
                    id="dropdown__sort"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    <option className="page__dropdown--option" value="newest">
                      Newest
                    </option>
                    <option className="page__dropdown--option" value="oldest">
                      Oldest
                    </option>
                    <option className="page__dropdown--option" value="cheapest">
                      Cheapest
                    </option>
                    <option
                      className="page__dropdown--option"
                      value="expensive"
                    >
                      Expensive
                    </option>
                  </select>
                </div>
                <div className="page__dropdown--container">
                  <label
                    htmlFor="items-per-page"
                    className="page__dropdown--label"
                  >
                    Items on page
                  </label>
                  <select
                    className="page__dropdown--select"
                    name="items-per-page"
                    id="items-per-page"
                    value={itemsPerPage}
                    onChange={event => handleItemsPerPage(event)}
                  >
                    <option className="page__dropdown--option" value="16">
                      16
                    </option>
                    <option className="page__dropdown--option" value="32">
                      32
                    </option>
                    <option className="page__dropdown--option" value="64">
                      64
                    </option>
                  </select>
                </div>
              </div>
            ) : (
              ''
            )}
            <div className="page__products">
              {isGridLoading ? (
                <Loader />
              ) : (
                <div className="page__container">
                  {currentProducts.map(product => {
                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        oldPrice={true}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            productsLength={actualProducts.length}
            setIsGridLoading={setIsGridLoading}
          />
        </section>
      )}
    </>
  );
};
