import { Link, useSearchParams } from 'react-router-dom';
import style from './CatalogPage.module.scss';
import '../../style/GlobalStyle.scss';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from '../../features/productsSlice';
import { ProductDescriptionBlock } from '../../interface/interface';
import { toggleFavorite } from '../../features/favoritesSlice';
import { addToCart } from '../../features/cartSlice';
import { Dropdown } from '../../app/Dropdown/Dropdown';
import classNames from 'classnames';
import { Loader } from '../../app/Loader/Loader';

const SORT_OPTIONS = [
  { value: 'age', label: 'Newest' },
  { value: 'title', label: 'Alphabetically' },
  { value: 'price', label: 'Cheapest' },
];

const PER_PAGE_OPTIONS = [
  { value: '4', label: '4' },
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: 'all', label: 'All' },
];

export const CatalogPage: React.FC<ProductDescriptionBlock> = ({
  category,
  title,
}) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const {
    items: products,
    loading,
    hasError,
  } = useAppSelector(state => state.products);
  const favoriteItems = useAppSelector(state => state.favorites.items) || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const perPage = searchParams.get('perPage') || 'all';
  const currentPage = Number(searchParams.get('page')) || 1;

  const updateParams = (
    newParamsObj: Record<string, string | number | null>,
  ) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newParamsObj).forEach(([key, value]) => {
      if (
        value === null ||
        (key === 'page' && value === 1) ||
        (key === 'perPage' && value === 'all')
      ) {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, value.toString());
      }
    });

    setSearchParams(updatedParams);
  };

  const handleSortChange = (newSort: string) => {
    updateParams({ sort: newSort, page: 1 });
  };

  const handlePerPageChange = (newPerPage: string) => {
    updateParams({ perPage: newPerPage, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    updateParams({ page: newPage });
  };

  const getPaginationRange = (selectedPage: number, totalPages: number) => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: (number | string)[] = [];

    if (selectedPage <= 2) {
      range.push(1, 2, 3, '...', totalPages);
    } else if (selectedPage >= totalPages - 1) {
      range.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(
        1,
        '...',
        selectedPage - 1,
        selectedPage,
        selectedPage + 1,
        '...',
        totalPages,
      );
    }

    return range;
  };

  const filteredProducts = products.filter(item => item.category === category);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'age':
        return b.year - a.year;
      case 'title':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const itemsPerPage =
    perPage === 'all' ? sortedProducts.length : Number(perPage);
  const totalPages =
    itemsPerPage > 0 ? Math.ceil(sortedProducts.length / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  if (hasError) {
    return (
      <div className="page">
        <div className="container">
          <p className="body-text">Something went wrong</p>
          <button
            type="button"
            className="button-standart"
            onClick={() => dispatch(fetchProducts())}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className={style['navigation-block']}>
          <Link to="/">
            <img src="img/icons/home.svg" alt="Home" />
          </Link>

          <img src="img/icons/arrowrightdark.svg" alt="" />
          <p className={classNames(style['title-navigation'], 'small-text')}>
            {title}
          </p>
        </div>
        <div>
          <h1 className={classNames(style.title, 'h1')}>{title} </h1>
          <p className={classNames(style['count-models'], 'small-text')}>
            {sortedProducts.length} models
          </p>
          <div className={style['sorted-block']}>
            <Dropdown
              label="Sort by"
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={handleSortChange}
              className={style.selectSort}
            />

            <Dropdown
              label="Items on page"
              options={PER_PAGE_OPTIONS}
              value={perPage}
              onChange={handlePerPageChange}
              className={style.selectItems}
            />
          </div>
        </div>
        {visibleProducts.length === 0 ? (
          <p className="body-text">There are no {category.toLowerCase()} yet</p>
        ) : (
          <div className={style.list}>
            {visibleProducts.map(product => {
              const isFavorite = favoriteItems.some(
                item =>
                  item.itemId === product.itemId || item.id === product.id,
              );
              const isInCart = cartItems.some(
                item =>
                  item.product.itemId === product.itemId ||
                  item.product.id === product.id,
              );

              return (
                <Link
                  to={`/${category}/${product.itemId}`}
                  key={product.id}
                  className={style['gadget-cart']}
                >
                  <div className={style['gadget-img-box']}>
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className={style['gadget-img']}
                    />
                  </div>
                  <p className={classNames(style['gadget-title'], 'body-text')}>
                    {product.name}
                  </p>

                  <div className={style['price-block']}>
                    <p className={classNames(style['gadget-price'], 'h3')}>
                      ${product.price}
                    </p>
                    {product.fullPrice > product.price && (
                      <p
                        className={classNames(style['gadget-price-sale'], 'h3')}
                      >
                        ${product.fullPrice}
                      </p>
                    )}
                  </div>

                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      Screen
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.screen}
                    </p>
                  </div>
                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      Capacity
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.capacity}
                    </p>
                  </div>
                  <div className={style['params-block']}>
                    <p
                      className={classNames(style['params-name'], 'small-text')}
                    >
                      RAM
                    </p>
                    <p
                      className={classNames(
                        style['params-value'],
                        'small-text',
                      )}
                    >
                      {product.ram}
                    </p>
                  </div>

                  <div className={style['add-buttons-block']}>
                    <button
                      type="button"
                      className={
                        isInCart ? 'button-standart active' : 'button-standart'
                      }
                      onClick={e => {
                        e.preventDefault();
                        dispatch(addToCart(product));
                      }}
                    >
                      {isInCart ? 'Added to cart' : 'Add to cart'}
                    </button>
                    <button
                      type="button"
                      className={`${style['favourites-buttons']} ${isFavorite ? style.active : ''}`}
                      onClick={e => {
                        e.preventDefault();
                        dispatch(toggleFavorite(product));
                      }}
                    >
                      {isFavorite ? (
                        <img
                          src="img/icons/favouritesActive.svg"
                          alt="Active favourite"
                        />
                      ) : (
                        <img
                          src="img/icons/favourites.svg"
                          alt="Add to favourites"
                        />
                      )}
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {perPage !== 'all' && totalPages > 1 && (
          <div className={style['pages-block']}>
            <button
              type="button"
              className="button-arrow"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <img src="img/icons/arrowleft.svg" alt="Previous" />
            </button>

            <div className={style['pages-number-block']}>
              {getPaginationRange(currentPage, totalPages).map(
                (page, index) => {
                  if (page === '...') {
                    return (
                      <span key={`dots-${index}`} className="button-page dots">
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      className={`button-page ${currentPage === page ? 'active' : ''}`}
                      onClick={() => handlePageChange(Number(page))}
                    >
                      {page}
                    </button>
                  );
                },
              )}
            </div>

            <button
              type="button"
              className="button-arrow"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <img src="img/icons/arrowright.svg" alt="Next" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
