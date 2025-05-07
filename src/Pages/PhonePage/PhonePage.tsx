/* eslint-disable curly */
import { useEffect, useState } from 'react';
import './PhonePage.scss';
import { SortForm } from '../../Functional/SortForm/SortForm';
import { Product } from '../../Interface';
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

export const PhonePage = () => {
  const { addToCart, removeFromCart, toggleFavorite, cart, favorites } =
    useCart();
  const [phones, setPhones] = useState<Product[]>([]);
  const [initialPhones, setInitialPhones] = useState<Product[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Product[]>([]);
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
      ? filteredPhones
      : filteredPhones.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages =
    itemsPerPage === 0 ? 1 : Math.ceil(filteredPhones.length / itemsPerPage);

  useEffect(() => {
    setLoading(true);

    fetch('api/products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Failed to fetch products.json: ${response.status} ${response.statusText}`,
          );
        }

        return response.json();
      })
      .then((data: Product[]) => {
        const phonesOnly = data.filter(item => item.category === 'phones');

        const sortedByName = [...phonesOnly].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setPhones(sortedByName);
        setInitialPhones(sortedByName);
        setFilteredPhones(sortedByName);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load phones');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const baseList = sortBy === '' ? initialPhones : phones;

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

    setFilteredPhones(sorted);
    setCurrentPage(1);
  }, [phones, initialPhones, searchTerm, sortBy]);

  const handleCartToggle = (phone: Product) => {
    if (!phone.itemId) {
      return;
    }

    const cartItem: CartItem = {
      id: phone.itemId,
      name: phone.name,
      price: phone.price,
      image: phone.image,
      color: phone.color || 'default',
      capacity: phone.capacity,
      quantity: 1,
    };

    if (cart.some(item => item.id === phone.itemId)) {
      removeFromCart(phone.itemId);
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
    if (startPage > 2) pages.push('...');

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) pages.push('...');
    if (totalPages !== 1) pages.push(totalPages);

    return pages;
  };

  if (loading) {
    return (
      <section className="section">
        <div className="phone">
          <div>Loading phones...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section">
        <div className="phone">
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
        <p className="home--nav-top">Phones</p>
      </div>

      <p className="section__text">Mobile phones</p>
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

      <div className="phone">
        {filteredPhones.length === 0 ? (
          <p className="phone__no-results">No phones found.</p>
        ) : (
          currentItems.map(phone => (
            <div key={phone.itemId} className="phone__card">
              <Link to={`/products/${phone.itemId}`}>
                <img
                  src={imageError[phone.image] ? pageNotFound : phone.image}
                  alt={phone.name}
                  className="phone__card-image"
                  onError={() => handleImageError(phone.image)}
                />
                <h3 className="phone__card-title">{phone.name}</h3>
                <div className="phone__card-prices">
                  <span className="phone__card-price">${phone.price}</span>
                </div>
                <div className="phone__card-specs">
                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">Screen</span>
                    <span className="phone__card-spec-value">
                      {phone.screen}
                    </span>
                  </div>
                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">Capacity</span>
                    <span className="phone__card-spec-value">
                      {phone.capacity}
                    </span>
                  </div>
                  <div className="phone__card-spec">
                    <span className="phone__card-spec-label">RAM</span>
                    <span className="phone__card-spec-value">{phone.ram}</span>
                  </div>
                </div>
              </Link>

              <div className="phone__card-actions">
                <button
                  className={`phone__card-btn phone__card-btn--add ${cart.some(item => item.id === phone.itemId) ? 'added' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    handleCartToggle(phone);
                  }}
                >
                  {cart.some(item => item.id === phone.itemId)
                    ? 'Added'
                    : 'Add to cart'}
                </button>
                <button
                  className={`phone__card-btn phone__card-btn--favorite ${favorites.includes(phone.itemId || '') ? 'favorite--active' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    if (phone.itemId) {
                      toggleFavorite(phone.itemId);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.includes(phone.itemId || '')
                        ? activeSvg
                        : heartLove
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

      {itemsPerPage !== 0 && filteredPhones.length > 0 && (
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
