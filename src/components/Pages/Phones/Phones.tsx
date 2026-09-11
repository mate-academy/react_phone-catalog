import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import style from './Phones.module.scss';
import { CustomSelect, SelectOption } from '../SelectOption';
import { useCart } from '../../CartContext/CartContext';
import { Loader } from '../../Loader/Loader';

interface Product {
  id: number;
  category: string;
  itemId: string;
  name: string;
  priceRegular: number;
  priceDiscount: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  images: string;
  namespaceId: string;
}

const sortOptions: SelectOption[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const pageSizeOptions: SelectOption[] = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const Phones: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const { cartIds, likedIds, toggleCart, toggleLike } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort') || 'newest';
  const pageValue = Number(searchParams.get('page')) || 1;
  const perPageValue = searchParams.get('perPage') || 'all';

  const sortBy = sortOptions.find(o => o.value === sortValue) || sortOptions[0];
  const pageSize =
    pageSizeOptions.find(o => o.value === perPageValue) || pageSizeOptions[3];

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setSearchParams(next);
  };

  const handleSortChange = (option: SelectOption) => {
    updateParams({
      sort: option.value === 'newest' ? null : option.value,
      page: null,
    });
  };

  const handlePageSizeChange = (option: SelectOption) => {
    updateParams({
      perPage: option.value === 'all' ? null : option.value,
      page: null,
    });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page: page === 1 ? null : String(page) });
  };

  const loadProducts = () => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${import.meta.env.BASE_URL}/api/phones.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load');
        }

        return response.json();
      })
      .then(setProducts)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];

    switch (sortBy.value) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'price':
        sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;

      case 'newest':
      default:
        sorted.sort((a, b) => b.year - a.year);
        break;
    }

    return sorted;
  }, [products, sortBy]);

  const perPage =
    pageSize.value === 'all' ? sortedProducts.length : Number(pageSize.value);

  const totalPages =
    pageSize.value === 'all' ? 1 : Math.ceil(sortedProducts.length / perPage);

  const visibleProducts = useMemo(() => {
    if (pageSize.value === 'all') {
      return sortedProducts;
    }

    const start = (pageValue - 1) * perPage;

    return sortedProducts.slice(start, start + perPage);
  }, [sortedProducts, pageSize, pageValue, perPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const setCurrentPage = (update: (current: number) => number) => {
    const current = Number(searchParams.get('page')) || 1;
    const nextPage = update(current);

    updateParams({
      page: nextPage === 1 ? null : String(nextPage),
    });
  };

  const handlePrevPage = () => {
    setCurrentPage(current => Math.max(current - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(current => Math.min(current + 1, totalPages));
  };

  return (
    <main>
      <div className={style.phones}>
        <div className={style.home}>
          <Link to="/">
            <img
              className={style.linkimg}
              src={`${import.meta.env.BASE_URL}/img/Home.png`}
              alt="Home"
            />
          </Link>
          <p className={style.linkText}>&#707;</p>
          <p className={style.linkText}>Phones</p>
        </div>

        <h1 className={style.phonesTitle}>Mobile phones</h1>
        <p className={style.phonesModel}>{products.length} models</p>

        <div className={style.phoneSort}>
          <div className={style.phoneSortBy}>
            <p className={style.sortName}>Sort by</p>
            <CustomSelect
              className={style.selectForm}
              value={sortBy}
              onChange={handleSortChange}
              options={sortOptions}
            />
          </div>

          <div className={style.phonePage}>
            <p className={style.sortName}>Items on page</p>
            <CustomSelect
              className={style.selectFormPage}
              value={pageSize}
              onChange={handlePageSizeChange}
              options={pageSizeOptions}
            />
          </div>
        </div>
        {isLoading && <Loader />}

        {hasError && (
          <div className={style.errorBlock}>
            <p>Something went wrong</p>
            <button type="button" onClick={loadProducts}>
              Reload
            </button>
          </div>
        )}

        {!isLoading && !hasError && products.length === 0 && (
          <p className={style.empty}>There are no phones yet</p>
        )}
        <ul className={style.list} ref={listRef}>
          {visibleProducts.map(product => (
            <li className={style.item} key={product.id}>
              <Link className={style.Link} to={`/product/${product.id}`}>
                <img
                  className={style.imgPhone}
                  src={`${import.meta.env.BASE_URL}/${product.images[0]}`}
                  alt={product.name}
                />
              </Link>
              <Link className={style.LinkName} to={`/product/${product.id}`}>
                {' '}
                <p className={style.name}>{product.name}</p>
              </Link>
              <p className={style.price}>
                ${product.priceDiscount}{' '}
                <span className={style.fullprice}>${product.priceRegular}</span>
              </p>
              <div className={style.characteristics}>
                <div className={style.characteristic}>
                  <p className={style.characteristicText}>Screen</p>
                  <p className={style.characteristicText}>Capacity</p>
                  <p className={style.characteristicText}>RAM</p>
                </div>
                <div className={style.characteristicItem}>
                  <p className={style.characteristicItemText}>
                    {product.screen}
                  </p>
                  <p className={style.characteristicItemText}>
                    {product.capacity}
                  </p>
                  <p className={style.characteristicItemText}>{product.ram}</p>
                </div>
              </div>
              <div className={style.buttons}>
                <button
                  type="button"
                  onClick={() => toggleCart(String(product.id))}
                  className={`${style.addButton} ${
                    cartIds.has(String(product.id)) ? style.addButtonClick : ''
                  }`}
                >
                  {cartIds.has(String(product.id)) ? 'Added' : 'Add to cart'}
                </button>
                <button
                  type="button"
                  className={`${style.likeButton} ${
                    likedIds.has(String(product.id))
                      ? style.likeButtonClick
                      : ''
                  }`}
                  onClick={() => toggleLike(String(product.id))}
                >
                  {likedIds.has(String(product.id)) ? (
                    <img
                      className={style.imgLike}
                      src={`${import.meta.env.BASE_URL}/img/liked.png`}
                      alt="Liked"
                    />
                  ) : (
                    <img
                      className={style.imgLike}
                      src={`${import.meta.env.BASE_URL}/img/heart-like.svg`}
                      alt="Like"
                    />
                  )}
                </button>
              </div>
            </li>
          ))}
        </ul>
        {pageSize.value !== 'all' && totalPages > 1 && (
          <ul className={style.pagination}>
            <li>
              <button
                type="button"
                className={style.arrowButton}
                onClick={handlePrevPage}
                disabled={pageValue === 1}
                aria-label="Previous page"
              >
                ‹
              </button>
            </li>

            {pageNumbers.map(page => (
              <li key={page}>
                <button
                  type="button"
                  className={`${style.pageButton} ${
                    page === pageValue ? style.pageButtonActive : ''
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}

            <li>
              <button
                type="button"
                className={style.arrowButton}
                onClick={handleNextPage}
                disabled={pageValue === totalPages}
                aria-label="Next page"
              >
                ›
              </button>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
};
