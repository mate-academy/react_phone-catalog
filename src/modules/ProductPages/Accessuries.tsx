import { useEffect, useState } from 'react';
import { Gargets } from '../../interface/Gargets';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductList } from './ProductList';
import { Loader } from './Loader';

export const Accessories = () => {
  const [accessories, setAccessuries] = useState<Gargets[]>([]);
  const [loadingDataOnServer, setloadingDataOnServer] = useState(false);
  const [reloadButton, setReloadButton] = useState(false);
  const [, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByy = searchParams.get('sort') ?? 'newest';

  useEffect(() => {
    setReloadButton(false);
    setloadingDataOnServer(true);
    setTimeout(() => {
      fetch('/api/accessories.json')
        .then(response => response.json())
        .then(data => setAccessuries(data))
        .catch(error => {
          setReloadButton(true);
          throw Error(`${error} 'Wrong! Please reload page'`);
        })
        .finally(() => setloadingDataOnServer(false));
    }, 1000);
  }, []);

  useEffect(() => {
    setSortBy(sortByy);
  }, [sortByy]);

  useEffect(() => {
    const limitParam = searchParams.get('perPage');

    if (limitParam === 'all') {
      setItemsPerPage(accessories.length);
    } else if (limitParam) {
      setItemsPerPage(Number(limitParam));
    }
  }, [searchParams, accessories.length]);

  const handleReload = () => {
    setloadingDataOnServer(true);
    setAccessuries([]);
    setReloadButton(false);
    setTimeout(() => {
      fetch('/api/accessories.json')
        .then(response => response.json())
        .then(data => setAccessuries(data))
        .catch(error => {
          setReloadButton(true);
          // eslint-disable-next-line no-console
          console.error(error);
        })
        .finally(() => setloadingDataOnServer(false));
    }, 1000);
  };

  if (reloadButton) {
    return (
      <div className="error">
        <p>Error loading data, please try again.</p>
        <button onClick={handleReload} className="reload-button">
          Reload
        </button>
      </div>
    );
  }

  if (loadingDataOnServer) {
    return <Loader loading={true} />;
  }

  if (!loadingDataOnServer && accessories.length === 0 && !reloadButton) {
    return (
      <div className="no-items-message">
        <p>There are no phones</p>
      </div>
    );
  }

  const totalPages = Math.ceil(accessories.length / itemsPerPage);

  // Розрахунок елементів для поточної сторінки
  const indexOfLastPhone = currentPage * itemsPerPage;
  const indexOfFirstPhone = indexOfLastPhone - itemsPerPage;
  const currentAccesssuries = accessories.slice(
    indexOfFirstPhone,
    indexOfLastPhone,
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setSearchParams(params => {
      const updated = new URLSearchParams(params);

      updated.set('page', String(pageNumber));

      return updated;
    });

    setCurrentPage(pageNumber);
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 4;

    let startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(startPage + maxVisible - 1, totalPages);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(endPage - maxVisible + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="gargets">
      <div className="gargets__back-to-home">
        <NavLink to="/" className="gargets__home-img" />
        <span className="gargets__arrow"></span>
        <span className="gargets__back-home-h2">Accessories</span>
      </div>
      <h1 className="gargets__mobile-phones-h1">Accessories</h1>
      <h3 className="gargets__count-models">95 models</h3>

      <div className="gargets__position-sorting">
        <div className="gargets__sort-by">
          <h3 className="gargets__sort-by-h3">Sort by</h3>
          <select
            name="choose"
            id=""
            className="gargets__sort-by-choose-value"
            onChange={e => {
              const sortType = e.target.value;

              setSortBy(sortType);

              const newParams = new URLSearchParams(searchParams.toString());

              newParams.set('sort', sortType);
              setSearchParams(newParams);
            }}
          >
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className="gargets__items-on-page">
          <h3 className="gargets__items-on-page-h3">Items on page</h3>
          <select
            name="choose"
            id=""
            className="gargets__items-on-page-choose-item"
            onChange={e => {
              const perPageValue = e.target.value;

              setSearchParams(params => {
                const updated = new URLSearchParams(params);

                updated.set('perPage', perPageValue);

                updated.set('page', '1');

                return updated;
              });
              setCurrentPage(1);
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <ProductList items={currentAccesssuries} />

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<'}
        </button>

        <div className="page-buttons">
          {getVisiblePages().map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};
