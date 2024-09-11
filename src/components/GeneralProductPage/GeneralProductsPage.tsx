import { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './GeneralProductsPage.module.scss';
import { GeneralItemsList } from '../GeneralItemsList';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { Product } from '../../types/products';
import { ucFirst } from '../adittionalFunc/additionalFunc';

export const GeneralProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedOrder, setSelectedOrder] = useState('Select');
  const [selectedAmount, setSelectedAmount] = useState('All');
  const category = useLocation().pathname.slice(1);
  const generalProducts = useAppSelector(state => state.products.items);
  const loadedGeneralProducts = useAppSelector(state => state.products.loaded);
  const errorGeneralProducts = useAppSelector(state => state.products.hasError);
  const filterOrder = searchParams.get('order') || '';
  const filterAmount = searchParams.get('perPage') || 'All';
  const [currentPage, setCurrentPage] = useState(1);
  const pageParam = searchParams.get('page') || '1';

  // Фільтровані продукти
  const specificProducts: Product[] = useMemo(() => {
    return generalProducts.filter(product => product.category === category);
  }, [generalProducts, category]);

  // Сортування та пагінація продуктів
  const handleSortFunction = () => {
    const sortedProducts = [...specificProducts];

    if (filterOrder === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (filterOrder === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (filterOrder === 'year') {
      sortedProducts.sort((a, b) => b.year - a.year);
    }

    const perPage =
      filterAmount === 'All'
        ? sortedProducts.length
        : parseInt(filterAmount, 10);

    const start = (+pageParam - 1) * perPage;
    const end = start + perPage;

    return sortedProducts.slice(start, end);
  };

  const visibleProducts = handleSortFunction();

  // Зміна сторінки
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
    setCurrentPage(newPage);
  };

  // Назви для фільтрів сортування
  const orderNames: { [key: string]: string } = {
    asc: 'Price Ascending',
    desc: 'Price Descending',
    year: 'Year of release',
    '': 'Select',
  };

  // Назви для кількості елементів на сторінці
  const amountNames: { [key: string]: string } = {
    '4': '4',
    '8': '8',
    '16': '16',
    All: 'All',
  };

  // Обробка вибору сортування або кількості елементів
  const handleProcedure = (type: 'order' | 'perPage', value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, value);

    if (type === 'order') {
      setSelectedOrder(orderNames[value]);
    } else if (type === 'perPage') {
      setSelectedAmount(amountNames[value]);
    }

    if (value === '') {
      params.delete(type);
      if (type === 'order') {
        setSelectedOrder(orderNames['']);
      } else if (type === 'perPage') {
        setSelectedAmount(amountNames.All);
      }
    }

    setSearchParams(params);
  };

  // Рендеринг компонентів
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

  // Обчислення кількості сторінок
  const totalPages =
    filterAmount === 'All'
      ? 1
      : Math.ceil(specificProducts.length / parseInt(filterAmount, 10));

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
            <a onClick={() => handleProcedure('order', '')}>
              <p>Select</p>
            </a>
            <a onClick={() => handleProcedure('order', 'asc')}>
              <p>Price Ascending</p>
            </a>
            <a onClick={() => handleProcedure('order', 'desc')}>
              <p>Price Descending</p>
            </a>
            <a onClick={() => handleProcedure('order', 'year')}>
              <p>Year of release</p>
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
            <a onClick={() => handleProcedure('perPage', 'All')}>
              <p>All</p>
            </a>
            <a onClick={() => handleProcedure('perPage', '4')}>
              <p>4</p>
            </a>
            <a onClick={() => handleProcedure('perPage', '8')}>
              <p>8</p>
            </a>
            <a onClick={() => handleProcedure('perPage', '16')}>
              <p>16</p>
            </a>
          </div>
        </div>
      </div>

      <GeneralItemsList filteredProducts={visibleProducts} />

      <div className={styles.pagination}>
        <div>
          {totalPages > 1 &&
            [...Array(totalPages).slice(+pageParam, +pageParam + 3)].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={
                    currentPage === index + 1 ? styles.activePage : styles.page
                  }
                >
                  {index + 1}
                </button>
              ),
            )}
        </div>
        <p className={styles.page_dots} onClick={() => handlePageChange(1)}>
          ...
        </p>
        <div>
          <button
            onClick={() => handlePageChange(totalPages)}
            className={
              currentPage === totalPages + 1 ? styles.activePage : styles.page
            }
          >
            {totalPages + 1}
          </button>
        </div>
      </div>
    </div>
  );
};
