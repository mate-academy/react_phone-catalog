import './Bottom.scss';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import leftArrow from '../../Icons/arrow-left-black.svg';
import rightArrow from '../../Icons/arrow-right-black.svg';
import { Phone } from '../../types/Phone';

type Props = {
  phones: Phone[],
  // sortedPhones: Phone[],
  itemsPerPage: string,
  setSortedPhones: React.Dispatch<React.SetStateAction<Phone[]>>,
};

// export const Bottom: React.FC<Props> = ({ phones, sortedPhones, itemsPerPage, setSortedPhones }) => {
export const Bottom: React.FC<Props> = ({
  phones,
  itemsPerPage,
  setSortedPhones,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPagesToShow = 5;
  const totalPages = Math.ceil(phones.length / Number(itemsPerPage || 1));
  // const sortedPhonesCopy = sortedPhones.slice();

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    const visiblePhones = phones.slice(startIndex, endIndex);

    if (JSON.stringify(visiblePhones) !== JSON.stringify(phones)) {
      setSortedPhones(visiblePhones);
    }
  }, [currentPage, phones, itemsPerPage, setSortedPhones]);

  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * Number(itemsPerPage);
  //   const endIndex = startIndex + Number(itemsPerPage);
  //   const sortedPhonesCopy = phones.slice().sort();
  //   const visiblePhones = sortedPhonesCopy.slice(startIndex, endIndex);

  //   if (JSON.stringify(visiblePhones) !== JSON.stringify(sortedPhonesCopy)) {
  //     setSortedPhones(visiblePhones);
  //   }
  // }, [currentPage, phones, itemsPerPage, setSortedPhones]);

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className="bottom">
      <button
        className="bottom__arrow bottom__button"
        onClick={handlePreviousClick}
        type="submit"
      >
        <img src={leftArrow} alt="arrow left" />
      </button>

      <div className="bottom__pages">
        {Array.from({ length: endPage - startPage + 1 },
          (_, index) => startPage + index)
          .map((page) => (
            <button
              key={page}
              className={classNames('bottom__page bottom__button', {
                'bottom__page--active': currentPage === page,
              })}
              onClick={() => handlePageClick(page)}
              type="submit"
            >
              {page}
            </button>
          ))}
      </div>

      <button
        className="bottom__arrow bottom__button"
        onClick={handleNextClick}
        type="submit"
      >
        <img src={rightArrow} alt="arrow right" />
      </button>
    </div>
  );
};
