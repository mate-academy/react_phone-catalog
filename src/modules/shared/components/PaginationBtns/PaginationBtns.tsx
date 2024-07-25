import { useSearchParams } from 'react-router-dom';
import { SortTypes } from '../types/SortTypes';
import classNames from 'classnames';
import { StateContext } from '../../../utils/GlobalStateProvider';
import { memo, useContext } from 'react';
import { getSearchWith } from '../../../utils/getSearchWith';

import './PaginationBtns.scss';

type Props = {
  buttonsArray: number[];
};

// eslint-disable-next-line react/display-name
export const PaginationBtns: React.FC<Props> = memo(({ buttonsArray }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +((searchParams.get('page') as SortTypes) || 1);

  const { isDarkThemeOn } = useContext(StateContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSearchWith = (params: any) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search);
  };

  const handleChangePage = (elem: number) => {
    if (elem < 0 || elem > buttonsArray.length) {
      return;
    }

    if (elem === 1) {
      setSearchWith({ page: null });

      return;
    }

    setSearchWith({ page: elem });
  };

  return buttonsArray.length > 1 ? (
    <div
      className={classNames('pagination-wrapper', {
        'pagination-light': !isDarkThemeOn,
      })}
    >
      <button
        className={classNames('arrow-btn', 'arrow-btn--left', {
          'arrow-btn--disabled': page === 1,
          'arrow-btn--dark': !isDarkThemeOn,
        })}
        disabled={page === 1}
        onClick={() => handleChangePage(page - 1)}
      ></button>
      <div className="pagination__btn-wrapper">
        {page > 5 && (
          <>
            <button
              // disabled={page > 5}
              onClick={() => handleChangePage(1)}
              className={classNames('pagination__btn', {
                // 'pagination__btn--active': btn === page,
              })}
            >
              1
            </button>
            <p>...</p>
          </>
        )}

        {buttonsArray
          .slice(
            Math.floor((page - 1) / 5) * 5,
            Math.floor((page - 1) / 5) * 5 + 5,
          )
          .map(btn => (
            <button
              key={`btn-${btn}`}
              disabled={page > buttonsArray.length}
              onClick={() => handleChangePage(btn)}
              className={classNames('pagination__btn', {
                'pagination__btn--active': btn === page,
              })}
            >
              {btn}
            </button>
          ))}
        {page !== buttonsArray.length && (
          <>
            <p>...</p>
            <button
              disabled={page > buttonsArray.length}
              onClick={() => handleChangePage(buttonsArray.length)}
              className={classNames('pagination__btn', {
                // 'pagination__btn--active': btn === page,
              })}
            >
              {buttonsArray.length}
            </button>
          </>
        )}
      </div>
      <button
        disabled={page === buttonsArray.length}
        className={classNames('arrow-btn', {
          'arrow-btn--disabled': page === buttonsArray.length,
          'arrow-btn--dark': !isDarkThemeOn,
        })}
        onClick={() => handleChangePage(page + 1)}
      ></button>
    </div>
  ) : (
    <></>
  );
});
