import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import { request } from '../../utils/fetchResponse';
import { isCategory } from '../../utils/isCategory';

import { useStateContext } from '../../hooks/useStateContext';

import { Product } from '../../types/Product';
import { ProductDetailsData } from '../../types/ProductDetailsData';

import styles from './SearchWindow.module.scss';

type SearchResult = Product | ProductDetailsData;

export const SearchWindow = () => {
  const { pathname } = useLocation();
  const { setIsOpenWindow } = useStateContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('query') ?? '');
  const [searchDebounceValue, setSearchDebounceValue] = useState(value);
  const [searchProducts, setSearchProducts] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const category = pathname.split('/')[1];

  const handleClose = () => {
    setIsClosing(true);

    closeTimerRef.current = window.setTimeout(() => {
      setIsOpenWindow(false);
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const trimmed = value.trim();
      const params = new URLSearchParams(searchParams);

      if (trimmed) {
        params.set('query', trimmed);
      } else {
        params.delete('query');
      }

      params.delete('page');
      setSearchParams(params);
      setSearchDebounceValue(trimmed);
    }, 500);

    return () => clearTimeout(id);
  }, [value, searchParams, setSearchParams]);

  useEffect(() => {
    if (!searchDebounceValue) {
      setSearchProducts([]);
      setIsLoading(false);

      return;
    }

    let isCancelled = false;
    const normalizedQuery = searchDebounceValue.toLowerCase();

    setIsLoading(true);

    const productsRequest = isCategory(category)
      ? request<ProductDetailsData[]>(`/${category}.json`)
      : request<Product[]>('/products.json');

    productsRequest
      .then(productList => {
        if (isCancelled) {
          return;
        }

        const filteredProducts = productList.filter(product =>
          product.name.toLowerCase().includes(normalizedQuery),
        );

        setSearchProducts(filteredProducts);
      })
      .catch(() => {
        if (isCancelled) {
          return;
        }

        setSearchProducts([]);
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [searchDebounceValue, category]);

  return (
    <div
      className={`${styles['search-window']} ${isClosing ? styles['search-window--closing'] : ''}`}
    >
      <div className={styles['search-window__overlay']} onClick={handleClose}>
        <div
          className={styles['search-window__content']}
          onClick={event => event.stopPropagation()}
        >
          <label htmlFor="search" className={styles['search-window__label']}>
            <input
              id="search"
              name="search"
              type="search"
              value={value}
              onChange={event => setValue(event.target.value)}
              aria-label="Search Product"
              placeholder="Search Product..."
              className={styles['search-window__input']}
            />
          </label>

          <button
            type="button"
            className={styles['search-window__close-button']}
            onClick={() => setValue('')}
          >
            <IoClose className={styles['search-window__close-icon']} />
          </button>
        </div>

        {isLoading && <div className={styles['search-window__loader']} />}

        {searchProducts.length > 0 && (
          <ul className={styles['search-window__list']}>
            {searchProducts.map(product => {
              const isDetailsProduct = 'images' in product;

              const image = isDetailsProduct
                ? product.images[0]
                : product.image;

              const price = isDetailsProduct
                ? product.priceDiscount
                : product.price;

              const fullPrice = isDetailsProduct
                ? product.priceRegular
                : product.fullPrice;

              const routeId = isDetailsProduct ? product.id : product.itemId;

              return (
                <li key={product.id} className={styles['search-window__item']}>
                  <Link
                    to={`/${product.category}/${routeId}`}
                    className={styles['search-window__cart']}
                  >
                    <div className={styles['search-window__row']}>
                      <img
                        src={import.meta.env.BASE_URL + image}
                        alt={product.name}
                        className={styles['search-window__image']}
                      />

                      <h2 className={styles['search-window__title']}>
                        {product.name}
                      </h2>
                    </div>

                    <div className={styles['search-window__price']}>
                      <span className={styles['search-window__new-price']}>
                        ${price}
                      </span>

                      <span className={styles['search-window__fullprice']}>
                        ${fullPrice}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        {!isLoading && searchDebounceValue && searchProducts.length === 0 && (
          <p className={styles['search-window__message']}>
            Product was not found
          </p>
        )}
      </div>
    </div>
  );
};
