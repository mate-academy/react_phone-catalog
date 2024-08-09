import { useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { GoHome } from 'react-icons/go';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setCategoryId } from '../../../redux/slices/categoriesSlice';
import {
  setCurrentPage,
  setItemsPerPage,
  setSortOption,
  sortTypes,
} from '../../../redux/slices/filterSlice';
import { Cart } from '../../components/Cart';
import styles from './categories.module.scss';

const categories = ['home', 'phones', 'tablets', 'accessories'];

export default function Categories() {
  const dispatch = useDispatch();
  const { categoryId } = useSelector(state => state.category);
  const products = useSelector(state => state.products.products);
  const { sortOption, itemsPerPage, currentPage } = useSelector(
    state => state.filter,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const savedCategoryId = localStorage.getItem('categoryId');
    if (savedCategoryId) {
      dispatch(setCategoryId(Number(savedCategoryId)));
    }

    const totalPages = Math.ceil(
      products.filter(phone => phone.category === categories[categoryId])
        .length / itemsPerPage,
    );

    if (currentPage < 1 || currentPage > totalPages) {
      dispatch(setCurrentPage(1));
    }

    const sortParam = searchParams.get('sort');
    const itemsParam = searchParams.get('items');

    if (sortParam) {
      dispatch(setSortOption(sortParam));
    }

    if (itemsParam) {
      dispatch(setItemsPerPage(Number(itemsParam)));
    }
  }, [dispatch, categoryId, itemsPerPage, products, currentPage, searchParams]);

  const countByCategory = category =>
    products.filter(product => product.category === category).length;

  const handleSortChange = e => {
    const value = e.target.value;
    dispatch(setSortOption(value));
    searchParams.set('sort', value);
    setSearchParams(searchParams);
  };

  const handleItemsPerPageChange = e => {
    const value = parseInt(e.target.value);
    dispatch(setItemsPerPage(value));
    searchParams.set('items', value);
    setSearchParams(searchParams);
  };

  const sortPhones = (products, option) => {
    switch (option) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'new':
        return [...products].sort(
          (a, b) => new Date(b.year) - new Date(a.year),
        );
      case 'ABC':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  };

  const paginatedPhones = (products, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  const filteredPhones = products.filter(
    phone => phone.category === categories[categoryId],
  );

  const sortedPhones = sortPhones(filteredPhones, sortOption);

  const displayedPhones = paginatedPhones(
    sortedPhones,
    currentPage,
    itemsPerPage,
  );

  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);

  const handlePageChange = newPage => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setCurrentPage(newPage));
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };

  const getPaginationPages = (current, total) => {
    if (current < 1 || current > total) {
      dispatch(setCurrentPage(1));
      return [1];
    }

    const delta = 1;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      rangeWithDots.push('...');
    }

    for (let i of range) {
      rangeWithDots.push(i);
    }

    if (current + delta < total - 1) {
      rangeWithDots.push('...');
    }

    return [1, ...rangeWithDots, total];
  };

  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <div className={styles.root}>
      <div className={styles.crumbs}>
        <GoHome size={22} />
        <FaAngleRight className={styles.crumbs__arrow} size={18} />
        <p className={styles.pageName}>{categories[categoryId]}</p>
      </div>
      <div className={styles.main}>
        <h2>{categories[categoryId]}</h2>
        <p>{countByCategory(categories[categoryId])} models</p>
      </div>
      <div>
        <ul className={styles.sort}>
          <li className={styles.sort__By}>
            <p>Sort by</p>
            <select
              name="sortOption"
              value={sortOption}
              onChange={handleSortChange}
            >
              {sortTypes.map(type => (
                <option key={type.sortProperty} value={type.sortProperty}>
                  {type.name}
                </option>
              ))}
            </select>
          </li>
          <li className={styles.sort__By}>
            <p>Items on page</p>
            <select
              name="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
            </select>
          </li>
        </ul>
      </div>
      <div className={styles.phonesList}>
        {displayedPhones.length > 0 ? (
          displayedPhones.map(products => (
            <Cart products={products} key={products.id} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)}>
          <FaAngleLeft size={16} />
        </button>
        <ul>
          {paginationPages.map((page, index) => (
            <li
              key={index}
              className={page === currentPage ? styles.activePage : ''}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
            >
              {page}
            </li>
          ))}
        </ul>
        <button onClick={() => handlePageChange(currentPage + 1)}>
          <FaAngleRight size={16} />
        </button>
      </div>
    </div>
  );
}
