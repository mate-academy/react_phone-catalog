import { useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classNames from 'classnames';
import { Icon } from '../Icon';
import { getSearchWith } from '../../utils/searchHelper';
import { IconType } from '../../types/Icon';
import { SliderButtonType } from '../../types/SliderType';
import './Pagination.scss';

type Props = {
  length: number,
};

export const Pagination: React.FC<Props> = ({ length }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage');
  const page = searchParams.get('page') || '1';

  const getTotalPages = () => {
    if (!perPage) {
      return 0;
    }

    return Math.ceil(length / +perPage);
  };

  const paginationList = (getTotalPages() > 1)
    ? (Array.from(
      { length: getTotalPages() },
      (_, i) => i + 1,
    ))
    : [1];

  const disabledLeftButton = (page === '1');

  const disabledRightButton = (page === '1')
    ? (page === `${getTotalPages() + 1}`)
    : (page === `${getTotalPages()}`);

  const handlePageClick = (pageItem: number) => {
    if (page === `${pageItem}`) {
      return;
    }

    const newParams = getSearchWith(
      searchParams, {
        page: `${pageItem}`,
      },
    );

    navigate({ search: newParams });
  };

  const handleArrowClick = (type: SliderButtonType) => {
    const currentPage = page
      ? +page
      : null;

    if (type === 'prev' && currentPage) {
      if (currentPage === 1) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage - 1}`,
        },
      );

      navigate({ search: newParams });
    }

    if (type === 'next' && currentPage) {
      if (currentPage === getTotalPages()) {
        return;
      }

      const newParams = getSearchWith(
        searchParams, {
          page: `${currentPage + 1}`,
        },
      );

      navigate({ search: newParams });
    }
  };

  useEffect(() => {
    getTotalPages();
  }, [perPage, length]);

  return (
    <div className="category-page__pagination">
      <ul className="pagination">
        <button
          type="button"
          className="pagination__button"
          data-cy="paginationLeft"
          disabled={disabledLeftButton}
          onClick={() => handleArrowClick('prev')}
        >
          {!disabledLeftButton && (
            <Icon
              type={IconType.ARROW_LEFT}
            />
          )}

          {disabledLeftButton && (
            <Icon
              type={IconType.ARROW_LEFT_DISABLED}
            />
          )}
        </button>

        <div className="pagination__list">
          {paginationList.map(pageNumber => (
            <button
              key={pageNumber}
              type="button"
              className={
                classNames('pagination__item', {
                  'pagination__item--is-active':
                    page
                      ? +page === pageNumber
                      : false,
                })
              }
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="pagination__button"
          data-cy="paginationRight"
          disabled={disabledRightButton}
          onClick={() => handleArrowClick('next')}
        >
          {!disabledRightButton && (
            <Icon
              type={IconType.ARROW_RIGHT}
            />
          )}

          {disabledRightButton && (
            <Icon
              type={IconType.ARROW_RIGHT_DISABLED}
            />
          )}
        </button>
      </ul>
    </div>
  );
};
