import { Link, useLocation } from 'react-router-dom';
import styles from './GeneralProductsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Product } from '../../types/products';
import { useMemo, useState } from 'react';
import {
  setCurrentPage,
  setItemsPerPage,
} from '../../features/getProductsSlice';
import { GeneralItemsList } from '../GeneralItemsList.tsx';
import { Loader } from '../Loader';

export const GeneralProductsPage = () => {
  const dispatch = useAppDispatch();
  const [selectedOrder, setSelectedOrder] = useState('Newest');
  const [selectedAmount, setSelectedAmount] = useState('4');
  const category = useLocation().pathname.slice(1);

  const generalProducts = useAppSelector(state => state.products.items);
  const loadedGeneralProducts = useAppSelector(state => state.products.loaded);
  const errorGeneralProducts = useAppSelector(state => state.products.hasError);
  const itemsPerPage = useAppSelector(state => state.products.itemsPerPage);
  const currentPage = useAppSelector(state => state.products.currentPage);

  function ucFirst(str: string | undefined) {
    if (!str) {
      return str;
    }

    return str[0].toUpperCase() + str.slice(1);
  }

  const specificProducts: Product[] = useMemo(() => {
    return generalProducts.filter(product => product.category === category);
  }, [generalProducts, category]);

  const sortedProducts = useMemo(() => {
    switch (selectedOrder) {
      case 'Newest':
        return [...specificProducts].sort((a, b) => b.year - a.year);
      case 'Cheapest':
        return [...specificProducts].sort((a, b) => a.price - b.price);
      case 'Alphabetically':
        return [...specificProducts].sort((a, b) =>
          a.name.localeCompare(b.name),
        );
      default:
        return specificProducts;
    }
  }, [specificProducts, selectedOrder]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handleSort = (sortType: string) => {
    setSelectedOrder(sortType);
  };

  const handleItemsPerPageChange = (amount: string) => {
    setSelectedAmount(amount);
    dispatch(setItemsPerPage(Number(amount) || specificProducts.length));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const totalPages = Math.ceil(specificProducts.length / itemsPerPage);

  const pagesToShow = () => {
    const range = 2;
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > range + 1) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - range);
      const end = Math.min(totalPages - 1, currentPage + range);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - range) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  if (!loadedGeneralProducts) {
    return <Loader />;
  }

  if (errorGeneralProducts) {
    return (
      <div className={styles.errorMessage}>
        Failed to load products. Please try again.
      </div>
    );
  }

  if (generalProducts.length === 0) {
    return <p>There are no {category} yet.</p>;
  }

  return (
    <div className={styles.phonesPage}>
      <div className={styles.phonesPage_route}>
        <Link to={'/'}>
          <img src="img/icons/Home.svg" alt="home" />
        </Link>
        <img src="img/icons/Chevron-right-dis.svg" alt="home" />
        <p>{ucFirst(category)}</p>
      </div>

      <div>
        <h1 className={styles.phonesPage_title}>{ucFirst(category)}</h1>
        <p className={styles.phonesPage_amountOfPhones}>
          {specificProducts.length} models
        </p>
      </div>
      <div className={styles.phonesPage_filters}>
        <div className={styles.phonesPage_filters_dropdown}>
          <p className={styles.phonesPage_filters_dropdown_text}>Sort by</p>
          <a className={styles.phonesPage_filters_dropdown_dropbtn}>
            <p className={styles.phonesPage_filters_dropdown_dropbtn_text}>
              {selectedOrder}
            </p>
            <img src="img/icons/Chevron_down.svg" alt="" />
          </a>
          <div className={styles.phonesPage_filters_dropdown_dropdownContent}>
            <a onClick={() => handleSort('Newest')}>
              <p>Newest</p>
            </a>
            <a onClick={() => handleSort('Cheapest')}>
              <p> Cheapest</p>
            </a>
            <a onClick={() => handleSort('Alphabetically')}>
              <p>Alphabetically</p>
            </a>
          </div>
        </div>

        <div className={styles.phonesPage_filters_dropdown}>
          <p className={styles.phonesPage_filters_dropdown_text}>
            Items on page
          </p>
          <a className={styles.phonesPage_filters_dropdown_dropbtn}>
            <p className={styles.phonesPage_filters_dropdown_dropbtn_text}>
              {selectedAmount}
            </p>
            <img src="img/icons/Chevron_down.svg" alt="" />
          </a>
          <div className={styles.phonesPage_filters_dropdown_dropdownContent}>
            <a
              onClick={() =>
                handleItemsPerPageChange(String(specificProducts.length))
              }
            >
              <p>All</p>
            </a>
            <a onClick={() => handleItemsPerPageChange('4')}>
              <p>4</p>
            </a>
            <a onClick={() => handleItemsPerPageChange('8')}>
              <p>8</p>
            </a>
            <a onClick={() => handleItemsPerPageChange('16')}>
              <p>16</p>
            </a>
          </div>
        </div>
      </div>
      <GeneralItemsList filteredProducts={paginatedProducts} />

      <div className={styles.pagination}>
        {pagesToShow().map((page, index) =>
          typeof page === 'number' ? (
            <button
              key={index}
              className={`${styles.pagination__pageButton} ${
                currentPage === page ? styles.pagination__pageButton_press : ''
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ) : (
            <span key={index} className={styles.dots}>
              {page}
            </span>
          ),
        )}
      </div>
    </div>
  );
};
