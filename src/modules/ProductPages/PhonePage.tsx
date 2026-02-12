import { useEffect, useState } from 'react';
import { Gargets } from '../../interface/Gargets';
import { ProductList } from './ProductList';
import './GargetsPage.scss';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Loader } from './Loader';

export const PhonePage = () => {
  const [phones, setPhones] = useState<Gargets[]>([]);
  const [loadingDataOnServer, setLoadingDataOnServer] = useState(false);
  const [reloadButton, setReloadButton] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Читаємо початкові параметри з URL
  const pageParam = Number(searchParams.get('page'));
  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort');
  const itemsParam = searchParams.get('items'); // ти використовуєш 'items' та 'perPage' — треба обрати один!

  const [currentPage, setCurrentPage] = useState(
    pageParam && pageParam > 0 ? pageParam : 1,
  );
  const [sortBy, setSortBy] = useState(sortParam ?? 'newest');
  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (perPageParam === 'all') return Infinity; // Зроблю Infinity, щоб коректно відрізати всі
    if (perPageParam) return Number(perPageParam);
    if (itemsParam) return Number(itemsParam);
    return 4;
  });

  // Завантаження даних
  useEffect(() => {
    setReloadButton(false);
    setLoadingDataOnServer(true);
    setTimeout(() => {
      fetch(`./api/phones.json`)
        .then(response => response.json())
        .then(data => setPhones(data))
        .catch(error => {
          setReloadButton(true);
          console.error(error);
        })
        .finally(() => setLoadingDataOnServer(false));
    }, 1000);
  }, []);

  // Сортування телефонів
  useEffect(() => {
    if (!phones.length) return;

    const sortedPhones = [...phones];

    switch (sortBy) {
      case 'alphabetically':
        sortedPhones.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'cheapest':
        sortedPhones.sort((a, b) => a.priceRegular - b.priceRegular);
        break;
      case 'newest':
        sortedPhones.sort((a, b) => b.priceRegular - a.priceRegular);
        break;
    }

    setPhones(sortedPhones);
  }, [sortBy, phones.length]);

  // Синхронізація стану зі змінами URL параметрів (після завантаження)
  useEffect(() => {
    const pageParam = Number(searchParams.get('page'));
    const perPageParam = searchParams.get('perPage');
    const sortParam = searchParams.get('sort');

    if (pageParam && pageParam > 0 && pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }

    if (perPageParam === 'all') {
      setItemsPerPage(Infinity);
    } else if (perPageParam && Number(perPageParam) !== itemsPerPage) {
      setItemsPerPage(Number(perPageParam));
    }

    if (sortParam && sortParam !== sortBy) {
      setSortBy(sortParam);
    }
  }, [searchParams]);

  const totalPages =
    itemsPerPage === Infinity ? 1 : Math.ceil(phones.length / itemsPerPage);

  // Обчислення елементів поточної сторінки
  const indexOfLastPhone = currentPage * itemsPerPage;
  const indexOfFirstPhone = indexOfLastPhone - itemsPerPage;
  const currentPhones =
    itemsPerPage === Infinity
      ? phones
      : phones.slice(indexOfFirstPhone, indexOfLastPhone);

  // Обробка зміни сторінки
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;

    setSearchParams(params => {
      const updated = new URLSearchParams(params);
      updated.set('page', String(pageNumber));
      // Обов’язково зберігаємо інші параметри
      if (itemsPerPage === Infinity) {
        updated.set('perPage', 'all');
      } else {
        updated.set('perPage', String(itemsPerPage));
      }
      updated.set('sort', sortBy);
      return updated;
    });
    setCurrentPage(pageNumber);
  };

  // Обробка зміни кількості елементів на сторінці
  const handleItemsPerPageChange = (count: number | 'all') => {
    const perPageValue = count === 'all' ? 'all' : count.toString();

    setSearchParams(params => {
      const updated = new URLSearchParams(params);
      updated.set('perPage', perPageValue);
      updated.set('page', '1'); // Переходимо на першу сторінку при зміні кількості
      updated.set('sort', sortBy);
      return updated;
    });

    setCurrentPage(1);
    setItemsPerPage(count === 'all' ? Infinity : count);
  };

  // Обробка зміни сортування
  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);

    setSearchParams(params => {
      const updated = new URLSearchParams(params);
      updated.set('sort', sortType);
      updated.set('page', '1'); // Переходимо на першу сторінку при зміні сортування
      updated.set(
        'perPage',
        itemsPerPage === Infinity ? 'all' : String(itemsPerPage),
      );
      return updated;
    });
    setCurrentPage(1);
  };

  // Рендеринг

  if (!loadingDataOnServer && phones.length === 0 && !reloadButton) {
    return (
      <div className="no-items-message">
        <p>There are no phones</p>
      </div>
    );
  }

  if (reloadButton) {
    return (
      <div className="error">
        <p>Error loading data, please try again.</p>
        <button
          onClick={() => {
            setReloadButton(false);
            setLoadingDataOnServer(true);
            setPhones([]);
            setTimeout(() => {
              fetch('./api/phones.json')
                .then(response => response.json())
                .then(data => setPhones(data))
                .catch(error => {
                  setReloadButton(true);
                  console.error(error);
                })
                .finally(() => setLoadingDataOnServer(false));
            }, 1000);
          }}
          className="reload-button"
        >
          Reload
        </button>
      </div>
    );
  }

  if (loadingDataOnServer) {
    return <Loader loading={true} />;
  }

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
        <span className="gargets__back-home-h2">Phones</span>
      </div>
      <h1 className="gargets__mobile-phones-h1">Mobile phones</h1>
      <h3 className="gargets__count-models">{phones.length} models</h3>

      <div className="gargets__position-sorting">
        <div className="gargets__sort-by">
          <h3 className="gargets__sort-by-h3">Sort by</h3>
          <select
            name="choose"
            className="gargets__sort-by-choose-value"
            value={sortBy}
            onChange={e => handleSortChange(e.target.value)}
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
            className="gargets__items-on-page-choose-item"
            value={itemsPerPage === Infinity ? 'all' : itemsPerPage.toString()}
            onChange={e => {
              const val = e.target.value;
              handleItemsPerPageChange(val === 'all' ? 'all' : Number(val));
            }}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <ProductList items={currentPhones} />

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
