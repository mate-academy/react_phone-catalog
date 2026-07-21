import styles from './ProductList.module.scss';

import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductFilter } from '../ProductFilter/ProductFilter';
import { SortType } from '../../modules/shared/types/SortType';
import { ItemsPerPage } from '../../modules/shared/types/ItemsPerPage';
import { Product } from '../../modules/shared/types/Product';
import { useCart } from '../../modules/shared/contexts/CartContext';
import { useFavorites } from '../../modules/shared/contexts/FavoritesContext';
// eslint-disable-next-line max-len
import { getPaginationRange } from '../../modules/shared/utils/getPaginationRange';

type Props = {
  products: Product[];
  emptyMessage: string;
  showFilter?: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  emptyMessage,
  showFilter = true,
}) => {
  const { isInCart, toggleCart } = useCart();
  const { isFavorite, toggleFavorites } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = (searchParams.get('sort') as SortType) || 'newest';
  const itemsPerPage = (searchParams.get('perPage') as ItemsPerPage) || 'all';
  const page = Number(searchParams.get('page')) || 1;

  const setSortBy = (value: SortType) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const setItemsPerPage = (value: ItemsPerPage) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
    } else {
      params.set('perPage', value);
    }

    params.delete('page');
    setSearchParams(params);
  };

  const setPage = (value: number) => {
    const params = new URLSearchParams(searchParams);

    if (value === 1) {
      params.delete('page');
    } else {
      params.set('page', String(value));
    }

    setSearchParams(params);
  };

  const sortedProducts = useMemo(() => {
    if (!showFilter) {
      return products;
    }

    const copy = [...products];

    switch (sortBy) {
      case 'cheapest':
        return copy.sort((a, b) => a.price - b.price);
      case 'alphabetically':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
      default:
        return copy.sort((a, b) => b.year - a.year);
    }
  }, [products, sortBy, showFilter]);

  const totalPages =
    !showFilter || itemsPerPage === 'all'
      ? 1
      : Math.ceil(sortedProducts.length / Number(itemsPerPage));

  const visibleProducts = useMemo(() => {
    if (!showFilter || itemsPerPage === 'all') {
      return sortedProducts;
    }

    const perPage = Number(itemsPerPage);
    const start = (page - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, itemsPerPage, page, showFilter]);

  if (products.length === 0) {
    return <p className={styles.emptyMessage}>{emptyMessage}</p>;
  }

  return (
    <>
      {showFilter && (
        <ProductFilter
          sortBy={sortBy}
          onSortChange={setSortBy}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}

      <div className={styles.productsGrid}>
        {visibleProducts.map(product => {
          const isAddedToCart = isInCart(product.id);
          const isProductFavorite = isFavorite(product.id);

          return (
            <article key={product.id} className={styles.productCard}>
              <Link
                to={`/product/${product.itemId}`}
                className={styles.productCard__link}
              >
                <img
                  src={product.image}
                  alt="Product Image"
                  className={styles.productCard__img}
                />
              </Link>

              <div className={styles.productCard__body}>
                <Link
                  to={`/product/${product.itemId}`}
                  className={styles.productCard__title}
                >
                  {product.name}
                </Link>
                <div className={styles.productCard__price}>
                  <span>${product.price}</span>
                  <span className={styles.productCard__discount}>
                    ${product.fullPrice}
                  </span>
                </div>
                <hr className={styles.productCard__divider} />
                <div className={styles.productCard__description}>
                  <div className={styles.productCard__item}>
                    <span className={styles.productCard__property}>Screen</span>
                    <strong className={styles.productCard__value}>
                      {product.screen}
                    </strong>
                  </div>
                  <div className={styles.productCard__item}>
                    <span className={styles.productCard__property}>
                      Capacity
                    </span>
                    <strong className={styles.productCard__value}>
                      {product.capacity}
                    </strong>
                  </div>
                  <div className={styles.productCard__item}>
                    <span className={styles.productCard__property}>RAM</span>
                    <strong className={styles.productCard__value}>
                      {product.ram}
                    </strong>
                  </div>
                </div>
                <div className={styles.productCard__control}>
                  <button
                    className={`${styles.productCard__addButton} ${
                      isAddedToCart
                        ? styles['productCard__addButton--active']
                        : ''
                    }`}
                    onClick={() => toggleCart(product)}
                  >
                    {isAddedToCart ? 'Added to cart' : 'Add to cart'}
                  </button>
                  <button
                    className={styles.productCard__favoriteButton}
                    onClick={() => toggleFavorites(product.id)}
                  >
                    {isProductFavorite ? (
                      <img
                        src="img/icons/favorite-filled.png"
                        alt="Added to Favorites"
                        className={`${styles.productCard__favoriteIcon} ${styles['productCard__favoriteIcon--active']}`}
                      />
                    ) : (
                      <img
                        src="img/icons/favorite.png"
                        alt="Add to Favorites"
                        className={styles.productCard__favoriteIcon}
                      />
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {showFilter && itemsPerPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageArrow}
            onClick={() => setPage(Math.max(page - 1, 1))}
            disabled={page === 1}
          >
            ‹
          </button>

          {getPaginationRange(page, totalPages).map((item, index) =>
            item === 'dots' ? (
              <span key={`dots-${index}`} className={styles.pageDots}>
                ...
              </span>
            ) : (
              <button
                key={item}
                className={`${styles.pageButton} ${page === item ? styles['pageButton--active'] : ''}`}
                onClick={() => setPage(item)}
              >
                {item}
              </button>
            ),
          )}

          <button
            className={styles.pageArrow}
            onClick={() => setPage(Math.min(page + 1, totalPages))}
            disabled={page === totalPages}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};
