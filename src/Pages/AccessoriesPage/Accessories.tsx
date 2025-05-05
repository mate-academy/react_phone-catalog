/* eslint-disable curly */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './Accessories.scss';
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

export const AccessoriesPage = () => {
  const { addToCart, removeFromCart, toggleFavorite, cart, favorites } =
    useCart();
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [initialAccessories, setInitialAccessories] = useState<Product[]>([]);
  const [filteredAccessories, setFilteredAccessories] = useState<Product[]>([]);
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
      ? filteredAccessories
      : filteredAccessories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages =
    itemsPerPage === 0
      ? 1
      : Math.ceil(filteredAccessories.length / itemsPerPage);

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
        const accessoriesOnly = data.filter(
          item => item.category === 'accessories',
        );

        const sortedByName = [...accessoriesOnly].sort((a, b) =>
          a.name.localeCompare(b.name),
        );

        setAccessories(sortedByName);
        setInitialAccessories(sortedByName);
        setFilteredAccessories(sortedByName);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load accessories');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const baseList = sortBy === '' ? initialAccessories : accessories;

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

    setFilteredAccessories(sorted);
    setCurrentPage(1);
  }, [accessories, initialAccessories, searchTerm, sortBy]);

  const handleCartToggle = (accessory: Product) => {
    if (!accessory.itemId) {
      return;
    }

    const cartItem: CartItem = {
      id: accessory.itemId,
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      color: accessory.color || 'default',
      capacity: accessory.capacity,
      quantity: 1,
    };

    if (cart.some(item => item.id === accessory.itemId)) {
      removeFromCart(accessory.itemId);
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
          <img src={homeSvg} alt="home_nav" />
        </a>
        <p className="home--nav-top">{'>'}</p>
        <p className="home--nav-top">Accessories</p>
      </div>

      <p className="section__text">Accessories</p>
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

      <div className="accessories">
        {filteredAccessories.length === 0 ? (
          <p className="accessories__no-results">No accessories found.</p>
        ) : (
          currentItems.map(accessory => (
            <div key={accessory.itemId} className="accessories__card">
              <Link to={`/products/${accessory.itemId}`}>
                <img
                  src={
                    imageError[accessory.image] ? pageNotFound : accessory.image
                  }
                  alt={accessory.name}
                  className="accessories__card-image"
                  onError={() => handleImageError(accessory.image)}
                />
                <h3 className="accessories__card-title">{accessory.name}</h3>
                <div className="accessories__card-prices">
                  <span className="accessories__card-price">
                    ${accessory.price}
                  </span>
                </div>
                <div className="accessories__card-specs">
                  <div className="accessories__card-spec">
                    <span className="accessories__card-spec-label">Color</span>
                    <span className="accessories__card-spec-value">
                      {accessory.color}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="accessories__card-actions">
                <button
                  className={`accessories__card-btn accessories__card-btn--add ${cart.some(item => item.id === accessory.itemId) ? 'added' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    handleCartToggle(accessory);
                  }}
                >
                  {cart.some(item => item.id === accessory.itemId)
                    ? 'Added'
                    : 'Add to cart'}
                </button>
                <button
                  className={`accessories__card-btn accessories__card-btn--favorite ${favorites.includes(accessory.itemId || '') ? 'favorite--active' : ''}`}
                  onClick={e => {
                    e.preventDefault();
                    if (accessory.itemId) {
                      toggleFavorite(accessory.itemId);
                    }
                  }}
                >
                  <img
                    src={
                      favorites.includes(accessory.itemId || '')
                        ? activeSvg
                        : heartLove
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
