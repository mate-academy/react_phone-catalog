/* eslint-disable curly */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './TabletPage.scss';
import { Product } from '../../Interface';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Link } from 'react-router-dom';
import { useCart } from '../../Functional/CartContext/CartContext';
import homeSvg from '../../../public/figmaLogo/Home.svg';
import heartLove from '../../../public/figmaLogo/HeartLove.svg';
import activeSvg from '../../../public/figmaLogo/ActiveHeart.svg';
import pageNotFound from '../../../public/img/page-not-found.png';

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
  const { addToCart, removeFromCart, toggleFavorite, cart, favorites } =
    useCart();
  const [tablets, setTablets] = useState<Product[]>([]);
  const [initialTablets, setInitialTablets] = useState<Product[]>([]);
  const [filteredTablets, setFilteredTablets] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    itemsPerPage === 0
      ? filteredTablets
      : filteredTablets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(filteredTablets.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);

    fetch('api/products.json') // Змінено з 'api/tablets.json' на 'api/products.json' для узгодженості
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch products.json: ${response.status} ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then((data: Product[]) => {
        const tabletsOnly = data.filter(item => item.category === 'tablets');

        const sortedByName = [...tabletsOnly].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setTablets(sortedByName);
        setInitialTablets(sortedByName);
        setFilteredTablets(sortedByName);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load tablets');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const baseList = sortBy === '' ? initialTablets : tablets;

    const filtered = baseList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      if (sortBy === 'alphabetically') return a.name.localeCompare(b.name);

      return 0;
    });

    setFilteredTablets(sorted);
    setCurrentPage(1);
  }, [tablets, initialTablets, searchTerm, sortBy]);

  const handleCartToggle = (tablet: Product) => {
    if (!tablet.itemId) {
      return;
    }

    const cartItem: CartItem = {
      id: tablet.itemId,
      name: tablet.name,
      price: tablet.price,
      image: tablet.image,
      color: tablet.color || 'default',
      capacity: tablet.capacity,
      quantity: 1,
    };

    if (cart.some(item => item.id === tablet.itemId)) {
      removeFromCart(tablet.itemId);
    } else {
      addToCart(cartItem);
    }
  };

  const handleImageError = (imageSrc: string) => {
    setImageError(prev => ({ ...prev, [imageSrc]: true }));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
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
          <img src={homeSvg} alt="home_nav" />
        </a>
        <p className="home--nav-top">{'>'}</p>
        <p className="home--nav-top">Tablets</p>
      </div>
      <p className="section__text">Tablets</p>
      <div className="section__top-bar">
        <SortForm
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onItemsPerPageChange={value => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="tablets">
        {filteredTablets.length === 0 ? (
          <p className="tablets__no-results">No tablets found.</p>
        ) : (
          currentItems.map(tablet => (
            <div key={tablet.itemId} className="tablets__card">
              <Link to={`/products/${tablet.itemId}`}>
                <img
                  src={imageError[tablet.image] ? pageNotFound : tablet.image}
                  alt={tablet.name}
                  className="tablets__card-image"
                  onError={() => handleImageError(tablet.image)}
                />
                <h3 className="tablets__card-title">{tablet.name}</h3>
                <div className="tablets__card-prices">
                  <span className="tablets__card-price">${tablet.price}</span>
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
                  className={`tablets__card-btn tablets__card-btn--add ${cart.some(item => item.id === tablet.itemId) ? 'added' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    handleCartToggle(tablet);
                  }}
                >
                  {cart.some(item => item.id === tablet.itemId)
                    ? 'Added'
                    : 'Add to cart'}
                </button>
                <button
                  className={`tablets__card-btn tablets__card-btn--favorite ${favorites.includes(tablet.itemId || '') ? 'favorite--active' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    if (tablet.itemId) {
                      toggleFavorite(tablet.itemId);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.includes(tablet.itemId || '')
                        ? activeSvg
                        : heartLove
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
      {itemsPerPage !== 0 && (
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
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="pagination__button"
          >
            {'>'}
          </button>
        </div>
      )}
    </section>
  );
};
