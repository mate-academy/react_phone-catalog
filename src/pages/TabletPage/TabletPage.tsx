/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import './TabletPage.scss';
import { Tablet } from '../../Interface';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../Functional/CartContext/CartContext';
import { getBaseUrl } from '../../utils';
import { Pagination } from '../../components/Pagination/Pagination';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  capacity?: string;
  quantity: number;
}

const DEFAULT_ITEMS_PER_PAGE = 8;

export const TabletPage = () => {
  const { addToCart, toggleFavorite, removeFromCart, cart, favorites } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
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

  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const isInitialMount = useRef(true);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredTablets.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredTablets.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);

    fetch(`${getBaseUrl()}api/tablets.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch tablets.json: ${response.status} ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then(data => {
        setTablets(data);
        setFilteredTablets(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load tablets');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let updated = [...tablets];

    if (searchTerm) {
      updated = updated.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortBy === 'priceLow') {
      updated.sort((a, b) => a.priceDiscount - b.priceDiscount);
    } else if (sortBy === 'priceHigh') {
      updated.sort((a, b) => b.priceDiscount - a.priceDiscount);
    } else if (sortBy === 'newest') {
      updated.sort((a, b) => b.year - a.year);
    }

    setFilteredTablets(updated);
  }, [searchTerm, sortBy, tablets]);

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

  const handleAddToCart = (tablet: Tablet) => {
    const cartItem: CartItem = {
      id: tablet.id,
      name: tablet.name,
      price: tablet.priceDiscount,
      image: `${tablet.images[0]}`,
      color: tablet.color || 'default',
      capacity: tablet.capacity,
      quantity: 1,
    };

    addToCart(cartItem);
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
        <div className="tablets">
          <div>Loading tablets...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="tablets">
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

        <p className="home--nav-top">Tablets</p>
      </div>

      <p className="section__text">Tablets</p>

      <p className="section__models">
        {filteredTablets.length}
        {' '}
        models
      </p>

      <div className="section__top-bar">
        <SortForm<Tablet>
          items={tablets}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResultChange={setFilteredTablets}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="tablets">
        {filteredTablets.length === 0 ? (
          <p className="tablets__no-results">
            No tablets found.
          </p>
        ) : (
          currentItems.map(tablet => (
            <div
              key={tablet.id}
              className="tablets__card"
            >
              <Link to={`/${tablet.category}/${tablet.id}`}>
                <img
                  src={
                    imageError[`${tablet.images[0]}`]
                      ? 'img/page-not-found.png'
                      : `${tablet.images[0]}`
                  }
                  alt={tablet.name}
                  className="tablets__card-image"
                  onError={() =>
                    handleImageError(`${tablet.images[0]}`)
                  }
                />

                <h3 className="tablets__card-title">
                  {tablet.name}
                </h3>

                <div className="tablets__card-prices">
                  <span className="tablets__card-price">
                    $
                    {tablet.priceDiscount}
                  </span>
                </div>

                <div className="tablets__card-specs">
                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">
                      Screen
                    </span>

                    <span className="tablets__card-spec-value">
                      {formatScreen(tablet.screen)}
                    </span>
                  </div>

                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">
                      Capacity
                    </span>

                    <span className="tablets__card-spec-value">
                      {tablet.capacity}
                    </span>
                  </div>

                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">
                      RAM
                    </span>

                    <span className="tablets__card-spec-value">
                      {tablet.ram}
                    </span>
                  </div>
                </div>
              </Link>

              <div className="tablets__card-actions">
                <button
                  className={`tablets__card-btn tablets__card-btn--add ${
                    cart.some(
                      item =>
                        item.id === tablet.id &&
                        item.color === tablet.color &&
                        item.capacity === tablet.capacity,
                    )
                      ? 'added'
                      : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    const inCart = cart.some(
                      item =>
                        item.id === tablet.id &&
                        item.color === tablet.color &&
                        item.capacity === tablet.capacity,
                    );
                    if (inCart) {
                      removeFromCart(tablet.id);
                    } else {
                      handleAddToCart(tablet);
                    }
                  }}
                >
                  {cart.some(
                    item =>
                      item.id === tablet.id &&
                      item.color === tablet.color &&
                      item.capacity === tablet.capacity,
                  )
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>

                <button
                  className={`tablets__card-btn tablets__card-btn--favorite ${
                    favorites.includes(tablet.id)
                      ? 'favorite--active'
                      : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    toggleFavorite(tablet.id);
                  }}
                >
                  <img
                    src={
                      favorites.includes(tablet.id)
                        ? './icons/heart-active.svg'
                        : './icons/heart.svg'
                    }
                    alt="Favorite"
                    className="tablets__card-btn-icon"
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