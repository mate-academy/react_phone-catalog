import classNames from 'classnames';
import './Pagination.scss';
import { useMemo } from 'react';

type Props = {
  productsCount: number,
  perPage: number,
  activePage: number,
  setActivePage: (number: number) => void,
};

export const Pagination: React.FC<Props> = ({
  productsCount,
  perPage,
  activePage,
  setActivePage,
}) => {
  const pagesCount = useMemo(
    () => Math.ceil(productsCount / perPage),
    [productsCount, perPage],
  );

  const pagesNumbers = useMemo(() => {
    const numbers = [];

    for (let i = 1; i <= pagesCount; i += 1) {
      numbers.push(i);
    }

    return numbers;
  }, [pagesCount]);

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === pagesCount;

  const handleNextButtonClick = () => {
    setActivePage(activePage < pagesCount
      ? activePage + 1
      : pagesCount);
  };

  const previousNextButtonClick = () => {
    setActivePage(activePage > 1
      ? activePage - 1
      : 1);
  };

  return (
    <div className="Pagination">
      <button
        type="button"
        aria-label="Previous"
        data-cy="paginationLeft"
        className="Pagination__button Pagination__button--previous"
        onClick={previousNextButtonClick}
        disabled={isFirstPage}
      />

      <div className="Pagination__pages">
        {pagesNumbers.map(number => (
          <button
            key={number}
            type="button"
            className={
              classNames('Pagination__button', 'Pagination__button--page', {
                'Pagination__button--active': number === activePage,
              })
            }
            onClick={() => setActivePage(number)}
          >
            {number}
          </button>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next"
        data-cy="paginationRight"
        className="Pagination__button Pagination__button--next"
        onClick={handleNextButtonClick}
        disabled={isLastPage}
      />
    </div>
  );
};
