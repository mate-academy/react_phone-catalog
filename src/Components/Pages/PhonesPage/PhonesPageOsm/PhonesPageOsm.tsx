import React, {
  SetStateAction, useState,
} from 'react';
import './PhonesPageOsm.scss';
import { Link } from 'react-router-dom';
import { Product } from '../../../ProductCards/Product';
import HomeImage from './PhonesPageOsmImage/Home.svg';
import Arrowimage from './PhonesPageOsmImage/Arrow.svg';
import { ProductCards } from '../../../ProductCards/ProductCards';
import Arrowpn from './PhonesPageOsmImage/Arrowpn.svg';

interface PhonesPageOSMProps {
  products: Product[];
}

export const PhonesPageOsm: React.FC<PhonesPageOSMProps> = ({ products }) => {
  const [selectedCount, setSelectedCount] = useState('ALL');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  const countPerPage = parseInt(selectedCount, 10);
  const totalPages = Math.ceil(products.length / countPerPage);

  const handleCountChange = (event: {
    target: { value: SetStateAction<string>; };
  }) => {
    setSelectedCount(event.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (event: {
    target: { value: SetStateAction<string>; };
  }) => {
    setSelectedSort(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };

  const filteredProducts = selectedCount === 'ALL'
    ? products
    : products.slice(
      (currentPage - 1) * countPerPage,
      currentPage * countPerPage,
    );

  const compareProductIds = (a: {
    name: string | string[]; id: string;
  }, b: { name: string | string[]; id: string; }) => {
    const isIPhone11A = a.name.includes('iPhone 11');
    const isIPhone11B = b.name.includes('iPhone 11');

    if (isIPhone11A && !isIPhone11B) {
      return -1;
    }

    if (!isIPhone11A && isIPhone11B) {
      return 1;
    }

    return parseInt(b.id, 10) - parseInt(a.id, 10);
  };

  if (selectedSort === 'alphabetical') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedSort === 'cheapest') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else {
    filteredProducts.sort(compareProductIds);
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );
  const showPreviousButton = currentPage > 1;
  const showNextButton = currentPage < totalPages;

  let visiblePageNumbers = [];

  if (totalPages <= 4) {
    visiblePageNumbers = pageNumbers;
  } else if (currentPage === 1 || currentPage === 2) {
    visiblePageNumbers = pageNumbers.slice(0, 4);
  } else if (currentPage === totalPages || currentPage === totalPages - 1) {
    visiblePageNumbers = pageNumbers.slice(-4);
  } else {
    visiblePageNumbers = pageNumbers.slice(currentPage - 2, currentPage + 2);
  }

  return (
    <>
      <div className="block-for-svg">
        <Link to="/">
          <div className="block-for-svg-home">
            <img className="icon" src={HomeImage} alt="HomeImage" />
          </div>
        </Link>

        <div className="block-for-svg-home-arrow">
          <img className="icon" src={Arrowimage} alt="Arrowimage" />
        </div>

        <p className="block-forPageNotFound__text-1">Phones</p>
      </div>

      <div className="container-for-PhoneOsm-title">
        <h1 className="PhonesPageOsmTitle">Mobile phones</h1>
        <p className="PhonesPageOsmText">
          {products.length}
          {' '}
          models
        </p>
      </div>

      <div data-cy="pagination" className="blockForSortOnPhonePage">
        <div className="block-for-sort-index">
          <select
            value={selectedSort}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="newest">Newest</option>
            <option value="alphabetical">Alphabeticaly</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className="block-for-count-index">
          <select
            value={selectedCount}
            onChange={handleCountChange}
            className="count-select"
          >
            <option className="count-select-text" value="4">4</option>
            <option className="count-select-text" value="8">8</option>
            <option className="count-select-text" value="16">16</option>
            <option className="count-select-text" value="ALL">All</option>
          </select>
        </div>
      </div>

      <div className="container-for-productt">
        <div data-cy="productList" className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      </div>

      {selectedCount !== 'ALL' && (
        <div className="block-for-numbers-index">
          <button
            type="button"
            data-cy="paginationLeft"
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!showPreviousButton}
          >
            <img className="ArrowLeft" src={Arrowpn} alt="" />
          </button>
          {visiblePageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`button-numb ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => handlePageChange(pageNumber)}
              style={currentPage === pageNumber ? {
                color: 'var(--gray-white, #FFF)',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: 'Mont-Regular, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '21px',
                width: '32px',
                height: '32px',
                flexShrink: 0,
                background: 'var(--gray-primary, #313237)',
              } : {
                color: '#000',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: 'Mont-Regular, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: '21px',
                backgroundColor: '#fff',
                width: '32px',
                height: '32px',
                flexShrink: 0,
                border: '1px solid var(--gray-elements, #E2E6E9)',
              }}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            data-cy="paginationRight"
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!showNextButton}
          >
            <img src={Arrowpn} alt="" />
          </button>
        </div>
      )}
    </>
  );
};
