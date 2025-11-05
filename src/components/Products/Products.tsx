import React, { useEffect, useState } from 'react';
import styles from './Products.module.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductItem } from '../ProductItem';
import { ProductType } from 'types/ProductType';
import { CartItem } from 'types/CartItem';
import { Loader } from '../Loader';

type Props = {
  type: string;
  handleAddToLiked: (item: number) => void;
  handleAddToCart: (item: number) => void;
  liked: number[];
  cart: CartItem[];
  handleRemoveFromCart: (item: number) => void;
};

export const Products: React.FC<Props> = ({
  type,
  handleAddToCart,
  handleAddToLiked,
  liked,
  cart,
  handleRemoveFromCart,
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const perPage = searchParams.get('perPage') || 'all';
  const page = Number(searchParams.get('page')) || 1;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const [productsRes] = await Promise.all([fetch('api/products.json')]);

        const [productsData] = await Promise.all([productsRes.json()]);

        setProducts(productsData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);

    setSearchParams(params);
  };

  const handleItemNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('perPage');
      params.delete('page');
    } else {
      params.set('perPage', value);
      params.set('page', '1');
    }

    setSearchParams(params);
  };

  const getSortedProducts = () => {
    const sortBy = searchParams.get('sort');
    const filtered = products.filter(product => product.category === type);

    if (!sortBy) {
      return filtered;
    }

    switch (sortBy) {
      case 'age':
        return [...filtered].sort((a, b) => b.year - a.year);
      case 'title':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      case 'price':
        return [...filtered].sort((a, b) => a.price - b.price);
      default:
        return filtered;
    }
  };

  const sortedProducts = getSortedProducts();
  const number = sortedProducts.length;

  const perPageNum = perPage === 'all' ? number : Number(perPage);
  const totalPages = Math.ceil(number / perPageNum);

  const startIndex = (page - 1) * perPageNum;
  const endIndex = startIndex + perPageNum;
  const visibleProducts =
    perPage === 'all'
      ? sortedProducts
      : sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.home}>
          <NavLink to="/">
            <img src="img/home_icon.svg" alt="button" />
          </NavLink>
          <NavLink to="/">
            <img src="img/arrow_right.svg" alt="button" />
          </NavLink>
          <h1 className={styles.home_text}>{type}</h1>
        </div>

        <h1 className={styles.title}>
          {type === 'phones' ? `Mobile phones` : type}
        </h1>
        <p className={styles.title_descript}>{number} models</p>

        <div className={styles.sorting}>
          <div>
            <p className={styles.sorting_title}>Sort by</p>
            <select
              className={styles.sorting_block}
              value={searchParams.get('sort') || ''}
              onChange={handleSortChange}
            >
              <option value="age">Newest</option>
              <option value="title">Alphabetically</option>
              <option value="price">Cheapest</option>
            </select>
          </div>
          <div>
            <p className={styles.sorting_title}>Items on page</p>
            <select
              className={styles.sorting_block}
              value={perPage}
              onChange={handleItemNumberChange}
            >
              <option value="all">all</option>
              <option value="16">16</option>
              <option value="8">8</option>
              <option value="4">4</option>
            </select>
          </div>
        </div>
      </div>

      {visibleProducts.length === 0 ? (
        <p>There are no {type} yet</p>
      ) : (
        <div className={styles.catalog}>
          {visibleProducts.map(product => (
            <ProductItem
              key={product.id}
              liked={liked}
              cart={cart}
              product={product}
              handleAddToCart={handleAddToCart}
              handleAddToLiked={handleAddToLiked}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
      )}

      {perPage !== 'all' && totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(1)}
            style={{
              backgroundColor: page === 1 ? '#313237' : 'white',
              color: page === 1 ? 'white' : '#313237',
              margin: '0 4px',
              padding: '6px 10px',
              border: '1px solid #ccc',
            }}
            className={`${styles.pagination_one} ${
              page === 1 ? styles['pagination_one--active'] : ''
            }`}
          >
            1
          </button>

          {page > 3 && <span>...</span>}

          {[...Array(totalPages)]
            .map((_, i) => i + 1)
            .filter(num => num !== 1 && num !== totalPages)
            .filter(num => num >= page - 1 && num <= page + 1)
            .map(num => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                style={{
                  backgroundColor: num === page ? '#313237' : 'white',
                  color: num === page ? 'white' : '#313237',
                  margin: '0 4px',
                  padding: '6px 10px',
                  border: '1px solid #ccc',
                }}
                className={`${styles.pagination_one} ${
                  page === 1 ? styles['pagination_one--active'] : ''
                }`}
              >
                {num}
              </button>
            ))}

          {page < totalPages - 2 && <span>...</span>}

          {totalPages > 1 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              style={{
                backgroundColor: page === totalPages ? '#313237' : 'white',
                color: page === totalPages ? 'white' : '#313237',
                margin: '0 4px',
                padding: '6px 10px',
                border: '1px solid #ccc',
              }}
              className={`${styles.pagination_one} ${
                page === 1 ? styles['pagination_one--active'] : ''
              }`}
            >
              {totalPages}
            </button>
          )}
        </div>
      )}
    </>
  );
};
