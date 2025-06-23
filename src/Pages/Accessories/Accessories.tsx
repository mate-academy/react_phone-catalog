import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Accessories as AccessoriesType } from '../../Types/BaseItem';

import { useCartContext } from '../../CartContext/useCartContext';
import { Link, useLocation } from 'react-router-dom';
import './Accessories.scss';
import { SearchParameters } from '../../SearchParm/SearchParam';

const HeartEmpty = './img/AddFavor.png';
const HeartFilled = './img/AddFavorAct.png';

export const Accessories: React.FC = () => {
  const [accessories, setAccessories] = useState<AccessoriesType[]>([]);
  // prettier-ignore
  const [filteredAccessories, setFilteredAccessories] = useState<
  AccessoriesType[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query')?.toLowerCase() || '';

  const {
    cart,
    favorites,
    addToCart,
    removeFromCart,
    addToFavorites,
    removeFromFavorites,
  } = useCartContext();

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

  const toggleFavorite = useCallback(
    (accessories: AccessoriesType) => {
      const isInFavorites = favorites.some((fav) => fav.id === accessories.id);

      if (isInFavorites) {
        removeFromFavorites(accessories.id);
        setFavoriteIds((prev) => {
          const updated = new Set(prev);
          updated.delete(accessories.id);
          return updated;
        });
      } else {
        addToFavorites(accessories);
        setFavoriteIds((prev) => new Set(prev).add(accessories.id));
      }
    },
    [favorites, addToFavorites, removeFromFavorites],
  );

  const toggleToCart = useCallback(
    (accessories: AccessoriesType) => {
      const isInCart = cart.some(
        (cartItem) => cartItem.item.id === accessories.id,
      );

      if (isInCart) {
        removeFromCart(accessories.id);
        setAddToCartIds((prev) => {
          const updated = new Set(prev);
          updated.delete(accessories.id);
          return updated;
        });
      } else {
        addToCart(accessories);
        setAddToCartIds((prev) => new Set(prev).add(accessories.id));
      }
    },
    [cart, addToCart, removeFromCart],
  );

  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('itemsPerPage', itemsPerPage.toString());
  }, [itemsPerPage]);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredAccessories];

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
  }, [filteredAccessories, sortOption]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedProducts.slice(start, end);
  }, [sortedProducts, currentPage, itemsPerPage]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch('./api/accessories.json');

        if (!response.ok) {
          throw new Error('Failed to fetch phones');
        }

        const data = await response.json();

        setAccessories(data);
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

    fetchAccessories();
  }, []);

  useEffect(() => {
    setFilteredAccessories(
      accessories.filter((accessory) =>
        accessory.name.toLowerCase().includes(searchQuery),
      ),
    );
  }, [searchQuery, accessories]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <SearchParameters />
      <h1 className="accessories-header__title">Accessories</h1>
      <h2 className="accessories-available__title">
        {accessories.length} Accessories Available
      </h2>
      <div className="accessories-list__boxSort">
        <div>
          <label className="accessories-list_sortBy">Sort by:</label>
          <select
            className="accessories-list_sortBy__select"
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
          <label className="accessories-list_itemPerPage">
            Items per page:
          </label>
          <select
            className="accessories-list_itemPerPage__select"
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
      <div className="accessories-list">
        {paginatedProducts.map((accessory) => (
          <div
            key={accessory.id}
            className="accessories-card a"
          >
            <Link to={`/accessories/${accessory.id}`}>
              <img
                src={accessory.images[0]}
                alt={accessory.name}
                className="accessories-image"
              />
              <div className="accessories-info">
                <h3 className="accessories-name">{accessory.name}</h3>
                <p className="accessories-price">${accessory.priceDiscount}</p>
                <p className="accessories-card__detail">
                  <span>Screen</span> <span>{accessory.screen}</span>
                </p>
                <p className="accessories-card__detail">
                  <span>Capacity</span> <span>{accessory.capacity}</span>
                </p>
                <p className="accessories-card__detail">
                  <span>RAM</span> <span>{accessory.ram}</span>
                </p>
              </div>
            </Link>
            <div className="accessories-card__actions">
              <button
                className={`accessories-card__actions__btn-primary ${
                  addToCartIds.has(accessory.id) ? 'added' : ''
                }`}
                onClick={() => toggleToCart(accessory)}
              >
                {addToCartIds.has(accessory.id) ? 'Added' : 'Add to cart'}
              </button>
              <img
                onClick={() => toggleFavorite(accessory)}
                className="accessories-card__actions__btn-favorite"
                src={favoriteIds.has(accessory.id) ? HeartFilled : HeartEmpty}
                alt="Favorite"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="accessories_pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="accessories_pagination_button"
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
              className={`accessories_pagination_button ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="accessories_pagination_button"
        >
          →
        </button>
      </div>
    </div>
  );
};
