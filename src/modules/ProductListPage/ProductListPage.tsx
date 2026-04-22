/* eslint-disable max-len */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
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
import { ProductDetails } from '../ProductDetailsPage/ProductDetails/ProductDetails';
import home from '../../images/icons/home.svg';
import styles from './ProductListPage.module.scss';

type Props = {
  category: string;
};

export const ProductListPage: React.FC<Props> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
  const itemsPerPageFromUrl = parseInt(searchParams.get('perPage') || '8', 10);
  const sortTypeFromUrl = searchParams.get('sort') || 'Newest';
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromUrl);
  const [product, setProduct] = useState<Product[]>([]);
  const [sortType, setSortType] = useState(sortTypeFromUrl);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [itemsDropdownOpen, setItemsDropdownOpen] = useState(false);
  const productId = location.pathname.split('/').pop();
  const isProductPage = productId !== category;
  const sortDropdownRef = useRef<HTMLDivElement | null>(null);
  const itemsDropdownRef = useRef<HTMLDivElement | null>(null);

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
    const filteredProducts = allProducts.filter(
      pro => pro.category.trim() === category,
    );

    setProduct(filteredProducts);

    const total = Math.ceil(filteredProducts.length / itemsPerPage);

    dispatch(setTotalPages(total));
  }, [allProducts, itemsPerPage, dispatch, category]);

  useEffect(() => {
    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      dispatch(setCurrentPage(pageFromUrl));
    } else {
      dispatch(setCurrentPage(1));
    }
  }, [pageFromUrl, totalPages, dispatch]);

  const sortedPhones = useMemo(() => {
    return [...product].sort((a, b) => {
      if (sortType === 'Newest') {
        return b.year - a.year;
      }

      if (sortType === 'Alphabetically') {
        return a.name.localeCompare(b.name);
      }

      if (sortType === 'Cheapest') {
        return a.price - b.price;
      }

      return 0;
    });
  }, [product, sortType]);

  const getProductsForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    return sortedPhones.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page));

      searchParams.set('page', page.toString());

      setSearchParams(searchParams);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const parsedValue = value === 'all' ? product.length : parseInt(value, 10);

    setItemsPerPage(parsedValue);
    dispatch(setCurrentPage(1));

    searchParams.set('perPage', parsedValue.toString());

    searchParams.set('page', '1');

    setSearchParams(searchParams);

    setItemsDropdownOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);

    dispatch(setCurrentPage(1));

    searchParams.set('sort', value);

    searchParams.set('page', '1');

    setSearchParams(searchParams);

    setSortDropdownOpen(false);
  };

  const handleProductClick = (selectedProduct: Product) => {
    navigate(`/${category}/${selectedProduct.itemId}`);
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
    <>
      {isProductPage ? (
        <ProductDetails category={category} />
      ) : (
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

          <h2 className={styles.productList_title}>{category}</h2>

          {status === 'loading' ? (
            <div className={styles.loader}>
              <BounceLoader size={150} color="#313237" />
            </div>
          ) : (
            <>
              <p className={styles.productList_count}>
                {product.length} models
              </p>

              <div className={styles.productList_filters}>
                <div className={styles.productList_container}>
                  <p className={styles.productList_filterText}>Sort by</p>

                  <div
                    ref={sortDropdownRef}
                    className={classNames(styles.productList_customDropdown)}
                    onClick={toggleSortDropdown}
                  >
                    <span>{sortType}</span>

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

                            handleSortChange('Newest');
                          }}
                        >
                          Newest
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleSortChange('Alphabetically');
                          }}
                        >
                          Alphabetically
                        </div>

                        <div
                          className={styles.productList_dropdownItem}
                          onClick={e => {
                            e.stopPropagation();

                            handleSortChange('Cheapest');
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
                    <span>
                      {itemsPerPage === product.length ? 'All' : itemsPerPage}
                    </span>

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
                  <ProductCard
                    key={item.id}
                    {...item}
                    onClick={() => handleProductClick(item)}
                  />
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};
