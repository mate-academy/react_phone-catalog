import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useState } from 'react';
import { Phone } from '../../types/Phone';
import { ProductCard } from '../ProductCard';
import { Loader } from '../Loader';
import { NoSearchResults } from '../NoSearchResults/NoSearchResults';
import './ProductList.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { newPerPage, newSort } from '../../store/features/filterParams';

type SortBy = {
  age: string,
  name: string,
  price: string,
};

type Props = {
  visiblePhones: Phone[],
  isLoading: boolean,
  isError: boolean,
  sortOptions: { [key: string]: string }
  perPageOptions: { [key: string]: string }
  handleSelect: (key: string, value: string) => URLSearchParams,
};

export const ProductList: React.FC<Props> = ({
  visiblePhones,
  isLoading,
  isError,
  sortOptions,
  perPageOptions,
  handleSelect,
}) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '';
  const [isOpen, setIsOpen] = useState<'sort' | 'items' | false>(false);
  const {
    storedSort: sort,
    storedPerPage: perPage,
  } = useAppSelector(state => state.filterBy);
  const dispatch = useAppDispatch();

  const currentPage = page ? +page : 1;
  const currentPerPage = perPage ? +perPage : 16;
  const lastIndexOfPage = currentPage * currentPerPage;
  const startIndexOfPage = lastIndexOfPage - currentPerPage;

  const currentSort = sort
    ? sortOptions[sort as keyof SortBy]
    : sortOptions.age;

  const handleOnBlur = (
    event: React.FocusEvent<HTMLButtonElement, Element>,
  ) => {
    if (event.relatedTarget && event.relatedTarget.classList
      .contains('dropdown__link')) {
      return;
    }

    setIsOpen(false);
  };

  return (
    <>
      {visiblePhones.length > 0 && (
        <div className="selects-container">
          <div className="select">
            <p className="select__paragraph">Sort by</p>

            <div className="dropdown">
              <button
                type="button"
                className="dropdown__btn"
                onBlur={(event) => handleOnBlur(event)}
                onClick={() => setIsOpen(current => (
                  current === 'sort' ? false : 'sort'
                ))}
              >
                <span>
                  {currentSort}
                </span>

                <span>
                  <i
                    className={classNames('dropdown__arrow dropdown__arrow--up',
                      { 'dropdown__arrow--down': isOpen === 'sort' })}
                  />
                </span>
              </button>
              <div
                className={classNames(
                  'dropdown__list',
                  { 'dropdown__list--is-active': isOpen === 'sort' },
                )}
              >
                {Object.entries(sortOptions).map(([key, title]) => (
                  <div
                    className="dropdown__item"
                    key={title}
                  >
                    <Link
                      to={{ search: handleSelect('sort', key).toString() }}
                      className={classNames('dropdown__link',
                        { 'dropdown__link--is-active': isOpen === 'sort' })}
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(newSort(key));
                      }}
                    >
                      {title}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="select">
            <p className="select__paragraph">
              Items on page
            </p>

            <div className="dropdown">
              <button
                type="button"
                className="dropdown__btn"
                onBlur={(event) => handleOnBlur(event)}
                onClick={() => setIsOpen((current) => (
                  current === 'items' ? false : 'items'
                ))}
              >
                <span>
                  {perPage || 'all'}
                </span>

                <span>
                  <i
                    className={classNames(
                      'dropdown__arrow dropdown__arrow--up',
                      {
                        'dropdown__arrow--down': isOpen === 'items',
                      },
                    )}
                  />
                </span>
              </button>

              <div className={classNames(
                'dropdown__list',
                { 'dropdown__list--is-active': isOpen === 'items' },
              )}
              >
                {Object.entries(perPageOptions).map(([key, title]) => (
                  <div
                    className="dropdown__item"
                    key={title}
                  >
                    <Link
                      to={{ search: handleSelect('perPage', title).toString() }}
                      className={classNames('dropdown__link', {
                        'dropdown__link--is-active': isOpen === 'items',
                      })}
                      onClick={() => {
                        setIsOpen(false);
                        dispatch(newPerPage(title));
                      }}
                    >
                      {key}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cataloge" data-cy="productList">
        {isLoading && !isError && <Loader />}

        {visiblePhones.length < 1 && <NoSearchResults />}

        {!isLoading && !isError && visiblePhones
          .slice(startIndexOfPage, perPage !== 'all' ? lastIndexOfPage : -1)
          .map(phone => (
            <ProductCard
              phone={phone}
              key={phone.id}
            />
          ))}
      </div>
    </>
  );
};
