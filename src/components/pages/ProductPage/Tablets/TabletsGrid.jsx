import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../../elements/ProductCard/ProductCard';
import { Drowbox } from '../../../elements/Drowbox';
import { PriceSortDropdown } from '../../../elements/DropPrice/DpopPrice';
import { DropColor } from '../../../elements/DropColor/DropColor';
import tablets from '../../../../data/tablets.json';

// Функція пагінації
const renderPagination = (currentPage, totalPages, onPageChange) => {
  const pageNumbers = [];
  const visibleRange = 1;

  const addPageButton = page => (
    <button
      key={page}
      className={`page-button ${currentPage === page ? 'active' : ''}`}
      onClick={() => onPageChange(page)}
    >
      {page}
    </button>
  );

  pageNumbers.push(
    <button
      key="prev"
      className="page-button nav"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/icons/Chevron_Arrow_Left.svg`}
        className="icons_arrow_page"
        alt="Chevron Left"
      />
    </button>,
  );

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(addPageButton(i));
    }
  } else {
    pageNumbers.push(addPageButton(1));

    if (currentPage > 3) {
      pageNumbers.push(
        <span key="start-ellipsis" className="dots">
          ...
        </span>,
      );
    }

    for (
      let i = Math.max(2, currentPage - visibleRange);
      i <= Math.min(totalPages - 1, currentPage + visibleRange);
      i++
    ) {
      pageNumbers.push(addPageButton(i));
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push(
        <span key="end-ellipsis" className="dots">
          ...
        </span>,
      );
    }

    pageNumbers.push(addPageButton(totalPages));
  }

  pageNumbers.push(
    <button
      key="next"
      className="page-button nav"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <img
        src={`${import.meta.env.BASE_URL}images/icons/Chevron_Arrow_Right.svg`}
        className="icons_arrow_page"
        alt="Chevron Right"
      />
    </button>,
  );

  return pageNumbers;
};

export const Tablets = () => {
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default');
  const [colorFilter, setColorFilter] = useState(null);
  const listRef = useRef(null);

  // Отримання всіх унікальних кольорів
  const availableColors = [...new Set(tablets.flatMap(p => p.color))];

  // Фільтрація та сортування
  let filteredTablets = [...tablets];

  if (colorFilter) {
    filteredTablets = filteredTablets.filter(phone =>
      phone.color.includes(colorFilter),
    );
  }

  if (sortOrder === 'asc') {
    filteredTablets.sort((a, b) => a.priceRegular - b.priceRegular);
  } else if (sortOrder === 'desc') {
    filteredTablets.sort((a, b) => b.priceRegular - a.priceRegular);
  }

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(filteredTablets.length / itemsPerPage);

  const startIndex =
    itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex =
    itemsPerPage === 'All' ? filteredTablets.length : startIndex + itemsPerPage;

  const visibleProducts = filteredTablets.slice(startIndex, endIndex);

  // Скидання сторінки при зміні фільтрів
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, sortOrder, colorFilter]);

  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list-container">
      <div className="products-list-title-page">
        <Link to="/Home">
          <img
            src={`${import.meta.env.BASE_URL}images/icons/Home.svg`}
            className="products-list-icon"
            alt="Home"
          />
        </Link>
        <img
          src={`${import.meta.env.BASE_URL}images/icons/Chevron_Arrow_Right_Disabled.svg`}
          className="products-list-arrow"
          alt="Arrow_Right"
        />
        <p className="hover-link hover-link-text">Tablets</p>
      </div>

      {/* Заголовки */}
      <h1 className="product-list-title">Tablets</h1>
      <p className="product-list-title-small">
        {filteredTablets.length} models
      </p>

      {/* Фільтри */}
      <div className="product-list-filters">
        <div className="product-list-container-filter">
          <Drowbox value={itemsPerPage} onChange={setItemsPerPage} />
          <PriceSortDropdown value={sortOrder} onChange={setSortOrder} />
          <DropColor
            value={colorFilter}
            onChange={setColorFilter}
            availableColors={availableColors}
          />
        </div>
      </div>

      {/* Товари */}
      <div ref={listRef} className="product-list">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Пагінація */}
      {itemsPerPage !== 'All' && totalPages > 1 && (
        <div className="pagination">
          {renderPagination(currentPage, totalPages, handlePageChange)}
        </div>
      )}
    </div>
  );
};
