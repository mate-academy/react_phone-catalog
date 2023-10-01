import { useSearchParams } from 'react-router-dom';
import './Pagination.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { SearchParams } from '../../types/SearchParams';
import { OptionsForSort } from '../../types/OptionsForSort';
import { SearchLink } from '../SearchLink';
import {
  DEF_START_PAGE,
  MIN_WIDTH_DESKTOP,
  MIN_WIDTH_TABLET,
  WIDTH_BIG_GAP_PAG,
  WIDTH_FOUR_ICON,
  WIDTH_GAP_PAG,
  WIDTH_ICON_PAG,
  WIDTH_MAIN_DESKTOP,
  WIDTH_MARGINS_MOBILE,
  WIDTH_MARGINS_TABLET,
  WIDTH_TWO_ICON,
} from '../../helpers/consts';

type Props = {
  totalPages: number,
  onSetCurrentPage: (page: number) => void,
};

const getMainWidth = () => {
  const windowWidth = window.innerWidth;
  const windowScreenWigth = window.screen.width;
  const width = windowWidth < windowScreenWigth
    ? windowWidth
    : windowScreenWigth;

  if (width < MIN_WIDTH_DESKTOP) {
    return width - WIDTH_MARGINS_TABLET;
  }

  if (width < MIN_WIDTH_TABLET) {
    return width - WIDTH_MARGINS_MOBILE;
  }

  return WIDTH_MAIN_DESKTOP;
};

export const Pagination: React.FC<Props> = ({
  totalPages, onSetCurrentPage,
}) => {
  const [searchParams] = useSearchParams();
  const shownPerPage = +(searchParams
    .get(SearchParams.ShownCards) || OptionsForSort.NumberSixteen);
  const currentPage = +(searchParams
    .get(SearchParams.PageNumber) || DEF_START_PAGE);

  const quantityPages = Math.ceil(totalPages / +shownPerPage);
  const widthAllPagination = (WIDTH_ICON_PAG * quantityPages)
    + ((quantityPages - 1) * WIDTH_GAP_PAG) + WIDTH_BIG_GAP_PAG
    + (WIDTH_ICON_PAG * 2) + 5;
  const allNumbersPages: number[] = [];

  for (let i = 1; i <= quantityPages; i += 1) {
    allNumbersPages.push(i);
  }

  const [isDisabledLeft, setIsDisabledLeft] = useState<boolean>(true);
  const [isDisabledRight, setIsDisabledRight] = useState<boolean>(false);
  const [isRightsPoints, setIsRightsPoints] = useState<boolean>(false);
  const [isLeftPoints, setIsLeftPoints] = useState<boolean>(false);
  const [pageTogether, setPageTogether] = useState<number>(quantityPages);

  const getModifications = (widthMain: number) => {
    const maxWidth = widthMain - WIDTH_FOUR_ICON;
    let newPageTogether = 1;

    for (
      let i = WIDTH_TWO_ICON;
      i <= maxWidth;
      i += (WIDTH_ICON_PAG + WIDTH_GAP_PAG)
    ) {
      newPageTogether += 1;
    }

    const leftAndRight = Math.floor((newPageTogether - 1) / 2);
    let numberRight = pageTogether % 2 === 0 ? 1 : 0;
    const numberLeft = leftAndRight;

    numberRight += leftAndRight;

    if (currentPage - numberLeft < 3) {
      setIsRightsPoints(true);
      setIsLeftPoints(false);
      setPageTogether(newPageTogether + 1);
    } else if (currentPage + numberRight > quantityPages - 3) {
      setIsLeftPoints(true);
      setIsRightsPoints(false);
      setPageTogether(newPageTogether + 1);
    } else {
      setIsLeftPoints(true);
      setIsRightsPoints(true);
      setPageTogether(newPageTogether);
    }
  };

  const getCorrectPagination = () => {
    const widthMain = getMainWidth();

    if (widthMain < widthAllPagination) {
      getModifications(widthMain);
    } else {
      setIsRightsPoints(false);
      setIsLeftPoints(false);
      setPageTogether(quantityPages);
    }
  };

  useEffect(() => {
    getCorrectPagination();

    if (currentPage === 1) {
      setIsDisabledLeft(true);
    } else {
      setIsDisabledLeft(false);
    }

    if (currentPage === quantityPages) {
      setIsDisabledRight(true);
    } else {
      setIsDisabledRight(false);
    }

    window.addEventListener('resize', getCorrectPagination);

    return () => {
      window.removeEventListener('resize', getCorrectPagination);
    };
  }, [currentPage]);

  return (
    <div className="pagination">
      <div className="pagination__item--prev">
        {isDisabledLeft ? (
          <span className="pagination__link disabled">{'<'}</span>
        ) : (
          <SearchLink
            className="pagination__link"
            data-cy="paginationLeft"
            params={{ [SearchParams.PageNumber]: (currentPage - 1).toString() }}
            onClick={() => onSetCurrentPage(currentPage - 1)}
          >
            {'<'}
          </SearchLink>
        )}
      </div>

      <ul className="pagination__list" data-cy="pagination">
        {!isLeftPoints && !isRightsPoints && allNumbersPages.map(pageNumber => (
          <li
            key={`page-number-${pageNumber}`}
            className="pagination__item"
          >
            <SearchLink
              className={classNames(
                'pagination__link', { active: currentPage === pageNumber },
              )}
              params={{ [SearchParams.PageNumber]: pageNumber.toString() }}
              onClick={() => onSetCurrentPage(pageNumber)}
            >
              {pageNumber}
            </SearchLink>
          </li>
        ))}

        {isLeftPoints && isRightsPoints && (
          <>
            <li className="pagination__item">
              <SearchLink
                className={classNames(
                  'pagination__link',
                  { active: currentPage === allNumbersPages[0] },
                )}
                params={{
                  [SearchParams.PageNumber]: allNumbersPages[0].toString(),
                }}
                onClick={() => onSetCurrentPage(allNumbersPages[0])}
              >
                {allNumbersPages[0]}
              </SearchLink>
            </li>

            <li className="pagination__item">
              <span className="pagination__points">...</span>
            </li>

            {allNumbersPages.filter(pageNum => {
              const leftAndRight = Math.floor((pageTogether - 1) / 2);

              let lastRight = pageTogether % 2 === 0 ? 1 : 0;
              const lastLeft = currentPage - leftAndRight;

              lastRight = lastRight + currentPage + leftAndRight;

              return pageNum >= lastLeft && pageNum <= lastRight;
            }).map(pageNumber => (
              <li
                key={`page-number-${pageNumber}`}
                className="pagination__item"
              >
                <SearchLink
                  className={classNames(
                    'pagination__link', { active: currentPage === pageNumber },
                  )}
                  params={{ [SearchParams.PageNumber]: pageNumber.toString() }}
                  onClick={() => onSetCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </SearchLink>
              </li>
            ))}

            <li className="pagination__item">
              <span className="pagination__points">...</span>
            </li>

            <li className="pagination__item">
              <SearchLink
                className={classNames(
                  'pagination__link', {
                    active: currentPage === allNumbersPages[quantityPages - 1],
                  },
                )}
                params={{
                  [SearchParams.PageNumber]: allNumbersPages[quantityPages - 1]
                    .toString(),
                }}
                onClick={() => {
                  return onSetCurrentPage(allNumbersPages[quantityPages - 1]);
                }}
              >
                {allNumbersPages[quantityPages - 1]}
              </SearchLink>
            </li>
          </>
        )}

        {isLeftPoints && !isRightsPoints && (
          <>
            <li className="pagination__item">
              <SearchLink
                className={classNames(
                  'pagination__link',
                  { active: currentPage === allNumbersPages[0] },
                )}
                params={{
                  [SearchParams.PageNumber]: allNumbersPages[0].toString(),
                }}
                onClick={() => onSetCurrentPage(allNumbersPages[0])}
              >
                {allNumbersPages[0]}
              </SearchLink>
            </li>

            <li className="pagination__item">
              <span className="pagination__points">...</span>
            </li>

            {allNumbersPages.filter(pageNum => {
              const lastRight = quantityPages - pageTogether;

              return pageNum > lastRight;
            }).map(pageNumber => (
              <li
                key={`page-number-${pageNumber}`}
                className="pagination__item"
              >
                <SearchLink
                  className={classNames(
                    'pagination__link', { active: currentPage === pageNumber },
                  )}
                  params={{ [SearchParams.PageNumber]: pageNumber.toString() }}
                  onClick={() => onSetCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </SearchLink>
              </li>
            ))}
          </>
        )}

        {!isLeftPoints && isRightsPoints && (
          <>
            {allNumbersPages.filter(pageNum => pageNum <= pageTogether)
              .map(pageNumber => (
                <li
                  key={`page-number-${pageNumber}`}
                  className="pagination__item"
                >
                  <SearchLink
                    className={classNames(
                      'pagination__link',
                      { active: currentPage === pageNumber },
                    )}
                    params={{
                      [SearchParams.PageNumber]: pageNumber.toString(),
                    }}
                    onClick={() => onSetCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </SearchLink>
                </li>
              ))}

            <li className="pagination__item">
              <span className="pagination__points">...</span>
            </li>

            <li className="pagination__item">
              <SearchLink
                className={classNames(
                  'pagination__link', {
                    active: currentPage === allNumbersPages[quantityPages - 1],
                  },
                )}
                params={{
                  [SearchParams.PageNumber]: allNumbersPages[quantityPages - 1]
                    .toString(),
                }}
                onClick={() => {
                  return onSetCurrentPage(allNumbersPages[quantityPages - 1]);
                }}
              >
                {allNumbersPages[quantityPages - 1]}
              </SearchLink>
            </li>
          </>
        )}
      </ul>

      <div className="pagination__item--next">
        {isDisabledRight ? (
          <span className="pagination__link disabled">{'>'}</span>
        ) : (
          <SearchLink
            className="pagination__link"
            data-cy="paginationRight"
            params={{ [SearchParams.PageNumber]: (currentPage + 1).toString() }}
            onClick={() => onSetCurrentPage(currentPage + 1)}
          >
            {'>'}
          </SearchLink>
        )}
      </div>
    </div>
  );
};
