import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productPage from './ProductPage.module.scss';
import { ProductsContext } from '../../context/ProductsContext';
import { getAllProducts } from '../../api/getProducts';
import { Breadcrumbs } from '../../modules/shared/Breadcrumbs';
import { ProductsList } from '../shared/ProductsList';
import { CategoryContext } from '../../context/CategoryContext';
import { Loader } from '../../components/Loader';
import { useSortedProducts } from '../../hooks/useSortedProducts';
import { Pagination } from './components/Pagination';

export const ProductPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortDropdownIsOpen, setSortDropdownIsOpen] = useState(false);
  const [itemsDropdownIsOpen, setItemsDropdownIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || 'age';
  const currentPage = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || 'all';

  const { allProducts, setAllProducts } = useContext(ProductsContext);

  const { currentCategory } = useContext(CategoryContext);

  const currentCategoryProducts = allProducts?.filter(
    product => product.category === currentCategory,
  );

  const filteredCategoryProducts = useSortedProducts(currentCategoryProducts);

  const isAll = perPage === 'all';

  const itemsPerPage = isAll
    ? filteredCategoryProducts.length
    : Number(perPage) || 0;

  const current = Number(currentPage) || 1;

  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = isAll
    ? filteredCategoryProducts.length
    : startIndex + itemsPerPage;

  const totalPages =
    itemsPerPage > 0
      ? Math.ceil(filteredCategoryProducts.length / itemsPerPage)
      : 0;

  const visibleProducts = filteredCategoryProducts.slice(startIndex, endIndex);

  const sortOptions = [
    { value: 'age', label: 'Newest' },
    { value: 'title', label: 'Alphabetically' },
    { value: 'price', label: 'Cheapest' },
  ];
  const itemsOnPage = ['32', '16', '8', '4', 'all'];

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(setAllProducts)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch products:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [setAllProducts]);

  function setTitle(product: string) {
    if (!product) {
      return '';
    }

    if (product === 'phones') {
      return 'Mobile phones';
    }

    return product[0].toUpperCase() + product.slice(1);
  }

  const title = currentCategory ? setTitle(currentCategory) : '';

  const handleSortDropdown = () => {
    setSortDropdownIsOpen(!sortDropdownIsOpen);
    setItemsDropdownIsOpen(false);
  };

  const handleItemsDropdown = () => {
    setItemsDropdownIsOpen(!itemsDropdownIsOpen);
    setSortDropdownIsOpen(false);
  };

  const handleOptionClick = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('sort', value);
    setSearchParams(newParams);

    setSortDropdownIsOpen(false);
  };

  const handleItemsClick = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', '1');
    newParams.set('perPage', value);
    setSearchParams(newParams);

    setSortDropdownIsOpen(false);
    setItemsDropdownIsOpen(false);
  };

  const handlePerPageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', String(page));
    setSearchParams(newParams);
  };

  return (
    <>
      <div className={productPage['product-page']}>
        <Breadcrumbs />
        <div className={productPage['product-page__wrapper']}>
          <h2 className={productPage['product-page__title']}>{title}</h2>
          {!isLoading && (
            <span className={productPage['product-page__quantity']}>
              {currentCategoryProducts.length > 0 &&
                `${currentCategoryProducts.length} models`}
            </span>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className={productPage['product-page__content']}>
            {currentCategoryProducts.length !== 0 && (
              <div className={productPage['product-page__filters']}>
                <div className={productPage['product-page__sort-container']}>
                  <label
                    htmlFor="sort-by"
                    className={
                      productPage['product-page__sort-container__name']
                    }
                  >
                    Sort by
                  </label>
                  <div className={productPage['product-page__dropdown']}>
                    <button
                      className={productPage['product-page__dropdown__trigger']}
                      onClick={handleSortDropdown}
                      name="sort-by"
                      aria-haspopup="listbox"
                      aria-controls="dropdownList"
                      aria-expanded={sortDropdownIsOpen}
                    >
                      {sortOptions.find(o => o.value === sortBy)?.label}
                      {sortDropdownIsOpen ? (
                        <img
                          src="img/icons/arrows/arrow-top-disabled.svg"
                          alt=""
                          className={
                            productPage['product-page__dropdown__trigger__icon']
                          }
                        />
                      ) : (
                        <img
                          src="img/icons/arrows/arrow-down.svg"
                          alt=""
                          className={
                            productPage['product-page__dropdown__trigger__icon']
                          }
                        />
                      )}
                    </button>
                    {sortDropdownIsOpen && (
                      <ul
                        className={productPage['product-page__dropdown__list']}
                        role="listbox"
                        tabIndex={-1}
                        aria-labelledby="dropdownButton"
                      >
                        {sortOptions.map(option => (
                          <li
                            key={option.value}
                            className={
                              productPage['product-page__dropdown__item']
                            }
                            onClick={() => handleOptionClick(option.value)}
                            role="option"
                            tabIndex={-1}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className={productPage['product-page__sort-container']}>
                  <label
                    htmlFor="items-on-page"
                    className={
                      productPage['product-page__sort-container__name']
                    }
                  >
                    Items on page
                  </label>
                  <div className={productPage['product-page__dropdown']}>
                    <button
                      className={productPage['product-page__dropdown__trigger']}
                      onClick={handleItemsDropdown}
                      name="items-on-page"
                      aria-haspopup="listbox"
                      aria-controls="dropdownList"
                      aria-expanded={itemsDropdownIsOpen}
                    >
                      {perPage}
                      {itemsDropdownIsOpen ? (
                        <img
                          src="img/icons/arrows/arrow-top-disabled.svg"
                          alt=""
                          className={
                            productPage['product-page__dropdown__trigger__icon']
                          }
                        />
                      ) : (
                        <img
                          src="img/icons/arrows/arrow-down.svg"
                          alt=""
                          className={
                            productPage['product-page__dropdown__trigger__icon']
                          }
                        />
                      )}
                    </button>
                    {itemsDropdownIsOpen && (
                      <ul
                        className={productPage['product-page__dropdown__list']}
                        role="listbox"
                        tabIndex={-1}
                        aria-labelledby="dropdownButton"
                      >
                        {itemsOnPage.map(option => (
                          <li
                            key={option}
                            className={
                              productPage['product-page__dropdown__item']
                            }
                            onClick={() => handleItemsClick(option)}
                            role="option"
                            tabIndex={-1}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
            {currentCategoryProducts.length === 0 ? (
              <div className={productPage['product-page__error-message']}>
                <h2
                  className={productPage['product-page__error-message__text']}
                >{`There are no ${currentCategory} yet`}</h2>
                <img
                  src="img/product-not-found.png"
                  alt=""
                  className={productPage['product-page__error-message__image']}
                />
              </div>
            ) : (
              <>
                <ProductsList products={visibleProducts ?? []} />

                <Pagination
                  totalPages={totalPages}
                  currentPage={+currentPage}
                  onPageChange={handlePerPageChange}
                />
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};
