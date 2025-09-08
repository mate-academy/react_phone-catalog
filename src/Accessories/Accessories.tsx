/* eslint-disable max-len */
import React, { useState } from 'react';
import accessories from '../../public/api/accessories.json';
import products from '../../public/api/products.json';
import styles from './Accessories.module.scss';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';
import { ProductCard } from '../ProductCard/ProductCard';

export const Accessories: React.FC = () => {
  const { dispatch } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const sortParam = searchParams.get('sort') || 'age';
  const itemsPerPage = Number(searchParams.get('perPage')) || 16;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortParam === 'age') {
      return new Date(b.year).getTime() - new Date(a.year).getTime();
    }

    if (sortParam === 'title') {
      return a.name.localeCompare(b.name);
    }

    if (sortParam === 'price') {
      return (a.price || a.fullPrice) - (b.price || b.fullPrice);
    }

    return 0;
  });

  const filteredProducts = sortedProducts.filter(product => {
    return accessories.some(accessory => accessory.id === product.itemId);
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    setSearchParams({ sort: selectedSort });
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const newSearchParam = new URLSearchParams(searchParams);

    newSearchParam.set('perPage', value);
    setSearchParams(newSearchParam);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (id: string) => {
    const product = accessories.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = accessories.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  function getVisiblePages(
    currentPage: number,
    totalPages: number,
    maxVisible: number = 4,
  ) {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);

      return pages;
    }

    if (currentPage <= 2) {
      pages.push(1, 2, 3, '...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      if (currentPage + 1 < totalPages) {
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages.filter(
      (item, idx, arr) => !(item === '...' && arr[idx - 1] === '...'),
    );
  }

  const visiblePages = getVisiblePages(currentPage, totalPages, 4);

  return (
    <div className={styles.product_list}>
      <div className={styles.navigation}>
        <button className={styles.button_home} onClick={handleBackClick}>
          <img src="img/Home.svg" alt="" />
        </button>
        <img src="img/Arrow-right.svg" alt="arrow" />
        <h2 className={styles.category}>Accessories</h2>
      </div>
      <h1 className={styles.title}>Accessories</h1>
      <p className={styles.count_models}>{filteredProducts.length} models</p>

      <div className={styles.select}>
        <div className={styles.select__group}>
          <p className={styles.select__title}>Sort by</p>
          <select
            className={styles.selection}
            onChange={handleSortChange}
            value={sortParam}
          >
            <option value="age">Newest</option>
            <option value="title">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
        </div>

        <div className={styles.select__group}>
          <p className={styles.select__title}>Items on page</p>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className={styles.selection}
          >
            <option value="16">16</option>
            <option value="32">32</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>

      <div className={styles.product_grid}>
        {currentProducts.map(product => {
          const accessory = accessories.find(
            productAccesory => productAccesory.id === product.itemId,
          );

          return (
            accessory && (
              <Link
                to={`/product/${accessory.id}`}
                key={accessory.id}
                className={styles.linkProduct}
              >
                <ProductCard
                  key={accessory.id}
                  id={accessory.id}
                  name={accessory.name}
                  price={accessory.priceRegular}
                  discountPrice={accessory.priceDiscount}
                  imageUrl={accessory.images[0]}
                  isFavorite={false}
                  screen={accessory.screen}
                  capacity={accessory.capacity}
                  ram={accessory.ram}
                  onAddToCart={() => handleAddToCart(accessory.id)}
                  onToggleFavorite={() => handleToggleFavorite(accessory.id)}
                />
              </Link>
            )
          );
        })}
      </div>
      <div className={styles.pagination}>
        <button
          className={styles.prev_page_button}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <img src="img/Arrow-left.svg" alt="prev" />
        </button>
        {visiblePages.map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(Number(page))}
              className={currentPage === page ? styles.active_page : ''}
            >
              {page}
            </button>
          ),
        )}
        <button
          className={styles.next_page_button}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <img src="img/Arrow-left.svg" alt="next" />
        </button>
      </div>
    </div>
  );
};
