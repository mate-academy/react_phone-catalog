// src/components/pages/ProductPage/PhoneGrid.jsx
import { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../elements/ProductCard/ProductCard';
import { Drowbox } from '../../../elements/Drowbox';
import { PriceSortDropdown } from '../../../elements/DropPrice/DpopPrice';
import { DropColor } from '../../../elements/DropColor/DropColor';
import '../styles/ProductGrid.scss';
import phones from '../../../../data/phones.json';

// Функція для побудови пагінації
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

  // Prev
  pageNumbers.push(
    <button
      key="prev"
      className="page-button nav"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <img
        src="./images/icons/Chevron_Arrow_Left.svg"
        className="icons_arrow_page"
        alt="Chevron Left"
      />
    </button>,
  );

  // Основні сторінки
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

  // Next
  pageNumbers.push(
    <button
      key="next"
      className="page-button nav"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <img
        src="./images/icons/Chevron_Arrow_Right.svg"
        className="icons_arrow_page"
        alt="Chevron Right"
      />
    </button>,
  );

  return pageNumbers;
};

export const Phones = () => {
  const listRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Зчитуємо параметри з URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = searchParams.get('perPage') || 'All';
  const sortOrder = searchParams.get('sort') || 'default';
  const colorFilter = searchParams.get('color') || null;

  // Унікальні кольори
  const availableColors = [...new Set(phones.flatMap(p => p.color))];

  // --- Фільтрація та сортування ---
  let filteredPhones = [...phones];

  if (colorFilter && colorFilter !== 'null') {
    filteredPhones = filteredPhones.filter(phone =>
      phone.color.includes(colorFilter),
    );
  }

  if (sortOrder === 'asc') {
    filteredPhones.sort((a, b) => a.priceRegular - b.priceRegular);
  } else if (sortOrder === 'desc') {
    filteredPhones.sort((a, b) => b.priceRegular - a.priceRegular);
  }

  // --- Пагінація ---
  const perPageNumber =
    itemsPerPage === 'All' ? filteredPhones.length : Number(itemsPerPage);
  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(filteredPhones.length / perPageNumber);
  const startIndex =
    itemsPerPage === 'All' ? 0 : (currentPage - 1) * perPageNumber;
  const endIndex =
    itemsPerPage === 'All' ? filteredPhones.length : startIndex + perPageNumber;

  const visibleProducts = filteredPhones.slice(startIndex, endIndex);

  // --- Оновлення параметрів URL ---
  const updateParams = newParams => {
    const params = {};

    if (newParams.perPage && newParams.perPage !== 'All') {
      params.perPage = newParams.perPage;
    }

    if (newParams.page && newParams.page > 1) {
      params.page = newParams.page;
    }

    if (newParams.sort && newParams.sort !== 'default') {
      params.sort = newParams.sort;
    }

    if (newParams.color && newParams.color !== 'null') {
      params.color = newParams.color;
    }

    setSearchParams(params);
  };

  // --- Обробники подій ---
  const handleItemsPerPageChange = newPerPage => {
    updateParams({
      perPage: newPerPage,
      sort: sortOrder,
      color: colorFilter,
      page: 1, // скидаємо сторінку
    });
  };

  const handlePageChange = page => {
    updateParams({
      perPage: itemsPerPage,
      sort: sortOrder,
      color: colorFilter,
      page,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = order => {
    updateParams({
      perPage: itemsPerPage,
      sort: order,
      color: colorFilter,
      page: 1,
    });
  };

  const handleColorChange = color => {
    updateParams({
      perPage: itemsPerPage,
      sort: sortOrder,
      color,
      page: 1,
    });
  };

  // --- Рендер ---
  return (
    <div className="product-list-container">
      {/* Breadcrumbs */}
      <div className="products-list-title-page">
        <Link to="/Home">
          <img
            src="./images/icons/Home.svg"
            className="products-list-icon"
            alt="Home"
          />
        </Link>
        <img
          src="./images/icons/Chevron_Arrow_Right_Disabled.svg"
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
          <Drowbox value={itemsPerPage} onChange={handleItemsPerPageChange} />
          <PriceSortDropdown value={sortOrder} onChange={handleSortChange} />
          <DropColor
            value={colorFilter}
            onChange={handleColorChange}
            availableColors={availableColors}
          />
        </div>
      </div>

      {/* Список товарів */}
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
