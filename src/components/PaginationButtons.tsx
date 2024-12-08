import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { numberOfPaginations } from "../utils/getNumberOfPaginations";
import { getSearchWith } from "../utils/getSearchWith";
import { SearchParams } from "../types/searchParams";

type Props = {
  productsLength: number | null;
};

export const PaginationButtons: React.FC<Props> = ({ productsLength }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsOnPage = searchParams.get('items');
  const page = +(searchParams.get('page') || 1);

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(params, searchParams);
    setSearchParams(search);
  }

  const handlePageNumber = (pageNumber: number) => {
    setSearchWith({ page: pageNumber });
  };

  useEffect(() => {
    if (itemsOnPage === 'all') {
      setSearchWith({ page: null });
    } else {
      setSearchWith({ page: 1 });
    }
  }, [itemsOnPage]);
  

  const arrayOfPages = numberOfPaginations(itemsOnPage, productsLength);
  const lengthOfPages = arrayOfPages.length;

  const isFirsPage = (page === 1);
  const isLastPage = page === lengthOfPages;

  const handlePrevPage = () => {
    if (!isFirsPage) {
      setSearchWith({ page: page - 1 });
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setSearchWith({ page: page + 1 });
    }
  };

  return (
    <div className="mb-[64px] flex items-center justify-center gap-[16px] xl:mb-[80px]">
      <button
        className={`
          section-buttons
          border-icons-color
          ${!isFirsPage ? 'pagination-buttons' : ''}
        `}
        disabled={isFirsPage}
        onClick={handlePrevPage}
      >
        <img src="./img/icons/Arrow_Left_Black.svg" alt="ArrowLeft" className="icons" />
      </button>

      <div className={`flex gap-[8px] ${lengthOfPages > 3 ? 'w-[152px] overflow-hidden' : ''}`}>
        {arrayOfPages.map(pagin => (
          <div
            key={pagin}
            className={`
              pagination-page
              flex-shrink-0
              ${pagin === page ? 'bg-primary text-white' : ''}
            `}
            onClick={() => handlePageNumber(pagin)}
            style={lengthOfPages > 3 ? {
              transform: `translateX(${page <= lengthOfPages - 3 ? -40 * (page - 1) : -40 * (lengthOfPages - 4)}px)`,
              transition: 'transform 0.3s ease-in-out',
            } : {}}

          >{pagin}</div>
        ))}
      </div>

      <button
        className={`
          section-buttons
          border-icons-color
          ${!isLastPage ? 'pagination-buttons' : ''}
        `}
        disabled={isLastPage}
        onClick={handleNextPage}
      >
        <img src="./img/icons/Arrow_Right_Black.svg" alt="ArrowRigth" />
      </button>
    </div>
  );
};