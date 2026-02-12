/* eslint-disable no-console */
import { NavLink, useSearchParams } from 'react-router-dom';
import { ProductList } from './ProductList';
import { useEffect, useState } from 'react';
import { Gargets } from '../../interface/Gargets';
import { Loader } from './Loader';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Gargets[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorReload, setErrorReload] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [searchParams, setSearchParams] = useSearchParams();

  // Ініціалізація з URL
  useEffect(() => {
    const sortParam = searchParams.get('sort') ?? 'newest';
    setSortBy(sortParam);

    const perPageParam = searchParams.get('perPage') ?? '4';
    if (perPageParam === 'all') {
      setItemsPerPage(Infinity); // показуємо всі
    } else {
      setItemsPerPage(Number(perPageParam));
    }

    const pageParam = Number(searchParams.get('page')) || 1;
    setCurrentPage(pageParam);
  }, [searchParams]);

  // Завантаження даних
  useEffect(() => {
    setLoading(true);
    setErrorReload(false);

    setTimeout(() => {
      fetch('./api/tablets.json')
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then(data => setTablets(data))
        .catch(err => {
          console.error(err);
          setErrorReload(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  // Сортування таблеток залежно від sortBy
  const sortedTablets = [...tablets].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    }
    if (sortBy === 'alphabetically') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'cheapest') {
      return a.price - b.price;
    }
    return 0;
  });

  // Пагінація
  const totalPages = itemsPerPage === Infinity ? 1 : Math.ceil(sortedTablets.length / itemsPerPage);
  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentTablets = itemsPerPage === Infinity ? sortedTablets : sortedTablets.slice(indexFirst, indexLast);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setSearchParams(params => {
      const newParams = new URLSearchParams(params);
      newParams.set('page', String(page));
      return newParams;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortBy(newSort);

    setSearchParams(params => {
      const newParams = new URLSearchParams(params);
      newParams.set('sort', newSort);
      newParams.set('page', '1'); // при зміні сортування скидаємо сторінку
      return newParams;
    });
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const perPage = e.target.value;

    setSearchParams(params => {
      const newParams = new URLSearchParams(params);
      newParams.set('perPage', perPage);
      newParams.set('page', '1'); // при зміні кількості елементів скидаємо сторінку
      return newParams;
    });
  };

  const handleReload = () => {
    setLoading(true);
    setErrorReload(false);
    setTablets([]);

    setTimeout(() => {
      fetch('./api/tablets.json')
        .then(res => res.json())
        .then(data => setTablets(data))
        .catch(err => {
          console.error(err);
          setErrorReload(true);
        })
        .finally(() => setLoading(false));
    }, 1000);
  };

  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 4;

    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(start + maxVisible - 1, totalPages);

    if (end - start + 1 < maxVisible) {
      start = Math.max(end - maxVisible + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (loading) return <Loader loading={true} />;

  if (errorReload)
    return (
      <div className="error">
        <p>Error loading data, please try again.</p>
        <button onClick={handleReload} className="reload-button">
          Reload
        </button>
      </div>
    );

  return (
    <div className="gargets">
      <div className="gargets__back-to-home">
        <NavLink to="/" className="gargets__home-img" />
        <span className="gargets__arrow"></span>
        <span className="gargets__back-home-h2">Tablets</span>
      </div>
      <h1 className="gargets__mobile-phones-h1">Tablets</h1>
      <h3 className="gargets__count-models">{tablets.length} models</h3>

      <div className="gargets__position-sorting">
        <div className="gargets__sort-by">
          <h3 className="gargets__sort-by-h3">Sort by</h3>
          <select className="gargets__sort-by-choose-value" value={sortBy} onChange={handleSortChange}>
            <option value="newest">Newest</option>
            <option value="alphabetically">Alphabetically</option>
            <option value="cheapest">Cheapest</option>
          </select>
        </div>

        <div className="gargets__items-on-page">
          <h3 className="gargets__items-on-page-h3">Items on page</h3>
          <select className="gargets__items-on-page-choose-item" onChange={handleItemsPerPageChange} value={itemsPerPage === Infinity ? 'all' : String(itemsPerPage)}>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <ProductList items={currentTablets} />

      {itemsPerPage !== Infinity && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            {'<'}
          </button>

          <div className="page-buttons">
            {getVisiblePages().map(page => (
              <button key={page} onClick={() => handlePageChange(page)} className={`page-btn ${currentPage === page ? 'active' : ''}`}>
                {page}
              </button>
            ))}
          </div>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};
