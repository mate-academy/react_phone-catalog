import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../../styles/ProductPage.scss';
import { Product } from '../../types/Product';
import { getProductsByCategory } from '../../api';
import { Categories } from '../../types/Categories';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Loader } from '../../components/Loader/Loader';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Pagination } from '../../components/Pagination/Pagination';
import { NoResults } from '../../components/NoResults/NoResults';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { itemsPerPageOptions, sortOptions } from '../../types/Option';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const sortBy = searchParams.get('sort') || 'age';
  const itemsOnPage = searchParams.get('perPage') || 'all';
  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const firstItem = +itemsOnPage * +currentPage - +itemsOnPage + 1;
  const lastItem = Math.min(+itemsOnPage * +currentPage, phones.length);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getProductsByCategory(Categories.Phones)
      .then(setPhones)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredPhones = useMemo(() => {
    let filtered = [...phones];

    if (query) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
    }

    switch (sortBy) {
      case 'age':
        return filtered.sort((a, b) => b.year - a.year);

      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));

      case 'price':
        return filtered.sort((a, b) => a.price - b.price);

      default:
        return filtered;
    }
  }, [phones, query, sortBy]);

  const visibleItems =
    itemsOnPage === 'all'
      ? filteredPhones
      : filteredPhones.slice(firstItem - 1, lastItem);

  const visiblePagination =
    (itemsOnPage !== 'all' || visibleItems.length > +itemsOnPage) &&
    visibleItems.length > 0;

  const currentSort = sortOptions.find(o => o.value === sortBy) || {
    label: '',
  };
  const currentPerPage = itemsPerPageOptions.find(
    o => o.value === itemsOnPage,
  ) || { label: '' };

  return (
    <div className="product">
      <div className="container">
        <div className="product__content">
          <div className="product__breadcrumbs">
            <Breadcrumbs category="phones" />
          </div>
          <h1 className="product__title title--h1">Mobile phones</h1>
          {!isLoading && (
            <p className="product__amount">{`${phones.length} models`}</p>
          )}

          {isLoading && <Loader />}

          {error && <h2 className="product__error">Page not found</h2>}

          {phones.length === 0 && !isLoading && (
            <NoResults
              message="It appears that the products are currently
              unavailable..."
              description="Rest assured,
              our team is actively addressing the supply issue."
              text="Please check back later."
            />
          )}

          {phones.length > 0 && !isLoading && (
            <>
              <div className="product__sorting">
                <Dropdown
                  currentOption={currentSort.label}
                  options={sortOptions}
                  label="Sort by"
                  param="sort"
                />

                <Dropdown
                  currentOption={currentPerPage.label}
                  options={itemsPerPageOptions}
                  label="Items on page"
                  param="perPage"
                />
              </div>

              {visibleItems.length === 0 && (
                <NoResults message="No search results..." />
              )}

              <div className="product__list" data-cy="productList">
                {visibleItems.map(phone => (
                  <ProductCard product={phone} key={phone.id} />
                ))}
              </div>

              {visiblePagination && (
                <Pagination
                  total={filteredPhones.length}
                  perPage={+itemsOnPage}
                  currentPage={+currentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
