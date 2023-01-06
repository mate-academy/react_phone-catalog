import { FC, useEffect, useState } from 'react';
import { PaginationList } from 'src/components/PaginationList';
import { PaginationNumber } from 'src/components/PaginationNumber';

type Props = {
  pageNumbers: number[],
  currentPage: number,
};

export const PaginationNumbers: FC<Props> = ({
  pageNumbers,
  currentPage,
}) => {
  const maxNumbersOnPagination = 9;
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    if (currentPage <= 9) {
      setCurrentSection(1);
    }

    // const numbersOnSection = 6;
    // const numberOfSections = Math
    //   .ceil((pageNumbers.length - 8) / numbersOnSection);

    // for (let i = 8; i < numberOfSections; i += numbersOnSection) {
    //   if (currentPage > i) {
    //     setCurrentSection(prev => (prev + 1));
    //   }
    // }

    if (currentPage > 9) {
      setCurrentSection(2);
    }

    if (currentPage > 14) {
      setCurrentSection(3);
    }

    if (currentPage > 20) {
      setCurrentSection(4);
    }

    if (currentPage > 26) {
      setCurrentSection(5);
    }

    if (currentPage > 32) {
      setCurrentSection(6);
    }
  }, [currentPage]);

  const isShowMore = pageNumbers.length >= maxNumbersOnPagination;
  const lastNumber = pageNumbers.length;
  let numbersToShow;

  if (isShowMore) {
    switch (currentSection) {
      case 1:
        numbersToShow = pageNumbers.slice(0, maxNumbersOnPagination);
        break;

      case 2:
        numbersToShow = pageNumbers.slice(9, 14);
        break;

      case 3:
        numbersToShow = pageNumbers.slice(14, 20);
        break;

      case 4:
        numbersToShow = pageNumbers.slice(20, 26);
        break;

      case 5:
        numbersToShow = pageNumbers.slice(26, 32);
        break;

      case 6:
        numbersToShow = pageNumbers.slice(32, -2);
        break;

      default:
        numbersToShow = pageNumbers;
    }
  } else {
    numbersToShow = pageNumbers;
  }

  let isLastSection;
  let isFirstSection;

  if (isShowMore) {
    isLastSection = pageNumbers[pageNumbers.length - 1]
    - numbersToShow[numbersToShow.length - 1] === 0;

    isFirstSection = pageNumbers[0] - numbersToShow[0] === 0;
  }

  return (
    <>
      {isShowMore && !isFirstSection && (
        <PaginationNumber
          currentNumber={1}
          isNumberActive={currentPage === 1}
        />
      )}

      <PaginationList
        currentPage={currentPage}
        numbersToShow={numbersToShow}
        pageNumbers={pageNumbers}
        setCurrentSection={setCurrentSection}
      />

      {isShowMore && !isLastSection && (
        <PaginationNumber
          currentNumber={lastNumber}
          isNumberActive={currentPage === lastNumber}
        />
      )}
    </>
  );
};
