// src/components/pages/ProductPage/PhoneGrid.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../../../elements/ProductCard/ProductCard';
import { Drowbox } from '../../../elements/Drowbox';
import { PriceSortDropdown } from '../../../elements/DropPrice/DpopPrice';
import { DropColor } from '../../../elements/DropColor/DropColor';
import '../styles/ProductGrid.scss';
import phones from '../../../../data/phones.json';

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
        src="/images/icons/Chevron_Arrow_Left.svg"
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
        src="/images/icons/Chevron_Arrow_Right.svg"
        className="icons_arrow_page"
        alt="Chevron Right"
      />
    </button>,
  );

  return pageNumbers;
};

export const Phones = () => {
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('default');
  const [colorFilter, setColorFilter] = useState(null);
  const listRef = useRef(null);

  // Отримання всіх унікальних кольорів
  const availableColors = [...new Set(phones.flatMap(p => p.color))];

  // Фільтрація та сортування
  let filteredPhones = [...phones];

  if (colorFilter) {
    filteredPhones = filteredPhones.filter(phone =>
      phone.color.includes(colorFilter),
    );
  }

  if (sortOrder === 'asc') {
    filteredPhones.sort((a, b) => a.priceRegular - b.priceRegular);
  } else if (sortOrder === 'desc') {
    filteredPhones.sort((a, b) => b.priceRegular - a.priceRegular);
  }

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(filteredPhones.length / itemsPerPage);

  const startIndex =
    itemsPerPage === 'All' ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex =
    itemsPerPage === 'All' ? filteredPhones.length : startIndex + itemsPerPage;

  const visibleProducts = filteredPhones.slice(startIndex, endIndex);

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
      {/* Breadcrumbs */}
      <div className="products-list-title-page">
        <Link to="/">
          <img
            src="/images/icons/Home.svg"
            className="products-list-icon"
            alt="Home"
          />
        </Link>
        <img
          src="/images/icons/Chevron_Arrow_Right_Disabled.svg"
          className="products-list-arrow"
          alt="Arrow_Right"
        />
        <p className="hover-link hover-link-text">Phones</p>
      </div>

      {/* Заголовки */}
      <h1 className="product-list-title">Mobile phones</h1>
      <p className="product-list-title-small">{filteredPhones.length} models</p>

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
          <ProductCard key={product.id} product={product} basePath="phones" />
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
