/* eslint-disable max-len */
import React, { useState } from 'react';
import accessories from '../../public/api/accessories.json';
import products from '../../public/api/products.json';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './Accessories.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

export const Accessories: React.FC = () => {
  const { dispatch } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(16);

  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort') || 'age';

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    setSearchParams({ sort: selectedSort });
  };

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

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
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

  return (
    <div className={styles.productList}>
      <h1>Accessories</h1>
      <p>{filteredProducts.length} models</p>
      <div className={styles.select}>
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

      <div className={styles.productGrid}>
        {currentProducts.map(product => {
          const accessory = accessories.find(
            accessory => accessory.id === product.itemId,
          );

          return (
            accessory && (
              <Link
                to={`/product/${accessory.id}`}
                key={accessory.id}
                className={styles.linkProduct}
              >
                <DiscountProductCard
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
        {pages.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={currentPage === page ? styles.activePage : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};
