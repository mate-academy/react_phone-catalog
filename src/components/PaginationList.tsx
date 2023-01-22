import { FC } from 'react';
import { PaginationNumber } from './PaginationNumber';

type Props = {
  numbersToShow: number[],
  pageNumbers: number[],
  currentPage: number,
  setCurrentSection: React.Dispatch<React.SetStateAction<number>>,
};

export const PaginationList: FC<Props> = ({
  numbersToShow,
  pageNumbers,
  currentPage,
  setCurrentSection,
}) => {
  const showMorePrev = pageNumbers.length > 9 && numbersToShow[0] > 9;
  const showMoreNext = pageNumbers.length > 9
  && numbersToShow[0] < pageNumbers.length - 3;

  const handlePrevClick = () => {
    setCurrentSection(prev => prev - 1);
  };

  const handleNextClick = () => {
    setCurrentSection(prev => prev + 1);
  };

  return (
    <>
      {showMorePrev && (
        <button
          type="button"
          className="pagination__page-number"
          onClick={handlePrevClick}
        >
          ...
        </button>
      )}

      {numbersToShow.map(pageNumber => (
        <div key={pageNumber}>
          <PaginationNumber
            currentNumber={pageNumber}
            isNumberActive={currentPage === pageNumber}
          />
        </div>
      ))}

      {showMoreNext && (
        <button
          type="button"
          className="pagination__page-number"
          onClick={handleNextClick}
        >
          ...
        </button>
      )}
    </>
  );
};
