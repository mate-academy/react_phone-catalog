import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products';
import styles from '../phones/phones.module.scss';
import classNames from 'classnames';
import { PhoneCard } from '../phones/phoneCard';
import { setCurrentPage, setTotalPages } from '../../features/pagination';
import Pagination from '../phones/pagination';
import { Product } from '../../types/Product';
import { fetchAccessories, setSelectedAcces } from '../../features/accessories';
import { ProductDetail } from '../productDetail';

export const Accessories: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const allProducts = useSelector((state: RootState) => state.products.items);
  const selectedAcces = useSelector(
    (state: RootState) => state.accessories.selectedAcces,
  );
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const totalPages = useSelector(
    (state: RootState) => state.pagination.totalPages,
  );
  const [itemsPerPage, setItemsPerPage] = React.useState(8);
  const [product, setProduct] = React.useState<Product[]>([]);
  const [sortType, setSortType] = React.useState('Newest');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAccessories());
  }, [dispatch]);

  useEffect(() => {
    const filteredProducts = allProducts.filter(
      pro => pro.category.trim() === 'accessories',
    );

    setProduct(filteredProducts);

    const total = Math.ceil(filteredProducts.length / itemsPerPage);

    dispatch(setTotalPages(total));
  }, [allProducts, itemsPerPage, dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [dispatch]);

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
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(event.target.value);
  };

  const handleProductClick = (selectedProduct: Product) => {
    dispatch(setSelectedAcces(selectedProduct.itemId));
  };

  return (
    <div className={styles.content}>
      <section className={classNames(styles.phones, 'container')}>
        <nav className={styles.phones_nav}>
          <a href="/" className={styles.phones_home}></a>
          <a href="/">Accessories</a>
        </nav>
        {selectedAcces ? (
          <ProductDetail selectedPhone={selectedAcces} />
        ) : (
          <>
            {' '}
            <h2 className={styles.phones_title}>Accessories</h2>
            <p className={styles.phones_models}>{product.length} models</p>
            <div className="flex">
              <div>
                <p>Sort by</p>
                <select
                  name="sort"
                  value={sortType}
                  onChange={handleSortChange}
                >
                  <option value="Newest">Newest</option>
                  <option value="Alphabetically">Alphabetically</option>
                  <option value="Cheapest">Cheapest</option>
                </select>
              </div>

              <div>
                <p>Items on page</p>
                <select
                  name="itemsPerPage"
                  value={itemsPerPage === product.length ? 'all' : itemsPerPage}
                  onChange={handleItemsPerPageChange}
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
                <PhoneCard
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
    </div>
  );
};
