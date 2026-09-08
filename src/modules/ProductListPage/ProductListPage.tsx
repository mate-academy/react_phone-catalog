import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { BounceLoader } from 'react-spinners';
import { AppDispatch, RootState } from '../../app/store';
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
import { ProductDetails } from '../ProductDetailsPage/ProductDetails';
import { ProductCard } from '../shared/ProductCard/ProductCard';
import { Pagination } from '../shared/Pagination/Pagination';
import home from '../../assets/img/icons/home-icon.png';
import styles from './ProductListPage.module.scss';

type Props = {
  category: string;
};

export const ProductListPage: React.FC<Props> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state: RootState) => state.products.items);
  let status;
  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);
  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );

  if (category === 'phones') {
    status = statusPhones;
  } else if (category === 'tablets') {
    status = statusTablets;
  } else if (category === 'accessories') {
    status = statusAccessories;
  } else {
    status = 'idle';
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageFromUrl = parseInt(queryParams.get('page') || '1');
  const itemsPerPageFromUrl = parseInt(queryParams.get('perPage') || '8');
  const sortTypeFromUrl = queryParams.get('sort') || 'Newest';

  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages,
  );

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
  }, [dispatch, category, location.pathname]);

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

  const sortedPhones = React.useMemo(() => {
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

      const urlParts = [`/${category}`];
      const params = new URLSearchParams();

      if (sortType !== 'Newest') {
        params.set('sort', sortType);
      }

      if (itemsPerPage !== 8) {
        params.set('perPage', itemsPerPage.toString());
      }

      params.set('page', page.toString());

      navigate(`${urlParts.join('')}?${params.toString()}`);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const parsedValue = value === 'all' ? product.length : parseInt(value, 10);

    setItemsPerPage(parsedValue);
    dispatch(setCurrentPage(1));
    navigate(`/${category}?sort=${sortType}&perPage=${parsedValue}`);
    setItemsDropdownOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortType(value);
    dispatch(setCurrentPage(1));
    navigate(`/${category}?sort=${value}&perPage=${itemsPerPage}`);
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
    if (sortDropdownOpen) {
      setSortDropdownOpen(false);
    } else {
      setSortDropdownOpen(true);
      setItemsDropdownOpen(false);
    }
  };

  const toggleItemsDropdown = () => {
    if (itemsDropdownOpen) {
      setItemsDropdownOpen(false);
    } else {
      setItemsDropdownOpen(true);
      setSortDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <React.Fragment>
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
                          onClick={() => handleSortChange('Newest')}
                        >
                          Newest
                        </div>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={() => handleSortChange('Alphabetically')}
                        >
                          Alphabetically
                        </div>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={() => handleSortChange('Cheapest')}
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
                          onClick={() => handleItemsPerPageChange('4')}
                        >
                          4
                        </div>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={() => handleItemsPerPageChange('8')}
                        >
                          8
                        </div>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={() => handleItemsPerPageChange('16')}
                        >
                          16
                        </div>
                        <div
                          className={styles.productList_dropdownItem}
                          onClick={() => handleItemsPerPageChange('all')}
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
    </React.Fragment>
  );
};
