/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import './Accessories.scss';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Accessories } from '../../Interface';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../Functional/CartContext/CartContext';
import { getBaseUrl } from '../../utils';
import { Pagination } from '../../components/Pagination/Pagination';

const DEFAULT_ITEMS_PER_PAGE = 8;

export const AccessoriesPage = () => {
  const { addToCart, toggleFavorite, removeFromCart, cart, favorites } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Accessories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('query') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1,
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    Number(searchParams.get('perPage')) || DEFAULT_ITEMS_PER_PAGE,
  );

  const [imageError, setImageError] = useState<{
    [key: string]: boolean;
  }>({});

  const isInitialMount = useRef(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredAccessories.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(
    filteredAccessories.length / itemsPerPage,
  );

  useEffect(() => {
    setLoading(true);

    fetch(`${getBaseUrl()}api/accessories.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch accessories.json: ${response.status}`,
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
    const filtered = accessories.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
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

  // Сбрасываем страницу на 1 только когда юзер меняет фильтры,
  // но не при первой загрузке (чтобы не сбить page из URL)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setCurrentPage(1);
  }, [searchTerm, sortBy, itemsPerPage]);

  // Если currentPage из URL больше totalPages — корректируем
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // Синхронизируем состояние с параметрами поиска (URL)
  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchTerm) params.query = searchTerm;
    if (sortBy) params.sort = sortBy;
    if (itemsPerPage !== DEFAULT_ITEMS_PER_PAGE) params.perPage = String(itemsPerPage);
    if (currentPage !== 1) params.page = String(currentPage);

    setSearchParams(params, { replace: true });
  }, [searchTerm, sortBy, itemsPerPage, currentPage, setSearchParams]);

  const handleAddToCart = (accessory: Accessories) => {
    addToCart({
      id: accessory.id,
      name: accessory.name,
      price: accessory.priceDiscount,
      image: accessory.images[0],
      color: accessory.color,
      quantity: 1,
    });
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({
      ...prev,
      [imageSrc]: true,
    }));
  };

  // "6.5' OLED (Super Retina HD)" → "6.5' OLED"
  const formatScreen = (screen: string) => {
    const parts = screen.split(' ');
    return parts.slice(0, 2).join(' ');
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
          <div className="error">
            Error:
            {' '}
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="home--nav">
        <a href="#">
          <img
            src="./icons/home.svg"
            alt="home_nav"
            className="home--nav-icon"
          />
        </a>

        <img
          src="./icons/arrow-right-small.svg"
          alt="arrow-right"
          className="home--nav-arrow"
        />

        <p className="home--nav-top">Accessories</p>
      </div>

      <p className="section__text">Accessories</p>

      <p className="section__models">
        {filteredAccessories.length}
        {' '}
        models
      </p>

      <div className="section__top-bar">
        <SortForm<Accessories>
          items={accessories}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResultChange={setFilteredAccessories}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="accessories">
        {filteredAccessories.length === 0 ? (
          <p className="accessories__no-results">
            No accessories found.
          </p>
        ) : (
          currentItems.map(accessory => (
            <div
              key={accessory.id}
              className="accessories__card"
            >
              <Link to={`/${accessory.category}/${accessory.id}`}>
                <img
                  src={
                    imageError[accessory.images[0]]
                      ? 'img/page-not-found.png'
                      : accessory.images[0]
                  }
                  alt={accessory.name}
                  className="accessories__card-image"
                  onError={() =>
                    handleImageError(accessory.images[0])
                  }
                />

                <h3 className="accessories__card-title">
                  {accessory.name}
                </h3>

                <div className="accessories__card-prices">
                  <span className="accessories__card-price">
                    $
                    {accessory.priceDiscount}
                  </span>
                </div>

                <div className="accessories__card-specs">
                  <div className="accessories__card-spec">
                    <span className="accessories__card-spec-label">
                      Screen
                    </span>

                    <span className="accessories__card-spec-value">
                      {formatScreen(accessory.screen)}
                    </span>
                  </div>

                  <div className="accessories__card-spec">
                    <span className="accessories__card-spec-label">
                      Capacity
                    </span>

                    <span className="accessories__card-spec-value">
                      {accessory.capacity}
                    </span>
                  </div>

                  <div className="accessories__card-spec">
                    <span className="accessories__card-spec-label">
                      RAM
                    </span>

                    <span className="accessories__card-spec-value">
                      {accessory.ram}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="accessories__card-actions">
                <button
                  className={`accessories__card-btn accessories__card-btn--add ${
                    cart.some(
                      item =>
                        item.id === accessory.id &&
                        item.color === accessory.color,
                    )
                      ? 'added'
                      : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    const inCart = cart.some(
                      item =>
                        item.id === accessory.id &&
                        item.color === accessory.color,
                    );
                    if (inCart) {
                      removeFromCart(accessory.id);
                    } else {
                      handleAddToCart(accessory);
                    }
                  }}
                >
                  {cart.some(
                    item =>
                      item.id === accessory.id &&
                      item.color === accessory.color,
                  )
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>

                <button
                  className={`accessories__card-btn accessories__card-btn--favorite ${
                    favorites.includes(accessory.id)
                      ? 'favorite--active'
                      : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    toggleFavorite(accessory.id);
                  }}
                >
                  <img
                    src={
                      favorites.includes(accessory.id)
                        ? './icons/heart-active.svg'
                        : './icons/heart.svg'
                    }
                    alt="Favorite"
                    className="accessories__card-btn-icon"
                  />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          handleNext={() =>
            setCurrentPage(prev => Math.min(prev + 1, totalPages))
          }
          handlePrev={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          handlePage={page => setCurrentPage(page)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};