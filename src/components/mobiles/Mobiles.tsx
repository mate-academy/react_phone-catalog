import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { Phone } from '../../types/phone';
import { PhonesCard } from '../phones/PhonesCard';
import './style.scss';

type Props = {
  phones: Phone[]
  title: string
  showOldPrice: boolean
};

const sortTypes = ['price', 'year'];
const countForPage = [8, 16, 32];

export const Mobiles: React.FC<Props> = ({
  phones,
  title,
  showOldPrice,
}) => {
  const [selectedCount, setSelectedCount] = useState(16);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showCountDropdown, setCountDropdown] = useState(false);
  const [selectedSortType, setSelectedSortType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const pathname = location.pathname.split('/');

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const toggleCountDropdown = () => {
    setCountDropdown(!showCountDropdown);
  };

  const handleChangeSort = (sort: string) => {
    setSelectedSortType(sort);
    setShowSortDropdown(false);
  };

  const handleChangeCount = (count: number) => {
    setSelectedCount(count);
    setCountDropdown(false);
  };

  const sortredPhones = (sort: string) => {
    const startIndex = (currentPage - 1) * selectedCount;
    const endIndex = startIndex + selectedCount;

    const sortedPhones = [...phones].slice(startIndex, endIndex);

    switch (sort) {
      case 'price': {
        return sortedPhones.sort((p1, p2) => p1.price - p2.price);
      }

      case 'year': {
        return sortedPhones.sort((p1, p2) => p2.year - p1.year);
      }

      default: {
        return sortedPhones;
      }
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(phones.length / selectedCount)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const displayedPhones = sortredPhones(selectedSortType);

  return (
    <div className="mobile">
      <div className="mobile__home">
        <a href="/">
          <img
            className="mobile__home-image"
            src="./img/icons/Home.png"
            alt="home"
          />
        </a>
        <img
          className="mobile__home-right"
          src="./img/icons/Icons/right.svg"
          alt="right"
        />
        <p className="mobile__home-text">{pathname}</p>
      </div>
      <h1 className="mobile__title">{title}</h1>

      <p className="mobile__title-description">{`${phones.length} models`}</p>

      <div className="mobile__sort">
        <div className="mobile__sort-by">
          <p className="mobile__sort-text">Sort by</p>
          <button
            type="button"
            className="mobile__sort-button"
            onClick={toggleSortDropdown}
          >
            <span className="mobile__sort-button-text">
              {selectedSortType || 'Select'}
            </span>
            <img
              className="mobile__sort-button-img"
              src="./img/icons/down.svg"
              alt="down"
            />
          </button>
          {showSortDropdown && (
            <div className="mobile__sort-dropdown">
              {sortTypes.map((sortType) => (
                <div
                  key={sortType}
                  className={`mobile__sort-option ${
                    selectedSortType === sortType ? 'selected' : ''
                  }`}
                  onClick={() => handleChangeSort(sortType)}
                  onKeyDown={() => handleChangeSort(sortType)}
                  tabIndex={0}
                  role="button"
                >
                  {sortType}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mobile__sort-items">
          <p className="mobile__sort-text">Items on page</p>
          <button
            type="button"
            className="mobile__sort-button"
            onClick={toggleCountDropdown}
          >
            <span className="mobile__sort-button-text">
              {selectedCount}
            </span>
            <img
              className="mobile__sort-button-img"
              src="./img/icons/down.svg"
              alt="down"
            />
          </button>
          {showCountDropdown && (
            <div className="mobile__sort-dropdown">
              {countForPage.map(count => (
                <div
                  key={count}
                  className={`mobile__sort-option ${
                    selectedCount === count ? 'selected' : ''
                  }`}
                  onClick={() => handleChangeCount(count)}
                  onKeyDown={() => handleChangeCount(count)}
                  tabIndex={0}
                  role="button"
                >
                  {count}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <PhonesCard
        phones={displayedPhones}
        showOldPrice={showOldPrice}
      />
      <div className="mobile__pages">
        <button
          type="button"
          className="mobile__pages-left"
          onClick={handlePreviousPage}
        >
          <img
            className="image-left"
            src="../img/icons/Icons/left.svg"
            alt="left"
          />
        </button>
        {Array.from({ length: Math.ceil(phones.length / selectedCount) })
          .map((_, i) => (
            <button
              key={uuidv4()}
              type="button"
              className={`mobile__pages-number ${
                currentPage === i + 1 ? 'is-active' : ''
              }`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        <button
          type="button"
          className="mobile__pages-right"
          onClick={handleNextPage}
        >
          <img
            className="image-right"
            src="../img/icons/Icons/right.svg"
            alt="right"
          />
        </button>
      </div>
    </div>
  );
};

export default Mobiles;
