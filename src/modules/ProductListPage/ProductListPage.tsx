/* eslint-disable max-len */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { BounceLoader } from 'react-spinners';
import { AppDispatch, RootState } from '../../app/store/store';
import {
  fetchProducts,
  resetStatusProducts,
} from '../../app/reducers/products';
import { setCurrentPage, setTotalPages } from '../../app/reducers/pagination';
import { fetchAccessories } from '../../app/reducers/accessories';
import { fetchTablets } from '../../app/reducers/tablets';
import { fetchPhones } from '../../app/reducers/phones';
import { clearName } from '../../app/reducers/productName';
import { Product } from '../../types/Product';
import { ProductCard } from '../../shared/ProductCard/ProductCard';
import { Pagination } from '../../shared/Pagination/Pagination';
import home from '../../images/icons/home.svg';
import styles from './ProductListPage.module.scss';

type Props = {
  category: string;
};

const sortLabels: Record<string, string> = {
  age: 'Newest',
  title: 'Alphabetically',
  price: 'Cheapest',
};

export const ProductListPage: React.FC<Props> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const allProducts = useSelector((state: RootState) => state.products.items);
  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);

  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages,
  );

  const statusMap: Record<string, string> = {
    phones: statusPhones,
    tablets: statusTablets,
    accessories: statusAccessories,
  };

  const status = statusMap[category] || 'start';
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPageFromUrl = searchParams.get('perPage') || 'all';
  const sortTypeFromUrl = searchParams.get('sort') || 'age';
  const queryFromUrl = searchParams.get('query')?.trim().toLowerCase() || '';
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromUrl);
  const [product, setProduct] = useState<Product[]>([]);
  const [sortType, setSortType] = useState(sortTypeFromUrl);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [itemsDropdownOpen, setItemsDropdownOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const itemsDropdownRef = useRef<HTMLDivElement | null>(null);
  const categoryTitle = `${category[0].toUpperCase()}${category.slice(1)}`;

  useEffect(() => {
    setSortType(sortTypeFromUrl in sortLabels ? sortTypeFromUrl : 'age');
    setItemsPerPage(
      ['4', '8', '16', 'all'].includes(itemsPerPageFromUrl)
        ? itemsPerPageFromUrl
        : 'all',
    );
  }, [itemsPerPageFromUrl, sortTypeFromUrl]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetStatusProducts());
    dispatch(clearName());
    dispatch(fetchProducts());

    if (category === 'phones') {
      dispatch(fetchPhones());
    }

    if (category === 'tablets') {
      dispatch(fetchTablets());
    }

    if (category === 'accessories') {
      dispatch(fetchAccessories());
    }
  }, [dispatch, category]);

  useEffect(() => {
    const filteredProducts = allProducts.filter(pro => {
      const belongsToCategory = pro.category.trim() === category;
      const matchesQuery = pro.name.toLowerCase().includes(queryFromUrl);

      return belongsToCategory && matchesQuery;
    });

    setProduct(filteredProducts);

    const itemsPerPageCount =
      itemsPerPage === 'all'
        ? filteredProducts.length || 1
        : Number(itemsPerPage);
    const total =
      itemsPerPage === 'all'
        ? 1
        : Math.ceil(filteredProducts.length / itemsPerPageCount);

    dispatch(setTotalPages(Math.max(total, 1)));
  }, [allProducts, itemsPerPage, dispatch, category, queryFromUrl]);

  useEffect(() => {
    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      dispatch(setCurrentPage(pageFromUrl));
    } else {
      dispatch(setCurrentPage(1));
    }
  }, [pageFromUrl, totalPages, dispatch]);

  const sortedPhones = useMemo(() => {
    return [...product].sort((a, b) => {
      if (sortType === 'age') {
        return b.year - a.year;
      }

      if (sortType === 'title') {
        return a.name.localeCompare(b.name);
      }

      if (sortType === 'price') {
        return a.price - b.price;
      }

      return 0;
    });
  }, [product, sortType]);

  const getProductsForCurrentPage = () => {
    if (itemsPerPage === 'all') {
      return sortedPhones;
    }

    const itemsPerPageCount = Number(itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPageCount;

    const endIndex = startIndex + itemsPerPageCount;

    return sortedPhones.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));

      const nextParams = new URLSearchParams(searchParams);

      if (page === 1) {
        nextParams.delete('page');
      } else {
        nextParams.set('page', page.toString());
      }

      setSearchParams(nextParams);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    dispatch(setCurrentPage(1));

    const nextParams = new URLSearchParams(searchParams);

    if (value === 'all') {
      nextParams.delete('perPage');
    } else {
      nextParams.set('perPage', value);
    }

    nextParams.delete('page');
    setSearchParams(nextParams);

    setItemsDropdownOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);

    dispatch(setCurrentPage(1));

    const nextParams = new URLSearchParams(searchParams);

    nextParams.set('sort', value);
    nextParams.delete('page');

    setSearchParams(nextParams);

    setSortDropdownOpen(false);
  };

  const handleReload = () => {
    dispatch(fetchProducts());

    if (category === 'phones') {
      dispatch(fetchPhones());
    }

    if (category === 'tablets') {
      dispatch(fetchTablets());
    }

    if (category === 'accessories') {
      dispatch(fetchAccessories());
    }
  };

  const back = () => {
    navigate('..');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sortDropdownRef.current &&
      !sortDropdownRef.current.contains(event.target as Node) &&
      itemsDropdownRef.current &&
      !itemsDropdownRef.current.contains(event.target as Node)
    ) {
      setSortDropdownOpen(false);

      setItemsDropdownOpen(false);
    }
  };

  const toggleSortDropdown = () => {
    setSortDropdownOpen(prev => !prev);

    setItemsDropdownOpen(false);
  };

  const toggleItemsDropdown = () => {
    setItemsDropdownOpen(prev => !prev);

    setSortDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className={classNames(styles.productList, 'container')}>
      <div className={styles.productList_backContainer}>
        <img
          src={home}
          alt="home"
          className={styles.productList_backContainer_img}
          onClick={back}
        />

        <span className={styles.productList_backContainer_category}>
          {category}
        </span>
      </div>

      <h1 className={styles.productList_title}>{categoryTitle} page</h1>

      {status === 'loading' ? (
        <div className={styles.loader}>
          <BounceLoader size={150} color="#313237" />
        </div>
      ) : status === 'failed' ? (
        <div className={styles.productList_message}>
          <p>Something went wrong</p>
          <button type="button" onClick={handleReload}>
            Reload
          </button>
        </div>
      ) : (
        <>
          <p className={styles.productList_count}>{product.length} models</p>

          {product.length === 0 ? (
            <p className={styles.productList_message}>
              {queryFromUrl
                ? `There are no ${category} matching the query`
                : `There are no ${category} yet`}
            </p>
          ) : (
            <>
              <div className={styles.productList_filters}>
                <div className={styles.productList_container}>
                  <p className={styles.productList_filterText}>Sort by</p>

                  <div
                    ref={sortDropdownRef}
                    className={classNames(styles.productList_customDropdown)}
                    onClick={toggleSortDropdown}
                  >
                    <span>{sortLabels[sortType]}</span>

                    <span
                      className={classNames(styles.productList_dropdownIcon, {
                        [styles.open]: sortDropdownOpen,
                      })}
                    ></span>

                    {sortDropdownOpen && (
                      <div className={styles.productList_dropdownMenu}>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleSortChange('age');
                          }}
                        >
                          Newest
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleSortChange('title');
                          }}
                        >
                          Alphabetically
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleSortChange('price');
                          }}
                        >
                          Cheapest
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.productList_container}>
                  <p className={styles.productList_filterText}>Items on page</p>

                  <div
                    ref={itemsDropdownRef}
                    className={classNames(styles.productList_customDropdown)}
                    onClick={toggleItemsDropdown}
                  >
                    <span>{itemsPerPage === 'all' ? 'All' : itemsPerPage}</span>

                    <span
                      className={classNames(styles.productList_dropdownIcon, {
                        [styles.open]: itemsDropdownOpen,
                      })}
                    ></span>

                    {itemsDropdownOpen && (
                      <div className={styles.productList_dropdownMenu}>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleItemsPerPageChange('4');
                          }}
                        >
                          4
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleItemsPerPageChange('8');
                          }}
                        >
                          8
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleItemsPerPageChange('16');
                          }}
                        >
                          16
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleItemsPerPageChange('all');
                          }}
                        >
                          All
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <ul className={styles.productList_list}>
                {getProductsForCurrentPage().map(item => (
                  <ProductCard key={item.id} {...item} />
                ))}
              </ul>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </>
      )}
    </section>
  );
};
