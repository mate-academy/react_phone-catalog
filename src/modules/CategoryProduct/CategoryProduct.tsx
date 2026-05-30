import './CategoryProduct.module.scss';
import { Product } from '../../types/Product';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { ProductList } from '../../components/ProductList';
import { Spinner } from '../../components/Spinner';
import Chevron from '../../../public/img/icons/Chevron.svg';
import { Pagination } from '../../components/Pagination';
import { LinksRoad } from '../../components/LinksRoad';

type SortOption = 'age' | 'title' | 'cheapest';

export const CategoryProduct: React.FC = () => {
  const { category } = useParams<{
    category: 'phones' | 'accessories' | 'tablets';
  }>();

  const title = useMemo(() => {
    switch (category) {
      case 'phones':
        return 'Mobile phones';
      case 'accessories':
        return 'Accessories';
      case 'tablets':
        return 'Tablets';
      default:
        return '';
    }
  }, [category]);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSort = (searchParams.get('sort') as SortOption) || 'age';
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const perPageParam = searchParams.get('perPage');
  const perPage =
    perPageParam === 'all' ? 'all' : Number(perPageParam) || 'all';
  const [itemsOnPage, setItemsOnPage] = useState<'all' | number>(perPage);
  const [itemsDropdownOpen, setItemsDropdownOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category, itemsOnPage]);

  const sorted = useMemo(() => {
    if (sortBy === 'title') {
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'cheapest') {
      return [...products].sort((a, b) => {
        const pa = a.priceDiscount ?? a.priceRegular;
        const pb = b.priceDiscount ?? b.priceRegular;

        return pa - pb;
      });
    }

    return [...products];
  }, [products, sortBy]);

  const currentPosts = useMemo(() => {
    if (itemsOnPage === 'all') {
      return sorted;
    }

    const lastIndex = itemsOnPage * currentPage;
    const firstIndex = lastIndex - itemsOnPage;

    return sorted.slice(firstIndex, lastIndex);
  }, [sorted, itemsOnPage, currentPage]);

  const loadData = async () => {
    if (!category) {
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`/react_phone-catalog/api/${category}.json`);

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();

      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [category]);

  const handleSortSelect = (value: SortOption) => {
    setSortBy(value);

    const params: Record<string, string> = {};

    if (value !== 'age') {
      params.sort = value;
    }

    if (itemsOnPage !== 'all') {
      params.perPage = String(itemsOnPage);
    }

    setSearchParams(params);
    setDropdownOpen(false);
    setCurrentPage(1);
  };

  const handleItemsChange = (value: 'all' | number) => {
    setItemsOnPage(value);

    const params: Record<string, string> = {};

    if (sortBy !== 'age') {
      params.sort = sortBy;
    }

    if (value !== 'all') {
      params.perPage = String(value);
    }

    setSearchParams(params);
    setItemsDropdownOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    const params: Record<string, string> = {};

    if (sortBy !== 'age') {
      params.sort = sortBy;
    }

    if (itemsOnPage !== 'all') {
      params.perPage = String(itemsOnPage);
    }

    if (newPage !== 1) {
      params.page = String(newPage);
    }

    setSearchParams(params);
  };

  const emptyMessage = `There are no ${category} yet.`;

  return (
    <>
      {loading && <Spinner />}

      {error && (
        <div className="err">
          <div className="err_wrapper">
            <h2 className="err_text">Something went wrong 😢</h2>
            <button className="err_btn" onClick={loadData}>
              Reload
            </button>
          </div>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="product_top">
            <div className="container">
              <div className="product_top_wrapper">
                <LinksRoad category={category} />
                <h1 className="product_top_title">{title}</h1>
                <p className="product_top_counter">{sorted.length} models</p>

                {sorted.length > 0 && (
                  <div className="product_top_dropdowns">
                    <div className="product_top_dropdown product_top_dropdown--sorted">
                      <span className="product_top_dropdown_title">
                        Sort by:
                      </span>
                      <div className="product_top_custom-dropdown">
                        <button
                          className={
                            dropdownOpen
                              ? 'product_top_custom-dropdown__toggle product_top_custom-dropdown__toggle--open'
                              : 'product_top_custom-dropdown__toggle'
                          }
                          onClick={() => setDropdownOpen(prev => !prev)}
                        >
                          {sortBy === 'age' && 'Newest'}
                          {sortBy === 'title' && 'Alphabetically'}
                          {sortBy === 'cheapest' && 'Cheapest'}
                          <img
                            className={
                              !dropdownOpen
                                ? 'product_top_custom-dropdown_chevron'
                                : 'product_top_custom-dropdown_chevron--rotated'
                            }
                            src={Chevron}
                            alt="icon chevron"
                          />
                        </button>

                        {dropdownOpen && (
                          <ul className="product_top_custom-dropdown_menu">
                            <li
                              className="product_top_dropdown_select"
                              onClick={() => handleSortSelect('age')}
                            >
                              Newest
                            </li>
                            <li
                              className="product_top_dropdown_select"
                              onClick={() => handleSortSelect('title')}
                            >
                              Alphabetically
                            </li>
                            <li
                              className="product_top_dropdown_select"
                              onClick={() => handleSortSelect('cheapest')}
                            >
                              Cheapest
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="product_top_dropdown product_top_dropdown--items">
                      <span className="product_top_dropdown_title">
                        Items on page:
                      </span>
                      <div className="product_top_custom-dropdown">
                        <button
                          className={
                            itemsDropdownOpen
                              ? 'product_top_custom-dropdown__toggle product_top_custom-dropdown__toggle--open'
                              : 'product_top_custom-dropdown__toggle'
                          }
                          onClick={() => setItemsDropdownOpen(prev => !prev)}
                        >
                          {itemsOnPage === 'all' ? 'All' : itemsOnPage}
                          <img
                            className={
                              !itemsDropdownOpen
                                ? 'product_top_custom-dropdown_chevron'
                                : 'product_top_custom-dropdown_chevron--rotated'
                            }
                            src={Chevron}
                            alt="icon chevron"
                          />
                        </button>

                        {itemsDropdownOpen && (
                          <ul className="product_top_custom-dropdown_menu">
                            {([4, 8, 16, 'all'] as const).map(option => (
                              <li
                                key={option}
                                className="product_top_dropdown_select"
                                onClick={() => handleItemsChange(option)}
                              >
                                {option === 'all' ? 'All' : option}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {sorted.length > 0 ? (
            <>
              <ProductList products={currentPosts} />
              <Pagination
                totalPosts={sorted.length}
                itemsOnPage={itemsOnPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="container">
              <p>{emptyMessage}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
