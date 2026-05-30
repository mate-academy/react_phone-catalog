/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, resetStatusProducts } from '../../features/products';
import { setCurrentPage, setTotalPages } from '../../features/pagination';
import styles from '../products/products.module.scss';
import classNames from 'classnames';
import { ProductCard } from './productCard';
import Pagination from './pagination/pagination';
import { ProductDetail } from '../productDetail';
import { fetchPhones } from '../../features/phones';
import { Product } from '../../types/Product';
import { fetchTablets } from '../../features/tablets';
import { fetchAccessories } from '../../features/accessories';
import { CircleLoader } from 'react-spinners';
import { clearName } from '../../features/productName';

interface ProductsProps {
  category: string;
}

export const Products: React.FC<ProductsProps> = ({ category }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const allProducts = useSelector((state: RootState) => state.products.items);
  let status;
  const statusPhones = useSelector((state: RootState) => state.phones.status);
  const statusTablets = useSelector((state: RootState) => state.tablets.status);
  const statusAccessories = useSelector(
    (state: RootState) => state.accessories.status,
  );
  const productName = useSelector((state: RootState) => state.productName.item);

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

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value =
      event.target.value === 'all'
        ? product.length
        : parseInt(event.target.value);

    setItemsPerPage(value);
    dispatch(setCurrentPage(1));
    navigate(`/${category}?sort=${sortType}&perPage=${value}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    setSortType(selectedSort);
    dispatch(setCurrentPage(1));
    navigate(`/${category}?sort=${selectedSort}&perPage=${itemsPerPage}`);
  };

  const handleProductClick = (selectedProduct: Product) => {
    navigate(`/${category}/${selectedProduct.itemId}`);
  };

  return (
    <div className={styles.content}>
      <section className={classNames(styles.phones, 'container')}>
        <nav className={styles.phones_nav}>
          <Link to="/" className={styles.phones_home}></Link>
          {productName ? (
            <Link to={`/${category}`} className={styles.phones_category_link}>
              {category}
            </Link>
          ) : (
            <p className={styles.phones_category}>{category}</p>
          )}

          {productName && (
            <p className={styles.phones_category_name}>{productName}</p>
          )}
        </nav>

        <Routes>
          <Route path=":productId" element={<ProductDetail />} />
          <Route
            path="/"
            element={
              <>
                <h2 className={styles.phones_title}>{category}</h2>

                {status === 'loading' ? (
                  <div className={styles.loader}>
                    <CircleLoader size={150} color="#1c5a9b" />
                  </div>
                ) : (
                  <>
                    <p className={styles.phones_models}>
                      {product.length} models
                    </p>
                    <div className="flex">
                      <div>
                        <p className={styles.phones_filterText}>Sort by</p>
                        <select
                          name="sort"
                          value={sortType}
                          onChange={handleSortChange}
                          className={styles.phones_filter}
                        >
                          <option value="Newest">Newest</option>
                          <option value="Alphabetically">Alphabetically</option>
                          <option value="Cheapest">Cheapest</option>
                        </select>
                      </div>

                      <div className={styles.q}>
                        <p className={styles.phones_filterText}>
                          Items on page
                        </p>
                        <select
                          name="itemsPerPage"
                          value={
                            itemsPerPage === product.length
                              ? 'all'
                              : itemsPerPage
                          }
                          onChange={handleItemsPerPageChange}
                          className={styles.phones_filterPagina}
                        >
                          <option value="4">4</option>
                          <option value="8">8</option>
                          <option value="16">16</option>
                          <option value="all">All</option>
                        </select>
                      </div>
                    </div>
                    <ul className={styles.phones_list}>
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
              </>
            }
          />
        </Routes>
      </section>
    </div>
  );
};
