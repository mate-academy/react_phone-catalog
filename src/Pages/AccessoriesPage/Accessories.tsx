/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './Accessories.scss';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Accessories } from '../../Interface';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessories[]>(
    [],
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccessories.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredAccessories.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    fetch('/api/accessories.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch accessories.json: ${response.status} ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then(data => {
        setAccessories(data);
        setFilteredAccessories(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load accessories');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAccessories, sortBy]);

  useEffect(() => {
    const filtered = accessories.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return b.year - a.year;
      }

      if (sortBy === 'priceLow') {
        return a.priceDiscount - b.priceDiscount;
      }

      if (sortBy === 'priceHigh') {
        return b.priceDiscount - a.priceDiscount;
      }

      return 0;
    });

    setFilteredAccessories(sorted);
  }, [accessories, searchTerm, sortBy]);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    pages.push(1);
    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages !== 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (loading) {
    return (
      <section className="section">
        <div className="accessories">
          <div>Loading accessories...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="accessories">
          <div className="error">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="home--nav">
        <a href="#">
          <img src="/public/figmaLogo/Home.svg" alt="home_nav" />
        </a>
        <p className="home--nav-top">{'>'}</p>
        <p className="home--nav-top">Accessories</p>
      </div>

      <p className="section__text">Accessories</p>
      <div className="section__top-bar">
        <SortForm<Accessories>
          items={accessories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResultChange={setFilteredAccessories}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      <div className="accessories">
        {filteredAccessories.length === 0 ? (
          <p className="accessories__no-results">No accessories found.</p>
        ) : (
          currentItems.map(accessory => (
            <div key={accessory.id} className="accessories__card">
              <img
                src={'/' + accessory.images[0]}
                alt={accessory.name}
                className="accessories__card-image"
                onError={e =>
                  e.currentTarget.setAttribute(
                    'src',
                    '/public/img/page-not-found.png',
                  )
                }
              />
              <h3 className="accessories__card-title">{accessory.name}</h3>
              <div className="accessories__card-prices">
                <span className="accessories__card-price">
                  ${accessory.priceDiscount}
                </span>
                {accessory.priceRegular > accessory.priceDiscount && (
                  <span className="accessories__card-old-price">
                    ${accessory.priceRegular}
                  </span>
                )}
              </div>
              <div className="accessories__card-specs">
                <div className="accessories__card-spec">
                  <span className="accessories__card-spec-label">Color</span>
                  <span className="accessories__card-spec-value">
                    {accessory.color}
                  </span>
                </div>
              </div>
              <div className="accessories__card-actions">
                <button className="accessories__card-btn accessories__card-btn--add">
                  Add to cart
                </button>
                <button className="accessories__card-btn accessories__card-btn--favorite">
                  <img
                    src="/figmaLogo/HeartLove.svg"
                    alt="Favorite"
                    className="accessories__card-btn-icon"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination__button"
        >
          {'<'}
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination__button ${currentPage === page ? 'active' : ''}`}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination__button"
        >
          {'>'}
        </button>
      </div>
    </section>
  );
};
