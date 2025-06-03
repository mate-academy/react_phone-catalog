/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './TabletPage.scss';
import { Tablet } from '../../Interface';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Link } from 'react-router-dom';
import { useCart } from '../../Functional/CartContext/CartContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  capacity?: string;
  quantity: number;
}

export const TabletPage = () => {
  const { addToCart, toggleFavorite, cart, favorites } = useCart();
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [filteredTablets, setFilteredTablets] = useState<Tablet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTablets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTablets.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}api/phones.json`)
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
    setCurrentPage(1);
  }, [searchTerm, sortBy, tablets]);

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

  const handleAddToCart = (tablet: Tablet) => {
    const selectedColor = tablet.color || 'default';
    const cartItem: CartItem = {
      id: tablet.id,
      name: tablet.name,
      price: tablet.priceDiscount,
      image: `/${tablet.images[0]}`,
      color: selectedColor,
      capacity: tablet.capacity,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({ ...prev, [imageSrc]: true }));
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
        <p className="home--nav-top">Tablets</p>
      </div>
      <p className="section__text">Tablets</p>
      <div className="section__top-bar">
        <SortForm<Tablet>
          items={tablets}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResultChange={setFilteredTablets}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
      <div className="tablets">
        {filteredTablets.length === 0 ? (
          <p className="tablets__no-results">No tablets found.</p>
        ) : (
          currentItems.map(tablet => (
            <div key={tablet.id} className="tablets__card">
              <Link to={`/products/${tablet.id}`}>
                <img
                  src={
                    imageError[`/${tablet.images[0]}`]
                      ? '/public/img/page-not-found.png'
                      : `/${tablet.images[0]}`
                  }
                  alt={tablet.name}
                  className="tablets__card-image"
                  onError={() => handleImageError(`/${tablet.images[0]}`)}
                />
                <h3 className="tablets__card-title">{tablet.name}</h3>
                <div className="tablets__card-prices">
                  <span className="tablets__card-price">
                    ${tablet.priceDiscount}
                  </span>
                </div>
                <div className="tablets__card-specs">
                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">Screen</span>
                    <span className="tablets__card-spec-value">
                      {tablet.screen}
                    </span>
                  </div>
                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">Capacity</span>
                    <span className="tablets__card-spec-value">
                      {tablet.capacity}
                    </span>
                  </div>
                  <div className="tablets__card-spec">
                    <span className="tablets__card-spec-label">RAM</span>
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
                    handleAddToCart(tablet);
                  }}
                  disabled={cart.some(
                    item =>
                      item.id === tablet.id &&
                      item.color === tablet.color &&
                      item.capacity === tablet.capacity,
                  )}
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
                    favorites.includes(tablet.id) ? 'favorite--active' : ''
                  }`}
                  onClick={e => {
                    e.preventDefault();
                    toggleFavorite(tablet.id);
                  }}
                >
                  <img
                    src={
                      favorites.includes(tablet.id)
                        ? '/figmaLogo/ActiveHeart.svg'
                        : '/figmaLogo/HeartLove.svg'
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
