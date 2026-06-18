/* eslint-disable max-len */
import { useEffect, useRef, useState } from 'react';
import './PhonePage.scss';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Phone } from '../../Interface';
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

const DEFAULT_ITEMS_PER_PAGE = 16;

export const PhonePage = () => {
  const { addToCart, toggleFavorite, removeFromCart, cart, favorites } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
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
  const currentItems = filteredPhones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPhones.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    fetch(`${getBaseUrl()}api/phones.json`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setPhones(data);
        setFilteredPhones(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load phones');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = phones.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'priceLow') return a.priceDiscount - b.priceDiscount;
      if (sortBy === 'priceHigh') return b.priceDiscount - a.priceDiscount;
      return 0;
    });

    setFilteredPhones(sorted);
  }, [phones, searchTerm, sortBy]);

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

  const handleAddToCart = (phone: Phone) => {
    addToCart({
      id: phone.id,
      name: phone.name,
      price: phone.priceDiscount,
      image: phone.images[0],
      color: phone.color || 'default',
      capacity: phone.capacity,
      quantity: 1,
      category: 'phones',
    });
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({ ...prev, [imageSrc]: true }));
  };

  // "6.5' OLED (Super Retina HD)" → "6.5' OLED"
  const formatScreen = (screen: string) => {
    const parts = screen.split(' ');
    return parts.slice(0, 2).join(' ');
  };

  if (loading) {
    return (
      <section className="section">
        <p style={{ color: 'white', padding: '32px' }}>Loading phones...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <p style={{ color: 'red', padding: '32px' }}>Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="home--nav">
        <a href="#">
          <img src="./icons/home.svg" alt="home_nav" className="home--nav-icon" />
        </a>

        <img src="./icons/arrow-right-small.svg" alt="arrow-right" className="home--nav-arrow" />

        <p className="home--nav-top">Phones</p>
      </div>

      <p className="section__text">Mobile phones</p>
      <p className="section__models">{filteredPhones.length} models</p>

      <div className="section__top-bar">
        <SortForm<Phone>
          items={phones}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResultChange={setFilteredPhones}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="phone">
        {filteredPhones.length === 0 ? (
          <p className="phone__no-results">No phones found.</p>
        ) : (
          currentItems.map(phone => (
            <div key={phone.id} className="phone__card">
              <Link to={`/phones/${phone.id}`}>
                <img
                  src={
                    imageError[phone.images[0]]
                      ? 'img/page-not-found.png'
                      : phone.images[0]
                  }
                  alt={phone.name}
                  className="phone__card-image"
                  onError={() => handleImageError(phone.images[0])}
                />

                <h3 className="phone__card-title">{phone.name}</h3>

                <div className="phone__card-prices">
                  <span className="phone__card-price">
                    ${phone.priceDiscount}
                  </span>
                </div>

                <div className="phone__card-specs">
                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">Screen</span>
                    <span className="phone__card-spec-value">{formatScreen(phone.screen)}</span>
                  </div>

                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">Capacity</span>
                    <span className="phone__card-spec-value">{phone.capacity}</span>
                  </div>

                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">RAM</span>
                    <span className="phone__card-spec-value">{phone.ram}</span>
                  </div>
                </div>
              </Link>

              <div className="phone__card-actions">
                <button
                  className={`phone__card-btn phone__card-btn--add ${
                    cart.some(item =>
                      item.id === phone.id &&
                      item.color === phone.color &&
                      item.capacity === phone.capacity,
                    )
                      ? 'added'
                      : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    const inCart = cart.some(item =>
                      item.id === phone.id &&
                      item.color === phone.color &&
                      item.capacity === phone.capacity,
                    );
                    if (inCart) {
                      const itemKey = `${phone.id}-${phone.color || 'default'}-${phone.capacity}`;
                      removeFromCart(itemKey);
                    } else {
                      handleAddToCart(phone);
                    }
                  }}
                >
                  {cart.some(item =>
                    item.id === phone.id &&
                    item.color === phone.color &&
                    item.capacity === phone.capacity,
                  )
                    ? 'Added to cart'
                    : 'Add to cart'}
                </button>

                <button
                  className={`phone__card-btn phone__card-btn--favorite ${
                    favorites.includes(phone.id) ? 'favorite--active' : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    toggleFavorite(phone.id);
                  }}
                >
                  <img
                    src={
                      favorites.includes(phone.id)
                        ? './icons/heart-active.svg'
                        : './icons/heart.svg'
                    }
                    alt="Favorite"
                    className="phone__card-btn-icon"
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