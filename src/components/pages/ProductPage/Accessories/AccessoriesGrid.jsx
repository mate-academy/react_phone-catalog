import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductCard } from '../../../elements/ProductCard/ProductCard';
import { Drowbox } from '../../../elements/Drowbox';
import { PriceSortDropdown } from '../../../elements/DropPrice/DpopPrice';
import { DropColor } from '../../../elements/DropColor/DropColor';
import accessories from '../../../../data/accessories.json';

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
        src="./images/icons/Chevron_Arrow_Left.svg"
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
        src="./images/icons/Chevron_Arrow_Right.svg"
        className="icons_arrow_page"
        alt="Chevron Right"
      />
    </button>,
  );

  return pageNumbers;
};

export const Accessories = () => {
  const listRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Ініціалізація стану зі значень URL або localStorage
  const [itemsPerPage, setItemsPerPage] = useState(
    () =>
      searchParams.get('perPage') ||
      localStorage.getItem('accessories_itemsPerPage') ||
      16,
  );
  const [currentPage, setCurrentPage] = useState(
    () =>
      parseInt(searchParams.get('page')) ||
      parseInt(localStorage.getItem('accessories_currentPage')) ||
      1,
  );
  const [sortOrder, setSortOrder] = useState(
    () =>
      searchParams.get('sort') ||
      localStorage.getItem('accessories_sortOrder') ||
      'default',
  );

  const [colorFilter, setColorFilter] = useState(() => {
    const urlColor = searchParams.get('color');

    if (urlColor !== null) {
      return urlColor;
    }
  });

  // Збереження змін у localStorage
  useEffect(() => {
    localStorage.setItem('accessories_itemsPerPage', itemsPerPage);
  }, [itemsPerPage]);
  useEffect(() => {
    localStorage.setItem('accessories_sortOrder', sortOrder);
  }, [sortOrder]);
  useEffect(() => {
    localStorage.setItem('accessories_colorFilter', colorFilter);
  }, [colorFilter]);
  useEffect(() => {
    localStorage.setItem('accessories_currentPage', currentPage);
  }, [currentPage]);

  // Оновлення URL при зміні фільтрів або пагінації
  useEffect(() => {
    const params = {};

    if (itemsPerPage) {
      params.perPage = itemsPerPage;
    }

    if (currentPage) {
      params.page = currentPage;
    }

    if (sortOrder && sortOrder !== 'default') {
      params.sort = sortOrder;
    }

    if (colorFilter && colorFilter !== 'null') {
      params.color = colorFilter;
    }

    setSearchParams(params);
  }, [itemsPerPage, currentPage, sortOrder, colorFilter, setSearchParams]);

  const availableColors = [...new Set(accessories.flatMap(p => p.color))];

  let filteredAccessories = [...accessories];

  if (colorFilter && colorFilter !== 'null') {
    filteredAccessories = filteredAccessories.filter(item =>
      item.color.includes(colorFilter),
    );
  }

  if (sortOrder === 'asc') {
    filteredAccessories.sort((a, b) => a.priceRegular - b.priceRegular);
  } else if (sortOrder === 'desc') {
    filteredAccessories.sort((a, b) => b.priceRegular - a.priceRegular);
  }

  const totalPages =
    itemsPerPage === 'All'
      ? 1
      : Math.ceil(filteredAccessories.length / itemsPerPage);
  const startIndex =
    itemsPerPage === 'All' ? 0 : (currentPage - 1) * Number(itemsPerPage);
  const endIndex =
    itemsPerPage === 'All'
      ? filteredAccessories.length
      : startIndex + Number(itemsPerPage);
  const visibleProducts = filteredAccessories.slice(startIndex, endIndex);

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
        <p className="hover-link hover-link-text">Accessories</p>
      </div>

      <h1 className="product-list-title">Accessories</h1>
      <p className="product-list-title-small">
        {filteredAccessories.length} models
      </p>

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

      <div ref={listRef} className="product-list">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {itemsPerPage !== 'All' && totalPages > 1 && (
        <div className="pagination">
          {renderPagination(currentPage, totalPages, handlePageChange)}
        </div>
      )}
    </div>
  );
};
