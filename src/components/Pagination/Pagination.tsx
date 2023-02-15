import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import './Pagination.scss';

type Props = {
  pages: number[];
};

export const Pagination: React.FC<Props> = ({ pages }) => {
  const [seachParams, setSearchParams] = useSearchParams();
  const page = seachParams.get('page' || '');

  const prevPage = () => {
    return setSearchParams(getSearchWith(seachParams, {
      page: page && String(+page - 1),
    }));
  };

  const nextPage = () => {
    return setSearchParams(getSearchWith(seachParams, {
      page: !page ? '2' : String(+page + 1),
    }));
  };

  return (
    <div data-cy="pagination" className="pagination">
      <button
        className={classNames(
          'pagination__button', {
            'pagination__button--disabled': !page || (page && page === '1'),
          },
        )}
        type="button"
        onClick={prevPage}
        disabled={!page || page === '1'}
        data-cy="paginationLeft"
      >
        {page && page !== '1'
          ? (<img src="../../img/arrowLeft.svg" alt="prevPage" />)
          : (
            <img
              src="../../img/arrowLeftDisabled.svg"
              alt="prevPageDisabled"
            />
          )}
      </button>

      <div className="pagination__pages">
        {pages.length < 5
          ? (
            <>
              <button
                type="button"
                className={classNames(
                  'pagination__page', {
                    'pagination__page--isActive': !page || page === '1',
                  },
                )}
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: '1',
                  }));
                }}
              >
                1
              </button>
              {
                (pages.slice(1)).map(n => (
                  <button
                    type="button"
                    className={classNames(
                      'pagination__page', {
                        'pagination__page--isActive': page && +page === n,
                      },
                    )}
                    key={n}
                    onClick={() => {
                      setSearchParams(getSearchWith(seachParams, {
                        page: String(n),
                      }));
                    }}
                  >
                    {n}
                  </button>
                ))
              }
            </>
          )
          : (
            <>
              <button
                type="button"
                className={classNames(
                  'pagination__page', {
                    'pagination__page--isActive':
                      !page || (page && page === '1'),
                  },
                )}
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: '1',
                  }));
                }}
              >
                1
              </button>

              {page && page !== '1' && page !== '2' && (
                <div
                  className="pagination__dots"
                >
                  ...
                </div>
              )}

              <button
                type="button"
                className={classNames(
                  'pagination__page', {
                    'pagination__page--isActive':
                      page && page !== '1' && +page !== pages.length,
                  },
                )}
                onClick={(e) => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: e.currentTarget.innerText,
                  }));
                }}
              >

                {(!page || page === '1') && (
                  2
                )}

                {page && +page === pages.length && (
                  pages.length - 1
                )}

                {page && (page && page !== '1' && +page !== pages.length) && (
                  +page
                )}
              </button>

              {(!page || (page && +page !== pages.length
                && +page !== pages.length - 1)) && (
                <div
                  className="pagination__dots"
                >
                  ...
                </div>
              )}

              <button
                type="button"
                className={classNames(
                  'pagination__page', {
                    'pagination__page--isActive':
                      page && +page === pages.length,
                  },
                )}
                onClick={() => {
                  setSearchParams(getSearchWith(seachParams, {
                    page: String(pages.length),
                  }));
                }}
              >
                {pages.length}
              </button>
            </>
          )}
      </div>

      <button
        className={classNames(
          'pagination__button', {
            'pagination__button--disabled': page && +page === pages.length,
          },
        )}
        type="button"
        onClick={nextPage}
        disabled={page !== null && +page === pages.length}
        data-cy="paginationRight"
      >
        {!page || +page !== pages.length
          ? (<img src="../../img/arrowRight.svg" alt="nextPage" />)
          : (
            <img
              src="../../img/arrowRightDisabled.svg"
              alt="nextPageDisabled"
            />
          )}
      </button>
    </div>
  );
};
