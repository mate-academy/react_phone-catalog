/* eslint-disable max-len */
import React, { useState } from 'react';
import tablets from '../../public/api/tablets.json';
import products from '../../public/api/products.json';
import { DiscountProductCard } from '../HotPrices/DiscountProductCard/DiscountProductCard';
import styles from './Tablets.module.scss';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../UseCart/UseCart';

export const Tablets: React.FC = () => {
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
    return tablets.some(tablet => tablet.id === product.itemId);
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
    const product = tablets.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'ADD_TO_CART', product });
    }
  };

  const handleToggleFavorite = (id: string) => {
    const product = tablets.find(p => p.id === id);

    if (product) {
      dispatch({ type: 'TOGGLE_FAVORITE', product });
    }
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.productList}>
      <h1>Tablets</h1>
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
          const productTablets = tablets.find(
            tablet => tablet.id === product.itemId,
          );

          return (
            <Link
              to={`/product/${productTablets.id}`}
              key={productTablets.id}
              className={styles.linkProduct}
            >
              <DiscountProductCard
                key={productTablets.id}
                id={productTablets.id}
                name={productTablets.name}
                price={productTablets.priceRegular}
                discountPrice={productTablets.priceDiscount}
                imageUrl={productTablets.images[0]}
                isFavorite={false}
                screen={productTablets.screen}
                capacity={productTablets.capacity}
                ram={productTablets.ram}
                onAddToCart={() => handleAddToCart(productTablets.id)}
                onToggleFavorite={() => handleToggleFavorite(productTablets.id)}
              />
            </Link>
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
