import React, { useState } from 'react';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { Action } from '../../types/Status';
import { getNumbers } from '../../utils/getNumbers';
import { ProductCard } from '../ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';

type Props = {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  pages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  productsPerPage: Product[];
  products: Product[];
  sort: string;
  error: string;
  isLoaded: boolean;
};

export const Pagination: React.FC<Props> = ({
  setSort,
  itemsPerPage,
  setItemsPerPage,
  pages,
  currentPage,
  setCurrentPage,
  productsPerPage,
  products,
  sort,
  error,
  isLoaded,
}) => {
  const [isSortByOpen, setIsSortByOpen] = useState<boolean>(false);
  const [isItemsPerPageOpen, setIsItemsPerPageOpen] = useState<boolean>(false);

  const handleSortByChange = (
    newAction: string,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setSort(newAction);
    setOpen(false);
    setCurrentPage(1);
  };

  const handleChangeCurrentPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemPerPageChange = (
    newItemsPerPage: number,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setItemsPerPage(newItemsPerPage);
    setOpen(false);
    setCurrentPage(1);
  };

  return (
    <div className="pagination">
      <div className="pagination__choose">
        <div className="pagination__choose__block">
          <div className="pagination__choose__title">Sort by</div>
          <div
            className="pagination__choose__dropdown"
            data-cy="paginationLeft"
          >
            <div
              className={cn('pagination__choose__dropdown__block',
                { pagination__choose__dropdown__block__error: error })}
              role="button"
              tabIndex={0}
              aria-label="arrow-down"
              onClick={() => !error && setIsSortByOpen(!isSortByOpen)}
              onKeyDown={() => !error && setIsSortByOpen(!isSortByOpen)}
            >
              <div className="pagination__choose__dropdown__title">
                {sort}
              </div>
              {isSortByOpen ? (
                <div
                  className={cn(
                    'pagination__choose__dropdown__button arrow arrow-down',
                  )}
                />
              ) : (
                <div
                  className={cn(
                    'pagination__choose__dropdown__button arrow arrow-up',
                  )}
                />
              )}
            </div>
            <div
              className={cn('pagination__choose__dropdown__items', {
                visible: isSortByOpen,
              })}
            >
              <div
                role="button"
                aria-label="name"
                tabIndex={0}
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleSortByChange(Action.name, setIsSortByOpen)
                }
                onKeyDown={
                  () => handleSortByChange(Action.name, setIsSortByOpen)
                }
              >
                {Action.name}
              </div>
              <div
                role="button"
                aria-label="price"
                tabIndex={0}
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleSortByChange(Action.price, setIsSortByOpen)
                }
                onKeyDown={
                  () => handleSortByChange(Action.price, setIsSortByOpen)
                }
              >
                {Action.price}
              </div>
              <div
                role="button"
                aria-label="year"
                tabIndex={0}
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleSortByChange(Action.age, setIsSortByOpen)
                }
                onKeyDown={
                  () => handleSortByChange(Action.age, setIsSortByOpen)
                }
              >
                {Action.age}
              </div>
            </div>
          </div>
        </div>
        <div className="pagination__choose__block" data-cy="paginationRight">
          <div className="pagination__choose__title">Items Per Page</div>
          <div className="pagination__choose__dropdown">
            <div
              className={cn('pagination__choose__dropdown__block',
                { pagination__choose__dropdown__block__error: error })}
              role="button"
              tabIndex={0}
              aria-label="arrow-down"
              onClick={() => !error
                && setIsItemsPerPageOpen(!isItemsPerPageOpen)}
              onKeyDown={() => !error
                && setIsItemsPerPageOpen(!isItemsPerPageOpen)}
            >
              <div className="pagination__choose__dropdown__title">
                {itemsPerPage === products.length ? 'all' : itemsPerPage}
              </div>
              {isItemsPerPageOpen ? (
                <div
                  className={cn(
                    'pagination__choose__dropdown__button arrow arrow-down',
                  )}
                />
              ) : (
                <div
                  className={cn(
                    'pagination__choose__dropdown__button arrow arrow-up',
                  )}
                />
              )}
            </div>
            <div
              className={cn('pagination__choose__dropdown__items', {
                visible: isItemsPerPageOpen,
              })}
            >
              <div
                role="button"
                tabIndex={0}
                aria-label="4"
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleItemPerPageChange(4, setIsItemsPerPageOpen)
                }
                onKeyDown={
                  () => handleItemPerPageChange(4, setIsItemsPerPageOpen)
                }
              >
                4
              </div>
              <div
                role="button"
                tabIndex={0}
                aria-label="8"
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleItemPerPageChange(8, setIsItemsPerPageOpen)
                }
                onKeyDown={
                  () => handleItemPerPageChange(8, setIsItemsPerPageOpen)
                }
              >
                8
              </div>
              <div
                role="button"
                tabIndex={0}
                aria-label="16"
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleItemPerPageChange(16, setIsItemsPerPageOpen)
                }
                onKeyDown={
                  () => handleItemPerPageChange(16, setIsItemsPerPageOpen)
                }
              >
                16
              </div>
              <div
                role="button"
                aria-label="all"
                tabIndex={0}
                className="pagination__choose__dropdown__item"
                onClick={
                  () => handleItemPerPageChange(
                    products.length,
                    setIsItemsPerPageOpen,
                  )
                }
                onKeyDown={
                  () => handleItemPerPageChange(
                    products.length,
                    setIsItemsPerPageOpen,
                  )
                }
              >
                all
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoaded
        ? (<Loader />) : (
          <div className="pagination__list">
            <div className="pagination__list__items">
              {error ? (
                <p>Error occurred. Please try again.</p>
              ) : (
                <div className="grid-container">
                  {productsPerPage.map((phone) => (
                    <ProductCard
                      key={phone.id}
                      product={phone}
                      data-cy="cardsContainer"
                    />
                  ))}
                </div>
              )}
            </div>
            {
              pages > 1 && (
                <div className="pagination__pageList">
                  <button
                    type="button"
                    className={cn(
                      'pagination__pageList__item',
                      'pagination__pageList__item__button',
                      {
                        'pagination__pageList__item--disabled':
                          currentPage === 1,
                      },
                    )}
                    onClick={() => handleChangeCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <div
                      className={cn('arrow arrow-left', {
                        'arrow-left--disabled': currentPage === 1,
                      })}
                    />
                  </button>
                  {getNumbers(pages).map((number) => (
                    <div
                      role="button"
                      key={number}
                      tabIndex={0}
                      aria-label={`page-${number}`}
                      className={cn('pagination__pageList__item', {
                        'pagination__pageList__item--active':
                          number === currentPage,
                      })}
                      onClick={() => handleChangeCurrentPage(number)}
                      onKeyDown={() => handleChangeCurrentPage(number)}
                    >
                      {number}
                    </div>
                  ))}
                  <button
                    type="button"
                    className={cn(
                      'pagination__pageList__item',
                      'pagination__pageList__item__button',
                      {
                        'pagination__pageList__item--disabled':
                          currentPage === pages,
                      },
                    )}
                    onClick={() => handleChangeCurrentPage(currentPage + 1)}
                    disabled={currentPage === pages}
                  >
                    <div
                      className={cn('arrow arrow-right', {
                        'arrow-right--disabled': currentPage === pages,
                      })}
                    />
                  </button>
                </div>
              )
            }
          </div>
        )}
    </div>
  );
};
