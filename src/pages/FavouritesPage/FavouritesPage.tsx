
import React, { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import styles from './FavouritesPage.module.scss';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../Context/FavoritesContext';
import { Pagination } from '../../components/Pagination/Pagination';

interface FavouritesPageProps {
  products: Product[];
}

export const FavouritesPage = ({ products = [] }: FavouritesPageProps) => {
  // синхронізація з localStorage
  const { favorites: favouriteIds } = useFavorites();

  // повні об'єкти обраних товарів
  const favouriteProducts = products.filter(product =>
    favouriteIds.includes(String(product.id)),
  );

  // стан сортування та пагінації
  const [sortBy, setSortBy] = useState<'year' | 'price' | 'name' | 'discount'>(
    'year',
  );
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState(false);

  const sortedFavourites = [...favouriteProducts].sort((a, b) => {
    switch (sortBy) {
      case 'year':
        return b.year - a.year;
      case 'price':
        return a.price - b.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount': {
        const fullPriceA = a.fullPrice || a.price || 1;
        const fullPriceB = b.fullPrice || b.price || 1;
        const discountA = ((fullPriceA - a.price) / fullPriceA) * 100;
        const discountB = ((fullPriceB - b.price) / fullPriceB) * 100;

        return discountB - discountA;
      }

      default:
        return 0;
    }
  });

  const effectiveItemsPerPage =
    itemsPerPage === 'all' ? sortedFavourites.length : itemsPerPage;
  const totalPages = Math.ceil(
    sortedFavourites.length / (effectiveItemsPerPage || 1),
  );

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * effectiveItemsPerPage;
  const endIndex = startIndex + effectiveItemsPerPage;
  const currentFavourites = sortedFavourites.slice(startIndex, endIndex);

  const handleSortToggle = () => setIsSortOpen(prev => !prev);
  const handleItemsPerPageToggle = () => setIsItemsPerPageOpen(prev => !prev);

  const handleSortSelect = (option: 'year' | 'price' | 'name' | 'discount') => {
    setSortBy(option);
    setIsSortOpen(false);
    setCurrentPage(1);
  };

  const handleItemsPerPageSelect = (
    option: '4' | '8' | '16' | '32' | 'all',
  ) => {
    setItemsPerPage(option === 'all' ? 'all' : Number(option));
    setIsItemsPerPageOpen(false);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const getSortLabel = (type: string) => {
    switch (type) {
      case 'year':
        return 'Newest';
      case 'price':
        return 'Price';
      case 'name':
        return 'Alphabetically';
      case 'discount':
        return 'Discount';
      default:
        return type;
    }
  };

  if (!products) {
    return (
      <div className={styles.container}>
        <Link to="/" className={styles.backLink}>
          &lt; Back to home
        </Link>
        <div className={styles.notFound}>
          <img
            src="img/product-not-found.png"
            alt="Product not found"
            className={styles.notFoundImage}
          />
          <h2>Favourites products not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: 'Favourites' }]} />
      <h1>Favourites</h1>
      <p className={styles.itemCount}>{favouriteIds.length} items</p>

      {favouriteProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>There are no favourite products</p>
          <img src="img/product-not-found.png" alt="No favourites" />
        </div>
      ) : (
        <>
          {/* дропдауни */}
          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <span>Sort by</span>
              <div className={styles.dropdownContainer}>
                <button
                  type="button"
                  className={`${styles.dropdownButton} ${isSortOpen ? styles.open : ''}`}
                  onClick={handleSortToggle}
                >
                  <span>{getSortLabel(sortBy)}</span>
                  <span className={styles.arrow}></span>
                </button>

                {isSortOpen && (
                  <div className={styles.dropdownMenu}>
                    <button
                      type="button"
                      onClick={() => handleSortSelect('year')}
                    >
                      Newest
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortSelect('price')}
                    >
                      Price
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortSelect('name')}
                    >
                      Alphabetically
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSortSelect('discount')}
                    >
                      Discount
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <span>Items on page</span>
              <div className={styles.dropdownContainer}>
                <button
                  type="button"
                  className={`${styles.dropdownButton} ${isItemsPerPageOpen ? styles.open : ''}`}
                  onClick={handleItemsPerPageToggle}
                >
                  <span>{itemsPerPage}</span>
                  <span className={styles.arrow}></span>
                </button>

                {isItemsPerPageOpen && (
                  <div className={styles.dropdownMenu}>
                    <button
                      type="button"
                      onClick={() => handleItemsPerPageSelect('4')}
                    >
                      4
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemsPerPageSelect('8')}
                    >
                      8
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemsPerPageSelect('16')}
                    >
                      16
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemsPerPageSelect('32')}
                    >
                      32
                    </button>
                    <button
                      type="button"
                      onClick={() => handleItemsPerPageSelect('all')}
                    >
                      All
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* сітка товарів */}
          <div className={styles.grid}>
            {currentFavourites.map(favour => (
              <ProductCard
                product={favour}
                key={favour.id}
              />
            ))}
          </div>

          {/* кнопки пагінації */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
