import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { SliderButton } from './SliderButton';
import { getPaginationItems } from '../helpers/functions';
import arrowIcon from '../images/icons/arrow-icon.svg';
import arrowIconDisable from '../images/icons/arrow-icon-disable.svg';

export interface Props {
  maxLength: number;
  currentPage: number;
  lastPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  maxLength,
  currentPage,
  lastPage,
  setCurrentPage,
}) => {
  const pageNums = useMemo(() => {
    return getPaginationItems(currentPage, lastPage, maxLength);
  }, [currentPage, lastPage, maxLength]);

  return (
    <div className="flex justify-center gap-4">
      <SliderButton
        className={twMerge(currentPage === 1 && 'pointer-events-none')}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <img
          src={currentPage === 1 ? arrowIconDisable : arrowIcon}
          alt="Arrow Left"
          className="-rotate-90"
        />
      </SliderButton>

      <div className="flex flex-wrap gap-2">
        {pageNums.map(({ pageNum, id }) => (
          <SliderButton
            key={id}
            onClick={() => setCurrentPage(pageNum)}
            className={twMerge(
              currentPage === pageNum && 'bg-primary text-white',
              Number.isNaN(pageNum) && 'pointer-events-none border-elements',
            )}
          >
            {!Number.isNaN(pageNum) ? pageNum : '...'}
          </SliderButton>
        ))}
      </div>

      <SliderButton
        className={twMerge(currentPage === lastPage && 'pointer-events-none')}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <img
          src={currentPage === lastPage ? arrowIconDisable : arrowIcon}
          alt="Arrow Right"
          className="rotate-90"
        />
      </SliderButton>
    </div>
  );
};
