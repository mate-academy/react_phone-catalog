import classNames from 'classnames';
import { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { renderArrow } from '../../helpers/renderArrow';
import './pagination.scss';

interface Props {
  pages: number[];
  currentPage: number;
  handleSetCurrentPage: (page: number) => void;
  handleArrowClick: (direction: string) => void;
}

export const Pagination: FC<Props> = ({
  pages,
  handleSetCurrentPage,
  currentPage,
  handleArrowClick,
}) => {
  const theme = useAppSelector(state => state.theme.value);

  return (
    <div className="pagination">
      <button
        type="button"
        className={classNames('pagination__arrow', `pagination__arrow--${theme}`, { disabled: currentPage === 1 },
          { [`disabled--${theme}`]: currentPage === 1 })}
        disabled={currentPage === 1}
        onClick={() => handleArrowClick('left')}
      >
        {currentPage !== 1 ? (
          renderArrow('left', theme)
        ) : (
          <img
            src="/public/_new/img/icons/arrow-left-disabled.svg"
            alt="Arrow left disabled"
          />
        )}
      </button>

      <div className="pagination__pages">
        {pages.map(page => (
          <button
            type="button"
            className={
              classNames('pagination__page',
                `pagination__page--${theme}`,
                { 'pagination__page--current-page': currentPage === page },
                { [`pagination__page--current-page__${theme}`]: currentPage === page })
            }
            key={page}
            onClick={() => handleSetCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={
          classNames('pagination__arrow',
            `pagination__arrow--${theme}`,
            { disabled: currentPage === pages.length },
            { [`disabled--${theme}`]: currentPage === pages.length })
        }
        disabled={currentPage === pages.length}
        onClick={() => handleArrowClick('right')}
      >
        {currentPage !== pages.length ? (
          renderArrow('right', theme)
        ) : (
          <img
            src="/public/_new/img/icons/arrow-right-disabled.svg"
            alt="Arrow left disabled"
          />
        )}
      </button>
    </div>
  );
};
