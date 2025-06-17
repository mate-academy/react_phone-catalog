import React, { useState, useEffect, useMemo } from 'react';
import { Phone } from '../../../Types/BaseItem';
import './Phones.scss';
import { useCartContext } from '../../../CartContext/useCartContext';
import { Link, useLocation } from 'react-router-dom';
import { SearchParameters } from '../../../SearchParm/SearchParam';
import HeartEmpty from '../../../../public/img/AddFavor.png';
import HeartFilled from '../../../../public/img/AddFavorAct.png';

export const Phones: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const { addToCart, addToFavorites } = useCartContext();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem('sortOption') || 'default';
  });

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    const stored = localStorage.getItem('itemsPerPage');
    return stored ? +stored : 4;
  });

  const [currentPage, setCurrentPage] = useState(() => {
    const stored = localStorage.getItem('currentPage');
    return stored ? +stored : 1;
  });

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('favoriteIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const [addToCartIds, setAddToCartIds] = useState<Set<string>>(() => {
    const stored = localStorage.getItem('addToCartIds');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  useEffect(() => {
    const storedCartIds = localStorage.getItem('addToCartIds');
    const storedFavIds = localStorage.getItem('favoriteIds');

    if (storedCartIds) {
      setAddToCartIds(new Set(JSON.parse(storedCartIds)));
    }

    if (storedFavIds) {
      setFavoriteIds(new Set(JSON.parse(storedFavIds)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'addToCartIds',
      JSON.stringify(Array.from(addToCartIds)),
    );
  }, [addToCartIds]);

  useEffect(() => {
    localStorage.setItem(
      'favoriteIds',
      JSON.stringify(Array.from(favoriteIds)),
    );
  }, [favoriteIds]);

  const toggleFavorite = (phone: Phone) => {
    setFavoriteIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(phone.id)) {
        newSet.delete(phone.id);
      } else {
        newSet.add(phone.id);
      }

      addToFavorites(phone);

      return newSet;
    });
  };

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const toggleToCart = (phone: Phone) => {
    setAddToCartIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(phone.id)) {
        newSet.delete(phone.id);
      } else {
        newSet.add(phone.id);
      }

      addToCart(phone);

      return newSet;
    });
  };

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredPhones];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.priceDiscount - a.priceDiscount);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredPhones, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        // eslint-disable-next-line no-console
        console.log('Fetching phones...');
        const response = await fetch('./api/phones.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data: Phone[] = await response.json();

        setPhones(data);
        // eslint-disable-next-line no-console
        console.log('Phones loaded:', data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  useEffect(() => {
    setFilteredPhones(
      phones.filter((phone) => phone.name.toLowerCase().includes(searchQuery)),
    );
  }, [searchQuery, phones]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <SearchParameters />
      <h1 className="phones-header__title">Mobile phones</h1>
      <h2 className="phones-available__title">
        {phones.length} Phones Available
      </h2>
      <div className="phone-list__boxSort">
        <div>
          <label className="phone-list_sortBy">Sort by:</label>
          <select
            className="phone-list_sortBy__select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>

        <div>
          <label className="phone-list_itemPerPage">Items per page:</label>
          <select
            className="phone-list_itemPerPage__select"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(+e.target.value)}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={16}>16</option>
            <option value={32}>32</option>
          </select>
        </div>
      </div>

      <div className="phone-list">
        {paginatedProducts.map((phone: Phone) => (
          <div
            key={phone.id}
            className="phone-card a"
          >
            <Link to={`/phones/${phone.id}`}>
              <img
                src={phone.images?.[0] || '/img/product-not-found.png'}
                alt={phone.name}
                className="phone-cardimage"
              />
              <div className="phone-info">
                <h3 className="phone-cardname">{phone.name}</h3>
                <p className="phonecardprice">${phone.priceDiscount}</p>
                <p className="phone-card__detail">
                  <span>Screen</span> <span>{phone.screen}</span>
                </p>
                <p className="phone-card__detail">
                  <span>Capacity</span> <span>{phone.capacity}</span>
                </p>
                <p className="phone-card__detail">
                  <span>RAM</span> <span>{phone.ram}</span>
                </p>
              </div>
            </Link>
            <div className="phone-card__actions">
              <button
                className={`phone-card__actions__btn-primary ${
                  addToCartIds.has(phone.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(phone)}
              >
                {addToCartIds.has(phone.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(phone)}
                className="phone-card__actions__btn-favorite"
                src={favoriteIds.has(phone.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="phones_pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="phones_pagination_button"
        >
          ←
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter((page) => {
            if (totalPages <= 4) return true;
            if (currentPage <= 2) return page <= 4;
            if (currentPage >= totalPages - 1) return page >= totalPages - 3;
            return Math.abs(currentPage - page) <= 1;
          })
          .map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`phones_pagination_button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="phones_pagination_button"
        >
          →
        </button>
      </div>
    </div>
  );
};
