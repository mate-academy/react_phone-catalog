import './Category.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { importCookie, exportCookie, deleteCookie } from '../cookie';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Product } from '../../interface';
import { getApi } from '../../getApi';
import { CategoryType } from '../../interface';
import { Link } from 'react-router-dom';

export const Category = () => {
  const defaultParams = {
    sort: 'newest',
    perPage: '4',
    order: 'asc',
  };

  const [searchParams, setSearchParams] = useSearchParams(defaultParams);

  const [itenProducts, setItenProducts] = useState<CategoryType[]>([]);

  const [products, setProducts] = useState<Product[]>([]);

  const [perPageBtns, setPerPageBtns] = useState(0);

  const [page, setPage] = useState(0);

  const [cartProducts, setCartProducts] = useState<Product[]>();

  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>();

  const params = useParams();

  const getCookie = () => {
    setCartProducts(importCookie('cart'));
    setFavoriteProducts(importCookie('favorities'));
  };

  useEffect(() => {
    getCookie();
  }, []);

  const setValues = (
    event: React.ChangeEvent<HTMLSelectElement>,
    set: string,
  ) => {
    const value = event.target.value;

    const url = new URLSearchParams(searchParams);

    switch (set) {
      case 'sort':
        url.set('sort', value);
        break;

      case 'pagination':
        url.set('perPage', value);
        break;

      case 'order':
        url.set('order', value);
        break;
    }

    setPage(0);

    setSearchParams(url);
  };

  const foundProductYear = useCallback(
    (product: CategoryType) => {
      const yearProduct = products.find(r => product.id === r.itemId);

      if (yearProduct) {
        return yearProduct.year;
      }

      return 0;
    },
    [products],
  );

  const changeType = (original: CategoryType) => {
    const especificProduct: Product | undefined = products.find(
      r => r.itemId === original.id,
    );

    return especificProduct;
  };

  const getData = useCallback(async () => {
    if (searchParams.size === 0) {
      setSearchParams({
        sort: 'newest',
        perPage: '4',
        order: 'asc',
      });
    }

    try {
      const newProducts = await getApi(params.category || '');

      const newArr = await getApi('products');

      switch (searchParams.get('sort')) {
        case 'alphabetically':
          newProducts.sort((a: CategoryType, b: CategoryType) =>
            a.name.localeCompare(b.name),
          );
          break;

        case 'newest':
          newProducts.sort(
            (a: CategoryType, b: CategoryType) =>
              foundProductYear(b) - foundProductYear(a),
          );
          break;

        case 'cheapest':
          newProducts.sort(
            (a: CategoryType, b: CategoryType) =>
              a.priceDiscount - b.priceDiscount,
          );
          break;
      }

      if (searchParams.get('order') === 'desc') {
        newProducts.reverse();
      }

      setProducts(newArr);
      setItenProducts(newProducts);
    } catch (e) {
      throw new Error('Erro no getData');
    }
  }, [params.category, searchParams, setSearchParams, foundProductYear]);

  const resetFilters = () => {
    setSearchParams(defaultParams);
    setPage(0);
    window.location.reload();
  };

  function letraMaiscula(texto: string | undefined) {
    if (!texto) {
      return '';
    }

    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  useEffect(() => {
    if (searchParams.get('perPage') === 'all' || !searchParams.get('perPage')) {
      setPerPageBtns(0);
    } else {
      setPerPageBtns(
        Math.ceil(itenProducts.length / Number(searchParams.get('perPage'))),
      );
    }
  }, [itenProducts, searchParams]);

  useEffect(() => {
    setPage(0);
  }, [params.category]);

  useEffect(() => {
    getData();
  }, [getData]);

  const currentPage =
    Math.floor(
      page /
        (searchParams.get('perPage') === 'all'
          ? 1
          : Number(searchParams.get('perPage'))),
    ) + 1;

  if (params.category === 'productMain') {
    return <></>;
  }

  return (
    <>
      <div className="pages-div">
        <h5>
          <FontAwesomeIcon icon={faHouse} />

          <span>&gt;</span>

          <span>{letraMaiscula(params.category)}</span>
        </h5>
      </div>

      <div className="textInformation-div">
        <h1>Mobile {letraMaiscula(params.category)}</h1>

        {itenProducts?.length > 0 && <h4>{itenProducts.length} models</h4>}

        <nav className="optionsNav">
          <div className="optionsSort-div">
            <span>Sort by</span>

            <select
              className="selectOption"
              value={searchParams.get('sort') || 'newest'}
              onChange={e => setValues(e, 'sort')}
            >
              <option value="newest">Newest</option>

              <option value="alphabetically">Alphabetically</option>

              <option value="cheapest">Cheapest</option>
            </select>
          </div>

          <div className="optionsPagination-div">
            <span>Itens on page</span>

            <select
              className="selectOption"
              value={searchParams.get('perPage') || '4'}
              onChange={e => setValues(e, 'pagination')}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="all">All</option>
            </select>
          </div>

          <div className="optionsOrder-div">
            <span>Order</span>

            <select
              className="selectOption"
              value={searchParams.get('order') || 'asc'}
              onChange={e => setValues(e, 'order')}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <button className="resetFiltes" onClick={resetFilters}>
            Reset all filters
          </button>
        </nav>
      </div>

      <div className="itenProducts-div">
        {itenProducts?.length > 0 && (
          <>
            {itenProducts
              .slice(
                page,
                searchParams.get('perPage') === 'all'
                  ? itenProducts.length
                  : page + Number(searchParams.get('perPage')),
              )
              .map(a => (
                <div className="product" key={a.id}>
                  <Link
                    to={`/productMain?productId=${a.id}`}
                    className="link-a"
                  >
                    <div className="porcentProduct">
                      -
                      {Math.ceil(
                        ((a.priceRegular - a.priceDiscount) / a.priceRegular) *
                          100,
                      )}
                      %
                    </div>

                    <img
                      src={a.images[0]}
                      className="product-image"
                      alt={a.name}
                    />

                    <h3 className="productName">{a.name}</h3>

                    <div className="productPrices">
                      <h4>R$ {a.priceRegular.toLocaleString('pt-BR')}</h4>

                      <h3>R$ {a.priceDiscount.toLocaleString('pt-BR')}</h3>
                    </div>

                    <div className="productsList">
                      <ul>
                        <li>Screen: {a.screen}</li>

                        <li>RAM: {a.ram}</li>

                        <li>Capacity: {a.capacity}</li>

                        <li>
                          Year:{' '}
                          {foundProductYear(a) > 0 ? foundProductYear(a) : ''}
                        </li>
                      </ul>
                    </div>
                  </Link>
                  <div className="addDiv">
                    <button
                      className={`addToCart ${cartProducts?.some(r => r.id === changeType(a)?.id) ? 'savedCart' : ''}`}
                      onClick={() => {
                        if (
                          !cartProducts?.some(r => r.id === changeType(a)?.id)
                        ) {
                          exportCookie(
                            changeType(a),
                            'cart',
                            changeType(a)?.id,
                          );
                        } else {
                          deleteCookie('cart', changeType(a)?.id);
                        }

                        getCookie();
                      }}
                    >
                      {cartProducts?.some(r => r.id === changeType(a)?.id)
                        ? 'ADDED TO CART'
                        : 'ADD TO CART'}
                    </button>
                    <button
                      className={`addFavorite ${favoriteProducts?.some(r => r.id === changeType(a)?.id) ? 'saved-favorite' : ''}`}
                      onClick={() => {
                        if (
                          !favoriteProducts?.some(
                            r => r.id === changeType(a)?.id,
                          )
                        ) {
                          exportCookie(
                            changeType(a),
                            'favorities',
                            changeType(a)?.id,
                          );
                        } else {
                          deleteCookie('favorities', changeType(a)?.id);
                        }

                        getCookie();
                      }}
                    >
                      ADD FAVORITE
                    </button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>

      {perPageBtns > 1 && (
        <div className="pagination-div">
          <span
            className="pagination-seta"
            onClick={() =>
              setPage(Math.max(0, page - Number(searchParams.get('perPage'))))
            }
          >
            &lt;
          </span>

          <span
            className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
            onClick={() => setPage(0)}
          >
            1
          </span>

          {currentPage > 3 && <span className="pagination-dots">...</span>}

          {Array.from(
            {
              length: Math.min(3, perPageBtns - 2),
            },
            (_, index) => {
              const pageNumber =
                currentPage <= 3 ? index + 2 : currentPage - 1 + index;

              if (pageNumber <= 1 || pageNumber >= perPageBtns) {
                return null;
              }

              return (
                <span
                  key={pageNumber}
                  className={`pagination-button ${
                    currentPage === pageNumber ? 'active' : ''
                  }`}
                  onClick={() =>
                    setPage(
                      (pageNumber - 1) * Number(searchParams.get('perPage')),
                    )
                  }
                >
                  {pageNumber}
                </span>
              );
            },
          )}

          {currentPage < perPageBtns - 2 && (
            <span className="pagination-dots">...</span>
          )}

          {perPageBtns > 1 && (
            <span
              className={`pagination-button ${
                currentPage === perPageBtns ? 'active' : ''
              }`}
              onClick={() =>
                setPage((perPageBtns - 1) * Number(searchParams.get('perPage')))
              }
            >
              {perPageBtns}
            </span>
          )}

          <span
            className="pagination-seta"
            onClick={() =>
              setPage(
                Math.min(
                  (perPageBtns - 1) * Number(searchParams.get('perPage')),
                  page + Number(searchParams.get('perPage')),
                ),
              )
            }
          >
            &gt;
          </span>
        </div>
      )}
    </>
  );
};
