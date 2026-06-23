import { useEffect, useState } from 'react';
import styles from './ProductPage.module.scss';
import { ProductDemo } from '../../types/ProductDemo';
import { useSearchParams } from 'react-router-dom';
import { Footer } from '../Footer';
import { NavBar } from '../../shared/NavBar';
import { client } from '../../fetch/fetchGoods';
import { ProductList } from '../../shared/ProductList';
import { useMyContext } from '../../Context/ProductContexts';
import { BurgerMenu } from '../BurgerMenu';
import { Loader } from '../../shared/Loader';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { Direction } from '../../shared/Direction/Direction';
import { useMediaQuery } from '../../Services/UseMediaQuery';
import { breakpoints } from '../../Services/MediaBreakpoints';

type ProductPageProps = {
  typeOFProduct: 'phones' | 'tablets' | 'accessories';
};

export const ProductPage: React.FC<ProductPageProps> = ({ typeOFProduct }) => {
  const [filteredProducts, setFilteredProducts] = useState<ProductDemo[]>([]);
  const [filteredList, setFilteredList] = useState<ProductDemo[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMenuOpen, setIsLoading, isLoading, isError, setIsError } =
    useMyContext();

  const filterBy = searchParams.get('filterBy') || 'Newest';
  const itemsPerPage = Math.max(
    1,
    Number(searchParams.get('perPage')) || filteredProducts.length,
  );
  const currentPage = Number(searchParams.get('page')) || 1;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredList.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  useEffect(() => {
    const makeProductList = async () => {
      if (!['phones', 'tablets', 'accessories'].includes(typeOFProduct)) {
        setFilteredProducts([]);

        return;
      }

      try {
        setIsError(false);
        setIsLoading(true);

        const resultProducts = await client.fetchProducts();

        const filtered = (resultProducts as ProductDemo[])
          .filter(product => product.category === typeOFProduct)
          .sort((a, b) => b.year - a.year);

        setFilteredProducts(filtered);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    makeProductList();
  }, [typeOFProduct]);

  useEffect(() => {
    if (!filteredProducts.length) {
      return;
    }

    const sortedList = [...filteredProducts];

    switch (filterBy) {
      case 'Alphabetically':
        sortedList.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'Cheapest':
        sortedList.sort((a, b) => a.fullPrice - b.fullPrice);
        break;

      case 'Newest':
      default:
        sortedList.sort((a, b) => b.year - a.year);
        break;
    }

    setFilteredList(sortedList);
  }, [filteredProducts, filterBy]);

  const goToPage = (page: number) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', String(page));

      return params;
    });
  };

  const handleItemsPerPageChange = (
    ev: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('page', '1');
      params.set('perPage', ev.target.value);

      return params;
    });
  };

  const handleSortChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    if (filterBy === ev.target.value) {
      return;
    }

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('filterBy', ev.target.value);
      params.set('page', '1');

      return params;
    });
  };

  const isTablet = useMediaQuery(`(min-width: ${breakpoints.tablet}px)`);

  return (
    <>
      {isError ? (
        <>
          <NavBar />
          <ErrorMessage notResponding={true} />
          <Footer />
        </>
      ) : isMenuOpen ? (
        <BurgerMenu />
      ) : (
        <>
          <NavBar />
          <div className={styles.page}>
            <div className={styles.content}>
              <Direction page={typeOFProduct} />

              <h1 className={styles.page_title}>
                {typeOFProduct === 'phones'
                  ? 'Mobile phones'
                  : typeOFProduct === 'tablets'
                    ? 'Tablets'
                    : 'Accessories'}
              </h1>
              {!isLoading && (
                <span className={styles.page_quantity}>
                  {filteredProducts.length
                    ? `${filteredProducts.length} models`
                    : `There are no ${typeOFProduct} yet`}
                </span>
              )}

              {isLoading ? (
                <Loader />
              ) : filteredProducts.length > 0 ? (
                <>
                  <div className={styles.sort}>
                    <div className={styles.sort_type}>
                      <label htmlFor="sort_type" className={styles.sort_label}>
                        Sort by
                      </label>
                      <select
                        className={styles.sort_selector}
                        name="sort_type"
                        id="sort_type"
                        value={filterBy}
                        onChange={handleSortChange}
                      >
                        <option value="Newest">Newest</option>
                        <option value="Alphabetically">Alphabetically</option>
                        <option value="Cheapest">Cheapest</option>
                      </select>
                    </div>

                    <div
                      className={`${styles.sort_type} ${styles.itemsPerPage}`}
                    >
                      <label
                        htmlFor="items_quantity"
                        className={styles.sort_label}
                      >
                        Items on page
                      </label>
                      <select
                        className={styles.sort_selector}
                        name="items_quantity"
                        id="items_quantity"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                      >
                        <option value="16">16</option>
                        <option value="8">8</option>
                        <option value="4">4</option>
                        <option value={filteredProducts.length}>All</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.list}>
                    <ProductList data={currentItems} productPage={true} />
                  </div>

                  {/* pagination */}
                  {isTablet ? (
                    // pagination for tablet and desktop
                    filteredProducts.length !== itemsPerPage && (
                      <div className={styles.pagination}>
                        <button
                          disabled={currentPage === 1}
                          className={`${styles.pagination_button} ${styles.button_left}`}
                          onClick={() => goToPage(currentPage - 1)}
                        >
                          <img
                            src={'img/Buttons/Icons/white left.svg'}
                            alt="left"
                          />
                        </button>

                        <div className={styles.pages}>
                          <button
                            className={
                              currentPage === 1
                                ? styles.pages_active
                                : styles.pages_page
                            }
                            onClick={() => goToPage(1)}
                          >
                            1
                          </button>

                          {currentPage - 1 > 2 && (
                            <button className={styles.pages_page} disabled>
                              ...
                            </button>
                          )}

                          {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(
                              page =>
                                page > 1 &&
                                page < totalPages &&
                                Math.abs(page - currentPage) <= 1,
                            )
                            .map(page => (
                              <button
                                key={page}
                                className={
                                  currentPage === page
                                    ? styles.pages_active
                                    : styles.pages_page
                                }
                                onClick={() => goToPage(page)}
                              >
                                {page}
                              </button>
                            ))}

                          {totalPages > 4 && (
                            <>
                              <button className={styles.pages_page} disabled>
                                ...
                              </button>
                              <button
                                className={
                                  currentPage === totalPages
                                    ? styles.pages_active
                                    : styles.pages_page
                                }
                                onClick={() => goToPage(totalPages)}
                              >
                                {totalPages}
                              </button>
                            </>
                          )}
                        </div>

                        <button
                          disabled={currentPage === totalPages}
                          className={`${styles.pagination_button} ${styles.button_right}`}
                          onClick={() => goToPage(currentPage + 1)}
                        >
                          <img
                            src={'img/Buttons/Icons/white right.svg'}
                            alt="right"
                          />
                        </button>
                      </div>
                    )
                  ) : (
                    <div className={styles.pagination}>
                      <button
                        disabled={currentPage === 1}
                        className={`${styles.pagination_button} ${styles.button_left}`}
                        onClick={() => goToPage(currentPage - 1)}
                      >
                        <img
                          src={'img/Buttons/Icons/white left.svg'}
                          alt="left"
                        />
                      </button>

                      <button
                        disabled={currentPage === totalPages}
                        className={`${styles.pagination_button} ${styles.button_right}`}
                        onClick={() => goToPage(currentPage + 1)}
                      >
                        <img
                          src={'img/Buttons/Icons/white right.svg'}
                          alt="right"
                        />
                      </button>
                    </div>
                  )}
                  {/* end of pagination */}
                </>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
