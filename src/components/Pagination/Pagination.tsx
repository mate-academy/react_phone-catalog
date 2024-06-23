/* eslint-disable jsx-a11y/control-has-associated-label */
import './Pagination.scss';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  productsLength: number;
  countLength: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination: React.FC<Props> = ({
  productsLength,
  countLength,
  setCurrentPage,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const maxPage = Math.ceil(productsLength / +countLength);
  const bricks = new Array(Math.ceil(maxPage)).fill(1);

  const activePage = searchParams.get('page') || 1;
  const [isNotActiveLeftButton, setIsNotActiveLeftButton] = useState(true);
  const [isNotActiveRightButton, setIsNotActiveRightButton] = useState(false);

  const handleChangePages = (value: string) => {
    const params = new URLSearchParams(searchParams);

    switch (value) {
      case 'left': {
        setCurrentPage(prevPage => prevPage - 1);

        params.set('page', (+activePage - 1).toString());
        break;
      }

      case 'right': {
        setCurrentPage(prevPage => prevPage + 1);

        params.set('page', (+activePage + 1).toString());
        break;
      }

      default:
        break;
    }

    setSearchParams(params);
  };

  const handleChoosePage = (value: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', value.toString());

    setSearchParams(params);
  };

  useEffect(() => {
    setIsNotActiveLeftButton(false);
    setIsNotActiveRightButton(false);

    if (activePage === '1') {
      setIsNotActiveLeftButton(true);
    }

    if (+activePage === maxPage) {
      setIsNotActiveRightButton(true);
    }

    setCurrentPage(+activePage);
  }, [activePage]);

  return (
    <div className="pagination" data-cy="pagination">
      <div data-cy="paginationLeft" className="pagination__block">
        <button
          type="button"
          className="pagination__button"
          disabled={isNotActiveLeftButton}
          onClick={() => {
            handleChangePages('left');
          }}
        >
          <div
            className={classNames('icon', 'icon--arrow-left', {
              'icon--arrow-left--disabled': isNotActiveLeftButton,
            })}
          />
        </button>
      </div>

      <div className="pagination__block">
        {bricks.map((_, index) => (
          <button
            type="button"
            className={classNames('pagination__button', {
              'pagination__button--active': index + 1 === +activePage,
            })}
            onClick={() => handleChoosePage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <div data-cy="paginationRight" className="pagination__block">
        <button
          type="button"
          className="pagination__button"
          disabled={isNotActiveRightButton}
          onClick={() => {
            handleChangePages('right');
          }}
        >
          <div
            className={classNames('icon', 'icon--arrow-right', {
              'icon--arrow-right--disabled': isNotActiveRightButton,
            })}
          />
        </button>
      </div>
    </div>
  );
};
